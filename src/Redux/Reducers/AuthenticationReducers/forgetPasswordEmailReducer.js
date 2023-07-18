import { FORGET_PASSWOR_EMAIL } from "../../types"


const initialValue = {
  isLoaded: false,
  forgetPasswordEmailResponse: []
}

const forgetPasswordEmailReducer = (state = initialValue, action) => {
  switch (action.type) {
    case FORGET_PASSWOR_EMAIL: return {
      isLoaded: true,
      forgetPasswordEmailResponse: action.payload,
    }
    default: return state
  }
}

export default forgetPasswordEmailReducer