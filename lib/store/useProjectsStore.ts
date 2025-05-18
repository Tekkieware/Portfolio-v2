// lib/useSpaceStore.ts
import { create } from 'zustand'
import { projectState } from '../types';


export const useProjectsStore = create<projectState>((set, get) => ({
  projects: [],
  isLoadingProjects: false,
  fetchProjects: async () => {
    set({ isLoadingProjects: true })
    if(get().projects){
      set({ isLoadingProjects: false })
      return;
    }
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      set({ projects: data })
    } catch (error) {
      console.error('Failed to fetch projects', error)
    } finally {
      set({ isLoadingProjects: false })
    }
  }
}))
