import { useDeleteApiWithToken } from "../../../Hooks-Axios/useDeleteApi"
import { useGetApiWithToken } from "../../../Hooks-Axios/useGetApi"
import { usePostApiWithToken } from "../../../Hooks-Axios/usePostApi"
import { usePutApiWithToken } from "../../../Hooks-Axios/usePutApi"
import { ADD_ADDRESS, GET_ALL_ADDRESSES, GET_SPECIFIC_ADDRESS, GET_SPECIFIC_ADDRESS_FIX, REMOVE_ADDRESS, UPDATE_ADDRESS } from "../../types"



export const addAddress = (data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePostApiWithToken("/api/v1/address", data)
      dispatch ({
        type : ADD_ADDRESS,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: ADD_ADDRESS,
        payload: err
      })
    }
  }
}


export const getAllAddresses = (log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken("/api/v1/address")
      dispatch ({
        type : GET_ALL_ADDRESSES,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_ALL_ADDRESSES,
        payload: err
      })
    }
  }
}


export const getSpecificAddress = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken(`/api/v1/address/${id}`)
      dispatch ({
        type : GET_SPECIFIC_ADDRESS,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_SPECIFIC_ADDRESS,
        payload: err
      })
    }
  }
}




export const getSpecificAddressFix = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken(`/api/v1/address/${id}`)
      dispatch ({
        type : GET_SPECIFIC_ADDRESS_FIX,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_SPECIFIC_ADDRESS_FIX,
        payload: err
      })
    }
  }
}




export const updateAddress = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/address/${id}`, data)
      dispatch ({
        type : UPDATE_ADDRESS,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: UPDATE_ADDRESS,
        payload: err
      })
    }
  }
}


export const removeAddress = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useDeleteApiWithToken(`/api/v1/address/${id}`)
      dispatch ({
        type : REMOVE_ADDRESS,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: REMOVE_ADDRESS,
        payload: err
      })
    }
  }
}