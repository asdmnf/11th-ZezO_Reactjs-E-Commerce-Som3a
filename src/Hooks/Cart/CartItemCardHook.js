import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editCartItemQuantity, getAllCartItems } from "../../Redux/Actions/CartAction/cartAction"
import { getSpecificProduct } from "../../Redux/Actions/productAction/productAction"


const CartItemCardHook = (quantity, productID) => {

  const [cartItemQuantityInput, setCartItemQuantityInput] = useState(quantity)

  const dispatch = useDispatch()
  // const editCartItemQuantityResponse = useSelector(state => state.cartReducer.editCartItemQuantityResponse)
  // const editCartItemQuantityResponseIsLoaded = useSelector(state => state.cartReducer.editCartItemQuantityResponseIsLoaded)

  const cartItemQuantityOnChangeHandle = async (e, id) => {
    if (e.target.value === "0") {
      return
    }
    setCartItemQuantityInput(e.target.value)
    await dispatch(editCartItemQuantity(id, {
      quantity: e.target.value,
    }, "CartItemCardHook"))
    dispatch(getAllCartItems("CartItemCardHook"))
  }
  

  return [cartItemQuantityOnChangeHandle, cartItemQuantityInput]
}

export default CartItemCardHook

