import { GET_ALL_USERS } from "../../types"


const initialValue = {
  allUsersDataIsLoaded: false,
  allUsersData: [],
}

const getAllUsersReducer = (state = initialValue, action)=>{
  switch(action.type){
    case GET_ALL_USERS: return {
      allUsersDataIsLoaded: true,
      allUsersData: action.payload,
    }
    default: return state
  }
}

export default getAllUsersReducer