import { SEND_EMAIL_TO_ME, SEND_EMAIL_TO_USER } from "../../types"



const initialValue = {
  sendEmailToUserResponseIsLoaded: false,
  sendEmailToUserResponse: [],
  sendEmailToMeResponseIsLoaded: false,
  sendEmailToMeResponse: [],
}

const emailReducer = (state = initialValue, action)=>{
  switch(action.type){
    case SEND_EMAIL_TO_USER: return {
      sendEmailToUserResponseIsLoaded: true,
      sendEmailToUserResponse: action.payload,
    }
    case SEND_EMAIL_TO_ME: return {
      sendEmailToMeResponseIsLoaded: true,
      sendEmailToMeResponse: action.payload,
    }
    default: return state
  }
}

export default emailReducer