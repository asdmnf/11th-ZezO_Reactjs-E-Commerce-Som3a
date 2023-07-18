import { ADD_COUPON, GET_ALL_COUPONS, GET_SPECIFIC_COUPON, REMOVE_COUPON, UPDATE_COUPON } from "../../types"



const initialValue = {
  addCouponResponseIsLoaded: false,
  // allCouponsDataIsLoaded: false,
  specificCouponDataIsLoaded: false,
  updateCouponResponseIsLoaded: false,
  removeCouponResponseIsLoaded: false,
  addCouponResponse: [],
  // allCouponsData: [],
  specificCouponData: [],
  updateCouponResponse: [],
  removeCouponResponse: [],
}

const couponReducer = (state = initialValue, action)=>{
  
  switch(action.type){
    case ADD_COUPON: return {
      addCouponResponseIsLoaded: true,
      addCouponResponse: action.payload,
    }
    // case GET_ALL_COUPONS: return {
    //   allCouponsDataIsLoaded: true,
    //   allCouponsData: action.payload,
    // }
    case GET_SPECIFIC_COUPON: return {
      specificCouponDataIsLoaded: true,
      specificCouponData: action.payload,
    }
    case UPDATE_COUPON: return {
      updateCouponResponseIsLoaded: true,
      updateCouponResponse: action.payload,
    }
    case REMOVE_COUPON: return {
      removeCouponResponseIsLoaded: true,
      removeCouponResponse: action.payload,
    }
    default: return state
  }
}

export default couponReducer