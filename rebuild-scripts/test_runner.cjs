#!/usr/bin/env node
/**
 * OncoVista Resurrection Toolkit - Master Test Runner
 * Execute all forensic reconstruction tests
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class ResurrectionTestRunner {
    constructor() {
        this.testSuites = [
            {
                name: 'Schema Evolution Tests',
                script: './schema_evolver/migration_generator.py',
                type: 'python',
                critical: true
            },
            {
                name: 'Secret Rotation Tests',
                script: './secret_rotator/secret_rotator.js',
                type: 'node',
                critical: true
            },
            {
                name: 'Mutation Testing',
                script: './mutation_tests/mutation_tester.js',
                type: 'node',
                critical: false
            },
            {
                name: 'API Circuit Breaker',
                script: './api_circuit_breaker/circuit_breaker.js',
                type: 'node',
                critical: false
            },
            {
                name: 'UI Component DNA',
                script: './ui_component_dna/component_dna.js',
                type: 'node',
                critical: false
            },
            {
                name: 'Swagger Generation',
                script: './swagger_from_code/swagger_generator.js',
                type: 'node',
                critical: false
            },
            {
                name: 'ERD Live Generation',
                script: './ERD_Live/erd_generator.js',
                type: 'node',
                critical: false
            }
        ];
        
        this.results = [];
    }

    /**
     * 🧪 Run all test suites
     */
    async runAllTests() {
        console.log('🧪 RESURRECTION TEST RUNNER: Starting forensic validation...\n');
        
        for (const suite of this.testSuites) {
            console.log(`\n🔬 Testing: ${suite.name}`);
            console.log(`   Script: ${suite.script}`);
            console.log(`   Type: ${suite.type}`);
            console.log(`   Critical: ${suite.critical ? '🔴 YES' : '🟡 NO'}`);
            
            try {
                const result = await this.runTestSuite(suite);
                this.results.push({
                    suite: suite.name,
                    success: result.success,
                    output: result.output,
                    error: result.error,
                    duration: result.duration
                });
                
                if (result.success) {
                    console.log(`   ✅ PASSED`);
                } else {
                    console.log(`   ❌ FAILED: ${result.error}`);
                    if (suite.critical) {
                        console.log(`   🚨 CRITICAL FAILURE - Test execution halted`);
                        break;
                    }
                }
                
            } catch (error) {
                console.log(`   💀 EXCEPTION: ${error.message}`);
                this.results.push({
                    suite: suite.name,
                    success: false,
                    error: error.message,
                    duration: 0
                });
            }
        }
        
        this.generateReport();
    }

    /**
     * 🏃 Execute individual test suite
     */
    async runTestSuite(suite) {
        const startTime = Date.now();
        
        return new Promise((resolve) => {
            const scriptPath = path.join(__dirname, suite.script);
            
            // Check if script exists
            if (!fs.existsSync(scriptPath)) {
                resolve({
                    success: false,
                    error: `Script not found: ${scriptPath}`,
                    duration: Date.now() - startTime
                });
                return;
            }
            
            const command = suite.type === 'python' ? 'python3' : 'node';
            const child = spawn(command, [scriptPath], {
                stdio: ['pipe', 'pipe', 'pipe'],
                cwd: __dirname
            });
            
            let output = '';
            let error = '';
            
            child.stdout.on('data', (data) => {
                output += data.toString();
            });
            
            child.stderr.on('data', (data) => {
                error += data.toString();
            });
            
            child.on('close', (code) => {
                resolve({
                    success: code === 0,
                    output: output,
                    error: error || (code !== 0 ? `Exit code: ${code}` : null),
                    duration: Date.now() - startTime
                });
            });
            
            // Timeout after 5 minutes
            setTimeout(() => {
                child.kill('SIGTERM');
                resolve({
                    success: false,
                    error: 'Test timeout (5 minutes)',
                    duration: Date.now() - startTime
                });
            }, 300000);
        });
    }

    /**
     * 📊 Generate comprehensive test report
     */
    generateReport() {
        console.log('\n' + '='.repeat(80));
        console.log('🧪 RESURRECTION TOOLKIT - TEST EXECUTION REPORT');
        console.log('='.repeat(80));
        
        const passed = this.results.filter(r => r.success).length;
        const failed = this.results.filter(r => !r.success).length;
        const total = this.results.length;
        
        console.log(`\n📊 SUMMARY:`);
        console.log(`   Total Tests: ${total}`);
        console.log(`   Passed: ${passed} (${((passed/total)*100).toFixed(1)}%)`);
        console.log(`   Failed: ${failed} (${((failed/total)*100).toFixed(1)}%)`);
        
        console.log(`\n📋 DETAILED RESULTS:`);
        this.results.forEach((result, index) => {
            const status = result.success ? '✅ PASS' : '❌ FAIL';
            const duration = `${result.duration}ms`;
            
            console.log(`   ${index + 1}. ${result.suite}`);
            console.log(`      Status: ${status}`);
            console.log(`      Duration: ${duration}`);
            if (result.error) {
                console.log(`      Error: ${result.error}`);
            }
            console.log('');
        });
        
        // Save report to file
        const reportData = {
            timestamp: new Date().toISOString(),
            summary: { total, passed, failed },
            results: this.results
        };
        
        fs.writeFileSync(
            path.join(__dirname, 'test_report.json'), 
            JSON.stringify(reportData, null, 2)
        );
        
        console.log(`📄 Full report saved to: test_report.json`);
        
        if (failed === 0) {
            console.log('\n🎉 ALL TESTS PASSED - Resurrection toolkit is ready!');
        } else {
            console.log(`\n⚠️  ${failed} test(s) failed - Review and fix before deployment`);
        }
    }

    /**
     * 🔧 Validate environment before running tests
     */
    validateEnvironment() {
        console.log('🔧 ENVIRONMENT VALIDATION:');
        
        const requirements = [
            { command: 'node --version', name: 'Node.js' },
            { command: 'python3 --version', name: 'Python 3' },
            { command: 'npm --version', name: 'NPM' }
        ];
        
        for (const req of requirements) {
            try {
                const version = execSync(req.command, { encoding: 'utf8' }).trim();
                console.log(`   ✅ ${req.name}: ${version}`);
            } catch (error) {
                console.log(`   ❌ ${req.name}: Not found or failed`);
                return false;
            }
        }
        
        return true;
    }
}

// Execute if run directly
if (require.main === module) {
    const runner = new ResurrectionTestRunner();
    
    if (runner.validateEnvironment()) {
        runner.runAllTests().catch(console.error);
    } else {
        console.log('\n❌ Environment validation failed. Please install missing dependencies.');
        process.exit(1);
    }
}

module.exports = ResurrectionTestRunner;
