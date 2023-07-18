import { GET_ALL_FEES } from "../../types"


const initialValue = {
  allFeesDataIsLoaded: false,
  allFeesData: [],
}

const getAllFeesReducer = (state = initialValue, action)=>{
  switch(action.type){
    case GET_ALL_FEES: return {
      allFeesDataIsLoaded: true,
      allFeesData: action.payload,
    }
    default: return state
  }
}

export default getAllFeesReducer