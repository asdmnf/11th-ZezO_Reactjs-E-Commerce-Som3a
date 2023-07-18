import { LOGGED_USER_DATA } from "../../types"


const initialValue = {
  isLoaded: false,
  loggedUserData: []
}

const loggedUserDataReducer = (state = initialValue, action) => {
  switch (action.type) {
    case LOGGED_USER_DATA: return {
      isLoaded: true,
      loggedUserData: action.payload,
    }
    default: return state
  }
}

export default loggedUserDataReducer