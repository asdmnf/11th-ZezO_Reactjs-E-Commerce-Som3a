import { MOST_SALES_PRODUCTS } from "../../types"




const initialValue = {
  mostSalesProductsIsLoaded: false,
  mostSalesProducts: []
  }
  
  const mostSalesProductsReducer = (state = initialValue, action) => {
    switch (action.type) {
      case MOST_SALES_PRODUCTS: return {
        mostSalesProductsIsLoaded: true,
        mostSalesProducts: action.payload,
      }
      default: return state
    }
  }
  
  export default mostSalesProductsReducer