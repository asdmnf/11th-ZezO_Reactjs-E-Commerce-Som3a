import { useDeleteApiWithToken } from "../../../Hooks-Axios/useDeleteApi"
import { useGetApiWithToken } from "../../../Hooks-Axios/useGetApi"
import { usePostApiWithImageWithToken } from "../../../Hooks-Axios/usePostApi"
import { usePutApiWithImageWithToken } from "../../../Hooks-Axios/usePutApi"
import { CREATE_CAROUSEL, DELETE_CAROUSEL, GET_ALL_CAROUSEL, GET_SPECIFIC_CAROUSEL, UPDATE_CAROUSEL } from "../../types"


export const getAllCarousel = (log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken("/api/v1/carousel")
      dispatch ({
        type : GET_ALL_CAROUSEL,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_ALL_CAROUSEL,
        payload: err
      })
    }
  }
}

export const createCarousel = (formData, log) => {
  return async (dispatch) =>{
    try {
      const res = await usePostApiWithImageWithToken("/api/v1/carousel", formData)
      dispatch({
        type: CREATE_CAROUSEL,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: CREATE_CAROUSEL,
        payload: err
      })
    }
  }
}

export const getSpecificCarousel = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken(`/api/v1/carousel/${id}`)
      dispatch ({
        type : GET_SPECIFIC_CAROUSEL,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_SPECIFIC_CAROUSEL,
        payload: err
      })
    }
  }
}

export const updateCarousel = (id, formData, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithImageWithToken(`/api/v1/carousel/${id}`, formData)
      dispatch ({
        type : UPDATE_CAROUSEL,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: UPDATE_CAROUSEL,
        payload: err
      })
    }
  }
}


export const deleteCarousel = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useDeleteApiWithToken(`/api/v1/carousel/${id}`)
      dispatch ({
        type : DELETE_CAROUSEL,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: DELETE_CAROUSEL,
        payload: err
      })
    }
  }
}