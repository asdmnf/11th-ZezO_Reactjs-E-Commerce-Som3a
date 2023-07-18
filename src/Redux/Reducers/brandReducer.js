import { CREATE_BRAND, EDIT_BRAND, GET_ALL_BRAND, GET_SPECIFIC_BRAND, REMOVE_BRAND } from "../types"


const initialValue = {
  isLoaded: false,
  brandData: [],
  totalPages: 0,
  status: 0,

    removeBrandResponseIsLoaded: false,
    removeBrandResponse: [],
    editBrandResponseIsLoaded: false,
    editBrandResponse: [],
    specificBrandDataIsLoaded: false,
    specificBrandData: [],
}

const brandReducer = (state = initialValue, action)=>{
  
  switch(action.type){
    case GET_ALL_BRAND: return {
      isLoaded: true,
      brandData: action.payload,
      totalPages: action.payload.paginationData?.totalPages
    }
    case CREATE_BRAND: return {
      isLoaded: true,
      brandData: action.payload,
      status: action.payload.status,
    }

        case REMOVE_BRAND: return {
          removeBrandResponseIsLoaded: true,
          removeBrandResponse: action.payload,
        }
        case EDIT_BRAND: return {
          editBrandResponseIsLoaded: true,
          editBrandResponse: action.payload,
        }
        case GET_SPECIFIC_BRAND: return {
          specificBrandDataIsLoaded: true,
          specificBrandData: action.payload,
        }
    default: return state
  }
}

export default brandReducer