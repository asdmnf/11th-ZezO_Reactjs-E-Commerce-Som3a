import { GET_BRAND_NAME_DEPEND_ON_ID, GET_ERROR } from "../../types"


const initialValue = {
  isLoaded: false,
  brand: []
}

const specificBrandDependOnProductReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_BRAND_NAME_DEPEND_ON_ID: return {
      isLoaded: true,
      brand: action.payload,
    }
    case GET_ERROR: return {
      isLoaded: false,
      brand: action.payload,
    }
    default: return state
  }
}

export default specificBrandDependOnProductReducer