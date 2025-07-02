// Environment configuration for different deployment targets
export const config = {
  // Determine environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  isNetlify: typeof window !== 'undefined' && window.location.hostname.includes('netlify.app'),
  
  // API Configuration
  api: {
    // In development, use local server
    // In production/Netlify, use Netlify functions
    baseURL: import.meta.env.DEV 
      ? import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
      : '/.netlify/functions/api',
    
    timeout: 10000,
    retries: 3
  },
  
  // Supabase Configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    
    // Validate required environment variables
    isConfigured: !!(
      import.meta.env.VITE_SUPABASE_URL && 
      import.meta.env.VITE_SUPABASE_ANON_KEY
    )
  },
  
  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'OncoVista',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.VITE_ENVIRONMENT || 'development',
    
    // Feature flags
    features: {
      medicalImaging: import.meta.env.VITE_ENABLE_MEDICAL_IMAGING === 'true',
      advancedAnalytics: import.meta.env.VITE_ENABLE_ADVANCED_ANALYTICS === 'true',
      exportFeatures: import.meta.env.VITE_ENABLE_EXPORT_FEATURES === 'true'
    }
  },
  
  // Debugging
  debug: {
    enabled: import.meta.env.DEV,
    level: import.meta.env.VITE_DEBUG_LEVEL || 'info'
  }
}

// Validation function
export function validateEnvironment() {
  const issues = []
  
  if (!config.supabase.isConfigured) {
    issues.push('Supabase environment variables not configured')
  }
  
  if (config.isProduction && config.api.baseURL.includes('localhost')) {
    issues.push('Production build using localhost API URL')
  }
  
  return {
    isValid: issues.length === 0,
    issues
  }
}

// Helper functions
export function getApiUrl(endpoint) {
  const baseURL = config.api.baseURL
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  return `${baseURL}/${cleanEndpoint}`
}

export function logEnvironmentInfo() {
  if (config.debug.enabled) {
    console.log('🌍 Environment Configuration:', {
      environment: config.app.environment,
      isDevelopment: config.isDevelopment,
      isProduction: config.isProduction,
      isNetlify: config.isNetlify,
      apiBaseURL: config.api.baseURL,
      supabaseConfigured: config.supabase.isConfigured,
      features: config.app.features
    })
    
    const validation = validateEnvironment()
    if (!validation.isValid) {
      console.warn('⚠️ Environment issues:', validation.issues)
    }
  }
}

export default config
