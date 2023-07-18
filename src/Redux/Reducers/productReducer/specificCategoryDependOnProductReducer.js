import { GET_CATEGORY_NAME_DEPEND_ON_ID, GET_ERROR } from "../../types"

const initialValue = {
  isLoaded: false,
  category: []
}

const specificCategoryDependOnProductReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_CATEGORY_NAME_DEPEND_ON_ID: return {
      isLoaded: true,
      category: action.payload,
    }
    case GET_ERROR: return {
      isLoaded: false,
      category: action.payload,
    }
    default: return state
  }
}

export default specificCategoryDependOnProductReducer