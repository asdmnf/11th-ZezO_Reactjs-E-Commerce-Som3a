import useGetApi from "../../Hooks-Axios/useGetApi"
import { usePostApiWithImageWithToken } from "../../Hooks-Axios/usePostApi"
import { usePutApiWithToken } from "../../Hooks-Axios/usePutApi"
import { useDeleteApiWithToken } from "../../Hooks-Axios/useDeleteApi"
import { ALL_BRANDS, CREATE_BRAND, EDIT_BRAND, GET_ALL_BRAND, GET_SPECIFIC_BRAND, REMOVE_BRAND } from "../types"


export const getAllBrandData = (log, limit, page)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApi(`/api/v1/brands?limit=${limit}&page=${page}`)
      dispatch ({
        type : GET_ALL_BRAND,
        payload: res
      })
    } catch (err) {
      dispatch ({
        type: GET_ALL_BRAND,
        payload: err
      })
    }
  }
}


export const createBrandData = (formData, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePostApiWithImageWithToken("/api/v1/brands", formData)
      dispatch ({
        type : CREATE_BRAND,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: CREATE_BRAND,
        payload: err
      })
    }
  }
}

// -----------------------------------------------------------------------------------------------------------



export const getAllBrandData2 = (log, limit, page)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApi(`/api/v1/brands?limit=${limit}&page=${page}`)
      dispatch ({
        type : ALL_BRANDS,
        payload: res
      })
    } catch (err) {
      dispatch ({
        type: ALL_BRANDS,
        payload: err
      })
    }
  }
}


export const removeBrand = (id, log)=>{ 
  return async (dispatch) => {
    try {
      const res = await useDeleteApiWithToken(`/api/v1/brands/${id}`)
      dispatch ({
        type : REMOVE_BRAND,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: REMOVE_BRAND,
        payload: err
      })
    }
  }
}


export const editBrand = (id, formData, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/brands/${id}`, formData)
      dispatch ({
        type : EDIT_BRAND,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: EDIT_BRAND,
        payload: err
      })
    }
  }
}


export const getSpecificBrand = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApi(`/api/v1/brands/${id}`)
      dispatch ({
        type : GET_SPECIFIC_BRAND,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_SPECIFIC_BRAND,
        payload: err
      })
    }
  }
}


