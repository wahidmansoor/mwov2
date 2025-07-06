#!/usr/bin/env node
/**
 * OncoVista Secret Rotator Test Suite
 * Validate secret rotation and security mechanisms
 */

const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Import the secret rotator
const SecretRotator = require('./secret_rotator.cjs');

class SecretRotatorTestSuite {
    constructor() {
        this.tests = [];
        this.results = [];
        this.rotator = new SecretRotator();
    }

    /**
     * 🧪 Test secret generation
     */
    testSecretGeneration() {
        console.log('🔐 Testing secret generation...');
        
        // Test API key generation
        const apiKey = this.rotator.generateApiKey();
        assert(typeof apiKey === 'string', 'API key should be string');
        assert(apiKey.length === 64, 'API key should be 64 characters');
        assert(/^[a-f0-9]+$/.test(apiKey), 'API key should be hexadecimal');
        
        // Test JWT secret generation
        const jwtSecret = this.rotator.generateJwtSecret();
        assert(typeof jwtSecret === 'string', 'JWT secret should be string');
        assert(jwtSecret.length >= 32, 'JWT secret should be at least 32 characters');
        
        // Test database password generation
        const dbPassword = this.rotator.generateDatabasePassword();
        assert(typeof dbPassword === 'string', 'DB password should be string');
        assert(dbPassword.length >= 16, 'DB password should be at least 16 characters');
        assert(/[A-Z]/.test(dbPassword), 'DB password should contain uppercase');
        assert(/[a-z]/.test(dbPassword), 'DB password should contain lowercase');
        assert(/[0-9]/.test(dbPassword), 'DB password should contain numbers');
        assert(/[!@#$%^&*]/.test(dbPassword), 'DB password should contain special chars');
        
        console.log('   ✅ Secret generation tests passed');
        return true;
    }

    /**
     * 🔄 Test secret rotation workflow
     */
    testSecretRotation() {
        console.log('🔄 Testing secret rotation workflow...');
        
        const testSecrets = {
            'DATABASE_URL': 'postgresql://old:password@localhost:5432/oncovista',
            'JWT_SECRET': 'old-jwt-secret-key',
            'SUPABASE_SERVICE_KEY': 'old-supabase-key'
        };
        
        // Test rotation preparation
        const rotationPlan = this.rotator.prepareRotation(testSecrets);
        assert(Array.isArray(rotationPlan), 'Rotation plan should be array');
        assert(rotationPlan.length > 0, 'Rotation plan should not be empty');
        
        // Test new secret generation
        const newSecrets = this.rotator.generateNewSecrets(testSecrets);
        assert(typeof newSecrets === 'object', 'New secrets should be object');
        assert(newSecrets.DATABASE_URL !== testSecrets.DATABASE_URL, 'DATABASE_URL should be different');
        assert(newSecrets.JWT_SECRET !== testSecrets.JWT_SECRET, 'JWT_SECRET should be different');
        
        console.log('   ✅ Secret rotation tests passed');
        return true;
    }

    /**
     * 🔒 Test encryption/decryption
     */
    testEncryption() {
        console.log('🔒 Testing encryption/decryption...');
        
        const testData = 'sensitive-secret-data-12345';
        const masterKey = crypto.randomBytes(32);
        
        // Test encryption
        const encrypted = this.rotator.encryptSecret(testData, masterKey);
        assert(typeof encrypted === 'object', 'Encrypted data should be object');
        assert(encrypted.iv, 'Encrypted data should have IV');
        assert(encrypted.encryptedData, 'Encrypted data should have encrypted content');
        assert(encrypted.tag, 'Encrypted data should have auth tag');
        
        // Test decryption
        const decrypted = this.rotator.decryptSecret(encrypted, masterKey);
        assert(decrypted === testData, 'Decrypted data should match original');
        
        console.log('   ✅ Encryption/decryption tests passed');
        return true;
    }

    /**
     * 📋 Test configuration file handling
     */
    testConfigFileHandling() {
        console.log('📋 Testing configuration file handling...');
        
        const testEnvContent = `# OncoVista Environment Configuration
DATABASE_URL=postgresql://user:pass@localhost:5432/oncovista
JWT_SECRET=test-jwt-secret
SUPABASE_URL=https://test.supabase.co
SUPABASE_ANON_KEY=test-anon-key
SUPABASE_SERVICE_KEY=test-service-key
OPENAI_API_KEY=sk-test123
ANTHROPIC_API_KEY=sk-ant-test123
SESSION_SECRET=test-session-secret`;
        
        // Test environment parsing
        const parsedEnv = this.rotator.parseEnvironmentFile(testEnvContent);
        assert(typeof parsedEnv === 'object', 'Parsed env should be object');
        assert(parsedEnv.DATABASE_URL, 'Should parse DATABASE_URL');
        assert(parsedEnv.JWT_SECRET, 'Should parse JWT_SECRET');
        
        // Test environment file generation
        const newEnvContent = this.rotator.generateEnvironmentFile(parsedEnv);
        assert(typeof newEnvContent === 'string', 'Generated env should be string');
        assert(newEnvContent.includes('DATABASE_URL='), 'Should include DATABASE_URL');
        assert(newEnvContent.includes('JWT_SECRET='), 'Should include JWT_SECRET');
        
        console.log('   ✅ Configuration file tests passed');
        return true;
    }

    /**
     * ⏰ Test rotation scheduling
     */
    testRotationScheduling() {
        console.log('⏰ Testing rotation scheduling...');
        
        const secrets = {
            'JWT_SECRET': { value: 'test-secret', lastRotated: new Date('2024-01-01') }
        };
        
        // Test rotation schedule calculation
        const schedule = this.rotator.calculateRotationSchedule(secrets);
        assert(Array.isArray(schedule), 'Schedule should be array');
        
        // Test if secrets need rotation (they should, given the old date)
        const needsRotation = this.rotator.checkRotationNeeded(secrets.JWT_SECRET);
        assert(needsRotation === true, 'Old secret should need rotation');
        
        // Test with recent secret
        const recentSecret = { value: 'test-secret', lastRotated: new Date() };
        const recentCheck = this.rotator.checkRotationNeeded(recentSecret);
        assert(recentCheck === false, 'Recent secret should not need rotation');
        
        console.log('   ✅ Rotation scheduling tests passed');
        return true;
    }

    /**
     * 🚨 Test security validation
     */
    testSecurityValidation() {
        console.log('🚨 Testing security validation...');
        
        // Test weak password detection
        const weakPasswords = ['123456', 'password', 'abc123', 'qwerty'];
        const strongPassword = 'K$9mP#2nL@8fR!5vX$3wQ';
        
        weakPasswords.forEach(weak => {
            const isWeak = this.rotator.isWeakSecret(weak);
            assert(isWeak === true, `"${weak}" should be detected as weak`);
        });
        
        const isStrong = this.rotator.isWeakSecret(strongPassword);
        assert(isStrong === false, 'Strong password should not be flagged as weak');
        
        // Test secret entropy calculation
        const entropy = this.rotator.calculateEntropy(strongPassword);
        assert(entropy > 50, 'Strong password should have high entropy');
        
        console.log('   ✅ Security validation tests passed');
        return true;
    }

    /**
     * 🏃 Run all tests
     */
    async runAllTests() {
        console.log('🧪 SECRET ROTATOR TEST SUITE');
        console.log('=' * 40);
        
        const tests = [
            { name: 'Secret Generation', fn: () => this.testSecretGeneration() },
            { name: 'Secret Rotation', fn: () => this.testSecretRotation() },
            { name: 'Encryption/Decryption', fn: () => this.testEncryption() },
            { name: 'Config File Handling', fn: () => this.testConfigFileHandling() },
            { name: 'Rotation Scheduling', fn: () => this.testRotationScheduling() },
            { name: 'Security Validation', fn: () => this.testSecurityValidation() }
        ];
        
        let passed = 0;
        let failed = 0;
        
        for (const test of tests) {
            try {
                const result = test.fn();
                if (result) {
                    passed++;
                } else {
                    failed++;
                    console.log(`   ❌ ${test.name} failed`);
                }
            } catch (error) {
                failed++;
                console.log(`   💀 ${test.name} threw error: ${error.message}`);
            }
        }
        
        console.log(`\n📊 TEST RESULTS:`);
        console.log(`   Total: ${tests.length}`);
        console.log(`   Passed: ${passed}`);
        console.log(`   Failed: ${failed}`);
        console.log(`   Success Rate: ${((passed/tests.length)*100).toFixed(1)}%`);
        
        return failed === 0;
    }
}

// Execute if run directly
if (require.main === module) {
    const testSuite = new SecretRotatorTestSuite();
    testSuite.runAllTests()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('💀 Test suite failed:', error);
            process.exit(1);
        });
}

module.exports = SecretRotatorTestSuite;
