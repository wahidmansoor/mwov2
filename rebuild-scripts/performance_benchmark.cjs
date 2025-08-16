#!/usr/bin/env node
/**
 * OncoVista Resurrection Toolkit - Performance Benchmarking Suite
 * Medical-grade performance testing for critical healthcare systems
 */

const { performance } = require('perf_hooks');
const os = require('os');
const fs = require('fs');
const path = require('path');

class PerformanceBenchmark {
    constructor() {
        this.benchmarks = [];
        this.systemMetrics = {};
        this.thresholds = {
            // Medical-grade performance thresholds
            apiResponse: 200, // ms - Critical for patient data
            dbQuery: 100,     // ms - Database operations
            fileOperation: 50, // ms - File I/O operations
            memoryUsage: 85,   // % - Memory utilization
            cpuUsage: 80      // % - CPU utilization
        };
    }

    /**
     * 📊 Collect system metrics
     */
    collectSystemMetrics() {
        const memUsage = process.memoryUsage();
        const cpuUsage = process.cpuUsage();
        
        this.systemMetrics = {
            timestamp: new Date().toISOString(),
            platform: os.platform(),
            arch: os.arch(),
            nodeVersion: process.version,
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
            usedMemory: memUsage.heapUsed,
            memoryUtilization: ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2),
            cpuCount: os.cpus().length,
            loadAverage: os.loadavg(),
            uptime: os.uptime()
        };
        
        return this.systemMetrics;
    }

    /**
     * ⏱️ Benchmark function execution
     */
    async benchmarkFunction(name, fn, iterations = 1000) {
        console.log(`⏱️  Benchmarking: ${name} (${iterations} iterations)`);
        
        const times = [];
        let errors = 0;
        
        // Warm-up run
        try {
            await fn();
        } catch (error) {
            console.log(`   ⚠️  Warm-up failed: ${error.message}`);
        }
        
        // Actual benchmarking
        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            
            try {
                await fn();
                const end = performance.now();
                times.push(end - start);
            } catch (error) {
                errors++;
                if (errors % 100 === 0) {
                    console.log(`   ⚠️  ${errors} errors so far...`);
                }
            }
        }
        
        if (times.length === 0) {
            console.log(`   ❌ All ${iterations} iterations failed`);
            return null;
        }
        
        // Calculate statistics
        times.sort((a, b) => a - b);
        const stats = {
            name,
            iterations: times.length,
            errors,
            min: times[0],
            max: times[times.length - 1],
            mean: times.reduce((a, b) => a + b, 0) / times.length,
            median: times[Math.floor(times.length / 2)],
            p95: times[Math.floor(times.length * 0.95)],
            p99: times[Math.floor(times.length * 0.99)],
            standardDeviation: this.calculateStandardDeviation(times)
        };
        
        this.benchmarks.push(stats);
        this.printBenchmarkResult(stats);
        
        return stats;
    }

    /**
     * 📈 Calculate standard deviation
     */
    calculateStandardDeviation(values) {
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
        return Math.sqrt(variance);
    }

    /**
     * 🖨️ Print benchmark result
     */
    printBenchmarkResult(stats) {
        console.log(`   📊 Results for ${stats.name}:`);
        console.log(`      Iterations: ${stats.iterations} (${stats.errors} errors)`);
        console.log(`      Min: ${stats.min.toFixed(2)}ms`);
        console.log(`      Max: ${stats.max.toFixed(2)}ms`);
        console.log(`      Mean: ${stats.mean.toFixed(2)}ms`);
        console.log(`      Median: ${stats.median.toFixed(2)}ms`);
        console.log(`      95th percentile: ${stats.p95.toFixed(2)}ms`);
        console.log(`      99th percentile: ${stats.p99.toFixed(2)}ms`);
        console.log(`      Std Dev: ${stats.standardDeviation.toFixed(2)}ms`);
        
        // Performance assessment
        const threshold = this.getThreshold(stats.name);
        if (threshold && stats.p95 > threshold) {
            console.log(`      ⚠️  WARNING: 95th percentile exceeds ${threshold}ms threshold`);
        } else if (threshold) {
            console.log(`      ✅ GOOD: Performance within ${threshold}ms threshold`);
        }
        console.log('');
    }

    /**
     * 🎯 Get performance threshold for operation type
     */
    getThreshold(operationName) {
        const name = operationName.toLowerCase();
        
        if (name.includes('api') || name.includes('request')) {
            return this.thresholds.apiResponse;
        } else if (name.includes('db') || name.includes('database') || name.includes('query')) {
            return this.thresholds.dbQuery;
        } else if (name.includes('file') || name.includes('io')) {
            return this.thresholds.fileOperation;
        }
        
        return null;
    }

    /**
     * 🧪 Run standard benchmark suite
     */
    async runStandardBenchmarks() {
        console.log('🧪 PERFORMANCE BENCHMARK SUITE - OncoVista Toolkit');
        console.log('=' * 60);
        
        this.collectSystemMetrics();
        console.log(`\n🖥️  System Info:`);
        console.log(`   Platform: ${this.systemMetrics.platform} (${this.systemMetrics.arch})`);
        console.log(`   Node.js: ${this.systemMetrics.nodeVersion}`);
        console.log(`   CPUs: ${this.systemMetrics.cpuCount}`);
        console.log(`   Memory: ${(this.systemMetrics.totalMemory / 1024 / 1024 / 1024).toFixed(2)}GB total`);
        console.log(`   Memory Usage: ${this.systemMetrics.memoryUtilization}%`);
        console.log('');
        
        // Benchmark file operations
        await this.benchmarkFunction('File Read Operation', async () => {
            return new Promise((resolve) => {
                fs.readFile(__filename, 'utf8', (err, data) => {
                    resolve(data);
                });
            });
        }, 500);
        
        // Benchmark JSON operations
        await this.benchmarkFunction('JSON Parse/Stringify', async () => {
            const data = { 
                patient: { id: 123, name: 'John Doe', treatments: Array(100).fill().map((_, i) => ({ id: i, name: `Treatment ${i}` })) }
            };
            const json = JSON.stringify(data);
            return JSON.parse(json);
        }, 1000);
        
        // Benchmark async operations
        await this.benchmarkFunction('Async Timer Operation', async () => {
            return new Promise(resolve => setTimeout(resolve, 1));
        }, 100);
        
        // Benchmark array operations
        await this.benchmarkFunction('Array Processing (1000 items)', async () => {
            const arr = Array(1000).fill().map((_, i) => ({ id: i, value: Math.random() }));
            return arr
                .filter(item => item.value > 0.5)
                .map(item => ({ ...item, processed: true }))
                .sort((a, b) => a.value - b.value);
        }, 500);
        
        // Benchmark string operations
        await this.benchmarkFunction('String Manipulation', async () => {
            let str = 'OncoVista Medical System '.repeat(100);
            str = str.toUpperCase();
            str = str.replace(/SYSTEM/g, 'PLATFORM');
            return str.split(' ').filter(word => word.length > 5).join('-');
        }, 1000);
        
        // Benchmark crypto operations (simulating password hashing)
        const crypto = require('crypto');
        await this.benchmarkFunction('Crypto Hash Operation', async () => {
            return crypto.createHash('sha256').update('patient-data-' + Math.random()).digest('hex');
        }, 500);
        
        this.generatePerformanceReport();
    }

    /**
     * 📊 Generate comprehensive performance report
     */
    generatePerformanceReport() {
        console.log('📊 PERFORMANCE ANALYSIS REPORT');
        console.log('=' * 50);
        
        const report = {
            timestamp: new Date().toISOString(),
            systemMetrics: this.systemMetrics,
            benchmarks: this.benchmarks,
            summary: this.generateSummary()
        };
        
        // Performance summary
        console.log('\n🎯 PERFORMANCE SUMMARY:');
        const fastOperations = this.benchmarks.filter(b => b.p95 < 50).length;
        const slowOperations = this.benchmarks.filter(b => b.p95 > 200).length;
        
        console.log(`   Fast Operations (< 50ms): ${fastOperations}`);
        console.log(`   Slow Operations (> 200ms): ${slowOperations}`);
        console.log(`   Average P95 Latency: ${(this.benchmarks.reduce((sum, b) => sum + b.p95, 0) / this.benchmarks.length).toFixed(2)}ms`);
        
        // Critical path analysis
        console.log('\n🚨 CRITICAL PATH ANALYSIS:');
        const criticalOps = this.benchmarks.filter(b => {
            const threshold = this.getThreshold(b.name);
            return threshold && b.p95 > threshold;
        });
        
        if (criticalOps.length === 0) {
            console.log('   ✅ All operations within acceptable thresholds');
        } else {
            console.log(`   ⚠️  ${criticalOps.length} operations exceed performance thresholds:`);
            criticalOps.forEach(op => {
                console.log(`      - ${op.name}: ${op.p95.toFixed(2)}ms (threshold: ${this.getThreshold(op.name)}ms)`);
            });
        }
        
        // Recommendations
        console.log('\n💡 PERFORMANCE RECOMMENDATIONS:');
        if (slowOperations > 0) {
            console.log('   🔧 Consider optimizing slow operations with caching or async processing');
        }
        if (parseFloat(this.systemMetrics.memoryUtilization) > 80) {
            console.log('   🧠 High memory usage detected - consider memory optimization');
        }
        if (this.systemMetrics.loadAverage[0] > this.systemMetrics.cpuCount) {
            console.log('   ⚡ High CPU load detected - consider load balancing');
        }
        if (criticalOps.length === 0 && slowOperations === 0) {
            console.log('   ✅ System performance is optimal for medical-grade operations');
        }
        
        // Save detailed report
        const reportPath = path.join(__dirname, 'performance_report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`\n📄 Detailed report saved to: ${reportPath}`);
        
        return report;
    }

    /**
     * 📈 Generate performance summary
     */
    generateSummary() {
        if (this.benchmarks.length === 0) return null;
        
        const p95Values = this.benchmarks.map(b => b.p95);
        const meanValues = this.benchmarks.map(b => b.mean);
        
        return {
            totalBenchmarks: this.benchmarks.length,
            averageP95: p95Values.reduce((a, b) => a + b, 0) / p95Values.length,
            averageMean: meanValues.reduce((a, b) => a + b, 0) / meanValues.length,
            fastestOperation: this.benchmarks.reduce((min, b) => b.p95 < min.p95 ? b : min),
            slowestOperation: this.benchmarks.reduce((max, b) => b.p95 > max.p95 ? b : max),
            memoryUtilization: parseFloat(this.systemMetrics.memoryUtilization),
            systemLoad: this.systemMetrics.loadAverage[0]
        };
    }
}

// Execute if run directly
if (require.main === module) {
    const benchmark = new PerformanceBenchmark();
    benchmark.runStandardBenchmarks()
        .then(() => {
            console.log('\n🎉 Performance benchmarking completed successfully!');
            process.exit(0);
        })
        .catch(error => {
            console.error('💀 Benchmarking failed:', error);
            process.exit(1);
        });
}

module.exports = PerformanceBenchmark;
