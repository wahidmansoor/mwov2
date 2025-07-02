# Contributing to OncoVista

Thank you for your interest in contributing to OncoVista! This document provides guidelines and information for contributors.

## 🎯 Project Vision

OncoVista is a comprehensive oncology application designed to assist healthcare professionals in cancer care management. We welcome contributions that:

- Improve patient care workflows
- Enhance clinical decision support
- Improve user experience and accessibility
- Add valuable medical features
- Fix bugs and improve stability
- Enhance documentation

## 🚀 Getting Started

### Prerequisites

- Node.js v18.0.0 or higher
- npm v8.0.0 or higher
- Git
- Supabase account (for database)
- Basic knowledge of React, TypeScript, and Node.js

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/mwov.git
   cd mwov
   ```

2. **Setup Local Environment**
   ```bash
   # Install dependencies
   npm install
   
   # Copy environment file
   cp .env.example .env
   
   # Configure your Supabase credentials in .env
   ```

3. **Database Setup**
   ```bash
   # Push database schema
   npm run db:push
   
   # Optional: Seed with sample data
   npm run db:seed
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

## 📋 Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch for integration
- `feature/feature-name` - Feature development
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Critical production fixes

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(auth): add JWT token validation
fix(api): resolve database connection timeout
docs(readme): update installation instructions
style(ui): improve responsive design for mobile
refactor(db): optimize query performance
test(api): add unit tests for user endpoints
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(module): add new feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   
   Create a Pull Request with:
   - Clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - List breaking changes (if any)

## 🏗️ Code Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Prefer functional components with hooks

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  role: UserRole;
}

const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Clear, descriptive function name
  const fetchUserData = async () => {
    // Implementation
  };
  
  return <div>{/* Component JSX */}</div>;
};

// ❌ Avoid
const comp = (props: any) => {
  const [data, setData] = useState(null);
  // ...
};
```

### React Components

- Use functional components with hooks
- Implement proper error boundaries
- Use React.memo for performance optimization
- Keep components small and focused
- Use proper prop types with TypeScript

### Database (Drizzle ORM)

- Define clear schema with proper relationships
- Use transactions for multi-table operations
- Add proper indexes for performance
- Include data validation
- Use prepared statements for dynamic queries

### API Design

- Follow RESTful conventions
- Use proper HTTP status codes
- Implement comprehensive error handling
- Add request validation
- Include API documentation

## 🧪 Testing Guidelines

### Test Types

- **Unit Tests**: Individual functions and components
- **Integration Tests**: API endpoints and database operations
- **E2E Tests**: Complete user workflows

### Writing Tests

```typescript
// Component test example
describe('UserProfile', () => {
  it('should display user information correctly', () => {
    const mockUser = { id: '1', email: 'test@example.com', role: 'patient' };
    render(<UserProfile user={mockUser} />);
    
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });
});

// API test example
describe('User API', () => {
  it('should create user successfully', async () => {
    const userData = { email: 'new@example.com', password: 'password123' };
    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);
      
    expect(response.body.user.email).toBe(userData.email);
  });
});
```

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for all public functions
- Include usage examples in documentation
- Document complex business logic
- Update README files when adding features

### Medical/Clinical Documentation

- Ensure medical accuracy in all implementations
- Include references to clinical guidelines
- Document any medical calculations or algorithms
- Review with medical professionals when possible

## 🔒 Security Guidelines

### General Security

- Never commit secrets or API keys
- Use environment variables for configuration
- Implement proper input validation
- Follow OWASP security guidelines
- Use HTTPS in all communications

### Medical Data Security

- Implement HIPAA compliance measures
- Use encryption for sensitive data
- Audit trails for data access
- Proper user authentication and authorization
- Regular security reviews

## 🐛 Bug Reports

### Before Submitting

- Check existing issues
- Verify the bug in the latest version
- Try to reproduce consistently

### Bug Report Template

```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error...

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: [e.g., Chrome 91]
- OS: [e.g., Windows 10]
- Version: [e.g., 1.0.0]

## Additional Context
Screenshots, logs, or other helpful information
```

## 💡 Feature Requests

### Feature Request Template

```markdown
## Feature Description
Clear description of the proposed feature

## Medical/Clinical Justification
How this feature improves patient care or clinical workflow

## Proposed Implementation
Technical approach (if you have ideas)

## Additional Context
Examples, mockups, or references
```

## 🎨 UI/UX Guidelines

### Design Principles

- **Accessibility First**: WCAG 2.1 AA compliance
- **Mobile Responsive**: Works on all device sizes
- **Clinical Workflow**: Follows medical professional workflows
- **Consistency**: Use design system components
- **Performance**: Fast loading and smooth interactions

### Component Guidelines

- Use shadcn/ui components when possible
- Follow Tailwind CSS conventions
- Implement proper loading states
- Add meaningful animations and transitions
- Ensure proper keyboard navigation

## 🔍 Code Review Guidelines

### For Reviewers

- Check for code quality and standards
- Verify tests are included and passing
- Review security implications
- Check documentation updates
- Test functionality locally when needed

### Review Checklist

- [ ] Code follows project standards
- [ ] Tests are included and comprehensive
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Accessibility requirements met
- [ ] Medical accuracy verified (if applicable)

## 🎖️ Recognition

Contributors will be recognized in:
- GitHub contributors list
- Project documentation
- Release notes for significant contributions

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Documentation**: Check existing docs first
- **Code Review**: Ask for feedback on draft PRs

## 📜 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Focus on constructive feedback
- Respect different viewpoints and experiences
- Show empathy towards other community members
- Priority on patient safety and care quality

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal attacks
- Publishing private information
- Other conduct inappropriate in a professional setting

## 🏥 Medical Disclaimer

This is a software project intended to assist healthcare professionals. Contributors should:

- Not provide medical advice through code or comments
- Ensure accuracy in medical calculations and guidelines
- Include appropriate disclaimers
- Recommend professional medical consultation when appropriate

---

Thank you for contributing to OncoVista! Your efforts help improve cancer care and patient outcomes.

**Questions?** Open an issue or start a discussion on GitHub.

**Last Updated**: January 2025
