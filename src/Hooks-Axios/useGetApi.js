import baseURL from "../Api/baseURL"

const useGetApi = async (url)=>{
  const res = await baseURL.get(url)
  return res.data
}


export const useGetApiWithToken = async (url)=>{
  const config = {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
  const res = await baseURL.get(url, config)
  return res.data
}
export default useGetApi