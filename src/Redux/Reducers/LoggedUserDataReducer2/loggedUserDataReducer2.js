import { LOGGED_USER_DATA_2 } from "../../types"


const initialValue = {
  loggedUserDataIsLoaded: false,
  loggedUserData: [],
}

const loggedUserDataReducer2 = (state = initialValue, action)=>{
  switch(action.type){
    case LOGGED_USER_DATA_2: return {
      loggedUserDataIsLoaded: true,
      loggedUserData: action.payload,
    }
    default: return state
  }
}

export default loggedUserDataReducer2