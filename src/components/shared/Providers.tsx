'use client'

import { Toaster } from 'sonner'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            fontFamily: 'var(--font-jakarta, sans-serif)',
          },
          className: 'border border-[#e5e7eb] rounded-xl shadow-lg',
        }} 
      />
    </>
  )
}
