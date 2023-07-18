import { useDeleteApiWithToken } from "../../Hooks-Axios/useDeleteApi"
import useGetApi from "../../Hooks-Axios/useGetApi"
import { usePostApiWithToken } from "../../Hooks-Axios/usePostApi"
import { usePutApiWithToken } from "../../Hooks-Axios/usePutApi"
import { ALL_SUB_CATEGORIES, CREATE_SUB_CATEGORY, EDIT_SUB_CATEGORY, GET_SPECIFIC_SUB_CATEGORY, GET_SUB_CATEGORY, REMOVE_SUB_CATEGORY } from "../types"


export const createSubCategory = (data, log) =>{
  return async (dispatch)=>{
    try {
      const res = await usePostApiWithToken("/api/v1/subcategories", data)
      dispatch({
        type: CREATE_SUB_CATEGORY,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: CREATE_SUB_CATEGORY,
        payload: err
      })
    }
  }
}


export const getSubCategory = (log, limit) =>{
  return async (dispatch)=>{
    try {
      const res = await useGetApi(`/api/v1/subcategories?limit=${limit}`)
      dispatch({
        type: GET_SUB_CATEGORY,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: GET_SUB_CATEGORY,
        payload: err
      })
    }
  }
}




// -----------------------------------------------------------------------------------------------------------



export const getAllSubCategoryData2 = (log, limit, page)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApi(`/api/v1/subcategories?limit=${limit}&page=${page}`)
      dispatch ({
        type : ALL_SUB_CATEGORIES,
        payload: res
      })
    } catch (err) {
      dispatch ({
        type: ALL_SUB_CATEGORIES,
        payload: err
      })
    }
  }
}


export const removeSubCategory = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useDeleteApiWithToken(`/api/v1/subcategories/${id}`)
      dispatch ({
        type : REMOVE_SUB_CATEGORY,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: REMOVE_SUB_CATEGORY,
        payload: err
      })
    }
  }
}


export const editSubCategory = (id, data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/subcategories/${id}`, data)
      dispatch ({
        type : EDIT_SUB_CATEGORY,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: EDIT_SUB_CATEGORY,
        payload: err
      })
    }
  }
}


export const getSpecificSubCategory = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApi(`/api/v1/subcategories/${id}`)
      dispatch ({
        type : GET_SPECIFIC_SUB_CATEGORY,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_SPECIFIC_SUB_CATEGORY,
        payload: err
      })
    }
  }
}

