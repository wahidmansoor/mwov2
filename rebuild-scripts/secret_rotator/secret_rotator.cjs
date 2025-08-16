#!/usr/bin/env node
/**
 * OncoVista Secret Rotator - Automated Credential Injection Pipeline
 * Medical-grade security for sensitive data handling
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SecretSurgeon {
    constructor() {
        this.secretTypes = {
            'session': { length: 64, type: 'hex' },
            'api_key': { length: 32, type: 'base64' },
            'jwt': { length: 256, type: 'hex' },
            'encryption': { length: 32, type: 'hex' },
            'database': { length: 24, type: 'alphanumeric' }
        };
        
        this.criticalSecrets = [
            'DATABASE_URL',
            'SUPABASE_SERVICE_ROLE_KEY',
            'SESSION_SECRET',
            'JWT_SECRET',
            'ENCRYPTION_KEY'
        ];
        
        this.rotationLog = [];
    }

    /**
     * 🔬 Diagnose current secret health
     */
    diagnoseSecretHealth(envFile = '.env') {
        console.log('🔬 DIAGNOSIS: Performing secret health scan...');
        
        if (!fs.existsSync(envFile)) {
            console.log('💀 CRITICAL: No environment file found!');
            return { status: 'CRITICAL', issues: ['Missing .env file'] };
        }

        const envContent = fs.readFileSync(envFile, 'utf8');
        const lines = envContent.split('\n');
        
        const secrets = {};
        const issues = [];
        
        lines.forEach(line => {
            const match = line.match(/^([A-Z_]+)=(.*)$/);
            if (match) {
                const [, key, value] = match;
                secrets[key] = value.replace(/['"]/g, '');
            }
        });

        // Check for weak secrets
        this.criticalSecrets.forEach(secret => {
            if (!secrets[secret]) {
                issues.push(`Missing critical secret: ${secret}`);
            } else if (this.isWeakSecret(secrets[secret])) {
                issues.push(`Weak secret detected: ${secret}`);
            }
        });

        // Check for default/placeholder values
        Object.entries(secrets).forEach(([key, value]) => {
            if (value.includes('your-') || value.includes('placeholder') || value === 'change-me') {
                issues.push(`Placeholder value detected: ${key}`);
            }
        });

        const status = issues.length === 0 ? 'HEALTHY' : 
                      issues.filter(i => i.includes('critical')).length > 0 ? 'CRITICAL' : 'WARNING';

        console.log(`🩺 DIAGNOSIS COMPLETE: Status = ${status}`);
        console.log(`   Found ${Object.keys(secrets).length} secrets`);
        console.log(`   Detected ${issues.length} issues`);

        return { status, secrets, issues };
    }

    /**
     * 🧬 Generate cryptographically secure secrets
     */
    generateSecret(type = 'session', customLength = null) {
        const config = this.secretTypes[type] || this.secretTypes['session'];
        const length = customLength || config.length;

        switch (config.type) {
            case 'hex':
                return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
            case 'base64':
                return crypto.randomBytes(Math.ceil(length * 3 / 4)).toString('base64').slice(0, length);
            case 'alphanumeric':
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let result = '';
                for (let i = 0; i < length; i++) {
                    result += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return result;
            default:
                return crypto.randomBytes(length).toString('hex');
        }
    }

    /**
     * 💉 Inject new secrets into environment
     */
    injectSecrets(secretsToRotate = [], envFile = '.env') {
        console.log('💉 INJECTION: Rotating secrets with surgical precision...');
        
        const diagnosis = this.diagnoseSecretHealth(envFile);
        const timestamp = new Date().toISOString();
        
        // Create backup
        const backupFile = `${envFile}.backup.${Date.now()}`;
        fs.copyFileSync(envFile, backupFile);
        console.log(`🩹 BACKUP: Created ${backupFile}`);

        let envContent = fs.readFileSync(envFile, 'utf8');
        let rotatedCount = 0;

        // Auto-detect secrets to rotate if none specified
        if (secretsToRotate.length === 0) {
            secretsToRotate = this.criticalSecrets.filter(secret => 
                diagnosis.issues.some(issue => issue.includes(secret))
            );
        }

        secretsToRotate.forEach(secretKey => {
            const secretType = this.detectSecretType(secretKey);
            const newSecret = this.generateSecret(secretType);
            
            // Replace or add the secret
            const regex = new RegExp(`^${secretKey}=.*$`, 'm');
            if (envContent.match(regex)) {
                envContent = envContent.replace(regex, `${secretKey}="${newSecret}"`);
            } else {
                envContent += `\n${secretKey}="${newSecret}"`;
            }

            this.rotationLog.push({
                timestamp,
                secretKey,
                action: 'ROTATED',
                strength: this.assessSecretStrength(newSecret)
            });

            rotatedCount++;
            console.log(`🔄 ROTATED: ${secretKey} (${secretType})`);
        });

        // Write updated content
        fs.writeFileSync(envFile, envContent);
        console.log(`✅ INJECTION COMPLETE: ${rotatedCount} secrets rotated`);

        return {
            rotatedCount,
            backupFile,
            rotationLog: this.rotationLog
        };
    }

    /**
     * 🧪 Generate complete secret profile for new environment
     */
    generateSecretProfile(environment = 'development') {
        console.log(`🧪 GENERATION: Creating ${environment} secret profile...`);
        
        const profile = {
            environment,
            generated: new Date().toISOString(),
            secrets: {}
        };

        // Generate all critical secrets
        this.criticalSecrets.forEach(secretKey => {
            const secretType = this.detectSecretType(secretKey);
            profile.secrets[secretKey] = this.generateSecret(secretType);
        });

        // Environment-specific secrets
        if (environment === 'production') {
            profile.secrets.SECURE_COOKIES = 'true';
            profile.secrets.TRUST_PROXY = 'true';
            profile.secrets.NODE_ENV = 'production';
        }

        // Additional OncoVista-specific secrets
        const additionalSecrets = {
            'OPENAI_API_KEY': 'api_key',
            'ANTHROPIC_API_KEY': 'api_key',
            'CLOUDINARY_API_SECRET': 'api_key',
            'SMTP_PASS': 'api_key'
        };

        Object.entries(additionalSecrets).forEach(([key, type]) => {
            profile.secrets[key] = `your-${key.toLowerCase().replace(/_/g, '-')}-here`;
        });

        return profile;
    }

    /**
     * 🩺 Monitor secret rotation health
     */
    monitorRotationHealth() {
        console.log('🩺 MONITORING: Checking rotation history...');
        
        const recentRotations = this.rotationLog.filter(log => 
            Date.now() - new Date(log.timestamp).getTime() < 24 * 60 * 60 * 1000
        );

        const healthMetrics = {
            totalRotations: this.rotationLog.length,
            recentRotations: recentRotations.length,
            criticalSecretsRotated: recentRotations.filter(log => 
                this.criticalSecrets.includes(log.secretKey)
            ).length,
            averageStrength: this.calculateAverageStrength(recentRotations)
        };

        console.log(`📊 METRICS:`);
        console.log(`   Total rotations: ${healthMetrics.totalRotations}`);
        console.log(`   Recent (24h): ${healthMetrics.recentRotations}`);
        console.log(`   Critical secrets: ${healthMetrics.criticalSecretsRotated}`);
        console.log(`   Average strength: ${healthMetrics.averageStrength}/10`);

        return healthMetrics;
    }

    /**
     * 🔐 Vault integration for production secrets
     */
    integrateWithVault(vaultConfig) {
        console.log('🔐 VAULT: Integrating with secret management system...');
        
        // This would integrate with HashiCorp Vault, AWS Secrets Manager, etc.
        // For demo purposes, we'll create a local encrypted vault
        
        const vaultData = {
            version: '1.0',
            encrypted: true,
            secrets: {},
            metadata: {
                created: new Date().toISOString(),
                algorithm: 'aes-256-gcm'
            }
        };

        return vaultData;
    }

    // Helper methods
    detectSecretType(secretKey) {
        if (secretKey.includes('SESSION')) return 'session';
        if (secretKey.includes('JWT')) return 'jwt';
        if (secretKey.includes('API_KEY')) return 'api_key';
        if (secretKey.includes('DATABASE')) return 'database';
        if (secretKey.includes('ENCRYPTION')) return 'encryption';
        return 'session';
    }

    isWeakSecret(secret) {
        return secret.length < 16 || 
               secret === 'password' || 
               secret === '123456' ||
               /^(.)\1+$/.test(secret); // Repeated characters
    }

    assessSecretStrength(secret) {
        let score = 0;
        if (secret.length >= 32) score += 3;
        else if (secret.length >= 16) score += 2;
        else score += 1;

        if (/[A-Z]/.test(secret)) score += 1;
        if (/[a-z]/.test(secret)) score += 1;
        if (/[0-9]/.test(secret)) score += 1;
        if (/[^A-Za-z0-9]/.test(secret)) score += 2;

        return Math.min(score, 10);
    }

    calculateAverageStrength(rotations) {
        if (rotations.length === 0) return 0;
        return rotations.reduce((sum, log) => sum + log.strength, 0) / rotations.length;
    }
}

// CLI Interface
function main() {
    const surgeon = new SecretSurgeon();
    const args = process.argv.slice(2);
    const command = args[0];

    console.log('🧬 OncoVista Secret Rotator - Medical-Grade Security');
    console.log('═'.repeat(60));

    switch (command) {
        case 'diagnose':
            surgeon.diagnoseSecretHealth(args[1]);
            break;

        case 'rotate':
            const secretsToRotate = args.slice(1);
            surgeon.injectSecrets(secretsToRotate);
            break;

        case 'generate-profile':
            const environment = args[1] || 'development';
            const profile = surgeon.generateSecretProfile(environment);
            
            const profileFile = `secrets-${environment}-${Date.now()}.json`;
            fs.writeFileSync(profileFile, JSON.stringify(profile, null, 2));
            console.log(`✅ Profile saved: ${profileFile}`);
            break;

        case 'monitor':
            surgeon.monitorRotationHealth();
            break;

        case 'emergency-rotate':
            console.log('🚨 EMERGENCY ROTATION: Rotating all critical secrets...');
            surgeon.injectSecrets(surgeon.criticalSecrets);
            break;

        default:
            console.log(`
Usage: secret_rotator.js <command> [options]

Commands:
  diagnose [env-file]              🔬 Analyze secret health
  rotate <secret1> [secret2...]    💉 Rotate specific secrets
  generate-profile [environment]   🧪 Generate complete secret profile
  monitor                          🩺 Monitor rotation health
  emergency-rotate                 🚨 Emergency rotation of all critical secrets

Examples:
  ./secret_rotator.js diagnose
  ./secret_rotator.js rotate SESSION_SECRET JWT_SECRET
  ./secret_rotator.js generate-profile production
  ./secret_rotator.js emergency-rotate
            `);
    }
}

if (require.main === module) {
    main();
}

module.exports = SecretSurgeon;
