#!/usr/bin/env node
/**
 * OncoVista Swagger Documentation Generator
 * Auto-generates OpenAPI specifications from route handlers
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SwaggerPathologist {
    constructor() {
        this.routes = new Map();
        this.schemas = new Map();
        this.endpoints = [];
        this.security = {};
        
        this.httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];
        
        this.openApiSpec = {
            openapi: '3.0.3',
            info: {
                title: 'OncoVista API',
                description: 'Medical-grade oncology management system API',
                version: '1.0.0',
                contact: {
                    name: 'OncoVista Team',
                    email: 'api@oncovista.app'
                },
                license: {
                    name: 'MIT',
                    url: 'https://opensource.org/licenses/MIT'
                }
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Development server'
                },
                {
                    url: 'https://api.oncovista.app',
                    description: 'Production server'
                }
            ],
            paths: {},
            components: {
                schemas: {},
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    },
                    apiKey: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'X-API-Key'
                    }
                },
                responses: {
                    UnauthorizedError: {
                        description: 'Access token is missing or invalid',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        error: { type: 'string', example: 'Unauthorized' },
                                        message: { type: 'string', example: 'Invalid or missing authentication token' }
                                    }
                                }
                            }
                        }
                    },
                    NotFoundError: {
                        description: 'Resource not found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        error: { type: 'string', example: 'Not Found' },
                                        message: { type: 'string', example: 'The requested resource was not found' }
                                    }
                                }
                            }
                        }
                    },
                    ValidationError: {
                        description: 'Validation error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        error: { type: 'string', example: 'Validation Error' },
                                        message: { type: 'string', example: 'Request validation failed' },
                                        details: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    field: { type: 'string' },
                                                    message: { type: 'string' }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            security: [
                { bearerAuth: [] }
            ]
        };
    }

    /**
     * 🔬 Analyze API routes from source code
     */
    async analyzeAPIRoutes(sourceDir = './server') {
        console.log('🔬 ANALYSIS: Examining API route pathology...');
        
        const routeFiles = await this.findRouteFiles(sourceDir);
        
        for (const file of routeFiles) {
            console.log(`📋 Analyzing: ${file}`);
            await this.analyzeRouteFile(file);
        }
        
        console.log(`✅ Analyzed ${this.endpoints.length} endpoints from ${routeFiles.length} files`);
        return this.endpoints;
    }

    /**
     * 📁 Find route files in the codebase
     */
    async findRouteFiles(dir) {
        const routeFiles = [];
        const extensions = ['.js', '.ts', '.jsx', '.tsx'];
        
        const scanRecursive = (currentDir) => {
            const items = fs.readdirSync(currentDir);
            
            items.forEach(item => {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    scanRecursive(fullPath);
                } else if (extensions.some(ext => item.endsWith(ext))) {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    
                    // Check if file contains route definitions
                    if (this.isRouteFile(content)) {
                        routeFiles.push(fullPath);
                    }
                }
            });
        };
        
        scanRecursive(dir);
        return routeFiles;
    }

    /**
     * 🧪 Check if file contains route definitions
     */
    isRouteFile(content) {
        const routeIndicators = [
            /router\.(get|post|put|delete|patch)/i,
            /app\.(get|post|put|delete|patch)/i,
            /\.route\(/i,
            /@(Get|Post|Put|Delete|Patch)\(/i, // Decorators
            /express\.Router/i,
            /fastify\.register/i
        ];
        
        return routeIndicators.some(pattern => pattern.test(content));
    }

    /**
     * 🩺 Analyze individual route file
     */
    async analyzeRouteFile(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const framework = this.detectFramework(content);
        
        switch (framework) {
            case 'express':
                this.analyzeExpressRoutes(content, filePath);
                break;
            case 'fastify':
                this.analyzeFastifyRoutes(content, filePath);
                break;
            case 'nestjs':
                this.analyzeNestJSRoutes(content, filePath);
                break;
            default:
                this.analyzeGenericRoutes(content, filePath);
        }
    }

    /**
     * 🧬 Detect API framework
     */
    detectFramework(content) {
        if (content.includes('@Controller') || content.includes('@Get(') || content.includes('@Post(')) {
            return 'nestjs';
        } else if (content.includes('fastify.register') || content.includes('fastify.route')) {
            return 'fastify';
        } else if (content.includes('express.Router') || content.includes('router.get') || content.includes('app.get')) {
            return 'express';
        }
        return 'generic';
    }

    /**
     * 🌐 Analyze Express.js routes
     */
    analyzeExpressRoutes(content, filePath) {
        // Match Express route patterns
        const routePattern = /(router|app)\.(get|post|put|delete|patch|options|head)\s*\(\s*['"`]([^'"`]+)['"`]\s*,?\s*(.*?)(?=\n|$)/gi;
        
        let match;
        while ((match = routePattern.exec(content)) !== null) {
            const [, , method, path, handlerCode] = match;
            
            const endpoint = {
                method: method.toUpperCase(),
                path: this.normalizePath(path),
                file: filePath,
                framework: 'express',
                handler: handlerCode.trim(),
                parameters: this.extractParameters(path),
                requestBody: this.extractRequestBody(handlerCode),
                responses: this.extractResponses(handlerCode),
                middleware: this.extractMiddleware(handlerCode),
                security: this.extractSecurity(handlerCode),
                description: this.extractDescription(handlerCode),
                tags: this.extractTags(filePath, path)
            };
            
            this.endpoints.push(endpoint);
        }
    }

    /**
     * ⚡ Analyze Fastify routes
     */
    analyzeFastifyRoutes(content, filePath) {
        // Match Fastify route patterns
        const routePattern = /fastify\.(get|post|put|delete|patch|options|head)\s*\(\s*['"`]([^'"`]+)['"`]\s*,?\s*(.*?)(?=\n|fastify\.)/gis;
        
        let match;
        while ((match = routePattern.exec(content)) !== null) {
            const [, method, path, handlerCode] = match;
            
            const endpoint = {
                method: method.toUpperCase(),
                path: this.normalizePath(path),
                file: filePath,
                framework: 'fastify',
                handler: handlerCode.trim(),
                parameters: this.extractParameters(path),
                requestBody: this.extractRequestBody(handlerCode),
                responses: this.extractResponses(handlerCode),
                schema: this.extractFastifySchema(handlerCode),
                security: this.extractSecurity(handlerCode),
                description: this.extractDescription(handlerCode),
                tags: this.extractTags(filePath, path)
            };
            
            this.endpoints.push(endpoint);
        }
    }

    /**
     * 🏗️ Analyze NestJS routes
     */
    analyzeNestJSRoutes(content, filePath) {
        // Extract controller base path
        const controllerMatch = content.match(/@Controller\s*\(\s*['"`]([^'"`]*)['"`]\s*\)/);
        const basePath = controllerMatch ? controllerMatch[1] : '';
        
        // Match NestJS decorator patterns
        const routePattern = /@(Get|Post|Put|Delete|Patch)\s*\(\s*(?:['"`]([^'"`]*)['"`])?\s*\)\s*\n\s*(\w+)\s*\(/g;
        
        let match;
        while ((match = routePattern.exec(content)) !== null) {
            const [, method, routePath, handlerName] = match;
            const fullPath = basePath + (routePath || '');
            
            // Extract method body
            const methodBodyMatch = content.match(new RegExp(`${handlerName}\\s*\\([^)]*\\)\\s*\\{([^}]+)\\}`, 's'));
            const handlerCode = methodBodyMatch ? methodBodyMatch[1] : '';
            
            const endpoint = {
                method: method.toUpperCase(),
                path: this.normalizePath(fullPath),
                file: filePath,
                framework: 'nestjs',
                handler: handlerCode.trim(),
                handlerName,
                parameters: this.extractParameters(fullPath),
                requestBody: this.extractRequestBody(handlerCode),
                responses: this.extractResponses(handlerCode),
                decorators: this.extractDecorators(content, handlerName),
                security: this.extractSecurity(handlerCode),
                description: this.extractDescription(handlerCode),
                tags: this.extractTags(filePath, fullPath)
            };
            
            this.endpoints.push(endpoint);
        }
    }

    /**
     * 🔍 Analyze generic route patterns
     */
    analyzeGenericRoutes(content, filePath) {
        // Look for common HTTP method patterns
        this.httpMethods.forEach(method => {
            const pattern = new RegExp(`(${method.toLowerCase()}|${method.toUpperCase()})\\s*\\([^)]*['"\`]([^'"\`]+)['"\`]`, 'g');
            
            let match;
            while ((match = pattern.exec(content)) !== null) {
                const [, , path] = match;
                
                const endpoint = {
                    method: method,
                    path: this.normalizePath(path),
                    file: filePath,
                    framework: 'generic',
                    handler: '',
                    parameters: this.extractParameters(path),
                    description: `${method} endpoint for ${path}`,
                    tags: this.extractTags(filePath, path)
                };
                
                this.endpoints.push(endpoint);
            }
        });
    }

    /**
     * 🧬 Generate OpenAPI specification
     */
    generateOpenAPISpec() {
        console.log('🧬 GENERATION: Creating OpenAPI specification...');
        
        // Group endpoints by path
        const pathGroups = new Map();
        
        this.endpoints.forEach(endpoint => {
            if (!pathGroups.has(endpoint.path)) {
                pathGroups.set(endpoint.path, {});
            }
            
            const pathObj = pathGroups.get(endpoint.path);
            pathObj[endpoint.method.toLowerCase()] = this.generatePathOperation(endpoint);
        });
        
        // Add to OpenAPI spec
        pathGroups.forEach((methods, path) => {
            this.openApiSpec.paths[path] = methods;
        });
        
        // Generate schemas
        this.generateSchemas();
        
        console.log(`✅ Generated OpenAPI spec with ${Object.keys(this.openApiSpec.paths).length} paths`);
        return this.openApiSpec;
    }

    /**
     * 🔧 Generate path operation
     */
    generatePathOperation(endpoint) {
        const operation = {
            summary: endpoint.description || `${endpoint.method} ${endpoint.path}`,
            description: this.generateOperationDescription(endpoint),
            tags: endpoint.tags,
            operationId: this.generateOperationId(endpoint),
            parameters: this.generateParameters(endpoint),
            responses: this.generateResponses(endpoint)
        };
        
        // Add request body for POST/PUT/PATCH
        if (['POST', 'PUT', 'PATCH'].includes(endpoint.method) && endpoint.requestBody) {
            operation.requestBody = this.generateRequestBody(endpoint);
        }
        
        // Add security if required
        if (endpoint.security && endpoint.security.length > 0) {
            operation.security = endpoint.security;
        }
        
        return operation;
    }

    /**
     * 📋 Generate operation description
     */
    generateOperationDescription(endpoint) {
        let description = endpoint.description || '';
        
        if (endpoint.file) {
            description += `\n\nSource: ${endpoint.file}`;
        }
        
        if (endpoint.framework) {
            description += `\nFramework: ${endpoint.framework}`;
        }
        
        return description.trim();
    }

    /**
     * 🆔 Generate operation ID
     */
    generateOperationId(endpoint) {
        // Convert path to camelCase operation ID
        const pathParts = endpoint.path.split('/').filter(part => part && !part.startsWith(':'));
        const method = endpoint.method.toLowerCase();
        
        let operationId = method;
        pathParts.forEach(part => {
            operationId += part.charAt(0).toUpperCase() + part.slice(1);
        });
        
        return operationId;
    }

    /**
     * 📊 Generate parameters
     */
    generateParameters(endpoint) {
        const parameters = [];
        
        // Path parameters
        endpoint.parameters.path.forEach(param => {
            parameters.push({
                name: param,
                in: 'path',
                required: true,
                schema: { type: 'string' },
                description: `${param} identifier`
            });
        });
        
        // Query parameters (extract from handler code)
        const queryParams = this.extractQueryParameters(endpoint.handler);
        queryParams.forEach(param => {
            parameters.push({
                name: param.name,
                in: 'query',
                required: param.required || false,
                schema: { type: param.type || 'string' },
                description: param.description || `${param.name} parameter`
            });
        });
        
        return parameters;
    }

    /**
     * 📝 Generate request body
     */
    generateRequestBody(endpoint) {
        return {
            description: 'Request body',
            required: true,
            content: {
                'application/json': {
                    schema: this.generateRequestBodySchema(endpoint)
                }
            }
        };
    }

    /**
     * 📋 Generate responses
     */
    generateResponses(endpoint) {
        const responses = {
            '200': {
                description: 'Successful response',
                content: {
                    'application/json': {
                        schema: this.generateResponseSchema(endpoint)
                    }
                }
            }
        };
        
        // Add common error responses
        if (endpoint.security && endpoint.security.length > 0) {
            responses['401'] = { $ref: '#/components/responses/UnauthorizedError' };
        }
        
        responses['404'] = { $ref: '#/components/responses/NotFoundError' };
        responses['400'] = { $ref: '#/components/responses/ValidationError' };
        
        return responses;
    }

    /**
     * 🧪 Generate schemas
     */
    generateSchemas() {
        // Generate common OncoVista schemas
        this.openApiSpec.components.schemas = {
            Patient: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    dateOfBirth: { type: 'string', format: 'date' },
                    medicalRecordNumber: { type: 'string' },
                    diagnosis: { type: 'string' },
                    stage: { type: 'string' },
                    status: { type: 'string', enum: ['active', 'inactive', 'completed'] },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' }
                },
                required: ['firstName', 'lastName', 'medicalRecordNumber']
            },
            Treatment: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    patientId: { type: 'string', format: 'uuid' },
                    protocol: { type: 'string' },
                    startDate: { type: 'string', format: 'date' },
                    endDate: { type: 'string', format: 'date' },
                    status: { type: 'string', enum: ['planned', 'active', 'completed', 'cancelled'] },
                    notes: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' }
                },
                required: ['patientId', 'protocol', 'startDate']
            },
            Medication: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    dosage: { type: 'string' },
                    frequency: { type: 'string' },
                    route: { type: 'string' },
                    sideEffects: { type: 'array', items: { type: 'string' } },
                    contraindications: { type: 'array', items: { type: 'string' } },
                    approved: { type: 'boolean' }
                },
                required: ['name', 'dosage', 'frequency']
            },
            Protocol: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    cancerType: { type: 'string' },
                    stage: { type: 'string' },
                    medications: { 
                        type: 'array', 
                        items: { $ref: '#/components/schemas/Medication' }
                    },
                    duration: { type: 'string' },
                    cycles: { type: 'integer' },
                    approved: { type: 'boolean' }
                },
                required: ['name', 'cancerType', 'medications']
            },
            User: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    email: { type: 'string', format: 'email' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    role: { type: 'string', enum: ['admin', 'doctor', 'nurse', 'pharmacist', 'viewer'] },
                    department: { type: 'string' },
                    isActive: { type: 'boolean' },
                    lastLogin: { type: 'string', format: 'date-time' }
                },
                required: ['email', 'firstName', 'lastName', 'role']
            },
            Error: {
                type: 'object',
                properties: {
                    error: { type: 'string' },
                    message: { type: 'string' },
                    details: { type: 'object' },
                    timestamp: { type: 'string', format: 'date-time' }
                }
            }
        };
    }

    // Helper methods for extraction
    normalizePath(path) {
        // Convert Express/Fastify parameter syntax to OpenAPI
        return path.replace(/:(\w+)/g, '{$1}');
    }

    extractParameters(path) {
        const pathParams = [];
        const matches = path.match(/:(\w+)/g) || [];
        matches.forEach(match => {
            pathParams.push(match.substring(1));
        });
        
        return {
            path: pathParams,
            query: []
        };
    }

    extractRequestBody(handlerCode) {
        // Look for req.body usage
        if (handlerCode.includes('req.body') || handlerCode.includes('request.body')) {
            return { detected: true };
        }
        return null;
    }

    extractResponses(handlerCode) {
        const responses = [];
        
        // Look for response patterns
        const responsePatterns = [
            /res\.status\((\d+)\)/g,
            /reply\.code\((\d+)\)/g,
            /return.*status\((\d+)\)/g
        ];
        
        responsePatterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(handlerCode)) !== null) {
                const statusCode = match[1];
                if (!responses.includes(statusCode)) {
                    responses.push(statusCode);
                }
            }
        });
        
        return responses;
    }

    extractMiddleware(handlerCode) {
        const middleware = [];
        
        // Common middleware patterns
        if (handlerCode.includes('authenticate') || handlerCode.includes('auth')) {
            middleware.push('authentication');
        }
        if (handlerCode.includes('validate') || handlerCode.includes('validation')) {
            middleware.push('validation');
        }
        if (handlerCode.includes('authorize') || handlerCode.includes('permission')) {
            middleware.push('authorization');
        }
        
        return middleware;
    }

    extractSecurity(handlerCode) {
        const security = [];
        
        if (handlerCode.includes('token') || handlerCode.includes('jwt') || handlerCode.includes('bearer')) {
            security.push({ bearerAuth: [] });
        }
        if (handlerCode.includes('api-key') || handlerCode.includes('apikey')) {
            security.push({ apiKey: [] });
        }
        
        return security;
    }

    extractDescription(handlerCode) {
        // Look for comments or docstrings
        const commentPatterns = [
            /\/\*\*(.*?)\*\//s,
            /\/\*(.*?)\*\//s,
            /\/\/ (.*?)$/m
        ];
        
        for (const pattern of commentPatterns) {
            const match = handlerCode.match(pattern);
            if (match) {
                return match[1].trim().replace(/\*/g, '').trim();
            }
        }
        
        return null;
    }

    extractTags(filePath, path) {
        // Generate tags based on file path and route path
        const tags = [];
        
        // Extract from file path
        const pathParts = filePath.split('/');
        const fileName = path.basename(filePath, path.extname(filePath));
        
        if (fileName !== 'index' && fileName !== 'routes') {
            tags.push(fileName);
        }
        
        // Extract from route path
        const routeParts = path.split('/').filter(part => part && !part.startsWith(':') && !part.startsWith('{'));
        if (routeParts.length > 0) {
            tags.push(routeParts[0]);
        }
        
        return tags.length > 0 ? tags : ['api'];
    }

    extractQueryParameters(handlerCode) {
        const params = [];
        
        // Look for query parameter usage
        const patterns = [
            /req\.query\.(\w+)/g,
            /request\.query\.(\w+)/g,
            /query\.(\w+)/g
        ];
        
        patterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(handlerCode)) !== null) {
                const paramName = match[1];
                if (!params.find(p => p.name === paramName)) {
                    params.push({
                        name: paramName,
                        type: 'string',
                        required: false
                    });
                }
            }
        });
        
        return params;
    }

    extractFastifySchema(handlerCode) {
        // Look for Fastify schema definitions
        const schemaMatch = handlerCode.match(/schema:\s*\{([^}]+)\}/s);
        if (schemaMatch) {
            return schemaMatch[1];
        }
        return null;
    }

    extractDecorators(content, handlerName) {
        const decorators = [];
        
        // Find decorators for the specific handler
        const methodMatch = content.match(new RegExp(`((?:@\\w+.*?\\n\\s*)*?)${handlerName}\\s*\\(`, 's'));
        if (methodMatch) {
            const decoratorText = methodMatch[1];
            const decoratorMatches = decoratorText.match(/@(\w+)(?:\([^)]*\))?/g) || [];
            decorators.push(...decoratorMatches);
        }
        
        return decorators;
    }

    generateRequestBodySchema(endpoint) {
        // Generate schema based on endpoint context
        const path = endpoint.path.toLowerCase();
        
        if (path.includes('patient')) {
            return { $ref: '#/components/schemas/Patient' };
        } else if (path.includes('treatment')) {
            return { $ref: '#/components/schemas/Treatment' };
        } else if (path.includes('medication')) {
            return { $ref: '#/components/schemas/Medication' };
        } else if (path.includes('protocol')) {
            return { $ref: '#/components/schemas/Protocol' };
        } else if (path.includes('user')) {
            return { $ref: '#/components/schemas/User' };
        }
        
        return {
            type: 'object',
            properties: {
                data: { type: 'object' }
            }
        };
    }

    generateResponseSchema(endpoint) {
        const path = endpoint.path.toLowerCase();
        const method = endpoint.method.toLowerCase();
        
        if (method === 'get') {
            if (path.includes('patient')) {
                return path.includes('/{') ? 
                    { $ref: '#/components/schemas/Patient' } :
                    { type: 'array', items: { $ref: '#/components/schemas/Patient' } };
            } else if (path.includes('treatment')) {
                return path.includes('/{') ? 
                    { $ref: '#/components/schemas/Treatment' } :
                    { type: 'array', items: { $ref: '#/components/schemas/Treatment' } };
            } else if (path.includes('medication')) {
                return path.includes('/{') ? 
                    { $ref: '#/components/schemas/Medication' } :
                    { type: 'array', items: { $ref: '#/components/schemas/Medication' } };
            }
        }
        
        return {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                data: { type: 'object' },
                message: { type: 'string' }
            }
        };
    }

    /**
     * 💾 Save OpenAPI specification
     */
    saveOpenAPISpec(outputFile = 'swagger.json') {
        const spec = this.generateOpenAPISpec();
        
        // Save JSON
        fs.writeFileSync(outputFile, JSON.stringify(spec, null, 2));
        console.log(`✅ OpenAPI spec saved: ${outputFile}`);
        
        // Also save YAML version
        const yamlFile = outputFile.replace('.json', '.yaml');
        try {
            const yaml = this.convertToYAML(spec);
            fs.writeFileSync(yamlFile, yaml);
            console.log(`✅ OpenAPI spec saved: ${yamlFile}`);
        } catch (error) {
            console.log(`⚠️  Could not save YAML version: ${error.message}`);
        }
        
        return spec;
    }

    /**
     * 📊 Generate API documentation
     */
    generateDocumentation(outputDir = './docs/api') {
        console.log('📊 DOCUMENTATION: Generating API docs...');
        
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const spec = this.generateOpenAPISpec();
        
        // Generate HTML documentation
        const htmlDoc = this.generateHTMLDocumentation(spec);
        fs.writeFileSync(path.join(outputDir, 'index.html'), htmlDoc);
        
        // Generate markdown documentation
        const markdownDoc = this.generateMarkdownDocumentation(spec);
        fs.writeFileSync(path.join(outputDir, 'API.md'), markdownDoc);
        
        console.log(`✅ API documentation generated in ${outputDir}`);
        return outputDir;
    }

    convertToYAML(obj) {
        // Simple YAML conversion (would normally use a library)
        return JSON.stringify(obj, null, 2)
            .replace(/"/g, '')
            .replace(/,$/gm, '')
            .replace(/\{$/gm, '')
            .replace(/\}$/gm, '');
    }

    generateHTMLDocumentation(spec) {
        return `
<!DOCTYPE html>
<html>
<head>
    <title>${spec.info.title} - API Documentation</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@3.25.0/swagger-ui.css" />
    <style>
        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin:0; background: #fafafa; }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@3.25.0/swagger-ui-bundle.js"></script>
    <script>
        window.onload = function() {
            const ui = SwaggerUIBundle({
                spec: ${JSON.stringify(spec, null, 2)},
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIBundle.presets.standalone
                ],
                plugins: [
                    SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: "StandaloneLayout"
            });
        };
    </script>
</body>
</html>
        `;
    }

    generateMarkdownDocumentation(spec) {
        let markdown = `# ${spec.info.title}\n\n`;
        markdown += `${spec.info.description}\n\n`;
        markdown += `Version: ${spec.info.version}\n\n`;
        
        // Add table of contents
        markdown += `## Table of Contents\n\n`;
        const tags = [...new Set(Object.values(spec.paths).flatMap(path => 
            Object.values(path).flatMap(op => op.tags || [])
        ))];
        
        tags.forEach(tag => {
            markdown += `- [${tag}](#${tag.toLowerCase()})\n`;
        });
        markdown += '\n';
        
        // Add endpoints by tag
        tags.forEach(tag => {
            markdown += `## ${tag}\n\n`;
            
            Object.entries(spec.paths).forEach(([path, methods]) => {
                Object.entries(methods).forEach(([method, operation]) => {
                    if (operation.tags && operation.tags.includes(tag)) {
                        markdown += `### ${method.toUpperCase()} ${path}\n\n`;
                        markdown += `${operation.summary}\n\n`;
                        
                        if (operation.description) {
                            markdown += `${operation.description}\n\n`;
                        }
                        
                        // Parameters
                        if (operation.parameters && operation.parameters.length > 0) {
                            markdown += `#### Parameters\n\n`;
                            markdown += `| Name | In | Type | Required | Description |\n`;
                            markdown += `|------|----|----|----------|-------------|\n`;
                            
                            operation.parameters.forEach(param => {
                                markdown += `| ${param.name} | ${param.in} | ${param.schema?.type || 'string'} | ${param.required ? 'Yes' : 'No'} | ${param.description || ''} |\n`;
                            });
                            markdown += '\n';
                        }
                        
                        // Responses
                        markdown += `#### Responses\n\n`;
                        Object.entries(operation.responses).forEach(([code, response]) => {
                            markdown += `**${code}**: ${response.description || 'Response'}\n\n`;
                        });
                        
                        markdown += '---\n\n';
                    }
                });
            });
        });
        
        return markdown;
    }
}

// CLI Interface
async function main() {
    const pathologist = new SwaggerPathologist();
    const args = process.argv.slice(2);
    const command = args[0];

    console.log('📋 OncoVista Swagger Documentation Generator');
    console.log('═'.repeat(50));

    switch (command) {
        case 'analyze':
            const sourceDir = args[1] || './server';
            await pathologist.analyzeAPIRoutes(sourceDir);
            console.log(`Found ${pathologist.endpoints.length} endpoints`);
            
            // Save analysis results
            fs.writeFileSync('api-analysis.json', JSON.stringify(pathologist.endpoints, null, 2));
            console.log('✅ Analysis saved to api-analysis.json');
            break;

        case 'generate':
            const source = args[1] || './server';
            const output = args[2] || 'swagger.json';
            
            await pathologist.analyzeAPIRoutes(source);
            pathologist.saveOpenAPISpec(output);
            break;

        case 'docs':
            const srcDir = args[1] || './server';
            const docsDir = args[2] || './docs/api';
            
            await pathologist.analyzeAPIRoutes(srcDir);
            pathologist.generateDocumentation(docsDir);
            break;

        case 'full':
            console.log('🧪 Running complete Swagger generation...');
            const srcDirectory = args[1] || './server';
            
            await pathologist.analyzeAPIRoutes(srcDirectory);
            pathologist.saveOpenAPISpec('swagger.json');
            pathologist.generateDocumentation('./docs/api');
            
            console.log('✅ Complete Swagger documentation generated');
            break;

        default:
            console.log(`
Usage: swagger_generator.js <command> [options]

Commands:
  analyze [source-dir]              🔬 Analyze API routes and save results
  generate [source-dir] [output]    🧬 Generate OpenAPI specification
  docs [source-dir] [docs-dir]      📊 Generate HTML/Markdown documentation
  full [source-dir]                 🧪 Complete analysis and documentation

Examples:
  ./swagger_generator.js analyze ./server
  ./swagger_generator.js generate ./server swagger.json
  ./swagger_generator.js docs ./server ./docs/api
  ./swagger_generator.js full ./server
            `);
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = SwaggerPathologist;
