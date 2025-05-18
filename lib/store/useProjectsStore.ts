// lib/useSpaceStore.ts
import { create } from 'zustand'
import { projectState } from '../types';









export const usePostsStore = create<projectState>((set, get) => ({
  projects: [],
  isLoadingProjects: false,
  fetchProjects: async () => {
    set({ isLoadingProjects: true })
    if(get().projects){
      set({ isLoadingProjects: false })
      return;
    }
    try {
      const res = await fetch('/api/posts')
      const data = await res.json()
      set({ projects: data })
    } catch (error) {
      console.error('Failed to fetch posts', error)
    } finally {
      set({ isLoadingProjects: false })
    }
  }
}))
