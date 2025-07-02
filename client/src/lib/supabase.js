import { createClient } from '@supabase/supabase-js'

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Database helper functions
export const db = {
  // Generic query function
  async query(table) {
    return supabase.from(table)
  },

  // Auth helpers
  auth: {
    async signUp(email, password, options = {}) {
      return supabase.auth.signUp({
        email,
        password,
        options
      })
    },

    async signIn(email, password) {
      return supabase.auth.signInWithPassword({
        email,
        password
      })
    },

    async signOut() {
      return supabase.auth.signOut()
    },

    async getUser() {
      return supabase.auth.getUser()
    },

    async getSession() {
      return supabase.auth.getSession()
    },

    onAuthStateChange(callback) {
      return supabase.auth.onAuthStateChange(callback)
    }
  },

  // Real-time subscriptions
  subscribe(table, callback, filter = '*') {
    return supabase
      .channel(`public:${table}`)
      .on('postgres_changes', 
        { 
          event: filter, 
          schema: 'public', 
          table: table 
        }, 
        callback
      )
      .subscribe()
  },

  // File upload helpers
  storage: {
    async upload(bucket, path, file, options = {}) {
      return supabase.storage
        .from(bucket)
        .upload(path, file, options)
    },

    async download(bucket, path) {
      return supabase.storage
        .from(bucket)
        .download(path)
    },

    async getPublicUrl(bucket, path) {
      return supabase.storage
        .from(bucket)
        .getPublicUrl(path)
    },

    async remove(bucket, paths) {
      return supabase.storage
        .from(bucket)
        .remove(paths)
    }
  }
}

// Export the client for direct access if needed
export default supabase
