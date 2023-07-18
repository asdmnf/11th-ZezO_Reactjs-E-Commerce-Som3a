import baseURL from "../Api/baseURL"


const usePostApi = async (url, data)=>{
  const res = await baseURL.post(url, data)
  return res
}

export const usePostApiWithImage = async (url, formData)=>{
  const config = {headers: {'Content-Type': 'multipart/form-data'} }
  const res = await baseURL.post(url, formData, config)
  return res
}


export const usePostApiWithToken = async (url, data)=>{
  const config = {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
  const res = await baseURL.post(url, data, config)
  return res
}

export const usePostApiWithImageWithToken = async (url, formData)=>{
  const config = {
    headers: 
    {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  const res = await baseURL.post(url, formData, config)
  return res
}

export default usePostApi