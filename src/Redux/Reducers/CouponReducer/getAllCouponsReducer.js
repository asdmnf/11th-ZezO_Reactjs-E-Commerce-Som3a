import { GET_ALL_COUPONS } from "../../types"


const initialValue = {
  allCouponsDataIsLoaded: false,
  allCouponsData: [],
}

const getAllCouponsReducer = (state = initialValue, action)=>{
  switch(action.type){
    case GET_ALL_COUPONS: return {
      allCouponsDataIsLoaded: true,
      allCouponsData: action.payload,
    }
    default: return state
  }
}

export default getAllCouponsReducer