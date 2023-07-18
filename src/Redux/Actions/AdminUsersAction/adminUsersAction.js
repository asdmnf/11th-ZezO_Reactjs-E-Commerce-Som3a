import { useDeleteApiWithToken } from "../../../Hooks-Axios/useDeleteApi"
import { useGetApiWithToken } from "../../../Hooks-Axios/useGetApi"
import { usePutApiWithToken } from "../../../Hooks-Axios/usePutApi"
import { ACTIVATE_ACCOUNT, CHANGE_TO_ADMIN, CHANGE_TO_USER, DEACTIVATE_ACOUNT, GET_ALL_USERS } from "../../types"


export const getAllUsers = (log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken("/api/v1/users")
      dispatch ({
        type : GET_ALL_USERS,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_ALL_USERS,
        payload: err
      })
    }
  }
}

export const changeToAdmin = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/users/${id}`, data)
      dispatch ({
        type : CHANGE_TO_ADMIN,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: CHANGE_TO_ADMIN,
        payload: err
      })
    }
  }
}

export const changeToUser = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/users/${id}`, data)
      dispatch ({
        type : CHANGE_TO_USER,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: CHANGE_TO_USER,
        payload: err
      })
    }
  }
}

export const deactivateAccount = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useDeleteApiWithToken(`/api/v1/users/${id}`)
      dispatch ({
        type : DEACTIVATE_ACOUNT,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: DEACTIVATE_ACOUNT,
        payload: err
      })
    }
  }
}

export const activateAccount = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/users/activate-account/${id}`)
      dispatch ({
        type : ACTIVATE_ACCOUNT,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: ACTIVATE_ACCOUNT,
        payload: err
      })
    }
  }
}