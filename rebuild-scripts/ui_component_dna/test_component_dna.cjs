#!/usr/bin/env node
/**
 * OncoVista Component DNA Analyzer Test Suite
 * Validate UI component extraction and analysis
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Import the component DNA analyzer
const ComponentDNAAnalyzer = require('./component_dna.cjs');

class ComponentDNATestSuite {
    constructor() {
        this.analyzer = new ComponentDNAAnalyzer();
        this.testComponents = this.createTestComponents();
    }

    /**
     * 🧬 Create test components for analysis
     */
    createTestComponents() {
        return {
            // React functional component
            reactComponent: `
import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from 'antd';

const PatientCard = ({ patient, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(patient.name);

    useEffect(() => {
        setName(patient.name);
    }, [patient.name]);

    const handleSave = async () => {
        try {
            await onUpdate(patient.id, { name });
            setEditing(false);
        } catch (error) {
            console.error('Failed to update patient:', error);
        }
    };

    return (
        <Card title="Patient Information" className="patient-card">
            {editing ? (
                <div>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={() => setEditing(false)}>Cancel</Button>
                </div>
            ) : (
                <div>
                    <h3>{patient.name}</h3>
                    <p>ID: {patient.id}</p>
                    <Button onClick={() => setEditing(true)}>Edit</Button>
                </div>
            )}
        </Card>
    );
};

export default PatientCard;
            `,

            // Vue component
            vueComponent: `
<template>
    <div class="treatment-selector">
        <h2>Treatment Selection</h2>
        <select v-model="selectedTreatment" @change="onTreatmentChange">
            <option v-for="treatment in treatments" :key="treatment.id" :value="treatment.id">
                {{ treatment.name }}
            </option>
        </select>
        <button @click="confirmSelection" :disabled="!selectedTreatment">
            Confirm Treatment
        </button>
    </div>
</template>

<script>
export default {
    name: 'TreatmentSelector',
    props: {
        treatments: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectedTreatment: null
        };
    },
    methods: {
        onTreatmentChange() {
            this.$emit('treatment-selected', this.selectedTreatment);
        },
        confirmSelection() {
            this.$emit('treatment-confirmed', this.selectedTreatment);
        }
    }
};
</script>

<style scoped>
.treatment-selector {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}
</style>
            `,

            // Angular component
            angularComponent: `
import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
}

@Component({
    selector: 'app-medication-list',
    template: \`
        <div class="medication-list">
            <h3>Current Medications</h3>
            <div *ngFor="let med of medications; trackBy: trackByMedId" class="medication-item">
                <span>{{ med.name }} - {{ med.dosage }}</span>
                <span>{{ med.frequency }}</span>
                <button (click)="removeMedication(med.id)">Remove</button>
            </div>
            <button (click)="addMedication()">Add Medication</button>
        </div>
    \`,
    styleUrls: ['./medication-list.component.css']
})
export class MedicationListComponent {
    @Input() medications: Medication[] = [];
    @Output() medicationRemoved = new EventEmitter<string>();
    @Output() medicationAdded = new EventEmitter<void>();

    trackByMedId(index: number, med: Medication): string {
        return med.id;
    }

    removeMedication(id: string): void {
        this.medicationRemoved.emit(id);
    }

    addMedication(): void {
        this.medicationAdded.emit();
    }
}
            `
        };
    }

    /**
     * 🔍 Test component detection
     */
    testComponentDetection() {
        console.log('🔍 Testing component detection...');

        // Test React component detection
        const reactDNA = this.analyzer.extractComponentDNA(this.testComponents.reactComponent, 'react');
        assert(reactDNA.framework === 'react', 'Should detect React framework');
        assert(reactDNA.name === 'PatientCard', 'Should extract component name');
        assert(reactDNA.type === 'functional', 'Should detect functional component');

        // Test Vue component detection
        const vueDNA = this.analyzer.extractComponentDNA(this.testComponents.vueComponent, 'vue');
        assert(vueDNA.framework === 'vue', 'Should detect Vue framework');
        assert(vueDNA.name === 'TreatmentSelector', 'Should extract Vue component name');

        // Test Angular component detection
        const angularDNA = this.analyzer.extractComponentDNA(this.testComponents.angularComponent, 'angular');
        assert(angularDNA.framework === 'angular', 'Should detect Angular framework');
        assert(angularDNA.name === 'MedicationListComponent', 'Should extract Angular component name');

        console.log('   ✅ Component detection tests passed');
        return true;
    }

    /**
     * 📊 Test dependency analysis
     */
    testDependencyAnalysis() {
        console.log('📊 Testing dependency analysis...');

        const reactDNA = this.analyzer.extractComponentDNA(this.testComponents.reactComponent, 'react');
        
        // Check imports
        assert(reactDNA.imports.includes('React'), 'Should detect React import');
        assert(reactDNA.imports.includes('useState'), 'Should detect useState hook');
        assert(reactDNA.imports.includes('useEffect'), 'Should detect useEffect hook');
        assert(reactDNA.imports.includes('Card'), 'Should detect Ant Design Card');

        // Check external dependencies
        assert(reactDNA.externalDependencies.includes('antd'), 'Should detect Ant Design dependency');

        console.log('   ✅ Dependency analysis tests passed');
        return true;
    }

    /**
     * 🎣 Test hooks and lifecycle detection
     */
    testHooksAndLifecycle() {
        console.log('🎣 Testing hooks and lifecycle detection...');

        const reactDNA = this.analyzer.extractComponentDNA(this.testComponents.reactComponent, 'react');
        
        // Check React hooks
        assert(reactDNA.hooks.includes('useState'), 'Should detect useState hook');
        assert(reactDNA.hooks.includes('useEffect'), 'Should detect useEffect hook');

        // Check state variables
        assert(reactDNA.state.some(s => s.name === 'editing'), 'Should detect editing state');
        assert(reactDNA.state.some(s => s.name === 'name'), 'Should detect name state');

        console.log('   ✅ Hooks and lifecycle tests passed');
        return true;
    }

    /**
     * 🔧 Test prop and event analysis
     */
    testPropsAndEvents() {
        console.log('🔧 Testing props and events analysis...');

        const reactDNA = this.analyzer.extractComponentDNA(this.testComponents.reactComponent, 'react');
        
        // Check props
        assert(reactDNA.props.includes('patient'), 'Should detect patient prop');
        assert(reactDNA.props.includes('onUpdate'), 'Should detect onUpdate prop');

        // Check events
        assert(reactDNA.events.includes('onClick'), 'Should detect onClick events');
        assert(reactDNA.events.includes('onChange'), 'Should detect onChange events');

        console.log('   ✅ Props and events tests passed');
        return true;
    }

    /**
     * 🎨 Test styling analysis
     */
    testStylingAnalysis() {
        console.log('🎨 Testing styling analysis...');

        const reactDNA = this.analyzer.extractComponentDNA(this.testComponents.reactComponent, 'react');
        const vueDNA = this.analyzer.extractComponentDNA(this.testComponents.vueComponent, 'vue');
        
        // Check CSS classes
        assert(reactDNA.styling.classes.includes('patient-card'), 'Should detect CSS class');
        
        // Check Vue scoped styles
        assert(vueDNA.styling.scoped === true, 'Should detect scoped styles in Vue');

        console.log('   ✅ Styling analysis tests passed');
        return true;
    }

    /**
     * 🏗️ Test architecture pattern detection
     */
    testArchitecturePatterns() {
        console.log('🏗️ Testing architecture pattern detection...');

        const reactDNA = this.analyzer.extractComponentDNA(this.testComponents.reactComponent, 'react');
        
        // Check patterns
        assert(reactDNA.patterns.includes('controlled-component'), 'Should detect controlled component pattern');
        assert(reactDNA.patterns.includes('conditional-rendering'), 'Should detect conditional rendering');

        console.log('   ✅ Architecture pattern tests passed');
        return true;
    }

    /**
     * 📈 Test complexity metrics
     */
    testComplexityMetrics() {
        console.log('📈 Testing complexity metrics...');

        const reactDNA = this.analyzer.extractComponentDNA(this.testComponents.reactComponent, 'react');
        
        // Check complexity metrics
        assert(typeof reactDNA.complexity.cyclomatic === 'number', 'Should calculate cyclomatic complexity');
        assert(typeof reactDNA.complexity.cognitive === 'number', 'Should calculate cognitive complexity');
        assert(typeof reactDNA.complexity.linesOfCode === 'number', 'Should count lines of code');
        assert(reactDNA.complexity.linesOfCode > 0, 'Lines of code should be positive');

        console.log('   ✅ Complexity metrics tests passed');
        return true;
    }

    /**
     * 🔄 Test component migration analysis
     */
    testMigrationAnalysis() {
        console.log('🔄 Testing migration analysis...');

        const reactDNA = this.analyzer.extractComponentDNA(this.testComponents.reactComponent, 'react');
        
        // Generate migration recommendations
        const migration = this.analyzer.generateMigrationPlan(reactDNA, 'vue');
        assert(typeof migration === 'object', 'Should generate migration plan');
        assert(migration.targetFramework === 'vue', 'Should target Vue framework');
        assert(Array.isArray(migration.steps), 'Should include migration steps');

        console.log('   ✅ Migration analysis tests passed');
        return true;
    }

    /**
     * 🏃 Run all tests
     */
    async runAllTests() {
        console.log('🧪 COMPONENT DNA ANALYZER TEST SUITE');
        console.log('=' * 50);
        
        const tests = [
            { name: 'Component Detection', fn: () => this.testComponentDetection() },
            { name: 'Dependency Analysis', fn: () => this.testDependencyAnalysis() },
            { name: 'Hooks and Lifecycle', fn: () => this.testHooksAndLifecycle() },
            { name: 'Props and Events', fn: () => this.testPropsAndEvents() },
            { name: 'Styling Analysis', fn: () => this.testStylingAnalysis() },
            { name: 'Architecture Patterns', fn: () => this.testArchitecturePatterns() },
            { name: 'Complexity Metrics', fn: () => this.testComplexityMetrics() },
            { name: 'Migration Analysis', fn: () => this.testMigrationAnalysis() }
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
    const testSuite = new ComponentDNATestSuite();
    testSuite.runAllTests()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('💀 Test suite failed:', error);
            process.exit(1);
        });
}

module.exports = ComponentDNATestSuite;
