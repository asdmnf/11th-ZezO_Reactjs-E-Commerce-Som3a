import { ADD_ADDRESS, GET_ALL_ADDRESSES, GET_SPECIFIC_ADDRESS, REMOVE_ADDRESS, UPDATE_ADDRESS } from "../../types"



const initialValue = {
  addAddressResponseIsLoaded: false,
  allAddressesDataIsLoaded: false,
  specificAddressDataIsLoaded: false,
  updateAddressResponseIsLoaded: false,
  removeAddressResponseIsLoaded: false,
  addAddressResponse: [],
  allAddressesData: [],
  specificAddressData: [],
  updateAddressResponse: [],
  removeAddressResponse: [],
}

const addressReducer = (state = initialValue, action)=>{
  
  switch(action.type){
    case ADD_ADDRESS: return {
      addAddressResponseIsLoaded: true,
      addAddressResponse: action.payload,
    }
    case GET_ALL_ADDRESSES: return {
      allAddressesDataIsLoaded: true,
      allAddressesData: action.payload,
    }
    case GET_SPECIFIC_ADDRESS: return {
      specificAddressDataIsLoaded: true,
      specificAddressData: action.payload,
    }
    case UPDATE_ADDRESS: return {
      updateAddressResponseIsLoaded: true,
      updateAddressResponse: action.payload,
    }
    case REMOVE_ADDRESS: return {
      removeAddressResponseIsLoaded: true,
      removeAddressResponse: action.payload,
    }
    default: return state
  }
}

export default addressReducer