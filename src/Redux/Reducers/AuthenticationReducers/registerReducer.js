import { REGISTER_USER } from "../../types"


const initialValue = {
  isLoaded: false,
  registerResponse: []
}

const registerReducer = (state = initialValue, action) => {
  switch (action.type) {
    case REGISTER_USER: return {
      isLoaded: true,
      registerResponse: action.payload,
    }
    default: return state
  }
}

export default registerReducer