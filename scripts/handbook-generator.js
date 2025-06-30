#!/usr/bin/env node

/**
 * OncoVista Handbook Page Generator
 * 
 * This script generates React components for handbook pages from markdown files
 * organized by specialty (medical, radiation, palliative), chapters, and sections.
 * 
 * Usage:
 *   node scripts/handbook-generator.js [options]
 * 
 * Options:
 *   --specialty <medical|radiation|palliative>  Specify handbook specialty
 *   --chapter <number>                          Chapter number (e.g., 1, 2, 3)
 *   --section <number>                          Section number (e.g., 1.1, 1.2.1)
 *   --input <path>                              Input markdown file path
 *   --output <path>                             Output directory (optional)
 *   --batch                                     Process all markdown files in input directory
 *   --preview                                   Generate preview without writing files
 * 
 * Examples:
 *   # Generate single page from markdown
 *   node scripts/handbook-generator.js --specialty medical --chapter 1 --section 1.1 --input content.md
 * 
 *   # Batch process all markdown files
 *   node scripts/handbook-generator.js --specialty radiation --batch --input ./markdown-files/
 * 
 *   # Preview component structure
 *   node scripts/handbook-generator.js --specialty palliative --chapter 2 --preview
 */

import fs from 'fs';
import path from 'path';
import { program } from 'commander';

// Configure command line options
program
  .version('1.0.0')
  .description('Generate OncoVista handbook pages from markdown files')
  .option('-s, --specialty <type>', 'Handbook specialty (medical|radiation|palliative)', 'medical')
  .option('-c, --chapter <number>', 'Chapter number')
  .option('-e, --section <section>', 'Section number (e.g., 1.1, 1.2.1)')
  .option('-i, --input <path>', 'Input markdown file or directory path')
  .option('-o, --output <path>', 'Output directory', './client/src/modules/handbook/content')
  .option('-b, --batch', 'Process all markdown files in input directory')
  .option('-p, --preview', 'Preview component structure without writing files')
  .option('-v, --verbose', 'Verbose output')
  .parse();

const options = program.opts();

// Handbook configuration mapping
const HANDBOOK_CONFIG = {
  medical: {
    name: 'Medical Oncology',
    color: 'blue',
    icon: 'Dna',
    chapters: {
      1: {
        title: 'Principles of Oncology',
        sections: {
          '1.1': 'Cancer Biology',
          '1.1.1': 'Hallmarks of Cancer',
          '1.1.2': 'Oncogenes and Tumor Suppressor Genes',
          '1.1.3': 'Tumor Microenvironment',
          '1.2': 'Carcinogenesis',
          '1.2.1': 'Genetic and Epigenetic Mechanisms',
          '1.2.2': 'Environmental and Lifestyle Risk Factors',
          '1.3': 'Tumor Immunology'
        }
      },
      2: {
        title: 'Diagnostic Workup and Staging',
        sections: {
          '2.1': 'History and Physical Examination',
          '2.2': 'Diagnostic Imaging',
          '2.3': 'Tumor Markers and Laboratory Tests',
          '2.4': 'Biopsy and Histopathology',
          '2.5': 'Cancer Staging Systems'
        }
      },
      3: {
        title: 'Systemic Cancer Therapies',
        sections: {
          '3.1': 'Chemotherapy',
          '3.2': 'Targeted Therapy',
          '3.3': 'Immunotherapy',
          '3.4': 'Hormonal Therapy',
          '3.5': 'Radiopharmaceuticals'
        }
      }
    }
  },
  radiation: {
    name: 'Radiation Oncology',
    color: 'orange',
    icon: 'Zap',
    chapters: {
      1: {
        title: 'Fundamentals of Radiation Oncology',
        sections: {
          '1.1': 'History and Evolution of Radiation Therapy',
          '1.2': 'Basic Radiation Physics',
          '1.3': 'Radiation Biology'
        }
      },
      2: {
        title: 'Treatment Planning and Delivery',
        sections: {
          '2.1': 'Simulation and Immobilization',
          '2.2': 'Target Volume Definition',
          '2.3': 'Dose Calculation and Optimization'
        }
      }
    }
  },
  palliative: {
    name: 'Palliative Care',
    color: 'green',
    icon: 'Heart',
    chapters: {
      1: {
        title: 'Foundations of Palliative Care',
        sections: {
          '1.1': 'Definition and Scope',
          '1.2': 'History and Evolution',
          '1.3': 'Models of Palliative Care Delivery'
        }
      },
      2: {
        title: 'Symptom Management',
        sections: {
          '2.1': 'Pain Management',
          '2.2': 'Nausea and Vomiting',
          '2.3': 'Dyspnea and Respiratory Symptoms'
        }
      }
    }
  }
};

/**
 * Parse markdown content and extract metadata
 */
function parseMarkdown(content) {
  const lines = content.split('\n');
  const metadata = {};
  let contentStart = 0;
  
  // Extract YAML frontmatter if present
  if (lines[0] === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i] === '---') {
        contentStart = i + 1;
        break;
      }
      const match = lines[i].match(/^(\w+):\s*(.+)$/);
      if (match) {
        metadata[match[1]] = match[2].replace(/['"]/g, '');
      }
    }
  }
  
  const markdownContent = lines.slice(contentStart).join('\n');
  const title = metadata.title || extractTitleFromContent(markdownContent);
  
  return {
    title,
    content: markdownContent,
    metadata
  };
}

/**
 * Extract title from markdown content
 */
function extractTitleFromContent(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : 'Untitled';
}

/**
 * Convert markdown to JSX with clinical formatting
 */
function convertMarkdownToJSX(content, specialty, section) {
  const config = HANDBOOK_CONFIG[specialty];
  
  // Split content into sections for processing
  const sections = content.split(/(?=^#{1,3}\s)/m).filter(Boolean);
  
  let jsx = '';
  
  sections.forEach((section, index) => {
    const lines = section.split('\n');
    const headerLine = lines[0];
    const sectionContent = lines.slice(1).join('\n').trim();
    
    // Process headers
    const headerMatch = headerLine.match(/^(#{1,3})\s+(.+)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const title = headerMatch[2];
      
      // Generate appropriate JSX based on header level
      if (level === 1) {
        jsx += `
          <Card className="border-l-4 border-l-${config.color}-500 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <${config.icon} className="h-5 w-5 text-${config.color}-600" />
                ${title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              ${processContentBlocks(sectionContent, config.color)}
            </CardContent>
          </Card>`;
      } else if (level === 2) {
        jsx += `
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg">${title}</CardTitle>
            </CardHeader>
            <CardContent>
              ${processContentBlocks(sectionContent, config.color)}
            </CardContent>
          </Card>`;
      } else if (level === 3) {
        jsx += `
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">${title}</h3>
            <div className="pl-4 border-l-2 border-${config.color}-200">
              ${processContentBlocks(sectionContent, config.color)}
            </div>
          </div>`;
      }
    }
  });
  
  return jsx;
}

/**
 * Process content blocks (paragraphs, lists, etc.)
 */
function processContentBlocks(content, color) {
  if (!content.trim()) return '';
  
  const blocks = content.split('\n\n').filter(Boolean);
  
  return blocks.map(block => {
    const trimmed = block.trim();
    
    // Handle lists
    if (trimmed.match(/^[-*+]\s/m)) {
      const items = trimmed.split('\n').filter(line => line.match(/^[-*+]\s/));
      const listItems = items.map(item => {
        const text = item.replace(/^[-*+]\s/, '');
        const boldMatch = text.match(/\*\*(.*?)\*\*:(.*)/);
        if (boldMatch) {
          return `
            <li className="flex items-start gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-${color}-500 mt-2 flex-shrink-0"></div>
              <div>
                <strong className="text-gray-900 dark:text-white">${boldMatch[1]}</strong>
                <span className="text-gray-700 dark:text-gray-300">${boldMatch[2]}</span>
              </div>
            </li>`;
        }
        return `
          <li className="flex items-start gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-${color}-500 mt-2 flex-shrink-0"></div>
            <span className="text-gray-700 dark:text-gray-300">${text}</span>
          </li>`;
      }).join('');
      
      return `<ul className="space-y-1 mb-4">${listItems}</ul>`;
    }
    
    // Handle regular paragraphs
    return `<p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-4">${trimmed}</p>`;
  }).join('\n');
}

/**
 * Generate React component from parsed content
 */
function generateReactComponent(parsedContent, specialty, chapter, section) {
  const config = HANDBOOK_CONFIG[specialty];
  const chapterConfig = config.chapters[chapter];
  const sectionTitle = chapterConfig?.sections[section] || parsedContent.title;
  
  const componentName = generateComponentName(specialty, chapter, section, sectionTitle);
  const jsx = convertMarkdownToJSX(parsedContent.content, specialty, section);
  
  return `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ${config.icon}, BookOpen, Info, Clock } from "lucide-react";

const ${componentName} = () => {
  return (
    <div className="space-y-6">
      ${jsx}
      
      {/* Educational Footer */}
      <Alert className="bg-${config.color}-50 dark:bg-${config.color}-950/20 border-${config.color}-200">
        <Info className="h-4 w-4 text-${config.color}-600" />
        <AlertDescription className="text-sm">
          This educational content is based on current evidence-based guidelines from major oncology organizations. 
          Always verify with institutional protocols and current literature for clinical practice.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ${componentName};`;
}

/**
 * Generate component name from section details
 */
function generateComponentName(specialty, chapter, section, title) {
  const cleanTitle = title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const specialtyPrefix = specialty.charAt(0).toUpperCase() + specialty.slice(1);
  return `${specialtyPrefix}Chapter${chapter}${section.replace(/\./g, '')}${cleanTitle}`;
}

/**
 * Generate file path for component
 */
function generateFilePath(specialty, chapter, section, outputDir) {
  const dirName = `${specialty}-chapter${chapter}`;
  const fileName = `section${section.replace(/\./g, '_')}.tsx`;
  return path.join(outputDir, dirName, fileName);
}

/**
 * Process single markdown file
 */
function processMarkdownFile(inputPath, specialty, chapter, section, outputDir) {
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    return false;
  }
  
  const content = fs.readFileSync(inputPath, 'utf8');
  const parsed = parseMarkdown(content);
  const component = generateReactComponent(parsed, specialty, chapter, section);
  
  if (options.preview) {
    console.log(`\n=== Preview for ${specialty} Chapter ${chapter} Section ${section} ===`);
    console.log(component);
    return true;
  }
  
  const outputPath = generateFilePath(specialty, chapter, section, outputDir);
  const outputDirPath = path.dirname(outputPath);
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath, { recursive: true });
  }
  
  // Write component file
  fs.writeFileSync(outputPath, component);
  
  if (options.verbose) {
    console.log(`Generated: ${outputPath}`);
  }
  
  return true;
}

/**
 * Process directory of markdown files
 */
function processMarkdownDirectory(inputDir, specialty, outputDir) {
  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory not found: ${inputDir}`);
    return false;
  }
  
  const files = fs.readdirSync(inputDir)
    .filter(file => file.endsWith('.md'))
    .sort();
  
  console.log(`Found ${files.length} markdown files in ${inputDir}`);
  
  files.forEach((file, index) => {
    const inputPath = path.join(inputDir, file);
    const baseName = path.basename(file, '.md');
    
    // Try to extract chapter and section from filename
    const match = baseName.match(/chapter-(\d+)-section-([0-9.]+)/);
    let chapter, section;
    
    if (match) {
      chapter = parseInt(match[1]);
      section = match[2];
    } else {
      // Generate sequential numbering if pattern not found
      chapter = Math.floor(index / 10) + 1;
      section = `${chapter}.${(index % 10) + 1}`;
    }
    
    console.log(`Processing: ${file} -> Chapter ${chapter} Section ${section}`);
    processMarkdownFile(inputPath, specialty, chapter, section, outputDir);
  });
  
  return true;
}

/**
 * Generate index file for easier imports
 */
function generateIndexFile(specialty, chapter, outputDir) {
  const dirName = `${specialty}-chapter${chapter}`;
  const dirPath = path.join(outputDir, dirName);
  
  if (!fs.existsSync(dirPath)) {
    return;
  }
  
  const files = fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.tsx'))
    .sort();
  
  let indexContent = '// Auto-generated index file for handbook components\n\n';
  
  files.forEach(file => {
    const baseName = path.basename(file, '.tsx');
    const componentName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    indexContent += `export { default as ${componentName} } from './${baseName}';\n`;
  });
  
  const indexPath = path.join(dirPath, 'index.ts');
  fs.writeFileSync(indexPath, indexContent);
  
  if (options.verbose) {
    console.log(`Generated index: ${indexPath}`);
  }
}

/**
 * Main execution function
 */
function main() {
  console.log('OncoVista Handbook Generator v1.0.0');
  console.log('=====================================\n');
  
  const { specialty, chapter, section, input, output, batch, preview } = options;
  
  // Validate specialty
  if (!HANDBOOK_CONFIG[specialty]) {
    console.error(`Invalid specialty: ${specialty}`);
    console.error(`Available specialties: ${Object.keys(HANDBOOK_CONFIG).join(', ')}`);
    process.exit(1);
  }
  
  if (preview) {
    console.log(`Preview mode for ${specialty} handbook`);
    if (chapter && section) {
      console.log(`Chapter ${chapter}, Section ${section}`);
      const mockContent = `# Sample Content\n\nThis is a preview of the component structure.`;
      const parsed = { title: 'Sample Section', content: mockContent, metadata: {} };
      const component = generateReactComponent(parsed, specialty, parseInt(chapter), section);
      console.log('\n=== Component Preview ===');
      console.log(component);
    }
    return;
  }
  
  if (!input) {
    console.error('Input file or directory is required');
    process.exit(1);
  }
  
  if (batch) {
    console.log(`Batch processing markdown files from: ${input}`);
    processMarkdownDirectory(input, specialty, output);
    
    // Generate index files for each chapter
    const chapters = Object.keys(HANDBOOK_CONFIG[specialty].chapters);
    chapters.forEach(ch => {
      generateIndexFile(specialty, parseInt(ch), output);
    });
  } else {
    if (!chapter || !section) {
      console.error('Chapter and section are required for single file processing');
      process.exit(1);
    }
    
    console.log(`Processing single file: ${input}`);
    console.log(`Target: ${specialty} Chapter ${chapter} Section ${section}`);
    
    const success = processMarkdownFile(input, specialty, parseInt(chapter), section, output);
    if (success) {
      generateIndexFile(specialty, parseInt(chapter), output);
    }
  }
  
  console.log('\nGeneration complete!');
  console.log(`Output directory: ${output}`);
}

// Execute if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  parseMarkdown,
  generateReactComponent,
  processMarkdownFile,
  HANDBOOK_CONFIG
};