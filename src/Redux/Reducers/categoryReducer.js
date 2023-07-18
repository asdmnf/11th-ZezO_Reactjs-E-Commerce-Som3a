import { CREATE_CATEGORY, EDIT_CATEGORY, GET_ALL_CATEGORY, GET_SPECIFIC_CATEGORY, REMOVE_CATEGORY } from "../types"



const initialValue = {
  isLoaded: false,
  category: [],
  totalPages: 0,
  status: 0,


    removeCategoryResponseIsLoaded: false,
    removeCategoryResponse: [],
    editCategoryResponseIsLoaded: false,
    editCategoryResponse: [],
    specificCategoryDataIsLoaded: false,
    specificCategoryData: [],

}
const categoryReducer = (state = initialValue, action)=>{
  switch(action.type){
    case GET_ALL_CATEGORY: return {
      isLoaded: true,
      category: action.payload,
      totalPages: action.payload.paginationData?.totalPages
    }
    case CREATE_CATEGORY: return {
      isLoaded: true,
      category: action.payload,
      status: action.payload.status
    }


    case REMOVE_CATEGORY: return {
      removeCategoryResponseIsLoaded: true,
      removeCategoryResponse: action.payload,
    }
    case EDIT_CATEGORY: return {
      editCategoryResponseIsLoaded: true,
      editCategoryResponse: action.payload,
    }
    case GET_SPECIFIC_CATEGORY: return {
      specificCategoryDataIsLoaded: true,
      specificCategoryData: action.payload,
    }

    default: return state
  }
}

export default categoryReducer