import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Login',
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e5e7eb] w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-lg bg-[#007ACC] flex items-center justify-center font-bold text-white text-sm">
            TO
          </div>
          <div>
            <p className="font-bold text-[#1a1a1a] text-sm" style={{ fontFamily: 'var(--font-syne, sans-serif)' }}>
              TechOhns
            </p>
            <p className="text-[10px] text-[#9ca3af]">Admin Panel</p>
          </div>
        </div>

        <h1 className="text-xl font-bold text-[#1a1a1a] mb-1">Welcome back</h1>
        <p className="text-sm text-[#9ca3af] mb-8">Sign in to your admin account</p>

        {/* Placeholder — wire up with Supabase auth action */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-[#4D4D4D] mb-1.5">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@techohns.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] outline-none focus:border-[#007ACC] focus:ring-2 focus:ring-[#007ACC]/10 transition-all"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-[#4D4D4D] mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] outline-none focus:border-[#007ACC] focus:ring-2 focus:ring-[#007ACC]/10 transition-all"
            />
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#007ACC] text-white text-sm font-semibold hover:opacity-90 transition-all active:scale-95"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
