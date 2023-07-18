


import { ALL_BRANDS } from "../types"

const initialValue = {
  allBrandDataIsLoaded: false,
  allBrandData: [],
}

const brand2Reducer = (state = initialValue, action)=>{
  switch(action.type){
    case ALL_BRANDS: return {
      allBrandDataIsLoaded: true,
      allBrandData: action.payload,
    }
    default: return state
  }
}

export default brand2Reducer