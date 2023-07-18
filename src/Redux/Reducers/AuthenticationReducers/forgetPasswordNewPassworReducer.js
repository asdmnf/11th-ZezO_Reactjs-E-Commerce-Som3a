import { FORGET_PASSWOR_NEW_PASSWORD } from "../../types"


const initialValue = {
  isLoaded: false,
  forgetPasswordNewPassworResponse: []
}

const forgetPasswordNewPassworReducer = (state = initialValue, action) => {
  switch (action.type) {
    case FORGET_PASSWOR_NEW_PASSWORD: return {
      isLoaded: true,
      forgetPasswordNewPassworResponse: action.payload,
    }
    default: return state
  }
}

export default forgetPasswordNewPassworReducer