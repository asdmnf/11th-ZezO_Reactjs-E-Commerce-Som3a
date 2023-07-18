import { useDeleteApiWithToken } from "../../../Hooks-Axios/useDeleteApi"
import { useGetApiWithToken } from "../../../Hooks-Axios/useGetApi"
import { usePostApiWithToken } from "../../../Hooks-Axios/usePostApi"
import { usePutApiWithToken } from "../../../Hooks-Axios/usePutApi"
import { ADD_UPDATE, CHECKOUT_SESSION, CREATE_CASH_ORDER, DELETE_UPDATE, DELIVER_UPDATE, GET_ALL_ORDERS, GET_SPECIFIC_ORDER, PAID_UPDATE } from "../../types"



export const createCashOrder = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePostApiWithToken(`/api/v1/order/${id}`, data)
      dispatch ({
        type : CREATE_CASH_ORDER,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: CREATE_CASH_ORDER,
        payload: err
      })
    }
  }
}

// admin
export const getAllOrders = (log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken(`/api/v1/order/all-orders`)
      dispatch ({
        type : GET_ALL_ORDERS,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_ALL_ORDERS,
        payload: err
      })
    }
  }
}

// logged user
export const getLoggedUserOrders = (log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken(`/api/v1/order`)
      dispatch ({
        type : GET_ALL_ORDERS,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_ALL_ORDERS,
        payload: err
      })
    }
  }
}


export const getspecificOrder = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken(`/api/v1/order/${id}`)
      dispatch ({
        type : GET_SPECIFIC_ORDER,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_SPECIFIC_ORDER,
        payload: err
      })
    }
  }
}


export const updatePaidState = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/order/is-paid/${id}`, data)
      dispatch ({
        type : PAID_UPDATE,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: PAID_UPDATE,
        payload: err
      })
    }
  }
}


export const updateDeliverState = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/order/is-delivered/${id}`, data)
      dispatch ({
        type : DELIVER_UPDATE,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: DELIVER_UPDATE,
        payload: err
      })
    }
  }
}

export const getCheckoutSession = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePostApiWithToken(`/api/v1/order/online-payment-session/${id}`, data)
      dispatch ({
        type : CHECKOUT_SESSION,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: CHECKOUT_SESSION,
        payload: err
      })
    }
  }
}


export const addUpdate = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/order/add-update/${id}`, data)
      dispatch ({
        type : ADD_UPDATE,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: ADD_UPDATE,
        payload: err
      })
    }
  }
}


export const deleteUpdate = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/order/delete-update/${id}`, data)
      dispatch ({
        type : DELETE_UPDATE,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: DELETE_UPDATE,
        payload: err
      })
    }
  }
}


