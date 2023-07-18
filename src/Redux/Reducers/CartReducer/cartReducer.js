import { ADD_TO_CART, ALL_CARTS, APPLY_COUPON, CLEAR_ALL_CART, EDIT_CART_ITEM_QUANTITY, REMOVE_FROM_CART } from "../../types"


const initialValue = {
  addToCartResponseIsLoaded: false,
  allCartDataIsLoaded: false,
  removeFromCartResponseIsLoaded: false,
  editCartItemQuantityResponseIsLoaded: false,
  clearAllCartResponseIsLoaded: false,
  applyCouponResponseIsLoaded: false,
  addToCartResponse: [],
  allCartData: [],
  removeFromCartResponse: [],
  editCartItemQuantityResponse: [],
  clearAllCartResponse: [],
  applyCouponResponse: [],
}

const cartReducer = (state = initialValue, action)=>{
  
  switch(action.type){
    case ADD_TO_CART: return {
      addToCartResponseIsLoaded: true,
      addToCartResponse: action.payload,
    }
    case ALL_CARTS: return {
      allCartDataIsLoaded: true,
      allCartData: action.payload,
    }
    case REMOVE_FROM_CART: return {
      removeFromCartResponseIsLoaded: true,
      removeFromCartResponse: action.payload,
    }
    case EDIT_CART_ITEM_QUANTITY: return {
      editCartItemQuantityResponseIsLoaded: true,
      editCartItemQuantityResponse: action.payload,
    }
    case CLEAR_ALL_CART: return {
      clearAllCartResponseIsLoaded: true,
      clearAllCartResponse: action.payload,
    }
    case APPLY_COUPON: return {
      applyCouponResponseIsLoaded: true,
      applyCouponResponse: action.payload,
    }
    default: return state
  }
}

export default cartReducer