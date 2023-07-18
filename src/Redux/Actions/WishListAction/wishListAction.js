import { useDeleteApiWithToken } from "../../../Hooks-Axios/useDeleteApi"
import { useGetApiWithToken } from "../../../Hooks-Axios/useGetApi"
import { usePostApiWithToken } from "../../../Hooks-Axios/usePostApi"
import { ADD_TO_WISHLIST, GET_ALL_WISHLIST, REMOVE_WISHLIST } from "../../types"



export const addToWishList = (data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePostApiWithToken("/api/v1/wishlists", data)
      dispatch ({
        type : ADD_TO_WISHLIST,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: ADD_TO_WISHLIST,
        payload: err
      })
    }
  }
}


export const getAllWishList = (log)=>{
  return async (dispatch) => {
    try {
      const res = await useGetApiWithToken("/api/v1/wishlists")
      dispatch ({
        type : GET_ALL_WISHLIST,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: GET_ALL_WISHLIST,
        payload: err
      })
    }
  }
}


export const removeWishList = (id, log)=>{
  return async (dispatch) => {
    try {
      const res = await useDeleteApiWithToken(`/api/v1/wishlists/${id}`)
      dispatch ({
        type : REMOVE_WISHLIST,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: REMOVE_WISHLIST,
        payload: err
      })
    }
  }
}