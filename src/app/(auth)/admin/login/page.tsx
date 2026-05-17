'use client'

import { useActionState } from 'react'
import { login } from '@/app/(admin)/actions/auth'
import { ArrowRight, Lock } from 'lucide-react'

const initialState = {
  error: '',
}

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState)

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#e5e7eb] overflow-hidden">
        {/* Header */}
        <div className="bg-[#1a1a1a] p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div className="relative">
            <div className="w-12 h-12 bg-[#FFCC00] rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#1a1a1a]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-syne, sans-serif)' }}>
              Admin Access
            </h1>
            <p className="text-white/60 text-sm">TechOhns Control Panel</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                {state.error}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5 uppercase tracking-wide">
                Email address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="admin@techohns.com"
                className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#F5F5F5] focus:bg-white text-sm outline-none focus:border-[#007ACC] focus:ring-2 focus:ring-[#007ACC]/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#F5F5F5] focus:bg-white text-sm outline-none focus:border-[#007ACC] focus:ring-2 focus:ring-[#007ACC]/10 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#007ACC] text-white text-sm font-bold hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isPending ? 'Authenticating...' : 'Sign In'}
              {!isPending && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
