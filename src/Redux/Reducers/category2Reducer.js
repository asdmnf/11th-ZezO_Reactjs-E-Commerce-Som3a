import { ALL_CATEGORIES } from "../types"


const initialValue = {
  allCategoryDataIsLoaded: false,
  allCategoryData: [],
}

const category2Reducer = (state = initialValue, action)=>{
  switch(action.type){
    case ALL_CATEGORIES: return {
      allCategoryDataIsLoaded: true,
      allCategoryData: action.payload,
    }
    default: return state
  }
}

export default category2Reducer