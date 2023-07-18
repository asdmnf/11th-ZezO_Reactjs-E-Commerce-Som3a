import { GET_SPECIFIC_ADDRESS_FIX } from "../../types"





const initialValue = {
  specificAddressDataIsLoaded: false,
  specificAddressData: [],

}

const specificAddressReducer = (state = initialValue, action)=>{
  
  switch(action.type){
    case GET_SPECIFIC_ADDRESS_FIX: return {
      specificAddressDataIsLoaded: true,
      specificAddressData: action.payload,
    }
    default: return state
  }
}

export const resetSpecificAddressData = ()=>{
  return ({ 
    type : GET_SPECIFIC_ADDRESS_FIX,
    payload: [],
  })
}


export default specificAddressReducer