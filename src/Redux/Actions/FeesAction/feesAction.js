import { useGetApiWithToken } from "../../../Hooks-Axios/useGetApi"
import { usePostApiWithToken } from "../../../Hooks-Axios/usePostApi"
import { usePutApiWithToken } from "../../../Hooks-Axios/usePutApi"
import { CREATE_FEES, GET_ALL_FEES, GET_SPECIFIC_FEES, UPDATE_FEES } from "../../types"


export const getAllFees = (log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken("/api/v1/fees")
      dispatch ({
        type : GET_ALL_FEES,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_ALL_FEES,
        payload: err
      })
    }
  }
}

export const getSpecificFees = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken(`/api/v1/fees/${id}`)
      dispatch ({
        type : GET_SPECIFIC_FEES,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_SPECIFIC_FEES,
        payload: err
      })
    }
  }
}

export const updateFees = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/fees/${id}`, data)
      dispatch ({
        type : UPDATE_FEES,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: UPDATE_FEES,
        payload: err
      })
    }
  }
}


export const createFees = (data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePostApiWithToken("/api/v1/fees", data)
      dispatch ({
        type : CREATE_FEES,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: CREATE_FEES,
        payload: err
      })
    }
  }
}