import { CREATE_SUB_CATEGORY, EDIT_SUB_CATEGORY, GET_SPECIFIC_SUB_CATEGORY, GET_SUB_CATEGORY, REMOVE_SUB_CATEGORY } from "../types"


const initialValue = {
  isLoaded: false,
  subCategoryData: [],
  status:0,


    removeSubCategoryResponseIsLoaded: false,
    removeSubCategoryResponse: [],
    editSubCategoryResponseIsLoaded: false,
    editSubCategoryResponse: [],
    specificSubCategoryDataIsLoaded: false,
    specificSubCategoryData: [],

}

const subCategoryReducer = (state = initialValue, action) => {
  switch (action.type) {
    case CREATE_SUB_CATEGORY: return {
      isLoaded: true,
      subCategoryData: action.payload,
      status: action.payload.status
    }
    case GET_SUB_CATEGORY: return {
      isLoaded: true,
      subCategoryData: action.payload,
      status: action.payload.status
    }


        case REMOVE_SUB_CATEGORY: return {
          removeSubCategoryResponseIsLoaded: true,
          removeSubCategoryResponse: action.payload,
        }
        case EDIT_SUB_CATEGORY: return {
          editSubCategoryResponseIsLoaded: true,
          editSubCategoryResponse: action.payload,
        }
        case GET_SPECIFIC_SUB_CATEGORY: return {
          specificSubCategoryDataIsLoaded: true,
          specificSubCategoryData: action.payload,
        }

    default: return state
  }
}

export default subCategoryReducer