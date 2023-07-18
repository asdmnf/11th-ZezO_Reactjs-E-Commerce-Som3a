import { useGetApiWithToken } from "../../../Hooks-Axios/useGetApi"
import { usePutApiWithToken } from "../../../Hooks-Axios/usePutApi"
import { GET_USER_DATA, UPDATE_USER_DATA, UPDATE_USER_PASSWORD } from "../../types"


export const getUserData = (log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken("/api/v1/loggeduser/get-my-data")
      dispatch ({
        type : GET_USER_DATA,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_USER_DATA,
        payload: err
      })
    }
  }
}


export const updateUserData = (data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/loggeduser/update-my-data`, data)
      dispatch ({
        type : UPDATE_USER_DATA,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: UPDATE_USER_DATA,
        payload: err
      })
    }
  }
}


export const updateUserPassword = (data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/loggeduser/update-my-password`, data)
      dispatch ({
        type : UPDATE_USER_PASSWORD,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: UPDATE_USER_PASSWORD,
        payload: err
      })
    }
  }
}