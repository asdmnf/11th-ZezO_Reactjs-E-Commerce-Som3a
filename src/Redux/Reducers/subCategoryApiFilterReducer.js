import { GET_ERROR, GET_SUB_CATEGORY_BY_MAIN_CATEGORY_ID } from "../types"


const initialValue = {
  isLoaded: false,
  subCategoryApiFilterData: [],
}

const subCategoryApiFilterReducer = (state = initialValue, action) =>{
  switch(action.type){
    case GET_SUB_CATEGORY_BY_MAIN_CATEGORY_ID: return {
      isLoaded: true,
      subCategoryApiFilterData: action.payload
    }
    case GET_ERROR : return {
      isLoaded: false,
      subCategoryApiFilterData: action.payload
    }
    default : return state
  }
}
export default subCategoryApiFilterReducer