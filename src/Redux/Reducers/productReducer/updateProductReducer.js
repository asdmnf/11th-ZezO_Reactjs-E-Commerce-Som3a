import { GET_ERROR, UPDATE_PRODUCT } from "../../types"



const initialValue = {
  isLoaded: false,
  updatedProductResponse: []
}

const updateProductReducer = (state = initialValue, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT: return {
      isLoaded: true,
      updatedProductResponse: action.payload,
    }
    case GET_ERROR: return {
      isLoaded: false,
      updatedProductResponse: action.payload,
    }
    default: return state
  }
}

export default updateProductReducer