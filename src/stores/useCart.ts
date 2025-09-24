import { create } from "zustand";
import type { Book } from "../Book";

type BookCart = Book & { quantity: number }

type CartState = {
    cart: Book[]
    addToCart: (book: Book) => void
    removeFromCart: (book: Book) => void
    cartWithQuantities: () => BookCart[]
}

export const useCart = create<CartState>((set, get) => ({
    cart: [],
    addToCart: (book: Book) => set((state) => ({ cart: [...state.cart, book] })),
    removeFromCart: (book: Book) => set((state) => ({ cart: state.cart.filter(b => b.id !== book.id) })),
    cartWithQuantities: () => {
        const result: BookCart[] = []

        for (const book of get().cart) {
            const existing = result.find(b => b.id === book.id)
            if (existing) {
                existing.quantity++
            } else {
                result.push({ ...book, quantity: 1 })
            }
        }

        return result
    }
}))
