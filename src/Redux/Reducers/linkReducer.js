


import { ANY_DATA } from "../types"



const initialValue = {
  anyDataIsLoaded: false,
  anyData: [],
}

const linkReducer = (state = initialValue, action)=>{
  switch(action.type){
    case ANY_DATA: return {
      anyDataIsLoaded: true,
      anyData: action.payload,
    }
    default: return state
  }
}

export default linkReducer