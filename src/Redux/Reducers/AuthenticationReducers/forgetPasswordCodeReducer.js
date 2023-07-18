import { FORGET_PASSWOR_CODE } from "../../types"


const initialValue = {
  isLoaded: false,
  forgetPasswordCodeResponse: []
}

const forgetPasswordCodeReducer = (state = initialValue, action) => {
  switch (action.type) {
    case FORGET_PASSWOR_CODE: return {
      isLoaded: true,
      forgetPasswordCodeResponse: action.payload,
    }
    default: return state
  }
}

export default forgetPasswordCodeReducer