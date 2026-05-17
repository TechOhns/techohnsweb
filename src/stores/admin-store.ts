import { create } from 'zustand'
import type { AdminStats } from '@/types'

interface AdminStore {
  stats: AdminStats | null
  setStats: (stats: AdminStats) => void
  sidebarCollapsed: boolean
  toggleSidebar: () => void
}

export const useAdminStore = create<AdminStore>((set) => ({
  stats: null,
  setStats: (stats) => set({ stats }),
  sidebarCollapsed: false,
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}))
