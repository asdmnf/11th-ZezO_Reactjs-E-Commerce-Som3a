import { SAMSUNG_PRODUCTS } from "../../types"




const initialValue = {
    samsungProductsIsLoaded: false,
    samsungProducts: []
    }
    
    const samsungProductsReducer = (state = initialValue, action) => {
      switch (action.type) {
        case SAMSUNG_PRODUCTS: return {
          samsungProductsIsLoaded: true,
          samsungProducts: action.payload,
        }
        default: return state
      }
    }
    
    export default samsungProductsReducer