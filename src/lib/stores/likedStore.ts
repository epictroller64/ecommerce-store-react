import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Variant } from '../interface/Products'

export type LikedItem = {
    variant: Variant
}

type LikedStore = {
    liked: LikedItem[]
    addToLiked: (item: LikedItem) => void
    removeFromLiked: (variant: Variant) => void
    clearLiked: () => void
    getLikedItems: () => LikedItem[]
    isLiked: (variant: Variant) => boolean
}

export const useLikedStore = create<LikedStore>()(
    persist(
        (set, get) => ({
            liked: [],
            addToLiked: (item) => set((state) => ({ liked: [...state.liked, item] })),
            removeFromLiked: (variant) => set((state) => ({ liked: state.liked.filter((item) => item.variant.id !== variant.id) })),
            clearLiked: () => set({ liked: [] }),
            getLikedItems: () => get().liked,
            isLiked: (variant) => get().liked.some((item) => item.variant.id === variant.id),
        }),
        { name: 'liked', storage: createJSONStorage(() => localStorage) }
    )
)