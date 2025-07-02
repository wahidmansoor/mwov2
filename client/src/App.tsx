import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { supabase } from './lib/supabase.js'

function App() {
  const [supabaseStatus, setSupabaseStatus] = useState('checking')
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check Supabase connection
    const checkSupabase = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        setSupabaseStatus('connected')
      } catch (error) {
        console.error('Supabase connection error:', error)
        setSupabaseStatus('error')
      }
    }

    checkSupabase()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              OncoVista - Supabase Integration
            </h1>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                supabaseStatus === 'connected' 
                  ? 'bg-green-100 text-green-800' 
                  : supabaseStatus === 'error'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {supabaseStatus === 'connected' ? '🟢 Supabase Connected' : 
                 supabaseStatus === 'error' ? '🔴 Connection Error' : 
                 '🟡 Checking...'}
              </span>
              {user && (
                <span className="text-sm text-gray-600">
                  👤 {user.email}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage supabaseStatus={supabaseStatus} user={user} />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/treatments" element={<TreatmentsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

function HomePage({ supabaseStatus, user }) {
  const [apiStatus, setApiStatus] = useState('checking')

  useEffect(() => {
    // Check API connection
    const checkApi = async () => {
      try {
        const response = await fetch('/api/health')
        const data = await response.json()
        setApiStatus(data.database === 'Connected' ? 'connected' : 'disconnected')
      } catch (error) {
        setApiStatus('error')
      }
    }

    checkApi()
  }, [])

  const handleTestSupabase = async () => {
    try {
      // Test a simple query
      const { data, error } = await supabase
        .from('users')
        .select('count', { count: 'exact' })
        .limit(1)
      
      if (error) throw error
      alert('✅ Supabase test successful! Database is accessible.')
    } catch (error) {
      alert(`❌ Supabase test failed: ${error.message}`)
    }
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome to OncoVista with Supabase</h2>
        <p className="text-gray-600 mb-6">
          Your oncology management system is now powered by Supabase! 🚀
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900">Frontend</h3>
            <p className="text-blue-700">React + Vite</p>
            <p className="text-sm text-blue-600">http://localhost:5173</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900">Backend API</h3>
            <p className="text-green-700">Express.js</p>
            <p className="text-sm text-green-600">http://localhost:3001</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900">Database</h3>
            <p className="text-purple-700">Supabase PostgreSQL</p>
            <div className={`text-sm mt-1 ${
              apiStatus === 'connected' ? 'text-green-600' : 
              apiStatus === 'error' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {apiStatus === 'connected' ? '✅ Connected' : 
               apiStatus === 'error' ? '❌ Error' : '⏳ Checking...'}
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-900">Authentication</h3>
            <p className="text-orange-700">Supabase Auth</p>
            <div className="text-sm text-orange-600">
              {user ? `✅ Signed in` : '🔓 Not signed in'}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">🧪 Test Your Setup</h3>
          <div className="space-y-2">
            <button 
              onClick={handleTestSupabase}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mr-2"
            >
              Test Supabase Connection
            </button>
            <a 
              href="/api/health" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
            >
              Check API Health
            </a>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-900 mb-2">📋 Next Steps</h3>
          <ul className="text-yellow-800 space-y-1 text-sm">
            <li>✅ Supabase integration complete</li>
            <li>✅ Database schema created</li>
            <li>✅ API services configured</li>
            <li>🔄 Ready for Netlify optimization (Phase 3B)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function PatientsPage() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <h2 className="text-2xl font-semibold mb-4">Patients Module</h2>
      <p className="text-gray-600">Patient management with Supabase backend.</p>
    </div>
  )
}

function TreatmentsPage() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <h2 className="text-2xl font-semibold mb-4">Treatments Module</h2>
      <p className="text-gray-600">Treatment tracking with real-time updates.</p>
    </div>
  )
}

function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        alert('Check your email for the confirmation link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        alert('Signed in successfully!')
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) alert(error.message)
    else alert('Signed out successfully!')
  }

  return (
    <div className="px-4 py-6 sm:px-0 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
      
      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
        </button>
      </form>
      
      <p className="mt-4 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 hover:underline"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </p>
      
      <button
        onClick={handleSignOut}
        className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600">The requested page could not be found.</p>
    </div>
  )
}

export default App
