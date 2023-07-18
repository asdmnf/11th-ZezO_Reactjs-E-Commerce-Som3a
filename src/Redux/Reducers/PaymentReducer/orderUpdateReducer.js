import { ADD_UPDATE, DELETE_UPDATE } from "../../types"


const initialValue = {
  addUpdateResponseIsLoaded: false,
  deleteUpdateResponseIsLoaded: false,
  addUpdateResponse: [],
  deleteUpdateResponse: [],
}

const orderUpdateReducer = (state = initialValue, action)=>{
  
  switch(action.type){
    case ADD_UPDATE: return {
      addUpdateResponseIsLoaded: true,
      addUpdateResponse: action.payload,
    }
    case DELETE_UPDATE: return {
      deleteUpdateResponseIsLoaded: true,
      deleteUpdateResponse: action.payload,
    }
    default: return state
  }
}

export default orderUpdateReducer