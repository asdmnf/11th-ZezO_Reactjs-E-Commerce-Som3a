import { ALL_SUB_CATEGORIES } from "../types"


const initialValue = {
  allSubCategoryDataIsLoaded: false,
  allSubCategoryData: [],
}

const subCategory2Reducer = (state = initialValue, action)=>{
  switch(action.type){
    case ALL_SUB_CATEGORIES: return {
      allSubCategoryDataIsLoaded: true,
      allSubCategoryData: action.payload,
    }
    default: return state
  }
}

export default subCategory2Reducer