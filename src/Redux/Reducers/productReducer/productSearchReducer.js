import { SEARCH_PRODUCT } from "../../types"


const initialValue = {
  isLoaded: false,
  searchedProducts: [],
  totalPages: 0,
}

export const productSearchReducer = (state = initialValue, action) => {
  switch (action.type) {
    case SEARCH_PRODUCT: return {
      isLoaded: true,
      searchedProducts: action.payload,
      totalPages: action.payload.paginationData?.totalPages,
    }
    default: return state
  }
}