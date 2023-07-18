import { useDeleteApiWithToken } from "../../../Hooks-Axios/useDeleteApi"
import { useGetApiWithToken } from "../../../Hooks-Axios/useGetApi"
import { usePostApiWithToken } from "../../../Hooks-Axios/usePostApi"
import { usePutApiWithToken } from "../../../Hooks-Axios/usePutApi"
import { ADD_TO_CART, ALL_CARTS, APPLY_COUPON, CLEAR_ALL_CART, EDIT_CART_ITEM_QUANTITY, REMOVE_FROM_CART } from "../../types"


export const addToCart = (data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePostApiWithToken(`/api/v1/cart`, data)
      dispatch ({
        type : ADD_TO_CART,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: ADD_TO_CART,
        payload: err
      })
    }
  }
}


export const getAllCartItems = (log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken(`/api/v1/cart`)
      dispatch ({
        type : ALL_CARTS,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: ALL_CARTS,
        payload: err
      })
    }
  }
}


export const removeItemFromCart = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useDeleteApiWithToken(`/api/v1/cart/${id}`)
      dispatch ({
        type : REMOVE_FROM_CART,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: REMOVE_FROM_CART,
        payload: err
      })
    }
  }
}


export const editCartItemQuantity = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/cart/${id}`, data)
      dispatch ({
        type : EDIT_CART_ITEM_QUANTITY,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: EDIT_CART_ITEM_QUANTITY,
        payload: err
      })
    }
  }
}


export const clearAllCartItems = (log)=>{
  return async (dispatch) => {
    try {
      const res = await useDeleteApiWithToken(`/api/v1/cart`)
      dispatch ({
        type : CLEAR_ALL_CART,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: CLEAR_ALL_CART,
        payload: err
      })
    }
  }
}


export const applyCoupon = (data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/cart`, data)
      dispatch ({
        type : APPLY_COUPON,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: APPLY_COUPON,
        payload: err
      })
    }
  }
}



export const resetAllCartItems = (log)=>{
  return ({
    type : ALL_CARTS,
    payload: [],
  })
}