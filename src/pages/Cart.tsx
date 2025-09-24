import { useShallow } from "zustand/shallow"
import { useCart } from "../stores/useCart"

function Cart() {
    // const cart = useCart(state => state.cartWithQuantities)
    // const removeFromCart = useCart(state => state.removeFromCart)

    const { cart, cartWithQuantities, removeFromCart } = useCart(
        useShallow((state) => ({
            cart: state.cart,
            cartWithQuantities: state.cartWithQuantities,
            removeFromCart: state.removeFromCart,
        })),
    )

    return (
        <ul>
            {cartWithQuantities().map(book => (
                <li key={book.id}>
                    {book.title} (x {book.quantity})

                    <button onClick={() => removeFromCart(book)}>Retirer</button>
                </li>
            ))}
        </ul>
    )
}

export default Cart
