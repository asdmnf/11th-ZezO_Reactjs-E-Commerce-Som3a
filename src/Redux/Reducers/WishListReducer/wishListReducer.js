import { ADD_TO_WISHLIST, GET_ALL_WISHLIST, REMOVE_WISHLIST } from "../../types"



const initialValue = {
  addWishListResponseIsLoaded: false,
  wishListDataIsLoaded: false,
  removeWishListResponseIsLoaded: false,
  addWishListResponse: [],
  wishListData: [],
  removeWishListResponse: [],
}

const WishListReducer = (state = initialValue, action)=>{
  
  switch(action.type){
    case ADD_TO_WISHLIST: return {
      addWishListResponseIsLoaded: true,
      addWishListResponse: action.payload,
    }
    case GET_ALL_WISHLIST: return {
      wishListDataIsLoaded: true,
      wishListData: action.payload,
    }
    case REMOVE_WISHLIST: return {
      removeWishListResponseIsLoaded: true,
      removeWishListResponse: action.payload,
    }
    default: return state
  }
}

export default WishListReducer