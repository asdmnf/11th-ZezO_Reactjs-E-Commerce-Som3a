import { GET_ALL_PRODUCTS_BY_CATEGORY_ID, GET_ERROR } from "../../types"


const initialValue = {
  isLoaded: false,
  categoryProducts: []
}

const getAllProductsByCategoryIdReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_BY_CATEGORY_ID: return {
      isLoaded: true,
      categoryProducts: action.payload,
    }
    case GET_ERROR: return {
      isLoaded: false,
      categoryProducts: action.payload,
    }
    default: return state
  }
}

export default getAllProductsByCategoryIdReducer