import useGetApi from "../../Hooks-Axios/useGetApi"
import { GET_ERROR, GET_SUB_CATEGORY_BY_MAIN_CATEGORY_ID } from "../types"

export const getSubCategoryByMainCategoryId = (id, log) =>{
  return async (dispatch)=>{
    try {
      const res = await useGetApi(`/api/v1/categories/${id}/subcategories`)
      dispatch({
        type: GET_SUB_CATEGORY_BY_MAIN_CATEGORY_ID,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: GET_ERROR,
        payload: err
      })
    }
  }
}