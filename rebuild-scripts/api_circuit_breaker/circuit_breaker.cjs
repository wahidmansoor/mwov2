#!/usr/bin/env node
/**
 * OncoVista API Circuit Breaker - Fault Injection & Recovery System
 * Medical-grade system resilience testing
 */

const EventEmitter = require('events');
const fs = require('fs');

class CircuitBreakerLab extends EventEmitter {
    constructor() {
        super();
        this.circuits = new Map();
        this.faultScenarios = [];
        this.monitoringData = [];
        
        this.circuitStates = {
            CLOSED: 'CLOSED',     // Normal operation
            OPEN: 'OPEN',         // Circuit tripped, failing fast
            HALF_OPEN: 'HALF_OPEN' // Testing recovery
        };
        
        this.faultTypes = {
            'NETWORK_TIMEOUT': 'Network request timeouts',
            'SERVICE_UNAVAILABLE': '503 Service Unavailable',
            'DATABASE_CONNECTION': 'Database connection failures',
            'RATE_LIMIT_EXCEEDED': 'API rate limit violations',
            'MEMORY_EXHAUSTION': 'Out of memory conditions',
            'DISK_FULL': 'Disk space exhaustion',
            'AUTH_SERVICE_DOWN': 'Authentication service failure',
            'THIRD_PARTY_API_DOWN': 'External API dependencies down'
        };
    }

    /**
     * 🔌 Create circuit breaker for service
     */
    createCircuit(serviceName, options = {}) {
        const defaultOptions = {
            failureThreshold: 5,      // Failures before opening
            timeout: 30000,           // Timeout in ms
            resetTimeout: 60000,      // Time before retry
            monitoringWindow: 60000,  // Monitoring window
            healthCheckInterval: 5000 // Health check frequency
        };
        
        const config = { ...defaultOptions, ...options };
        
        const circuit = {
            name: serviceName,
            state: this.circuitStates.CLOSED,
            failureCount: 0,
            lastFailureTime: null,
            nextAttemptTime: null,
            successCount: 0,
            requestCount: 0,
            config,
            healthChecks: []
        };
        
        this.circuits.set(serviceName, circuit);
        
        console.log(`⚡ CIRCUIT CREATED: ${serviceName} with threshold ${config.failureThreshold}`);
        
        // Start monitoring
        this.startCircuitMonitoring(serviceName);
        
        return circuit;
    }

    /**
     * 🩺 Execute request through circuit breaker
     */
    async executeWithCircuit(serviceName, operation, fallback = null) {
        const circuit = this.circuits.get(serviceName);
        
        if (!circuit) {
            throw new Error(`Circuit not found: ${serviceName}`);
        }
        
        const startTime = Date.now();
        
        // Check circuit state
        if (circuit.state === this.circuitStates.OPEN) {
            if (Date.now() < circuit.nextAttemptTime) {
                console.log(`🚨 CIRCUIT OPEN: ${serviceName} - Failing fast`);
                return this.executeFallback(fallback, 'Circuit open');
            } else {
                // Try half-open
                circuit.state = this.circuitStates.HALF_OPEN;
                console.log(`🔄 CIRCUIT HALF-OPEN: ${serviceName} - Testing recovery`);
            }
        }
        
        try {
            // Execute operation with timeout
            const result = await Promise.race([
                operation(),
                this.createTimeout(circuit.config.timeout)
            ]);
            
            // Success - record metrics
            this.recordSuccess(circuit, Date.now() - startTime);
            
            // If half-open and successful, close circuit
            if (circuit.state === this.circuitStates.HALF_OPEN) {
                circuit.state = this.circuitStates.CLOSED;
                circuit.failureCount = 0;
                console.log(`✅ CIRCUIT CLOSED: ${serviceName} - Service recovered`);
            }
            
            return result;
            
        } catch (error) {
            // Failure - record and check threshold
            this.recordFailure(circuit, error, Date.now() - startTime);
            
            if (circuit.failureCount >= circuit.config.failureThreshold) {
                this.openCircuit(circuit);
            }
            
            return this.executeFallback(fallback, error.message);
        }
    }

    /**
     * 💉 Inject faults for testing
     */
    injectFault(serviceName, faultType, duration = 30000, intensity = 1.0) {
        console.log(`💉 FAULT INJECTION: ${faultType} on ${serviceName} for ${duration}ms`);
        
        const fault = {
            serviceName,
            faultType,
            startTime: Date.now(),
            duration,
            intensity,
            active: true
        };
        
        this.faultScenarios.push(fault);
        
        // Automatically remove fault after duration
        setTimeout(() => {
            fault.active = false;
            console.log(`🩹 FAULT CLEARED: ${faultType} on ${serviceName}`);
        }, duration);
        
        return fault;
    }

    /**
     * 🧪 Run comprehensive fault injection tests
     */
    async runFaultInjectionSuite(services = []) {
        console.log('🧪 FAULT INJECTION SUITE: Testing system resilience...');
        
        const testResults = [];
        
        // Test each fault type
        for (const faultType of Object.keys(this.faultTypes)) {
            console.log(`\n🔬 Testing: ${faultType}`);
            
            for (const serviceName of services) {
                const circuit = this.circuits.get(serviceName);
                if (!circuit) continue;
                
                // Inject fault
                const fault = this.injectFault(serviceName, faultType, 10000, 0.8);
                
                // Test circuit behavior
                const testResult = await this.testCircuitUnderFault(serviceName, fault);
                testResults.push(testResult);
                
                // Wait for recovery
                await this.sleep(5000);
            }
        }
        
        console.log('\n📊 FAULT INJECTION COMPLETE');
        this.generateFaultReport(testResults);
        
        return testResults;
    }

    /**
     * 🧬 Test circuit behavior under specific fault
     */
    async testCircuitUnderFault(serviceName, fault) {
        const circuit = this.circuits.get(serviceName);
        const testStartTime = Date.now();
        
        let requestCount = 0;
        let successCount = 0;
        let failureCount = 0;
        let fallbackCount = 0;
        
        // Simulate requests during fault
        const testDuration = fault.duration;
        const requestInterval = 1000; // 1 request per second
        
        const testOperation = async () => {
            if (Math.random() < fault.intensity) {
                // Simulate fault
                throw new Error(`Simulated ${fault.faultType}`);
            }
            return { success: true, data: 'Operation succeeded' };
        };
        
        const fallback = () => ({ fallback: true, data: 'Fallback response' });
        
        while (Date.now() - testStartTime < testDuration) {
            try {
                requestCount++;
                const result = await this.executeWithCircuit(serviceName, testOperation, fallback);
                
                if (result.fallback) {
                    fallbackCount++;
                } else {
                    successCount++;
                }
            } catch (error) {
                failureCount++;
            }
            
            await this.sleep(requestInterval);
        }
        
        return {
            serviceName,
            faultType: fault.faultType,
            duration: testDuration,
            requestCount,
            successCount,
            failureCount,
            fallbackCount,
            circuitState: circuit.state,
            recoveryTime: this.calculateRecoveryTime(circuit, testStartTime)
        };
    }

    /**
     * 🩺 Start monitoring circuit health
     */
    startCircuitMonitoring(serviceName) {
        const circuit = this.circuits.get(serviceName);
        
        setInterval(() => {
            const metrics = {
                timestamp: Date.now(),
                serviceName,
                state: circuit.state,
                failureCount: circuit.failureCount,
                successCount: circuit.successCount,
                requestCount: circuit.requestCount,
                errorRate: circuit.requestCount > 0 ? 
                    (circuit.failureCount / circuit.requestCount) * 100 : 0
            };
            
            this.monitoringData.push(metrics);
            
            // Emit monitoring event
            this.emit('metrics', metrics);
            
            // Keep only recent data
            const cutoff = Date.now() - (24 * 60 * 60 * 1000); // 24 hours
            this.monitoringData = this.monitoringData.filter(m => m.timestamp > cutoff);
            
        }, circuit.config.healthCheckInterval);
    }

    /**
     * 📊 Generate comprehensive fault tolerance report
     */
    generateFaultReport(testResults) {
        console.log('\n📊 FAULT TOLERANCE ANALYSIS');
        console.log('═'.repeat(60));
        
        const report = {
            summary: {
                totalTests: testResults.length,
                servicesTestedSet: new Set(testResults.map(r => r.serviceName)).size,
                faultTypesTestedSet: new Set(testResults.map(r => r.faultType)).size,
                totalRequests: testResults.reduce((sum, r) => sum + r.requestCount, 0),
                totalFallbacks: testResults.reduce((sum, r) => sum + r.fallbackCount, 0),
                averageRecoveryTime: this.calculateAverageRecoveryTime(testResults)
            },
            byService: {},
            byFaultType: {},
            recommendations: []
        };
        
        // Group by service
        testResults.forEach(result => {
            if (!report.byService[result.serviceName]) {
                report.byService[result.serviceName] = [];
            }
            report.byService[result.serviceName].push(result);
        });
        
        // Group by fault type
        testResults.forEach(result => {
            if (!report.byFaultType[result.faultType]) {
                report.byFaultType[result.faultType] = [];
            }
            report.byFaultType[result.faultType].push(result);
        });
        
        // Generate recommendations
        testResults.forEach(result => {
            const failureRate = result.failureCount / result.requestCount;
            const fallbackRate = result.fallbackCount / result.requestCount;
            
            if (failureRate > 0.1) {
                report.recommendations.push(
                    `🚨 ${result.serviceName}: High failure rate (${(failureRate * 100).toFixed(1)}%) under ${result.faultType}`
                );
            }
            
            if (fallbackRate < 0.5 && result.failureCount > 0) {
                report.recommendations.push(
                    `⚠️  ${result.serviceName}: Low fallback coverage (${(fallbackRate * 100).toFixed(1)}%) for ${result.faultType}`
                );
            }
            
            if (result.recoveryTime > 60000) {
                report.recommendations.push(
                    `🐌 ${result.serviceName}: Slow recovery (${result.recoveryTime}ms) from ${result.faultType}`
                );
            }
        });
        
        if (report.recommendations.length === 0) {
            report.recommendations.push('✅ All services demonstrate excellent fault tolerance');
        }
        
        // Display summary
        console.log(`Tests executed: ${report.summary.totalTests}`);
        console.log(`Services tested: ${report.summary.servicesTestedSet}`);
        console.log(`Fault types: ${report.summary.faultTypesTestedSet}`);
        console.log(`Total requests: ${report.summary.totalRequests}`);
        console.log(`Fallback activations: ${report.summary.totalFallbacks}`);
        console.log(`Average recovery time: ${report.summary.averageRecoveryTime}ms`);
        
        console.log('\n🔧 RECOMMENDATIONS:');
        report.recommendations.forEach(rec => console.log(`  ${rec}`));
        
        // Save report
        const reportFile = `circuit-breaker-report-${Date.now()}.json`;
        fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
        console.log(`\n✅ Report saved: ${reportFile}`);
        
        return report;
    }

    // Helper methods
    recordSuccess(circuit, responseTime) {
        circuit.successCount++;
        circuit.requestCount++;
        
        // Reset failure count on success in half-open state
        if (circuit.state === this.circuitStates.HALF_OPEN) {
            circuit.failureCount = 0;
        }
    }

    recordFailure(circuit, error, responseTime) {
        circuit.failureCount++;
        circuit.requestCount++;
        circuit.lastFailureTime = Date.now();
        
        console.log(`❌ FAILURE: ${circuit.name} - ${error.message} (${responseTime}ms)`);
    }

    openCircuit(circuit) {
        circuit.state = this.circuitStates.OPEN;
        circuit.nextAttemptTime = Date.now() + circuit.config.resetTimeout;
        
        console.log(`🚨 CIRCUIT OPENED: ${circuit.name} - Threshold exceeded (${circuit.failureCount})`);
        
        this.emit('circuitOpened', circuit);
    }

    async executeFallback(fallback, reason) {
        if (fallback) {
            console.log(`🔄 FALLBACK EXECUTED: ${reason}`);
            return typeof fallback === 'function' ? await fallback() : fallback;
        } else {
            throw new Error(`Service unavailable: ${reason}`);
        }
    }

    createTimeout(ms) {
        return new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Request timeout')), ms);
        });
    }

    calculateRecoveryTime(circuit, testStartTime) {
        // Calculate time from circuit open to close
        if (circuit.state === this.circuitStates.CLOSED && circuit.lastFailureTime > testStartTime) {
            return Date.now() - circuit.lastFailureTime;
        }
        return null;
    }

    calculateAverageRecoveryTime(testResults) {
        const recoveryTimes = testResults
            .map(r => r.recoveryTime)
            .filter(t => t !== null);
        
        return recoveryTimes.length > 0 ? 
            recoveryTimes.reduce((sum, t) => sum + t, 0) / recoveryTimes.length : 0;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// CLI Interface
async function main() {
    const lab = new CircuitBreakerLab();
    const args = process.argv.slice(2);
    const command = args[0];

    console.log('⚡ OncoVista API Circuit Breaker Laboratory');
    console.log('═'.repeat(50));

    switch (command) {
        case 'create-circuits':
            // Create circuits for OncoVista services
            lab.createCircuit('patient-service', { failureThreshold: 3, timeout: 5000 });
            lab.createCircuit('treatment-service', { failureThreshold: 5, timeout: 8000 });
            lab.createCircuit('medication-service', { failureThreshold: 3, timeout: 3000 });
            lab.createCircuit('analytics-service', { failureThreshold: 10, timeout: 15000 });
            lab.createCircuit('auth-service', { failureThreshold: 2, timeout: 2000 });
            
            console.log('✅ Circuit breakers created for OncoVista services');
            break;

        case 'test-suite':
            // Create circuits first
            const services = ['patient-service', 'treatment-service', 'medication-service'];
            services.forEach(service => {
                lab.createCircuit(service, { failureThreshold: 3, timeout: 5000 });
            });
            
            // Run fault injection tests
            await lab.runFaultInjectionSuite(services);
            break;

        case 'monitor':
            // Start monitoring mode
            lab.createCircuit('test-service');
            
            lab.on('metrics', (metrics) => {
                if (metrics.requestCount % 10 === 0) { // Log every 10 requests
                    console.log(`📊 ${metrics.serviceName}: ${metrics.state} - Error rate: ${metrics.errorRate.toFixed(1)}%`);
                }
            });
            
            lab.on('circuitOpened', (circuit) => {
                console.log(`🚨 ALERT: Circuit opened for ${circuit.name}`);
            });
            
            console.log('🩺 Monitoring started. Press Ctrl+C to stop.');
            
            // Keep process alive
            setInterval(() => {}, 1000);
            break;

        case 'inject-fault':
            const serviceName = args[1] || 'test-service';
            const faultType = args[2] || 'NETWORK_TIMEOUT';
            const duration = parseInt(args[3]) || 30000;
            
            lab.createCircuit(serviceName);
            lab.injectFault(serviceName, faultType, duration);
            
            console.log(`💉 Fault injected: ${faultType} on ${serviceName} for ${duration}ms`);
            break;

        default:
            console.log(`
Usage: circuit_breaker.js <command> [options]

Commands:
  create-circuits                    ⚡ Create circuit breakers for OncoVista services
  test-suite                         🧪 Run comprehensive fault injection tests
  monitor                            🩺 Start monitoring mode
  inject-fault <service> <type> <ms> 💉 Inject specific fault

Fault Types:
  NETWORK_TIMEOUT, SERVICE_UNAVAILABLE, DATABASE_CONNECTION,
  RATE_LIMIT_EXCEEDED, MEMORY_EXHAUSTION, DISK_FULL,
  AUTH_SERVICE_DOWN, THIRD_PARTY_API_DOWN

Examples:
  ./circuit_breaker.js create-circuits
  ./circuit_breaker.js test-suite
  ./circuit_breaker.js inject-fault patient-service NETWORK_TIMEOUT 60000
            `);
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = CircuitBreakerLab;
