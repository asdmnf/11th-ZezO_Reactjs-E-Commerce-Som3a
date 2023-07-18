import baseURL from "../Api/baseURL"


export const usePutApi = async (url, data)=>{
  const res = await baseURL.put(url, data) 
  return res 
}

export const usePutApiWithImage = async (url, formData)=>{
  const config = {headers: {'Content-Type': 'multipart/form-data'} }
  const res = await baseURL.put(url, formData, config)
  return res
}


export const usePutApiWithToken = async (url, data)=>{
  const config = {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
  const res = await baseURL.put(url, data, config) 
  return res 
}

export const usePutApiWithImageWithToken = async (url, formData)=>{
  const config = {
    headers: 
    {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  const res = await baseURL.put(url, formData, config)
  return res
}
