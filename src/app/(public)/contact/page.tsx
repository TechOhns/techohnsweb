'use client'

import { useActionState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { submitContact } from '../actions/contact'
import { ArrowRight, Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react'

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'hello@techohns.com', href: 'mailto:hello@techohns.com' },
  { icon: Phone, label: 'WhatsApp', value: '+260 971632781', href: 'https://wa.me/260971632781' },
  { icon: MapPin, label: 'Location', value: 'Lusaka, Zambia', href: null },
  { icon: Clock, label: 'Response time', value: 'Within 24 hours', href: null },
]

type ContactState = { success: boolean; error: string; message: string }
const initialState: ContactState = { success: false, error: '', message: '' }

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-[#007ACC] tracking-widest uppercase mb-4">Get in touch</p>
          <h1
            className="text-5xl sm:text-6xl font-bold text-[#1a1a1a] mb-5"
            style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
          >
            Let&apos;s Build Something{' '}
            <span style={{ color: '#007ACC' }}>Together</span>
          </h1>
          <p className="text-[#4D4D4D] text-lg max-w-xl mx-auto leading-relaxed">
            Have a project in mind? Tell us about it. We&apos;ll scope it, plan it, and ship it.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form — takes 3 cols */}
            <div className="lg:col-span-3 bg-[#F5F5F5] rounded-2xl p-8 border border-[#e5e7eb]">
              <h2
                className="text-xl font-bold text-[#1a1a1a] mb-6"
                style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
              >
                Send us a message
              </h2>
              
              {state.success && (
                <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-xl border border-green-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{state.message}</p>
                </div>
              )}

              {state.error && (
                <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-xl border border-red-200 text-sm font-medium">
                  {state.error}
                </div>
              )}

              <form action={formAction} ref={formRef} className="space-y-5" id="contact-form">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-[#4D4D4D] mb-1.5">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] outline-none focus:border-[#007ACC] focus:ring-2 focus:ring-[#007ACC]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-[#4D4D4D] mb-1.5">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] outline-none focus:border-[#007ACC] focus:ring-2 focus:ring-[#007ACC]/10 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-medium text-[#4D4D4D] mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="What's this about?"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] outline-none focus:border-[#007ACC] focus:ring-2 focus:ring-[#007ACC]/10 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-[#4D4D4D] mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your project — what you're building, your timeline, and your budget."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] outline-none focus:border-[#007ACC] focus:ring-2 focus:ring-[#007ACC]/10 transition-all resize-none"
                  />
                </div>
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#007ACC] text-white text-sm font-semibold hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isPending ? 'Sending...' : 'Send message'}
                  {!isPending && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>

            {/* Info — takes 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2
                  className="text-xl font-bold text-[#1a1a1a] mb-2"
                  style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
                >
                  Contact details
                </h2>
                <p className="text-sm text-[#4D4D4D] leading-relaxed">
                  Prefer a direct line? Reach us through any of the channels below.
                </p>
              </div>

              <div className="space-y-3">
                {CONTACT_INFO.map((item) => {
                  const Icon = item.icon
                  const content = (
                    <div className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-xl border border-[#e5e7eb] hover:border-[#007ACC]/30 transition-all">
                      <div className="w-9 h-9 rounded-lg bg-[#007ACC]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#007ACC]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm font-medium text-[#1a1a1a]">{item.value}</p>
                      </div>
                    </div>
                  )
                  return item.href ? (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  )
                })}
              </div>

              <div className="bg-[#1a1a1a] rounded-2xl p-6 text-white">
                <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-syne, sans-serif)' }}>
                  Prefer to jump on a call?
                </p>
                <p className="text-white/60 text-xs leading-relaxed mb-4">
                  Book a free 30-minute discovery call and let&apos;s talk about your project.
                </p>
                <Link
                  href="https://cal.com/techohns"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#FFCC00] hover:underline"
                >
                  Book a call <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
