// import baseURL from "../../Api/baseURL"
import { useDeleteApiWithToken } from "../../Hooks-Axios/useDeleteApi"
import useGetApi from "../../Hooks-Axios/useGetApi"
import { usePostApiWithImageWithToken } from "../../Hooks-Axios/usePostApi"
import { usePutApiWithToken } from "../../Hooks-Axios/usePutApi"
import { ALL_CATEGORIES, CREATE_CATEGORY, EDIT_CATEGORY, GET_ALL_CATEGORY, GET_SPECIFIC_CATEGORY, REMOVE_CATEGORY } from "../types"


const getAllCategory = (log, limit)=>{
  return async (dispatch)=>{
    try {
      const res = await useGetApi(`/api/v1/categories?limit=${limit}`)
      dispatch({
        type: GET_ALL_CATEGORY,
        payload : res
      })
    } catch(err){
      dispatch({
        type: GET_ALL_CATEGORY,
        payload : err
      })
    }
  }
}

export const getAllCategoryPage = (log, limit, page)=>{
  return async (dispatch)=>{
    try {
      const res = await useGetApi(`/api/v1/categories?limit=${limit}&page=${page}`)
      dispatch({
        type: GET_ALL_CATEGORY,
        payload : res
      })
    } catch(err){
      dispatch({
        type: GET_ALL_CATEGORY,
        payload : err
      })
    }
  }
}

export const createCategoryItem = (formData, log)=>{
  return async (dispatch)=>{
    try {
      const res = await usePostApiWithImageWithToken("/api/v1/categories", formData)
      dispatch({
        type: CREATE_CATEGORY,
        payload : res
      })
    } catch(err){
      dispatch({
        type: CREATE_CATEGORY,
        payload : err
      })
    }
  }
}


// -----------------------------------------------------------------------------------------------------------

export const getAllCategoryData2 = (log, limit, page)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApi(`/api/v1/categories`)
      dispatch ({
        type : ALL_CATEGORIES,
        payload: res
      })
    } catch (err) {
      dispatch ({
        type: ALL_CATEGORIES,
        payload: err
      })
    }
  }
}


export const removeCategory = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useDeleteApiWithToken(`/api/v1/categories/${id}`)
      dispatch ({
        type : REMOVE_CATEGORY,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: REMOVE_CATEGORY,
        payload: err
      })
    }
  }
}


export const editCategory = (id, formData, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePutApiWithToken(`/api/v1/categories/${id}`, formData)
      dispatch ({
        type : EDIT_CATEGORY,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: EDIT_CATEGORY,
        payload: err
      })
    }
  }
}


export const getSpecificCategory = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApi(`/api/v1/categories/${id}`)
      dispatch ({
        type : GET_SPECIFIC_CATEGORY,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_SPECIFIC_CATEGORY,
        payload: err
      })
    }
  }
}



export default getAllCategory