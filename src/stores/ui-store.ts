import { create } from 'zustand'

interface UIStore {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  toggleMobileMenu: () => void

  activeProjectCategory: string
  setActiveProjectCategory: (category: string) => void

  activeBlogCategory: string
  setActiveBlogCategory: (category: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  activeProjectCategory: 'all',
  setActiveProjectCategory: (category) =>
    set({ activeProjectCategory: category }),

  activeBlogCategory: 'all',
  setActiveBlogCategory: (category) => set({ activeBlogCategory: category }),
}))
