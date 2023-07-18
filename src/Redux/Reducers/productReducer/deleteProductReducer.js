import { DELETE_PRODUCT, GET_ERROR } from "../../types"


const initialValue = {
  isLoaded: false,
  deletedProductResponse: []
}

const deleteProductReducer = (state = initialValue, action) => {
  switch (action.type) {
    case DELETE_PRODUCT: return {
      isLoaded: true,
      deletedProductResponse: action.payload,
    }
    case GET_ERROR: return {
      isLoaded: false,
      deletedProductResponse: action.payload,
    }
    default: return state
  }
}

export default deleteProductReducer