#!/usr/bin/env node
/**
 * OncoVista ERD Live Generator
 * Real-time Entity Relationship Diagram from Database Schema
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ERDPathologist {
    constructor() {
        this.tables = new Map();
        this.relationships = [];
        this.schemas = new Map();
        this.constraints = [];
        this.indexes = [];
        
        this.supportedFormats = ['svg', 'png', 'pdf', 'html', 'mermaid', 'dot'];
        
        this.colors = {
            primary: '#2563eb',
            secondary: '#7c3aed',
            accent: '#059669',
            warning: '#d97706',
            error: '#dc2626',
            neutral: '#6b7280'
        };
    }

    /**
     * 🔬 Analyze database schema structure
     */
    async analyzeSchema(schemaSource) {
        console.log('🔬 SCHEMA ANALYSIS: Examining database genetic structure...');
        
        if (schemaSource.endsWith('.sql')) {
            await this.analyzeSQLSchema(schemaSource);
        } else if (schemaSource.endsWith('.ts') || schemaSource.endsWith('.js')) {
            await this.analyzeORMSchema(schemaSource);
        } else {
            // Try to detect schema files
            await this.autoDetectSchemas(schemaSource);
        }
        
        console.log(`✅ Analyzed ${this.tables.size} tables with ${this.relationships.length} relationships`);
        return {
            tables: this.tables,
            relationships: this.relationships,
            constraints: this.constraints
        };
    }

    /**
     * 📊 Analyze SQL schema files
     */
    async analyzeSQLSchema(sqlFile) {
        const content = fs.readFileSync(sqlFile, 'utf8');
        
        // Extract tables
        this.extractSQLTables(content);
        
        // Extract relationships
        this.extractSQLRelationships(content);
        
        // Extract constraints
        this.extractSQLConstraints(content);
        
        // Extract indexes
        this.extractSQLIndexes(content);
    }

    /**
     * 🧬 Analyze ORM schema files (Drizzle, Prisma, etc.)
     */
    async analyzeORMSchema(schemaFile) {
        const content = fs.readFileSync(schemaFile, 'utf8');
        
        if (content.includes('pgTable') || content.includes('mysqlTable')) {
            // Drizzle ORM
            this.analyzeDrizzleSchema(content);
        } else if (content.includes('model ') || content.includes('@@map')) {
            // Prisma
            this.analyzePrismaSchema(content);
        } else {
            // Generic TypeScript/JavaScript schema
            this.analyzeGenericSchema(content);
        }
    }

    /**
     * 🔍 Auto-detect schema files
     */
    async autoDetectSchemas(directory) {
        const schemaFiles = this.findSchemaFiles(directory);
        
        for (const file of schemaFiles) {
            console.log(`📋 Processing: ${file}`);
            
            if (file.endsWith('.sql')) {
                await this.analyzeSQLSchema(file);
            } else {
                await this.analyzeORMSchema(file);
            }
        }
    }

    /**
     * 📁 Find schema files in directory
     */
    findSchemaFiles(dir) {
        const schemaFiles = [];
        const extensions = ['.sql', '.ts', '.js'];
        
        const scanRecursive = (currentDir) => {
            const items = fs.readdirSync(currentDir);
            
            items.forEach(item => {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    scanRecursive(fullPath);
                } else if (extensions.some(ext => item.endsWith(ext))) {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    
                    // Check if file contains schema definitions
                    if (this.isSchemaFile(content, item)) {
                        schemaFiles.push(fullPath);
                    }
                }
            });
        };
        
        scanRecursive(dir);
        return schemaFiles;
    }

    /**
     * 🧪 Check if file contains schema definitions
     */
    isSchemaFile(content, filename) {
        const schemaIndicators = [
            /CREATE TABLE/i,
            /pgTable|mysqlTable/,
            /model \w+/,
            /schema\./,
            /foreign key/i,
            /references/i
        ];
        
        const schemaFilenames = [
            'schema',
            'models',
            'database',
            'migration',
            'tables'
        ];
        
        return schemaIndicators.some(pattern => pattern.test(content)) ||
               schemaFilenames.some(name => filename.toLowerCase().includes(name));
    }

    /**
     * 🗃️ Extract SQL tables
     */
    extractSQLTables(content) {
        const tablePattern = /CREATE TABLE\s+(?:IF NOT EXISTS\s+)?(?:`?"?(\w+)`?"?)\s*\((.*?)\);/gis;
        
        let match;
        while ((match = tablePattern.exec(content)) !== null) {
            const [, tableName, columnsSQL] = match;
            
            const table = {
                name: tableName,
                columns: this.parseSQLColumns(columnsSQL),
                primaryKey: [],
                foreignKeys: [],
                indexes: [],
                constraints: []
            };
            
            // Extract primary key
            const pkMatch = columnsSQL.match(/PRIMARY KEY\s*\(\s*([^)]+)\s*\)/i);
            if (pkMatch) {
                table.primaryKey = pkMatch[1].split(',').map(col => col.trim().replace(/[`"]/g, ''));
            }
            
            this.tables.set(tableName, table);
        }
    }

    /**
     * 📋 Parse SQL columns
     */
    parseSQLColumns(columnsSQL) {
        const columns = [];
        const lines = columnsSQL.split(',').map(line => line.trim());
        
        for (const line of lines) {
            if (line.toLowerCase().includes('constraint') || 
                line.toLowerCase().includes('primary key') ||
                line.toLowerCase().includes('foreign key') ||
                line.toLowerCase().includes('unique') ||
                line.toLowerCase().includes('check')) {
                continue;
            }
            
            const columnMatch = line.match(/^(?:`?"?(\w+)`?"?)\s+(\w+(?:\([^)]*\))?)(.*?)$/i);
            if (columnMatch) {
                const [, name, type, modifiers] = columnMatch;
                
                columns.push({
                    name,
                    type: type.toUpperCase(),
                    nullable: !modifiers.toLowerCase().includes('not null'),
                    primary: modifiers.toLowerCase().includes('primary key'),
                    unique: modifiers.toLowerCase().includes('unique'),
                    autoIncrement: modifiers.toLowerCase().includes('auto_increment') || 
                                  modifiers.toLowerCase().includes('serial'),
                    defaultValue: this.extractDefaultValue(modifiers)
                });
            }
        }
        
        return columns;
    }

    /**
     * 🔗 Extract SQL relationships
     */
    extractSQLRelationships(content) {
        // Foreign key constraints
        const fkPattern = /(?:CONSTRAINT\s+\w+\s+)?FOREIGN KEY\s*\(\s*([^)]+)\s*\)\s*REFERENCES\s+(\w+)\s*\(\s*([^)]+)\s*\)/gi;
        
        let match;
        while ((match = fkPattern.exec(content)) !== null) {
            const [, fromColumn, toTable, toColumn] = match;
            
            // Find the table this FK belongs to
            const tableMatch = content.substring(0, match.index).match(/CREATE TABLE\s+(\w+)/gi);
            const fromTable = tableMatch ? tableMatch[tableMatch.length - 1].split(' ')[2] : 'unknown';
            
            this.relationships.push({
                type: 'foreign_key',
                fromTable,
                fromColumn: fromColumn.trim(),
                toTable,
                toColumn: toColumn.trim(),
                cardinality: 'many_to_one'
            });
        }
    }

    /**
     * 🔐 Extract SQL constraints
     */
    extractSQLConstraints(content) {
        const constraintPatterns = [
            /CONSTRAINT\s+(\w+)\s+PRIMARY KEY\s*\(\s*([^)]+)\s*\)/gi,
            /CONSTRAINT\s+(\w+)\s+UNIQUE\s*\(\s*([^)]+)\s*\)/gi,
            /CONSTRAINT\s+(\w+)\s+CHECK\s*\(\s*([^)]+)\s*\)/gi
        ];
        
        constraintPatterns.forEach((pattern, index) => {
            const types = ['primary_key', 'unique', 'check'];
            let match;
            while ((match = pattern.exec(content)) !== null) {
                this.constraints.push({
                    name: match[1],
                    type: types[index],
                    definition: match[2],
                    table: this.findTableForConstraint(content, match.index)
                });
            }
        });
    }

    /**
     * 📇 Extract SQL indexes
     */
    extractSQLIndexes(content) {
        const indexPattern = /CREATE\s+(?:UNIQUE\s+)?INDEX\s+(\w+)\s+ON\s+(\w+)\s*\(\s*([^)]+)\s*\)/gi;
        
        let match;
        while ((match = indexPattern.exec(content)) !== null) {
            const [fullMatch, indexName, tableName, columns] = match;
            
            this.indexes.push({
                name: indexName,
                table: tableName,
                columns: columns.split(',').map(col => col.trim()),
                unique: fullMatch.toLowerCase().includes('unique'),
                type: 'btree' // Default assumption
            });
        }
    }

    /**
     * 🧬 Analyze Drizzle ORM schema
     */
    analyzeDrizzleSchema(content) {
        // Extract table definitions
        const tablePattern = /export const (\w+) = (?:pgTable|mysqlTable)\s*\(\s*['"`]([^'"`]+)['"`]\s*,\s*\{([^}]+)\}/gs;
        
        let match;
        while ((match = tablePattern.exec(content)) !== null) {
            const [, varName, tableName, columnsCode] = match;
            
            const table = {
                name: tableName,
                variable: varName,
                columns: this.parseDrizzleColumns(columnsCode),
                primaryKey: [],
                foreignKeys: [],
                indexes: [],
                constraints: []
            };
            
            this.tables.set(tableName, table);
        }
        
        // Extract relationships
        this.extractDrizzleRelationships(content);
    }

    /**
     * 📋 Parse Drizzle columns
     */
    parseDrizzleColumns(columnsCode) {
        const columns = [];
        const columnPattern = /(\w+):\s*([\w.()]+)(?:\.([^,}]+))?/g;
        
        let match;
        while ((match = columnPattern.exec(columnsCode)) !== null) {
            const [, name, type, modifiers] = match;
            
            columns.push({
                name,
                type: this.mapDrizzleType(type),
                nullable: !(modifiers && modifiers.includes('notNull')),
                primary: modifiers && modifiers.includes('primaryKey'),
                unique: modifiers && modifiers.includes('unique'),
                autoIncrement: modifiers && modifiers.includes('serial'),
                defaultValue: this.extractDrizzleDefault(modifiers)
            });
        }
        
        return columns;
    }

    /**
     * 🔗 Extract Drizzle relationships
     */
    extractDrizzleRelationships(content) {
        // References pattern
        const refPattern = /references\(\s*\(\)\s*=>\s*(\w+)\.(\w+)\)/g;
        
        let match;
        while ((match = refPattern.exec(content)) !== null) {
            const [, toTable, toColumn] = match;
            
            // Find the column and table this reference belongs to
            const columnContext = this.findDrizzleColumnContext(content, match.index);
            
            if (columnContext) {
                this.relationships.push({
                    type: 'foreign_key',
                    fromTable: columnContext.table,
                    fromColumn: columnContext.column,
                    toTable: this.getTableNameFromVariable(content, toTable),
                    toColumn,
                    cardinality: 'many_to_one'
                });
            }
        }
    }

    /**
     * 🎨 Generate ERD in various formats
     */
    async generateERD(format = 'svg', outputFile = null) {
        console.log(`🎨 GENERATION: Creating ERD in ${format} format...`);
        
        const output = outputFile || `erd-${Date.now()}.${format}`;
        
        switch (format.toLowerCase()) {
            case 'svg':
                return this.generateSVG(output);
            case 'mermaid':
                return this.generateMermaid(output);
            case 'html':
                return this.generateHTML(output);
            case 'dot':
                return this.generateDOT(output);
            case 'png':
                return this.generatePNG(output);
            default:
                throw new Error(`Unsupported format: ${format}`);
        }
    }

    /**
     * 🖼️ Generate SVG ERD
     */
    generateSVG(outputFile) {
        const svg = this.createSVGERD();
        fs.writeFileSync(outputFile, svg);
        console.log(`✅ SVG ERD saved: ${outputFile}`);
        return outputFile;
    }

    /**
     * 🌊 Generate Mermaid ERD
     */
    generateMermaid(outputFile) {
        let mermaid = 'erDiagram\n';
        
        // Add tables
        this.tables.forEach((table, tableName) => {
            mermaid += `    ${tableName} {\n`;
            
            table.columns.forEach(column => {
                const typeAnnotation = this.getMermaidTypeAnnotation(column);
                const keyAnnotation = this.getMermaidKeyAnnotation(column);
                
                mermaid += `        ${column.type} ${column.name} ${keyAnnotation} "${typeAnnotation}"\n`;
            });
            
            mermaid += '    }\n\n';
        });
        
        // Add relationships
        this.relationships.forEach(rel => {
            const relationship = this.getMermaidRelationship(rel);
            mermaid += `    ${rel.fromTable} ${relationship} ${rel.toTable} : "${rel.fromColumn} -> ${rel.toColumn}"\n`;
        });
        
        fs.writeFileSync(outputFile, mermaid);
        console.log(`✅ Mermaid ERD saved: ${outputFile}`);
        return outputFile;
    }

    /**
     * 🌐 Generate HTML ERD with interactive features
     */
    generateHTML(outputFile) {
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OncoVista Database ERD</title>
    <script src="https://unpkg.com/d3@7"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f8fafc;
        }
        .container {
            max-width: 100%;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .title {
            font-size: 2.5rem;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 10px;
        }
        .subtitle {
            font-size: 1.2rem;
            color: #64748b;
        }
        .erd-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            padding: 20px;
            min-height: 600px;
        }
        .table-node {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .table-node:hover {
            transform: scale(1.05);
        }
        .table-header {
            fill: ${this.colors.primary};
            font-weight: bold;
        }
        .table-body {
            fill: white;
            stroke: ${this.colors.neutral};
            stroke-width: 1;
        }
        .column-text {
            font-size: 12px;
            fill: #374151;
        }
        .primary-key {
            font-weight: bold;
            fill: ${this.colors.accent};
        }
        .foreign-key {
            fill: ${this.colors.warning};
        }
        .relationship-line {
            stroke: ${this.colors.secondary};
            stroke-width: 2;
            fill: none;
            marker-end: url(#arrowhead);
        }
        .controls {
            margin-bottom: 20px;
            text-align: center;
        }
        .btn {
            background: ${this.colors.primary};
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            margin: 0 5px;
            font-size: 14px;
        }
        .btn:hover {
            background: ${this.colors.secondary};
        }
        .legend {
            position: absolute;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            font-size: 12px;
        }
        .legend-item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        .legend-color {
            width: 16px;
            height: 16px;
            border-radius: 2px;
            margin-right: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">OncoVista Database ERD</h1>
            <p class="subtitle">Interactive Entity Relationship Diagram</p>
        </div>
        
        <div class="controls">
            <button class="btn" onclick="resetZoom()">Reset Zoom</button>
            <button class="btn" onclick="exportSVG()">Export SVG</button>
            <button class="btn" onclick="toggleRelationships()">Toggle Relationships</button>
        </div>
        
        <div class="erd-container">
            <svg id="erd-svg" width="100%" height="600"></svg>
        </div>
        
        <div class="legend">
            <h4>Legend</h4>
            <div class="legend-item">
                <div class="legend-color" style="background: ${this.colors.accent}"></div>
                <span>Primary Key</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: ${this.colors.warning}"></div>
                <span>Foreign Key</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: ${this.colors.secondary}"></div>
                <span>Relationship</span>
            </div>
        </div>
    </div>

    <script>
        const data = ${JSON.stringify({
            tables: Array.from(this.tables.entries()).map(([name, table]) => ({
                name,
                ...table
            })),
            relationships: this.relationships
        }, null, 2)};
        
        let svg, g, zoom;
        let showRelationships = true;
        
        function initializeERD() {
            svg = d3.select("#erd-svg");
            const width = +svg.node().getBoundingClientRect().width;
            const height = +svg.node().getBoundingClientRect().height;
            
            // Define arrowhead marker
            svg.append("defs").append("marker")
                .attr("id", "arrowhead")
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 8)
                .attr("refY", 0)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M0,-5L10,0L0,5")
                .attr("fill", "${this.colors.secondary}");
            
            // Setup zoom
            zoom = d3.zoom()
                .scaleExtent([0.1, 3])
                .on("zoom", (event) => {
                    g.attr("transform", event.transform);
                });
            
            svg.call(zoom);
            
            g = svg.append("g");
            
            renderERD();
        }
        
        function renderERD() {
            const tableWidth = 200;
            const tableSpacing = 100;
            const tablesPerRow = Math.floor((svg.node().getBoundingClientRect().width - 40) / (tableWidth + tableSpacing));
            
            // Position tables
            data.tables.forEach((table, index) => {
                const row = Math.floor(index / tablesPerRow);
                const col = index % tablesPerRow;
                
                table.x = col * (tableWidth + tableSpacing) + 20;
                table.y = row * 250 + 20;
            });
            
            // Render relationships
            if (showRelationships) {
                renderRelationships();
            }
            
            // Render tables
            renderTables();
        }
        
        function renderTables() {
            const tables = g.selectAll(".table-node")
                .data(data.tables)
                .enter()
                .append("g")
                .attr("class", "table-node")
                .attr("transform", d => \`translate(\${d.x}, \${d.y})\`);
            
            // Table background
            tables.append("rect")
                .attr("class", "table-body")
                .attr("width", 200)
                .attr("height", d => 30 + d.columns.length * 20)
                .attr("rx", 6);
            
            // Table header
            tables.append("rect")
                .attr("class", "table-header")
                .attr("width", 200)
                .attr("height", 30)
                .attr("rx", 6);
            
            // Table name
            tables.append("text")
                .attr("x", 100)
                .attr("y", 20)
                .attr("text-anchor", "middle")
                .attr("fill", "white")
                .attr("font-weight", "bold")
                .attr("font-size", "14px")
                .text(d => d.name);
            
            // Columns
            tables.each(function(tableData) {
                const table = d3.select(this);
                
                tableData.columns.forEach((column, index) => {
                    const y = 50 + index * 20;
                    
                    // Column background (alternating)
                    if (index % 2 === 1) {
                        table.append("rect")
                            .attr("x", 0)
                            .attr("y", y - 10)
                            .attr("width", 200)
                            .attr("height", 20)
                            .attr("fill", "#f8fafc");
                    }
                    
                    // Column name
                    table.append("text")
                        .attr("class", \`column-text \${column.primary ? 'primary-key' : ''} \${column.foreign ? 'foreign-key' : ''}\`)
                        .attr("x", 10)
                        .attr("y", y)
                        .text(\`\${column.name} : \${column.type}\${column.nullable ? '' : ' NOT NULL'}\`);
                    
                    // Key indicators
                    if (column.primary) {
                        table.append("text")
                            .attr("x", 185)
                            .attr("y", y)
                            .attr("text-anchor", "middle")
                            .attr("fill", "${this.colors.accent}")
                            .attr("font-weight", "bold")
                            .text("PK");
                    }
                });
            });
        }
        
        function renderRelationships() {
            data.relationships.forEach(rel => {
                const fromTable = data.tables.find(t => t.name === rel.fromTable);
                const toTable = data.tables.find(t => t.name === rel.toTable);
                
                if (fromTable && toTable) {
                    g.append("line")
                        .attr("class", "relationship-line")
                        .attr("x1", fromTable.x + 200)
                        .attr("y1", fromTable.y + 50)
                        .attr("x2", toTable.x)
                        .attr("y2", toTable.y + 50);
                }
            });
        }
        
        function resetZoom() {
            svg.transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity
            );
        }
        
        function exportSVG() {
            const svgNode = svg.node();
            const svgData = new XMLSerializer().serializeToString(svgNode);
            const blob = new Blob([svgData], {type: "image/svg+xml"});
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement("a");
            link.href = url;
            link.download = "oncovista-erd.svg";
            link.click();
        }
        
        function toggleRelationships() {
            showRelationships = !showRelationships;
            g.selectAll(".relationship-line").remove();
            if (showRelationships) {
                renderRelationships();
            }
        }
        
        // Initialize when page loads
        initializeERD();
    </script>
</body>
</html>
        `;
        
        fs.writeFileSync(outputFile, html);
        console.log(`✅ Interactive HTML ERD saved: ${outputFile}`);
        return outputFile;
    }

    /**
     * 🎯 Generate DOT format for Graphviz
     */
    generateDOT(outputFile) {
        let dot = 'digraph OncoVistaERD {\n';
        dot += '    rankdir=TB;\n';
        dot += '    node [shape=record, style=filled, fillcolor=lightblue];\n';
        dot += '    edge [color=darkblue, penwidth=2];\n\n';
        
        // Add tables
        this.tables.forEach((table, tableName) => {
            dot += `    ${tableName} [label="{${tableName}|`;
            
            table.columns.forEach((column, index) => {
                if (index > 0) dot += '\\l';
                dot += `${column.name} : ${column.type}`;
                if (column.primary) dot += ' (PK)';
                if (column.foreign) dot += ' (FK)';
            });
            
            dot += '\\l}"];\n';
        });
        
        dot += '\n';
        
        // Add relationships
        this.relationships.forEach(rel => {
            dot += `    ${rel.fromTable} -> ${rel.toTable} [label="${rel.fromColumn} -> ${rel.toColumn}"];\n`;
        });
        
        dot += '}\n';
        
        fs.writeFileSync(outputFile, dot);
        console.log(`✅ DOT ERD saved: ${outputFile}`);
        return outputFile;
    }

    /**
     * 📊 Create SVG ERD
     */
    createSVGERD() {
        const tableWidth = 200;
        const tableSpacing = 100;
        const tablesPerRow = 4;
        const totalWidth = tablesPerRow * (tableWidth + tableSpacing);
        const totalHeight = Math.ceil(this.tables.size / tablesPerRow) * 250;
        
        let svg = `<svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">`;
        svg += '<defs>';
        svg += '<marker id="arrowhead" viewBox="0 -5 10 10" refX="8" refY="0" markerWidth="6" markerHeight="6" orient="auto">';
        svg += `<path d="M0,-5L10,0L0,5" fill="${this.colors.secondary}"/>`;
        svg += '</marker>';
        svg += '</defs>';
        
        // Render tables
        const tables = Array.from(this.tables.entries());
        tables.forEach(([tableName, table], index) => {
            const row = Math.floor(index / tablesPerRow);
            const col = index % tablesPerRow;
            const x = col * (tableWidth + tableSpacing) + 20;
            const y = row * 250 + 20;
            
            svg += this.renderSVGTable(table, x, y);
        });
        
        // Render relationships
        tables.forEach(([tableName, table], fromIndex) => {
            const fromRow = Math.floor(fromIndex / tablesPerRow);
            const fromCol = fromIndex % tablesPerRow;
            const fromX = fromCol * (tableWidth + tableSpacing) + 20;
            const fromY = fromRow * 250 + 20;
            
            this.relationships.forEach(rel => {
                if (rel.fromTable === tableName) {
                    const toIndex = tables.findIndex(([name]) => name === rel.toTable);
                    if (toIndex !== -1) {
                        const toRow = Math.floor(toIndex / tablesPerRow);
                        const toCol = toIndex % tablesPerRow;
                        const toX = toCol * (tableWidth + tableSpacing) + 20;
                        const toY = toRow * 250 + 20;
                        
                        svg += `<line x1="${fromX + tableWidth}" y1="${fromY + 50}" x2="${toX}" y2="${toY + 50}" 
                                stroke="${this.colors.secondary}" stroke-width="2" marker-end="url(#arrowhead)"/>`;
                    }
                }
            });
        });
        
        svg += '</svg>';
        return svg;
    }

    /**
     * 🏗️ Render SVG table
     */
    renderSVGTable(table, x, y) {
        const tableHeight = 30 + table.columns.length * 20;
        
        let svg = `<g transform="translate(${x}, ${y})">`;
        
        // Table background
        svg += `<rect width="200" height="${tableHeight}" fill="white" stroke="${this.colors.neutral}" stroke-width="1" rx="6"/>`;
        
        // Table header
        svg += `<rect width="200" height="30" fill="${this.colors.primary}" rx="6"/>`;
        
        // Table name
        svg += `<text x="100" y="20" text-anchor="middle" fill="white" font-weight="bold" font-size="14">${table.name}</text>`;
        
        // Columns
        table.columns.forEach((column, index) => {
            const columnY = 50 + index * 20;
            
            // Alternating background
            if (index % 2 === 1) {
                svg += `<rect x="0" y="${columnY - 10}" width="200" height="20" fill="#f8fafc"/>`;
            }
            
            // Column text
            const color = column.primary ? this.colors.accent : 
                         column.foreign ? this.colors.warning : '#374151';
            const weight = column.primary ? 'bold' : 'normal';
            
            svg += `<text x="10" y="${columnY}" fill="${color}" font-weight="${weight}" font-size="12">
                    ${column.name} : ${column.type}${column.nullable ? '' : ' NOT NULL'}
                    </text>`;
            
            // Key indicators
            if (column.primary) {
                svg += `<text x="185" y="${columnY}" text-anchor="middle" fill="${this.colors.accent}" font-weight="bold" font-size="10">PK</text>`;
            }
        });
        
        svg += '</g>';
        return svg;
    }

    // Helper methods
    extractDefaultValue(modifiers) {
        const defaultMatch = modifiers.match(/DEFAULT\s+([^,\s]+)/i);
        return defaultMatch ? defaultMatch[1] : null;
    }

    mapDrizzleType(type) {
        const typeMap = {
            'serial': 'SERIAL',
            'integer': 'INTEGER',
            'text': 'TEXT',
            'varchar': 'VARCHAR',
            'boolean': 'BOOLEAN',
            'timestamp': 'TIMESTAMP',
            'date': 'DATE',
            'uuid': 'UUID'
        };
        
        return typeMap[type.toLowerCase()] || type.toUpperCase();
    }

    extractDrizzleDefault(modifiers) {
        if (!modifiers) return null;
        const defaultMatch = modifiers.match(/default\([^)]+\)/);
        return defaultMatch ? defaultMatch[0] : null;
    }

    findTableForConstraint(content, position) {
        const beforeConstraint = content.substring(0, position);
        const tableMatch = beforeConstraint.match(/CREATE TABLE\s+(\w+)/gi);
        return tableMatch ? tableMatch[tableMatch.length - 1].split(' ')[2] : 'unknown';
    }

    findDrizzleColumnContext(content, position) {
        const beforeRef = content.substring(0, position);
        
        // Find the column definition
        const columnMatch = beforeRef.match(/(\w+):\s*[\w.()]+$/);
        if (!columnMatch) return null;
        
        // Find the table definition
        const tableMatch = beforeRef.match(/export const (\w+) = (?:pgTable|mysqlTable)\s*\(\s*['"`]([^'"`]+)['"`]/);
        if (!tableMatch) return null;
        
        return {
            table: tableMatch[2],
            column: columnMatch[1]
        };
    }

    getTableNameFromVariable(content, varName) {
        const match = content.match(new RegExp(`export const ${varName} = (?:pgTable|mysqlTable)\\s*\\(\\s*['"\`]([^'"\`]+)['"\`]`));
        return match ? match[1] : varName;
    }

    getMermaidTypeAnnotation(column) {
        let annotation = column.type;
        if (!column.nullable) annotation += ' NOT NULL';
        if (column.defaultValue) annotation += ` DEFAULT ${column.defaultValue}`;
        return annotation;
    }

    getMermaidKeyAnnotation(column) {
        if (column.primary) return 'PK';
        if (column.foreign) return 'FK';
        if (column.unique) return 'UK';
        return '';
    }

    getMermaidRelationship(rel) {
        switch (rel.cardinality) {
            case 'one_to_one': return '||--||';
            case 'one_to_many': return '||--o{';
            case 'many_to_one': return '}o--||';
            case 'many_to_many': return '}o--o{';
            default: return '}o--||';
        }
    }

    /**
     * 📈 Generate database statistics
     */
    generateStatistics() {
        const stats = {
            tables: this.tables.size,
            relationships: this.relationships.length,
            constraints: this.constraints.length,
            indexes: this.indexes.length,
            totalColumns: Array.from(this.tables.values()).reduce((sum, table) => sum + table.columns.length, 0),
            primaryKeys: Array.from(this.tables.values()).filter(table => table.primaryKey.length > 0).length,
            foreignKeys: this.relationships.filter(rel => rel.type === 'foreign_key').length,
            uniqueConstraints: this.constraints.filter(c => c.type === 'unique').length,
            tablesWithoutPK: Array.from(this.tables.values()).filter(table => table.primaryKey.length === 0).length,
            orphanTables: Array.from(this.tables.keys()).filter(tableName => 
                !this.relationships.some(rel => rel.fromTable === tableName || rel.toTable === tableName)
            ).length
        };
        
        console.log('\n📊 DATABASE STATISTICS:');
        console.log(`   Tables: ${stats.tables}`);
        console.log(`   Relationships: ${stats.relationships}`);
        console.log(`   Total Columns: ${stats.totalColumns}`);
        console.log(`   Primary Keys: ${stats.primaryKeys}`);
        console.log(`   Foreign Keys: ${stats.foreignKeys}`);
        console.log(`   Unique Constraints: ${stats.uniqueConstraints}`);
        console.log(`   Tables without PK: ${stats.tablesWithoutPK}`);
        console.log(`   Orphan Tables: ${stats.orphanTables}`);
        
        return stats;
    }
}

// CLI Interface
async function main() {
    const pathologist = new ERDPathologist();
    const args = process.argv.slice(2);
    const command = args[0];

    console.log('🧬 OncoVista ERD Live Generator');
    console.log('═'.repeat(50));

    switch (command) {
        case 'analyze':
            const source = args[1] || './';
            await pathologist.analyzeSchema(source);
            pathologist.generateStatistics();
            
            // Save analysis
            const analysisData = {
                tables: Array.from(pathologist.tables.entries()),
                relationships: pathologist.relationships,
                constraints: pathologist.constraints
            };
            fs.writeFileSync('schema-analysis.json', JSON.stringify(analysisData, null, 2));
            console.log('✅ Schema analysis saved to schema-analysis.json');
            break;

        case 'generate':
            const srcPath = args[1] || './';
            const format = args[2] || 'svg';
            const output = args[3] || `erd.${format}`;
            
            await pathologist.analyzeSchema(srcPath);
            await pathologist.generateERD(format, output);
            break;

        case 'html':
            const htmlSrc = args[1] || './';
            const htmlOutput = args[2] || 'erd.html';
            
            await pathologist.analyzeSchema(htmlSrc);
            await pathologist.generateERD('html', htmlOutput);
            break;

        case 'all-formats':
            const allSrc = args[1] || './';
            
            await pathologist.analyzeSchema(allSrc);
            
            console.log('🧪 Generating ERD in all formats...');
            await pathologist.generateERD('svg', 'erd.svg');
            await pathologist.generateERD('mermaid', 'erd.mmd');
            await pathologist.generateERD('html', 'erd.html');
            await pathologist.generateERD('dot', 'erd.dot');
            
            pathologist.generateStatistics();
            console.log('✅ All formats generated');
            break;

        default:
            console.log(`
Usage: erd_generator.js <command> [options]

Commands:
  analyze [source]                  🔬 Analyze database schema structure
  generate [source] [format] [out]  🎨 Generate ERD in specific format
  html [source] [output]            🌐 Generate interactive HTML ERD
  all-formats [source]              🧪 Generate ERD in all supported formats

Formats: svg, mermaid, html, dot, png

Examples:
  ./erd_generator.js analyze ./
  ./erd_generator.js generate ./ svg oncovista-erd.svg
  ./erd_generator.js html ./ interactive-erd.html
  ./erd_generator.js all-formats ./
            `);
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = ERDPathologist;
