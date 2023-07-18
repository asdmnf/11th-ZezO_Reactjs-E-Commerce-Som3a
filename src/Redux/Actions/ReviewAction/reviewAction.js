import { useDeleteApiWithToken } from "../../../Hooks-Axios/useDeleteApi"
import useGetApi, { useGetApiWithToken } from "../../../Hooks-Axios/useGetApi"
import { usePostApiWithToken } from "../../../Hooks-Axios/usePostApi"
import { usePutApiWithToken } from "../../../Hooks-Axios/usePutApi"
import { ADD_REVIEW, ALL_REVIEWS, ALL_REVIEW_2, EDIT_REVIEW, GET_SPECIFIC_REVIEW, REMOVE_REVIEW } from "../../types"


export const addReview = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePostApiWithToken(`/api/v1/products/${id}/reviews`, data)
      dispatch ({
        type : ADD_REVIEW,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: ADD_REVIEW,
        payload: err
      })
    }
  }
}


export const allReviews = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApi(`/api/v1/products/${id}/reviews`)
      dispatch ({
        type : ALL_REVIEW_2,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: ALL_REVIEW_2,
        payload: err
      })
    }
  }
}


export const removeReview = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useDeleteApiWithToken(`/api/v1/reviews/${id}`)
      dispatch ({
        type : REMOVE_REVIEW,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: REMOVE_REVIEW,
        payload: err
      })
    }
  }
}


export const editReview = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/reviews/${id}`, data)
      dispatch ({
        type : EDIT_REVIEW,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: EDIT_REVIEW,
        payload: err
      })
    }
  }
}


export const getSpecificReview = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken(`/api/v1/reviews/${id}`)
      dispatch ({
        type : GET_SPECIFIC_REVIEW,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_SPECIFIC_REVIEW,
        payload: err
      })
    }
  }
}