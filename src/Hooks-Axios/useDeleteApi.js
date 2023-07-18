import baseURL from "../Api/baseURL"


const useDeleteApi = async (url)=>{
  const res = await baseURL.delete(url)
  return res.data
}


export const useDeleteApiWithToken = async (url)=>{
  const config = {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
  const res = await baseURL.delete(url, config)
  return res.data
}
export default useDeleteApi