import { useDeleteApiWithToken } from "../../../Hooks-Axios/useDeleteApi"
import { useGetApiWithToken } from "../../../Hooks-Axios/useGetApi"
import { usePostApiWithToken } from "../../../Hooks-Axios/usePostApi"
import { usePutApiWithToken } from "../../../Hooks-Axios/usePutApi"
import { ADD_COUPON, GET_ALL_COUPONS, GET_SPECIFIC_COUPON, REMOVE_COUPON, UPDATE_COUPON } from "../../types"



export const addCoupon = (data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePostApiWithToken("/api/v1/coupons", data)
      dispatch ({
        type : ADD_COUPON,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: ADD_COUPON,
        payload: err
      })
    }
  }
}


export const getAllCoupons = (log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken("/api/v1/coupons")
      dispatch ({
        type : GET_ALL_COUPONS,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_ALL_COUPONS,
        payload: err
      })
    }
  }
}


export const getSpecificCoupon = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken(`/api/v1/coupons/${id}`)
      dispatch ({
        type : GET_SPECIFIC_COUPON,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_SPECIFIC_COUPON,
        payload: err
      })
    }
  }
}


export const updateCoupon = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/coupons/${id}`, data)
      dispatch ({
        type : UPDATE_COUPON,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: UPDATE_COUPON,
        payload: err
      })
    }
  }
}


export const removeCoupon = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useDeleteApiWithToken(`/api/v1/coupons/${id}`)
      dispatch ({
        type : REMOVE_COUPON,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: REMOVE_COUPON,
        payload: err
      })
    }
  }
}