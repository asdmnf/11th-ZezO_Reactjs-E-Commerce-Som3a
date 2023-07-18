import { useDeleteApiWithToken } from "../../../Hooks-Axios/useDeleteApi"
import useGetApi from "../../../Hooks-Axios/useGetApi"
import { usePostApiWithImageWithToken } from "../../../Hooks-Axios/usePostApi"
import { usePutApiWithImageWithToken } from "../../../Hooks-Axios/usePutApi"
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_ALL_PRODUCTS_BY_CATEGORY_ID, GET_BRAND_NAME_DEPEND_ON_ID, GET_CATEGORY_NAME_DEPEND_ON_ID, GET_ERROR, GET_HOME_PRODUCT, GET_PAGE_PRODUCT, GET_SPECIFIC_PRODUCT, HOME_DEVICES_PRODUCTS, MARKET_PRODUCTS, MOST_SALES_PRODUCTS, SAMSUNG_PRODUCTS, SEARCH_PRODUCT, UPDATE_PRODUCT } from "../../types"


export const getHomeProduct = (log) => {
  return async (dispatch) =>{
    try {
      const res = await useGetApi("/api/v1/products")
      dispatch({
        type: GET_HOME_PRODUCT,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: GET_HOME_PRODUCT,
        payload: err
      })
    }
  }
}

export const mostSalesProductsAction = (log, limit, sort) => {
  return async (dispatch) =>{
    try {
      const res = await useGetApi(`/api/v1/products?limit=${limit}${sort}`)
      dispatch({
        type: MOST_SALES_PRODUCTS,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: MOST_SALES_PRODUCTS,
        payload: err
      })
    }
  }
}


export const marketProductsAction = (log, limit, sort) => {
  return async (dispatch) =>{
    try {
      const res = await useGetApi(`/api/v1/products?limit=${limit}${sort}`)
      dispatch({
        type: MARKET_PRODUCTS,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: MARKET_PRODUCTS,
        payload: err
      })
    }
  }
}


export const homeDevicesProductsAction = (log, limit, sort) => {
  return async (dispatch) =>{
    try {
      const res = await useGetApi(`/api/v1/products?limit=${limit}${sort}`)
      dispatch({
        type: HOME_DEVICES_PRODUCTS,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: HOME_DEVICES_PRODUCTS,
        payload: err
      })
    }
  }
}


export const samsungProductsAction = (log, limit, sort) => {
  return async (dispatch) =>{
    try {
      const res = await useGetApi(`/api/v1/products?limit=${limit}${sort}`)
      dispatch({
        type: SAMSUNG_PRODUCTS,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: SAMSUNG_PRODUCTS,
        payload: err
      })
    }
  }
}


export const getPageProduct = (limit, page, log) => {
  return async (dispatch) =>{
    try {
      const res = await useGetApi(`/api/v1/products?limit=${limit}&page=${page}`)
      dispatch({
        type: GET_PAGE_PRODUCT,
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



export const createProduct = (formData, log) => {
  return async (dispatch) =>{
    try {
      const res = await usePostApiWithImageWithToken("/api/v1/products", formData)
      dispatch({
        type: CREATE_PRODUCT,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: CREATE_PRODUCT,
        payload: err
      })
    }
  }
}

export const getSpecificProduct = (id, log) => {
  return async (dispatch) =>{
    try {
      const res = await useGetApi(`/api/v1/products/${id}`)
      dispatch({
        type: GET_SPECIFIC_PRODUCT,
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


export const getCategoryNameDependOnId = (id, log) => {
  return async (dispatch) =>{
    try {
      const res = await useGetApi(`/api/v1/categories/${id}`)
      dispatch({
        type: GET_CATEGORY_NAME_DEPEND_ON_ID,
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


export const getBrandNameDependOnId = (id, log) => {
  return async (dispatch) =>{
    try {
      const res = await useGetApi(`/api/v1/brands/${id}`)
      dispatch({
        type: GET_BRAND_NAME_DEPEND_ON_ID,
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


export const getAllProductsByCategoryId = (id, limit, log) => {
  return async (dispatch) =>{
    try {
      const res = await useGetApi(`/api/v1/subcategories/${id}/products?limit=${limit}`)
      dispatch({
        type: GET_ALL_PRODUCTS_BY_CATEGORY_ID,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: GET_ALL_PRODUCTS_BY_CATEGORY_ID,
        payload: err
      })
    }
  }
}


export const deleteProduct = (id, log) => {
  return async (dispatch) =>{
    try {
      const res = await useDeleteApiWithToken(`/api/v1/products/${id}`)
      dispatch({
        type: DELETE_PRODUCT,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: DELETE_PRODUCT,
        payload: err
      })
    }
  }
}


export const updateProduct = (id, formdata, log) => {
  return async (dispatch) =>{
    try {
      const res = await usePutApiWithImageWithToken(`/api/v1/products/${id}`, formdata)
      dispatch({
        type: UPDATE_PRODUCT,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: UPDATE_PRODUCT,
        payload: err
      })
    }
  }
}

export const queryProduct = (query, log) => {
  return async (dispatch) =>{
    try {
      const res = await useGetApi(`/api/v1/products?${query}`)
      dispatch({
        type: SEARCH_PRODUCT,
        payload: res
      })
    } catch (err) {
      dispatch({
        type: SEARCH_PRODUCT,
        payload: err
      })
    }
  }
}

export const resetSpecificProductData = (log)=>{
  return ({
    type : GET_SPECIFIC_PRODUCT,
    payload: [],
  })
}