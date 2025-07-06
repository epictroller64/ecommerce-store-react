import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Variant } from '../interface/Products'

export type CartItem = {
    variant: Variant
    quantity: number
}

type CartStore = {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (variant: Variant) => void
    clearCart: () => void
    getCartTotal: () => number
    getCartCount: () => number
    getCartItems: () => CartItem[]
    getCartItemQuantity: (variant: Variant) => number
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
            removeFromCart: (variant) => set((state) => ({ cart: state.cart.filter((item) => item.variant.id !== variant.id) })),
            clearCart: () => set({ cart: [] }),
            getCartTotal: () => get().cart.reduce((acc, item) => acc + item.variant.price * item.quantity, 0),
            getCartCount: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
            getCartItems: () => get().cart,
            getCartItemQuantity: (variant: Variant) => get().cart.find((item) => item.variant.id === variant.id)?.quantity || 0,
        }),
        { name: 'cart', storage: createJSONStorage(() => localStorage) }
    )
)