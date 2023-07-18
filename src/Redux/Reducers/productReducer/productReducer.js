import { CREATE_PRODUCT, GET_ERROR, GET_HOME_PRODUCT, GET_PAGE_PRODUCT, GET_SPECIFIC_PRODUCT } from "../../types"


const initialValue = {
  isLoaded: false,
  product: [],
  totalPages: 0,

}

export const productHomeReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_HOME_PRODUCT: return {
      isLoaded: true,
      product: action.payload,
    }
    case GET_ERROR: return {
      isLoaded: false,
      product: action.payload,
    }
    default: return state
  }
}

export const productPageReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_PAGE_PRODUCT: return {
      isLoaded: true,
      product: action.payload,
      totalPages: action.payload.paginationResult.numberOfPages,
    }
    case GET_ERROR: return {
      isLoaded: false,
      product: action.payload,
    }
    default: return state
  }
}

export const createProductReducer = (state = initialValue, action) => {
  switch (action.type) {
    case CREATE_PRODUCT: return {
      isLoaded: true,
      product: action.payload,
    }
    default: return state
  }
}


export const getSpecificProductReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_SPECIFIC_PRODUCT: return {
      isLoaded: true,
      product: action.payload,
    }
    case GET_ERROR: return {
      isLoaded: false,
      product: action.payload,
    }
    default: return state
  }
}