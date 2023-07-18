import { MARKET_PRODUCTS } from "../../types"





const initialValue = {
    marketProductsIsLoaded: false,
    marketProducts: []
    }
    
    const marketProductsReducer = (state = initialValue, action) => {
      switch (action.type) {
        case MARKET_PRODUCTS: return {
          marketProductsIsLoaded: true,
          marketProducts: action.payload,
        }
        default: return state
      }
    }
    
    export default marketProductsReducer