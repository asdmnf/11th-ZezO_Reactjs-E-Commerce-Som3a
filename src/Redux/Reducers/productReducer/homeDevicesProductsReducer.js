import { HOME_DEVICES_PRODUCTS } from "../../types"




const initialValue = {
    homeDevicesProductsIsLoaded: false,
    homeDevicesProducts: []
    }
    
    const homeDevicesProductsReducer = (state = initialValue, action) => {
      switch (action.type) {
        case HOME_DEVICES_PRODUCTS: return {
          homeDevicesProductsIsLoaded: true,
          homeDevicesProducts: action.payload,
        }
        default: return state
      }
    }
    
    export default homeDevicesProductsReducer