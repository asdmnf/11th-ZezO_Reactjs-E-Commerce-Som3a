import { GET_USER_DATA, UPDATE_USER_DATA, UPDATE_USER_PASSWORD } from "../../types"


const initialValue = {
  userDataIsLoaded: false,
  updateUserDataResponseIsLoaded: false,
  updateUserPasswordResponseIsLoaded: false,
  userData: [],
  updateUserDataResponse: [],
  updateUserPasswordResponse: [],
}

const userReducer = (state = initialValue, action)=>{
  
  switch(action.type){
    case GET_USER_DATA: return {
      userDataIsLoaded: true,
      userData: action.payload,
    }
    case UPDATE_USER_DATA: return {
      updateUserDataResponseIsLoaded: true,
      updateUserDataResponse: action.payload,
    }
    case UPDATE_USER_PASSWORD: return {
      updateUserPasswordResponseIsLoaded: true,
      updateUserPasswordResponse: action.payload,
    }
    default: return state
  }
}

export default userReducer