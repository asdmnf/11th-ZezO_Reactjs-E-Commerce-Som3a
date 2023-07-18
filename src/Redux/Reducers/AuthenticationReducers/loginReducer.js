import { LOGIN_USER } from "../../types"


const initialValue = {
  isLoaded: false,
  loginResponse: []
}

const loginReducer = (state = initialValue, action) => {
  switch (action.type) {
    case LOGIN_USER: return {
      isLoaded: true,
      loginResponse: action.payload,
    }
    default: return state
  }
}

export default loginReducer