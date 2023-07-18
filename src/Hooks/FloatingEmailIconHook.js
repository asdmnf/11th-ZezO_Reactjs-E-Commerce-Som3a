import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { sendEmailToME } from "../Redux/Actions/EmailAction/emailAction"


const FloatingEmailIconHook = () => {

  const dispatch = useDispatch()
  const sendEmailToMeResponse = useSelector(state => state.emailReducer.sendEmailToMeResponse)
  const sendEmailToMeResponseIsLoaded = useSelector(state => state.emailReducer.sendEmailToMeResponseIsLoaded)

  const [sendBtnIsClicked, setSendBtnIsClicked] = useState(false)

  const emailIconOnClickHandle = () => {
    Swal.fire({
      title: 'if you find any bugs, or anything else Tell Me your opinion is concerned',
      input: 'textarea',
      inputLabel: `To ZezOoo`,
      inputPlaceholder: 'محتوى الرسالة ...',
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: 'Send',
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545',
      showLoaderOnConfirm: true,
      preConfirm: (textareaValue) => {
        if (!textareaValue) {
          Swal.fire(
            '!!!',
            'لابد من وجود محتوى.',
            'info',
          )
          return
        }
        return dispatch(sendEmailToME({
          message: textareaValue,
        } , "FloatingEmailIconHook"))
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        setSendBtnIsClicked(true)
      }
    })
  }

  useEffect(() => {
    if (sendEmailToMeResponseIsLoaded && sendBtnIsClicked) {
      if (sendEmailToMeResponse.status === 201) {
        Swal.fire(
          'تمت العملية',
          'تم ارسال الرسالة بنجاح.',
          'success',
        )
      } else {
        Swal.fire(
          'حدث خطأ',
          'حاول مرة اخرى.',
          'error',
        )
      }
    }
    setSendBtnIsClicked(false)
  }, [sendBtnIsClicked])

  return [emailIconOnClickHandle]
}

export default FloatingEmailIconHook