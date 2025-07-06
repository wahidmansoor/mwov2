#!/usr/bin/env node
/**
 * OncoVista UI Component DNA Analyzer
 * Storybook + Design Token Synchronization System
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ComponentGeneticist {
    constructor() {
        this.componentDNA = new Map();
        this.designTokens = {};
        this.storyMap = new Map();
        this.mutationLog = [];
        
        this.componentPatterns = {
            'react': /export\s+(default\s+)?(?:function|const)\s+(\w+)/g,
            'vue': /<template>\s*<(\w+)/g,
            'angular': /@Component\s*\(\s*\{[\s\S]*?selector:\s*['"`]([^'"`]+)['"`]/g
        };
        
        this.designTokenCategories = {
            'colors': ['primary', 'secondary', 'accent', 'background', 'text', 'error', 'warning', 'success'],
            'typography': ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'],
            'spacing': ['margin', 'padding', 'gap', 'borderRadius'],
            'shadows': ['boxShadow', 'dropShadow', 'textShadow'],
            'animations': ['transition', 'animation', 'transform']
        };
    }

    /**
     * 🧬 Extract component DNA from codebase
     */
    async extractComponentDNA(sourceDir = './client/src') {
        console.log('🧬 DNA EXTRACTION: Analyzing component genetic structure...');
        
        const components = await this.scanForComponents(sourceDir);
        
        for (const component of components) {
            const dna = await this.analyzeComponentGenetics(component);
            this.componentDNA.set(component.name, dna);
        }
        
        console.log(`✅ Extracted DNA from ${components.length} components`);
        return this.componentDNA;
    }

    /**
     * 🔬 Scan directory for component files
     */
    async scanForComponents(dir) {
        const components = [];
        const extensions = ['.tsx', '.jsx', '.vue', '.ts', '.js'];
        
        const scanRecursive = (currentDir) => {
            const items = fs.readdirSync(currentDir);
            
            items.forEach(item => {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    scanRecursive(fullPath);
                } else if (extensions.some(ext => item.endsWith(ext))) {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    const componentNames = this.extractComponentNames(content, fullPath);
                    
                    componentNames.forEach(name => {
                        components.push({
                            name,
                            file: fullPath,
                            content,
                            type: this.detectFramework(content)
                        });
                    });
                }
            });
        };
        
        scanRecursive(dir);
        return components;
    }

    /**
     * 🧪 Analyze individual component genetics
     */
    async analyzeComponentGenetics(component) {
        const dna = {
            name: component.name,
            file: component.file,
            framework: component.type,
            props: this.extractProps(component.content),
            state: this.extractState(component.content),
            hooks: this.extractHooks(component.content),
            imports: this.extractImports(component.content),
            exports: this.extractExports(component.content),
            styles: this.extractStyles(component.content),
            designTokens: this.extractDesignTokenUsage(component.content),
            complexity: this.calculateComplexity(component.content),
            testCoverage: await this.assessTestCoverage(component.file),
            dependencies: this.extractDependencies(component.content),
            accessibility: this.assessAccessibility(component.content),
            performance: this.assessPerformance(component.content)
        };
        
        return dna;
    }

    /**
     * 🎨 Extract design token usage
     */
    extractDesignTokenUsage(content) {
        const tokens = {
            colors: [],
            typography: [],
            spacing: [],
            shadows: [],
            animations: []
        };
        
        // Extract CSS custom properties
        const cssVariableRegex = /var\(--([^)]+)\)/g;
        let match;
        while ((match = cssVariableRegex.exec(content)) !== null) {
            const token = match[1];
            
            // Categorize token
            Object.keys(this.designTokenCategories).forEach(category => {
                if (this.designTokenCategories[category].some(keyword => 
                    token.toLowerCase().includes(keyword.toLowerCase())
                )) {
                    if (!tokens[category].includes(token)) {
                        tokens[category].push(token);
                    }
                }
            });
        }
        
        // Extract Tailwind classes
        const tailwindRegex = /className\s*=\s*["`']([^"`']*)["`']/g;
        while ((match = tailwindRegex.exec(content)) !== null) {
            const classes = match[1].split(/\s+/);
            classes.forEach(cls => {
                if (cls.startsWith('text-') || cls.startsWith('bg-')) {
                    tokens.colors.push(cls);
                }
                if (cls.startsWith('p-') || cls.startsWith('m-') || cls.startsWith('space-')) {
                    tokens.spacing.push(cls);
                }
                if (cls.startsWith('font-') || cls.startsWith('text-')) {
                    tokens.typography.push(cls);
                }
            });
        }
        
        return tokens;
    }

    /**
     * 📖 Generate Storybook stories
     */
    generateStorybookStories() {
        console.log('📖 STORYBOOK: Generating component stories...');
        
        const storiesDir = './client/.storybook/stories';
        if (!fs.existsSync(storiesDir)) {
            fs.mkdirSync(storiesDir, { recursive: true });
        }
        
        this.componentDNA.forEach((dna, componentName) => {
            const story = this.generateStoryForComponent(dna);
            const storyFile = path.join(storiesDir, `${componentName}.stories.tsx`);
            
            fs.writeFileSync(storyFile, story);
            console.log(`📝 Generated story: ${componentName}.stories.tsx`);
        });
        
        // Generate Storybook configuration
        this.generateStorybookConfig();
        
        console.log('✅ Storybook stories generated');
    }

    /**
     * 📝 Generate story for individual component
     */
    generateStoryForComponent(dna) {
        const componentName = dna.name;
        const importPath = this.getRelativeImportPath(dna.file);
        
        // Generate different story variants based on props
        const stories = [];
        
        // Default story
        stories.push(`
export const Default = {
  args: {
    ${this.generateDefaultProps(dna.props)}
  },
};`);
        
        // Interactive story with controls
        stories.push(`
export const Interactive = {
  args: {
    ${this.generateInteractiveProps(dna.props)}
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive version with Storybook controls for all props.'
      }
    }
  }
};`);
        
        // Design token variations
        if (dna.designTokens.colors.length > 0) {
            stories.push(`
export const ThemeVariations = {
  render: (args) => (
    <div className="space-y-4">
      ${this.generateThemeVariations(componentName, dna.designTokens.colors)}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Component variations using different design tokens.'
      }
    }
  }
};`);
        }
        
        // Accessibility story
        stories.push(`
export const AccessibilityTest = {
  args: {
    ${this.generateAccessibilityProps(dna.props)}
  },
  parameters: {
    a11y: {
      element: '#root',
      config: {},
      options: {},
      manual: true
    },
    docs: {
      description: {
        story: 'Component configured for accessibility testing.'
      }
    }
  }
};`);
        
        return `
import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from '${importPath}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: \`
${this.generateComponentDescription(dna)}
        \`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    ${this.generateArgTypes(dna.props)}
  },
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

${stories.join('\n')}
`;
    }

    /**
     * 🎨 Generate design token synchronization
     */
    generateDesignTokens() {
        console.log('🎨 DESIGN TOKENS: Synchronizing component design system...');
        
        // Aggregate all design tokens from components
        const aggregatedTokens = {
            colors: new Set(),
            typography: new Set(),
            spacing: new Set(),
            shadows: new Set(),
            animations: new Set()
        };
        
        this.componentDNA.forEach(dna => {
            Object.keys(aggregatedTokens).forEach(category => {
                dna.designTokens[category]?.forEach(token => {
                    aggregatedTokens[category].add(token);
                });
            });
        });
        
        // Generate CSS custom properties
        const cssTokens = this.generateCSSTokens(aggregatedTokens);
        fs.writeFileSync('./client/src/styles/design-tokens.css', cssTokens);
        
        // Generate TypeScript token definitions
        const tsTokens = this.generateTypeScriptTokens(aggregatedTokens);
        fs.writeFileSync('./client/src/types/design-tokens.ts', tsTokens);
        
        // Generate Tailwind config
        const tailwindConfig = this.generateTailwindConfig(aggregatedTokens);
        fs.writeFileSync('./client/tailwind.design-tokens.js', tailwindConfig);
        
        console.log('✅ Design tokens synchronized');
    }

    /**
     * 🔬 Generate component health report
     */
    generateHealthReport() {
        console.log('🔬 HEALTH REPORT: Analyzing component ecosystem...');
        
        const report = {
            summary: {
                totalComponents: this.componentDNA.size,
                averageComplexity: this.calculateAverageComplexity(),
                designTokenUsage: this.calculateDesignTokenUsage(),
                testCoverage: this.calculateAverageTestCoverage(),
                accessibilityScore: this.calculateAccessibilityScore()
            },
            components: [],
            recommendations: [],
            designSystemHealth: this.assessDesignSystemHealth()
        };
        
        // Analyze each component
        this.componentDNA.forEach(dna => {
            const componentHealth = {
                name: dna.name,
                complexity: dna.complexity,
                designTokenUsage: Object.values(dna.designTokens).flat().length,
                testCoverage: dna.testCoverage,
                accessibility: dna.accessibility,
                performance: dna.performance,
                issues: []
            };
            
            // Identify issues
            if (dna.complexity > 10) {
                componentHealth.issues.push('High complexity - consider splitting');
            }
            if (dna.testCoverage < 0.7) {
                componentHealth.issues.push('Low test coverage');
            }
            if (dna.accessibility.score < 0.8) {
                componentHealth.issues.push('Accessibility concerns');
            }
            if (Object.values(dna.designTokens).flat().length === 0) {
                componentHealth.issues.push('No design tokens used');
            }
            
            report.components.push(componentHealth);
        });
        
        // Generate recommendations
        this.generateHealthRecommendations(report);
        
        // Save report
        const reportFile = `component-health-report-${Date.now()}.json`;
        fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
        console.log(`✅ Health report saved: ${reportFile}`);
        
        return report;
    }

    // Helper methods for component analysis
    extractComponentNames(content, filePath) {
        const names = [];
        const fileName = path.basename(filePath, path.extname(filePath));
        
        // Try different patterns based on framework
        const reactMatch = content.match(/export\s+(?:default\s+)?(?:function|const)\s+(\w+)/);
        if (reactMatch) {
            names.push(reactMatch[1]);
        } else if (fileName && fileName !== 'index') {
            names.push(fileName);
        }
        
        return names;
    }

    detectFramework(content) {
        if (content.includes('React') || content.includes('jsx') || content.includes('tsx')) {
            return 'react';
        } else if (content.includes('Vue') || content.includes('<template>')) {
            return 'vue';
        } else if (content.includes('@Component') || content.includes('Angular')) {
            return 'angular';
        }
        return 'unknown';
    }

    extractProps(content) {
        const props = [];
        
        // TypeScript interface props
        const interfaceMatch = content.match(/interface\s+\w*Props\s*\{([^}]+)\}/);
        if (interfaceMatch) {
            const propsText = interfaceMatch[1];
            const propMatches = propsText.match(/(\w+)(\?)?\s*:\s*([^;,\n]+)/g);
            if (propMatches) {
                propMatches.forEach(prop => {
                    const [, name, optional, type] = prop.match(/(\w+)(\?)?\s*:\s*([^;,\n]+)/);
                    props.push({ name, optional: !!optional, type: type.trim() });
                });
            }
        }
        
        return props;
    }

    extractHooks(content) {
        const hooks = [];
        const hookPattern = /use\w+/g;
        let match;
        while ((match = hookPattern.exec(content)) !== null) {
            if (!hooks.includes(match[0])) {
                hooks.push(match[0]);
            }
        }
        return hooks;
    }

    extractImports(content) {
        const imports = [];
        const importPattern = /import\s+.*?\s+from\s+['"`]([^'"`]+)['"`]/g;
        let match;
        while ((match = importPattern.exec(content)) !== null) {
            imports.push(match[1]);
        }
        return imports;
    }

    extractState(content) {
        const stateVars = [];
        const useStatePattern = /const\s+\[([^,]+),\s*([^\]]+)\]\s*=\s*useState/g;
        let match;
        while ((match = useStatePattern.exec(content)) !== null) {
            stateVars.push({ variable: match[1], setter: match[2] });
        }
        return stateVars;
    }

    extractExports(content) {
        const exports = [];
        const exportPattern = /export\s+(?:default\s+)?(?:function|const|class)\s+(\w+)/g;
        let match;
        while ((match = exportPattern.exec(content)) !== null) {
            exports.push(match[1]);
        }
        return exports;
    }

    extractStyles(content) {
        const styles = {
            inline: [],
            classes: [],
            styledComponents: []
        };
        
        // Extract className usage
        const classNamePattern = /className\s*=\s*["`']([^"`']*)["`']/g;
        let match;
        while ((match = classNamePattern.exec(content)) !== null) {
            styles.classes.push(...match[1].split(/\s+/));
        }
        
        // Extract inline styles
        const inlineStylePattern = /style\s*=\s*\{([^}]+)\}/g;
        while ((match = inlineStylePattern.exec(content)) !== null) {
            styles.inline.push(match[1]);
        }
        
        return styles;
    }

    calculateComplexity(content) {
        let complexity = 1; // Base complexity
        
        // Add complexity for control structures
        complexity += (content.match(/if\s*\(/g) || []).length;
        complexity += (content.match(/else/g) || []).length;
        complexity += (content.match(/for\s*\(/g) || []).length;
        complexity += (content.match(/while\s*\(/g) || []).length;
        complexity += (content.match(/switch\s*\(/g) || []).length;
        complexity += (content.match(/case\s+/g) || []).length;
        complexity += (content.match(/\?\s*.*?\s*:/g) || []).length; // Ternary operators
        
        // Add complexity for functions
        complexity += (content.match(/function\s+\w+/g) || []).length;
        complexity += (content.match(/=>\s*\{/g) || []).length;
        
        return complexity;
    }

    async assessTestCoverage(filePath) {
        // Look for corresponding test files
        const testExtensions = ['.test.tsx', '.test.ts', '.test.jsx', '.test.js', '.spec.tsx', '.spec.ts'];
        const baseFileName = path.basename(filePath, path.extname(filePath));
        const dirName = path.dirname(filePath);
        
        for (const ext of testExtensions) {
            const testFile = path.join(dirName, baseFileName + ext);
            if (fs.existsSync(testFile)) {
                const testContent = fs.readFileSync(testFile, 'utf8');
                // Simple heuristic: count test cases
                const testCount = (testContent.match(/it\s*\(|test\s*\(/g) || []).length;
                return Math.min(testCount * 0.2, 1.0); // Cap at 100%
            }
        }
        return 0; // No tests found
    }

    extractDependencies(content) {
        const deps = [];
        
        // Extract import dependencies
        const importPattern = /import\s+.*?\s+from\s+['"`]([^'"`]+)['"`]/g;
        let match;
        while ((match = importPattern.exec(content)) !== null) {
            if (!match[1].startsWith('.')) { // External dependencies only
                deps.push(match[1]);
            }
        }
        
        return [...new Set(deps)]; // Remove duplicates
    }

    assessAccessibility(content) {
        const score = { score: 1.0, issues: [] };
        
        // Check for alt text on images
        if (content.includes('<img') && !content.includes('alt=')) {
            score.issues.push('Images missing alt text');
            score.score -= 0.2;
        }
        
        // Check for aria labels
        if ((content.includes('button') || content.includes('input')) && 
            !content.includes('aria-label') && !content.includes('aria-labelledby')) {
            score.issues.push('Interactive elements missing aria labels');
            score.score -= 0.3;
        }
        
        // Check for semantic HTML
        if (content.includes('<div') && !content.match(/<(header|main|section|article|nav|aside|footer)/)) {
            score.issues.push('Consider using semantic HTML elements');
            score.score -= 0.1;
        }
        
        return { score: Math.max(score.score, 0), issues: score.issues };
    }

    assessPerformance(content) {
        const score = { score: 1.0, issues: [] };
        
        // Check for React.memo usage in functional components
        if (content.includes('function') && !content.includes('React.memo') && !content.includes('memo(')) {
            score.issues.push('Consider memoization for performance');
            score.score -= 0.1;
        }
        
        // Check for inline function definitions in JSX
        const inlineFunctionCount = (content.match(/=\s*\{[^}]*=>/g) || []).length;
        if (inlineFunctionCount > 2) {
            score.issues.push('Multiple inline functions may impact performance');
            score.score -= 0.2;
        }
        
        return { score: Math.max(score.score, 0), issues: score.issues };
    }

    getRelativeImportPath(filePath) {
        // Convert absolute path to relative import path
        return filePath.replace(/.*\/src\//, '../').replace(/\.(tsx|ts|jsx|js)$/, '');
    }

    generateDefaultProps(props) {
        return props.map(prop => {
            const defaultValue = this.getDefaultValueForType(prop.type);
            return `${prop.name}: ${defaultValue}`;
        }).join(',\n    ');
    }

    generateInteractiveProps(props) {
        return props.map(prop => {
            const controlType = this.getControlTypeForProp(prop);
            return `${prop.name}: { control: '${controlType}' }`;
        }).join(',\n    ');
    }

    generateThemeVariations(componentName, colorTokens) {
        return colorTokens.slice(0, 3).map(token => 
            `<${componentName} className="${token}" {...args} />`
        ).join('\n      ');
    }

    generateAccessibilityProps(props) {
        return props.map(prop => {
            if (prop.name.includes('aria') || prop.name === 'role') {
                return `${prop.name}: 'button'`;
            }
            return `${prop.name}: ${this.getDefaultValueForType(prop.type)}`;
        }).join(',\n    ');
    }

    generateArgTypes(props) {
        return props.map(prop => {
            const control = this.getControlTypeForProp(prop);
            return `${prop.name}: {
      description: '${prop.type}',
      control: '${control}'
    }`;
        }).join(',\n    ');
    }

    generateComponentDescription(dna) {
        return `
Component: ${dna.name}
Framework: ${dna.framework}
Complexity: ${dna.complexity}
Props: ${dna.props.length}
Hooks: ${dna.hooks.join(', ')}
Design Tokens: ${Object.values(dna.designTokens).flat().length}
        `.trim();
    }

    getDefaultValueForType(type) {
        if (type.includes('string')) return "'default'";
        if (type.includes('number')) return '0';
        if (type.includes('boolean')) return 'false';
        if (type.includes('[]')) return '[]';
        if (type.includes('{}')) return '{}';
        return 'undefined';
    }

    getControlTypeForProp(prop) {
        if (prop.type.includes('string')) return 'text';
        if (prop.type.includes('number')) return 'number';
        if (prop.type.includes('boolean')) return 'boolean';
        if (prop.type.includes('color')) return 'color';
        return 'text';
    }

    generateStorybookConfig() {
        const config = `
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-design-tokens'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
        `;
        
        fs.writeFileSync('./client/.storybook/main.ts', config.trim());
    }

    generateCSSTokens(tokens) {
        let css = ':root {\n';
        
        Object.entries(tokens).forEach(([category, tokenSet]) => {
            css += `  /* ${category.toUpperCase()} */\n`;
            Array.from(tokenSet).forEach(token => {
                css += `  --${token}: /* Define value */;\n`;
            });
            css += '\n';
        });
        
        css += '}\n';
        return css;
    }

    generateTypeScriptTokens(tokens) {
        let ts = 'export const designTokens = {\n';
        
        Object.entries(tokens).forEach(([category, tokenSet]) => {
            ts += `  ${category}: {\n`;
            Array.from(tokenSet).forEach(token => {
                ts += `    '${token}': 'var(--${token})',\n`;
            });
            ts += '  },\n';
        });
        
        ts += '} as const;\n\n';
        
        ts += 'export type DesignToken = keyof typeof designTokens;\n';
        return ts;
    }

    generateTailwindConfig(tokens) {
        return `
module.exports = {
  theme: {
    extend: {
      colors: {
        ${Array.from(tokens.colors).map(token => 
          `'${token}': 'var(--${token})'`
        ).join(',\n        ')}
      },
      fontFamily: {
        ${Array.from(tokens.typography).map(token => 
          `'${token}': 'var(--${token})'`
        ).join(',\n        ')}
      },
      spacing: {
        ${Array.from(tokens.spacing).map(token => 
          `'${token}': 'var(--${token})'`
        ).join(',\n        ')}
      }
    }
  }
};
        `.trim();
    }

    calculateAverageComplexity() {
        const complexities = Array.from(this.componentDNA.values()).map(dna => dna.complexity);
        return complexities.reduce((sum, c) => sum + c, 0) / complexities.length;
    }

    calculateDesignTokenUsage() {
        let totalTokens = 0;
        let componentsUsingTokens = 0;
        
        this.componentDNA.forEach(dna => {
            const tokenCount = Object.values(dna.designTokens).flat().length;
            totalTokens += tokenCount;
            if (tokenCount > 0) componentsUsingTokens++;
        });
        
        return {
            averageTokensPerComponent: totalTokens / this.componentDNA.size,
            percentageUsingTokens: (componentsUsingTokens / this.componentDNA.size) * 100
        };
    }

    calculateAverageTestCoverage() {
        const coverages = Array.from(this.componentDNA.values()).map(dna => dna.testCoverage);
        return coverages.reduce((sum, c) => sum + c, 0) / coverages.length;
    }

    calculateAccessibilityScore() {
        const scores = Array.from(this.componentDNA.values()).map(dna => dna.accessibility.score);
        return scores.reduce((sum, s) => sum + s, 0) / scores.length;
    }

    assessDesignSystemHealth() {
        const tokenUsage = this.calculateDesignTokenUsage();
        const avgComplexity = this.calculateAverageComplexity();
        
        let health = 'EXCELLENT';
        if (tokenUsage.percentageUsingTokens < 70) health = 'GOOD';
        if (tokenUsage.percentageUsingTokens < 50) health = 'FAIR';
        if (tokenUsage.percentageUsingTokens < 30) health = 'POOR';
        
        return {
            status: health,
            tokenAdoption: tokenUsage.percentageUsingTokens,
            averageComplexity: avgComplexity,
            recommendations: this.generateDesignSystemRecommendations(tokenUsage, avgComplexity)
        };
    }

    generateDesignSystemRecommendations(tokenUsage, avgComplexity) {
        const recommendations = [];
        
        if (tokenUsage.percentageUsingTokens < 70) {
            recommendations.push('Increase design token adoption across components');
        }
        
        if (avgComplexity > 8) {
            recommendations.push('Consider breaking down complex components');
        }
        
        if (tokenUsage.averageTokensPerComponent < 3) {
            recommendations.push('Components should use more design tokens for consistency');
        }
        
        return recommendations;
    }

    generateHealthRecommendations(report) {
        if (report.summary.testCoverage < 0.7) {
            report.recommendations.push('🧪 Increase test coverage across components');
        }
        
        if (report.summary.accessibilityScore < 0.8) {
            report.recommendations.push('♿ Improve accessibility compliance');
        }
        
        if (report.summary.designTokenUsage.percentageUsingTokens < 70) {
            report.recommendations.push('🎨 Increase design token adoption');
        }
        
        const highComplexityComponents = report.components.filter(c => c.complexity > 10);
        if (highComplexityComponents.length > 0) {
            report.recommendations.push(`🔧 Refactor high complexity components: ${highComplexityComponents.map(c => c.name).join(', ')}`);
        }
    }
}

// CLI Interface
async function main() {
    const geneticist = new ComponentGeneticist();
    const args = process.argv.slice(2);
    const command = args[0];

    console.log('🧬 OncoVista UI Component DNA Laboratory');
    console.log('═'.repeat(50));

    switch (command) {
        case 'extract':
            const sourceDir = args[1] || './client/src';
            await geneticist.extractComponentDNA(sourceDir);
            console.log('🧬 Component DNA extraction complete');
            break;

        case 'storybook':
            await geneticist.extractComponentDNA();
            geneticist.generateStorybookStories();
            break;

        case 'tokens':
            await geneticist.extractComponentDNA();
            geneticist.generateDesignTokens();
            break;

        case 'health':
            await geneticist.extractComponentDNA();
            const report = geneticist.generateHealthReport();
            console.log('🔬 Component health analysis complete');
            break;

        case 'full-analysis':
            console.log('🧪 Running complete component analysis...');
            await geneticist.extractComponentDNA();
            geneticist.generateStorybookStories();
            geneticist.generateDesignTokens();
            geneticist.generateHealthReport();
            console.log('✅ Full component analysis complete');
            break;

        default:
            console.log(`
Usage: component_dna.js <command> [options]

Commands:
  extract [source-dir]    🧬 Extract component DNA from source code
  storybook              📖 Generate Storybook stories
  tokens                 🎨 Generate design token synchronization
  health                 🔬 Generate component health report
  full-analysis          🧪 Run complete analysis and generation

Examples:
  ./component_dna.js extract ./client/src
  ./component_dna.js storybook
  ./component_dna.js full-analysis
            `);
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = ComponentGeneticist;
