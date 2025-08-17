// Database client configuration for Supabase
import { createClient } from '@supabase/supabase-js';
import { logger } from '../utils/logger.js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

let supabaseClient: any = null;

// Initialize client only if credentials are available
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: false // API doesn't need persistent sessions
      },
      db: {
        schema: 'public'
      }
    });
    
    logger.info('Supabase client initialized successfully');
  } catch (error) {
    logger.error({ error }, 'Failed to initialize Supabase client');
  }
} else {
  logger.warn('Supabase credentials not found. Using mock data mode.');
}

// Database connection helper functions
export const db = {
  // Check if database is available
  isAvailable: (): boolean => {
    return supabaseClient !== null;
  },

  // Get Supabase client instance
  getClient: () => {
    if (!supabaseClient) {
      throw new Error('Database not available. Check Supabase configuration.');
    }
    return supabaseClient;
  },

  // Test database connection
  testConnection: async (): Promise<boolean> => {
    if (!supabaseClient) {
      return false;
    }

    try {
      const { error } = await supabaseClient
        .from('protocols')
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        logger.error({ error }, 'Database connection test failed');
        return false;
      }
      
      logger.info('Database connection test successful');
      return true;
    } catch (error) {
      logger.error({ error }, 'Database connection test error');
      return false;
    }
  },

  // Generic query helper
  query: async (tableName: string, operation: any) => {
    if (!supabaseClient) {
      throw new Error('Database not available');
    }

    try {
      const result = await operation(supabaseClient.from(tableName));
      
      if (result.error) {
        logger.error({ error: result.error, tableName }, 'Database query failed');
        throw new Error(`Database query failed: ${result.error.message}`);
      }
      
      return result.data;
    } catch (error) {
      logger.error({ error, tableName }, 'Database query error');
      throw error;
    }
  },

  // Protocol-specific database operations
  protocols: {
    findBySlug: async (slug: string) => {
      return db.query('protocols', (table: any) => 
        table.select('*').eq('slug', slug).eq('is_active', true).single()
      );
    },

    search: async (searchTerm: string, type?: string, category?: string) => {
      return db.query('protocols', (table: any) => {
        let query = table
          .select('*')
          .eq('is_active', true)
          .or(`title.ilike.%${searchTerm}%,summary.ilike.%${searchTerm}%`);
        
        if (type) {
          query = query.eq('type', type);
        }
        
        if (category) {
          query = query.eq('category', category);
        }
        
        return query.order('title');
      });
    },

    getAll: async (type?: string, category?: string) => {
      return db.query('protocols', (table: any) => {
        let query = table.select('*').eq('is_active', true);
        
        if (type) {
          query = query.eq('type', type);
        }
        
        if (category) {
          query = query.eq('category', category);
        }
        
        return query.order('category').order('title');
      });
    }
  },

  // Analytics database operations
  analytics: {
    logUsage: async (data: any) => {
      return db.query('analytics_usage', (table: any) => 
        table.insert([data])
      );
    },

    getUsageSummary: async (filters: any) => {
      // This would be a more complex query with aggregations
      return db.query('analytics_usage', (table: any) => {
        let query = table.select('*');
        
        if (filters.startDate) {
          query = query.gte('timestamp', filters.startDate);
        }
        
        if (filters.endDate) {
          query = query.lte('timestamp', filters.endDate);
        }
        
        if (filters.module) {
          query = query.eq('module', filters.module);
        }
        
        return query.order('timestamp', { ascending: false });
      });
    }
  },

  // AI interactions database operations
  ai: {
    logInteraction: async (data: any) => {
      return db.query('ai_interactions', (table: any) => 
        table.insert([data])
      );
    },

    getUserInteractions: async (userId: string, limit = 50) => {
      return db.query('ai_interactions', (table: any) => 
        table
          .select('*')
          .eq('user_id', userId)
          .order('timestamp', { ascending: false })
          .limit(limit)
      );
    }
  }
};

// Database health check function
export const healthCheck = async (): Promise<{ status: string; latency?: number; error?: string }> => {
  if (!supabaseClient) {
    return { status: 'not_configured' };
  }

  const startTime = Date.now();
  
  try {
    await db.testConnection();
    const latency = Date.now() - startTime;
    
    return {
      status: 'healthy',
      latency
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export { supabaseClient };
export default db;
