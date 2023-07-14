import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const authStore = (set) => ({
  userProfile: null,
  registerUser: (user) => set({ userProfile: user }),
  loginUser: (user) => set({ userProfile: user }),
  logoutUser: () => set({ userProfile: null }),
})

const useAuthStore = create(persist(authStore, { name: 'auth' }))

export default useAuthStore
