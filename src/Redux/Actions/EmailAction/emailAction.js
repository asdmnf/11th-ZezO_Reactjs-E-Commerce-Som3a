import usePostApi, { usePostApiWithToken } from "../../../Hooks-Axios/usePostApi"
import { SEND_EMAIL_TO_ME, SEND_EMAIL_TO_USER } from "../../types"


export const sendEmailToUser = (data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePostApiWithToken(`/api/v1/email/send-email-to-user`, data)
      dispatch ({
        type : SEND_EMAIL_TO_USER,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: SEND_EMAIL_TO_USER,
        payload: err
      })
    }
  }
}

export const sendEmailToME = (data, log)=>{
  return async (dispatch) => {
    try {
      const res = await usePostApi(`/api/v1/email/send-email-to-me`, data)
      dispatch ({
        type : SEND_EMAIL_TO_ME,
        payload: res,
      })
    } catch (err) {
      dispatch ({
        type: SEND_EMAIL_TO_ME,
        payload: err
      })
    }
  }
}