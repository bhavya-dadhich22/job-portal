import { create } from "zustand";

export const useAuthUser = create((set) => ({
  AuthUser: null,
  setAuthUser: (AuthUser) => set({ AuthUser }), 
}));
