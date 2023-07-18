import { CREATE_FEES, GET_SPECIFIC_FEES, UPDATE_FEES } from "../../types"


const initialValue = {
  specificFeesDataIsLoaded: false,
  specificFeesData: [],
  updateFeesResponseIsLoaded: false,
  updateFeesResponse: [],
  createFeesResponseIsLoaded: false,
  createFeesResponse: [],
}

const fessReducer = (state = initialValue, action)=>{
  
  switch(action.type){
    case GET_SPECIFIC_FEES: return {
      specificFeesDataIsLoaded: true,
      specificFeesData: action.payload,
    }
    case UPDATE_FEES: return {
      updateFeesResponseIsLoaded: true,
      updateFeesResponse: action.payload,
    }
    case CREATE_FEES: return {
      createFeesResponseIsLoaded: true,
      createFeesResponse: action.payload,
    }
    default: return state
  }
}

export default fessReducer