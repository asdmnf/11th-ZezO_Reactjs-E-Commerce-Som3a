



import { ANY_DATA } from "../types"





export const resetAnyData = (log)=>{
  return ({
    type : ANY_DATA,
    payload: [],
  })
}
