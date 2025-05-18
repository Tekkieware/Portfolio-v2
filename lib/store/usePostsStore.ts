// lib/useSpaceStore.ts
import { create } from 'zustand'
import { dopStarState } from '../types';








export const usePostsStore = create<dopStarState>((set, get) => ({
  leaderboard: [],
  isLoadingPosts: false,
  fetchLeaderboard: async () => {
    set({ isLoadingPosts: true })
    if(get().posts){
      set({ isLoadingPosts: false })
      return;
    }
    try {
      const res = await fetch('/api/posts')
      const data = await res.json()
      set({ posts: data })
    } catch (error) {
      console.error('Failed to fetch posts', error)
    } finally {
      set({ isLoadingPosts: false })
    }
  }
}))
