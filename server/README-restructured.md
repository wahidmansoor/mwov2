# OncoVista API Server - Restructured

## 🚀 Overview

This is the restructured OncoVista API server following modern Node.js/Express.js best practices for medical decision support systems. The server provides clinical calculators, protocol management, AI-powered services, and usage analytics.

## 📁 Project Structure

```
server/
├── src/
│   ├── index.ts                # Main entrypoint
│   ├── routes/
│   │   ├── index.ts            # Central route loader
│   │   ├── calculators.ts      # Calculator endpoints
│   │   ├── protocols.ts        # Protocol endpoints
│   │   ├── ai.ts               # AI service endpoints
│   │   ├── analytics.ts        # Analytics endpoints
│   │   └── health.ts           # Health check endpoints
│   ├── controllers/
│   │   ├── calculators.ts      # Calculator business logic
│   │   ├── protocols.ts        # Protocol business logic
│   │   ├── ai.ts               # AI service logic
│   │   └── analytics.ts        # Analytics logic
│   ├── services/
│   │   ├── calculatorService.ts # Calculator implementations
│   │   ├── protocolService.ts   # Protocol data management
│   │   ├── aiService.ts         # OpenAI integration
│   │   └── analyticsService.ts  # Usage tracking
│   ├── utils/
│   │   ├── logger.ts           # Structured logging
│   │   ├── errorHandler.ts     # Error handling
│   │   └── validation.ts       # Input validation schemas
│   ├── db/
│   │   ├── schema.ts           # Database schema
│   │   └── client.ts           # Database connection
│   └── tests/
│       ├── setup.ts            # Test configuration
│       ├── calculators.test.ts # Calculator tests
│       ├── protocols.test.ts   # Protocol tests
│       └── ai.test.ts          # AI service tests
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Optional: Supabase account for database
- Optional: OpenAI API key for AI features

### Environment Variables

Create a `.env` file in the server directory:

```env
NODE_ENV=development
PORT=5000
HOST=0.0.0.0

# Database (Optional - will use mock data if not provided)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Services (Optional - will use mock responses if not provided)
OPENAI_API_KEY=your_openai_api_key

# CORS
CORS_ORIGIN=http://localhost:5173

# Logging
LOG_LEVEL=info
```

### Installation

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run in development mode
npm run dev

# Run in production
npm start
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start with hot reload
npm run dev:old          # Start old version (fallback)

# Building
npm run build            # Compile TypeScript
npm run type-check       # Check types without emitting

# Testing
npm test                 # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Run with coverage report
npm run test:ui          # Run with UI

# Linting
npm run lint             # Check code style
npm run lint:fix         # Fix code style issues

# Health checks
npm run healthz          # Check if server is running

# Database
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
npm run db:studio        # Open Drizzle Studio
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test calculators

# Run with coverage
npm run test:coverage
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Basic health check
- `GET /api/health/detailed` - Detailed system status
- `GET /api/health/ready` - Readiness probe
- `GET /api/health/live` - Liveness probe
- `GET /api/health/metrics` - System metrics

### Calculators
- `POST /api/calculators/opioid-conversion` - Convert opioid dosages
- `POST /api/calculators/renal-dose-adjustment` - Adjust doses for renal function
- `POST /api/calculators/prognostic-index` - Calculate prognostic scores

### Protocols
- `GET /api/protocols/symptoms/:slug` - Get symptom management protocol
- `GET /api/protocols/emergencies/:slug` - Get emergency protocol
- `GET /api/protocols/search?q=term` - Search protocols
- `GET /api/protocols` - List all protocols

### AI Services
- `POST /api/ai/summarize-protocol` - AI-powered protocol summaries
- `POST /api/ai/explain-education` - Educational explanations
- `POST /api/ai/compare-guidelines` - Compare clinical guidelines
- `POST /api/ai/generate-treatment-plan` - Generate treatment plans

### Analytics
- `POST /api/analytics/log` - Log usage events
- `GET /api/analytics/summary` - Usage statistics
- `GET /api/analytics/trends` - Usage trends over time

## 📊 Example API Calls

### Opioid Conversion
```bash
curl -X POST http://localhost:5000/api/calculators/opioid-conversion \
  -H "Content-Type: application/json" \
  -d '{
    "drug": "morphine",
    "dose": 30,
    "target": "oxycodone"
  }'
```

### Search Protocols
```bash
curl "http://localhost:5000/api/protocols/search?q=pain&type=symptom"
```

### AI Protocol Summary
```bash
curl -X POST http://localhost:5000/api/ai/summarize-protocol \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "cancer-pain",
    "length": "brief"
  }'
```

## 🔐 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin request control
- **Rate limiting** - Request throttling
- **Input validation** - Zod schema validation
- **Error handling** - Structured error responses
- **Logging** - Request/response logging with Pino

## 📈 Monitoring & Observability

### Structured Logging
- JSON-formatted logs with Pino
- Request/response logging
- Error tracking with stack traces
- Performance monitoring

### Health Checks
- Basic health endpoint for load balancers
- Detailed system diagnostics
- Kubernetes-ready probes
- Metrics endpoint for monitoring systems

### Analytics
- Usage tracking for all endpoints
- User behavior analytics
- Performance metrics
- Trend analysis

## 🧪 Testing Strategy

### Unit Tests
- Service layer testing
- Business logic validation
- Error handling verification

### Integration Tests
- API endpoint testing
- Request/response validation
- Error scenario testing

### Coverage Goals
- Minimum 80% code coverage
- Critical path 100% coverage
- Business logic 100% coverage

## 🚀 Deployment

### Production Checklist

1. **Environment Variables**
   - Set `NODE_ENV=production`
   - Configure database URLs
   - Set secure CORS origins
   - Configure logging levels

2. **Security**
   - Enable HTTPS
   - Set secure headers
   - Configure rate limiting
   - Review CORS settings

3. **Performance**
   - Enable compression
   - Configure caching
   - Set appropriate timeouts
   - Monitor memory usage

4. **Monitoring**
   - Set up health check monitoring
   - Configure log aggregation
   - Set up error alerting
   - Monitor API performance

### Docker Support (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["npm", "start"]
```

## 🔄 Migration from Old Structure

### Backward Compatibility
- Old endpoints still accessible via separate routes
- Gradual migration strategy supported
- Legacy data format support

### Migration Steps
1. Deploy new structure alongside old
2. Update client applications gradually
3. Monitor usage analytics
4. Deprecate old endpoints
5. Remove legacy code

## 🤝 Contributing

### Code Style
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Conventional commits

### Development Workflow
1. Create feature branch
2. Write tests first (TDD)
3. Implement functionality
4. Ensure all tests pass
5. Update documentation
6. Submit pull request

## 📝 Documentation

- **API Documentation**: Available at `/api/docs`
- **Code Documentation**: JSDoc comments
- **Architecture Decisions**: See ADR documents
- **Deployment Guide**: See deployment section

## ⚠️ Important Notes

### Medical Software Disclaimer
This software is for educational and decision support purposes only. All clinical decisions should be made by qualified healthcare professionals using their clinical judgment.

### Data Privacy
- Patient data should be handled according to HIPAA guidelines
- Implement appropriate data encryption
- Follow institutional privacy policies
- Audit all data access

### Clinical Validation
- All calculators should be validated against published literature
- Protocols should be reviewed by clinical experts
- AI responses should be reviewed for clinical accuracy
- Regular updates based on new evidence

## 📞 Support

For technical support or questions:
- Create an issue in the project repository
- Contact the development team
- Refer to the troubleshooting guide

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
