import { useGetApiWithToken } from "../../../Hooks-Axios/useGetApi"
import { LOGGED_USER_DATA_2 } from "../../types"


export const getLoggedUserData2 = (log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken(`/api/v1/loggeduser/get-my-data`)
      dispatch ({
        type : LOGGED_USER_DATA_2,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: LOGGED_USER_DATA_2,
        payload: err
      })
    }
  }
}