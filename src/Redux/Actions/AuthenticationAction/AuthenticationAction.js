import { useGetApiWithToken } from "../../../Hooks-Axios/useGetApi"
import usePostApi from "../../../Hooks-Axios/usePostApi"
import { usePutApi } from "../../../Hooks-Axios/usePutApi"
import { FORGET_PASSWOR_CODE, FORGET_PASSWOR_EMAIL, FORGET_PASSWOR_NEW_PASSWORD, LOGGED_USER_DATA, LOGIN_USER, REGISTER_USER } from "../../types"


export const registerUser = (data, log) => {
  return async (dispatch) =>{
    try {
      const res = await usePostApi("/api/v1/auth/signup", data)
      dispatch({
        type: REGISTER_USER,
        payload: res
      })
    } catch (err) { 
      dispatch({
        type: REGISTER_USER,
        payload: err,
      })
    }
  }
}


export const loginUser = (data, log) => {
  return async (dispatch) =>{
    try {
      const res = await usePostApi("/api/v1/auth/login", data)
      dispatch({
        type: LOGIN_USER,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: LOGIN_USER,
        payload: err,
      })
    }
  }
}


export const forgetPasswordEmail = (data, log) => {
  return async (dispatch) =>{
    try {
      const res = await usePostApi("/api/v1/auth/forgot-password", data)
      dispatch({
        type: FORGET_PASSWOR_EMAIL,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: FORGET_PASSWOR_EMAIL,
        payload: err,
      })
    }
  }
}


export const forgetPasswordVerifyCode = (data, log) => {
  return async (dispatch) =>{
    try {
      const res = await usePostApi("/api/v1/auth/verify-rset-code", data)
      dispatch({
        type: FORGET_PASSWOR_CODE,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: FORGET_PASSWOR_CODE,
        payload: err,
      })
    }
  }
}


export const forgetPasswordNewPassworReset = (data, log) => {
  return async (dispatch) =>{
    try {
      const res = await usePutApi("/api/v1/auth/set-new-password", data)
      dispatch({
        type: FORGET_PASSWOR_NEW_PASSWORD,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: FORGET_PASSWOR_NEW_PASSWORD,
        payload: err,
      })
    }
  }
}


export const loggedUserData = (log) => {
  return async (dispatch) =>{
    try {
      const res = await useGetApiWithToken("/api/v1/loggeduser/get-my-data")
      dispatch({
        type: LOGGED_USER_DATA,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: LOGGED_USER_DATA,
        payload: err,
      })
    }
  }
}