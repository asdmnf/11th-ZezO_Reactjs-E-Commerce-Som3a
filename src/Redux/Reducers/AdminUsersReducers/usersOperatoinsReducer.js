import { ACTIVATE_ACCOUNT, CHANGE_TO_ADMIN, CHANGE_TO_USER, DEACTIVATE_ACOUNT } from "../../types"


const initialValue = {
  changeToAdminResponseIsLoaded: false,
  changeToUserResponseIsLoaded: false,
  deactivateAccountResponseIsLoaded: false,
  activateAccountResponseIsLoaded: false,
  changeToAdminResponse: [],
  changeToUserResponse: [],
  deactivateAccountResponse: [],
  activateAccountResponse: [],
}

const usersOperatoinsReducer = (state = initialValue, action)=>{
  
  switch(action.type){
    case CHANGE_TO_ADMIN: return {
      changeToAdminResponseIsLoaded: true,
      changeToAdminResponse: action.payload,
    }
    case CHANGE_TO_USER: return {
      changeToUserResponseIsLoaded: true,
      changeToUserResponse: action.payload,
    }
    case DEACTIVATE_ACOUNT: return {
      deactivateAccountResponseIsLoaded: true,
      deactivateAccountResponse: action.payload,
    }
    case ACTIVATE_ACCOUNT: return {
      activateAccountResponseIsLoaded: true,
      activateAccountResponse: action.payload,
    }
    default: return state
  }
}

export default usersOperatoinsReducer