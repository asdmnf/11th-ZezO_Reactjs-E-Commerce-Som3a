import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addUpdate, deleteUpdate, getspecificOrder, updateDeliverState, updatePaidState } from "../../Redux/Actions/PaymentAction/PaymentAction"
import ToastifyNotification from "../ToastifyNotification"
import Swal from "sweetalert2"
import { sendEmailToUser } from "../../Redux/Actions/EmailAction/emailAction"


const AdminOrderNumberPageHook = () => {

  const [notify] = ToastifyNotification()

  const orderID = useParams()

  const dispatch = useDispatch()
  const specificOrderData = useSelector(state => state.paymentReducer.specificOrderData)
  const specificOrderDataIsLoaded = useSelector(state => state.paymentReducer.specificOrderDataIsLoaded)
  const paidUpdateResponse = useSelector(state => state.paymentReducer.paidUpdateResponse)
  const paidUpdateResponseIsLoaded = useSelector(state => state.paymentReducer.paidUpdateResponseIsLoaded)
  const deliverUpdateResponse = useSelector(state => state.paymentReducer.deliverUpdateResponse)
  const deliverUpdateResponseIsLoaded = useSelector(state => state.paymentReducer.deliverUpdateResponseIsLoaded)
  const addUpdateResponse = useSelector(state => state.orderUpdateReducer.addUpdateResponse)
  const addUpdateResponseIsLoaded = useSelector(state => state.orderUpdateReducer.addUpdateResponseIsLoaded)
  const deleteUpdateResponse = useSelector(state => state.orderUpdateReducer.deleteUpdateResponse)
  const deleteUpdateResponseIsLoaded = useSelector(state => state.orderUpdateReducer.deleteUpdateResponseIsLoaded)

  const [updateValue, setUpdateValue] = useState("")

  const [paidInputLoader, setPaidInputLoader] = useState(false) 
  const [deliverInputLoader, setDeliverInputLoader] = useState(false) 
  const [updateLoader, setUpdateLoader] = useState(false) 

  const [paidInputIsClicked, setPaidInputIsClicked] = useState(false)
  const [deliverInputIsClicked, setDeliverInputIsClicked] = useState(false)
  const [updateBtnIsClicked, setUpdateBtnIsClicked] = useState(false)
  const [deleteIconIsClicked, setDeleteIconIsClicked] = useState(false)

  useEffect(() => {
    dispatch(getspecificOrder(orderID.id, "AdminOrderNumberPageHook"))
    // eslint-disable-next-line
  }, [])





  //----------------------------------------------------------------------------------------------------
  // تغيير حالة الدفع

  const paidInputOnClickHandle = async (orderID) => {
    setPaidInputLoader(true)
    await dispatch(updatePaidState(orderID, {
      isPaid: true
    }, "AdminOrderNumberPageHook"))
    setPaidInputLoader(false)
    setPaidInputIsClicked(true)
    dispatch(getspecificOrder(orderID, "AdminOrderNumberPageHook"))
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (paidUpdateResponseIsLoaded && paidInputIsClicked) {
      if (paidUpdateResponse.status === 201) {
        notify("success", "تم تغيير حالة الدفع بنجاح")
      } else {

        if (paidUpdateResponse?.response?.data?.error?.statusMessage) {
          if (paidUpdateResponse?.response?.data?.error?.statusMessage === "failed to update isPaid status check orderID") {
            notify("error", "حدث خطأ حاول مرة اخرى")
          }
        }
      }
    } else if (!paidUpdateResponseIsLoaded && paidInputIsClicked) {
      notify("error", "هناك مشكلة فى تغيير حالة الدفع حاول مرة اخرى")
    }
    setPaidInputIsClicked(false)
    // eslint-disable-next-line
  }, [paidInputIsClicked])
  

  //----------------------------------------------------------------------------------------------------





  //----------------------------------------------------------------------------------------------------
  // تغيير حالة التوصيل

  const deliverInputOnClickHandle = async (orderID) => {
    setDeliverInputLoader(true)
    await dispatch(updateDeliverState(orderID, {
      isDelivered: true
    }, "AdminOrderNumberPageHook"))
    setDeliverInputLoader(false)
    setDeliverInputIsClicked(true)
    dispatch(getspecificOrder(orderID, "AdminOrderNumberPageHook"))
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (deliverUpdateResponseIsLoaded && deliverInputIsClicked) {
      if (deliverUpdateResponse.status === 201) {
        notify("success", "تم تغيير حالة التوصيل بنجاح")
      } else {

        if (deliverUpdateResponse?.response?.data?.error?.statusMessage) {
          if (deliverUpdateResponse?.response?.data?.error?.statusMessage === "failed to update isDelevered status check orderID") {
            notify("error", "حدث خطأ حاول مرة اخرى")
          }
        }
      }
    } else if (!deliverUpdateResponseIsLoaded && deliverInputIsClicked) {
      notify("error", "هناك مشكلة فى تغيير حالة التوصيل حاول مرة اخرى")
    }
    setDeliverInputIsClicked(false)
    // eslint-disable-next-line
  }, [deliverInputIsClicked])

  //----------------------------------------------------------------------------------------------------

  // add update
  const updateValueOnChangeHandle = (e) => {
    setUpdateValue(e.target.value)
  }

  const addUpdateOnClickHandle = async () => {
    if (!updateValue) {
      notify("warning", "يجب ادخال التحديث اولا")
      return
    }
    setUpdateLoader(true)
    await dispatch(addUpdate(orderID.id, {
      update: updateValue
    }, "AdminOrderNumberPageHook"))
    setUpdateLoader(false)
    setUpdateBtnIsClicked(true)
  }

  useEffect(() => {
    if (addUpdateResponseIsLoaded && updateBtnIsClicked) {
      if (addUpdateResponse.status === 201) {
        notify("success", "تم ارسال التحديث بنجاح")
        dispatch(getspecificOrder(orderID.id, "AdminOrderNumberPageHook"))
        setUpdateValue("")
      } else {
        notify("error", "حدث مشكلة حاول مرة اخرى")
      }
    }
    setUpdateBtnIsClicked(false)
  }, [updateBtnIsClicked])

  // delete update
  const deleteUpdateOnClickHandle = async (updateID) => {
    await dispatch(deleteUpdate(orderID.id, {
      updateID: updateID
    }, "AdminOrderNumberPageHook"))
    setDeleteIconIsClicked(true)
  }
  
  useEffect(() => {
    if (deleteUpdateResponseIsLoaded && deleteIconIsClicked) {
      if (deleteUpdateResponse.status === 200) {
        notify("success", "لقد تم حذف التحديث بنجاح")
        dispatch(getspecificOrder(orderID.id, "AdminOrderNumberPageHook"))
      } else {
        notify("error", "حدثت مشكلة حاول مرة اخرى")
      }
    }
    setDeleteIconIsClicked(false)
  }, [deleteIconIsClicked])
  

  // sending email

  const sendEmailToUserResponse = useSelector(state => state.emailReducer.sendEmailToUserResponse)
  const sendEmailToUserResponseIsLoaded = useSelector(state => state.emailReducer.sendEmailToUserResponseIsLoaded)
  const sendEmailToMeResponse = useSelector(state => state.emailReducer.sendEmailToMeResponse)
  const sendEmailToMeResponseIsLoaded = useSelector(state => state.emailReducer.sendEmailToMeResponseIsLoaded)

  const [sendBtnIsClicked, setSendBtnIsClicked] = useState(false)

  const emailIconOnClickHandle = (email, name) => {
    Swal.fire({
      title: 'ارسال رسالة الى',
      input: 'textarea',
      inputLabel: `${name}`,
      inputPlaceholder: 'محتوى الرسالة ...',
      showCancelButton: true,
      cancelButtonText: "إلغاء",
      confirmButtonText: 'إرسال',
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545',
      showLoaderOnConfirm: true,
      preConfirm: (textareaValue) => {
        return dispatch(sendEmailToUser({
          userEmail: email,
          message: textareaValue,
        } , "AdminOrderNumberPageHook"))
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        setSendBtnIsClicked(true)
      }
    })
  }

  useEffect(() => {
    if (sendEmailToUserResponseIsLoaded && sendBtnIsClicked) {
      if (sendEmailToUserResponse.status === 201) {
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
  


  return [specificOrderDataIsLoaded, specificOrderData, paidInputOnClickHandle, deliverInputOnClickHandle, paidInputLoader, deliverInputLoader, updateValue, updateValueOnChangeHandle, addUpdateOnClickHandle, updateLoader, deleteUpdateOnClickHandle, emailIconOnClickHandle]
}

export default AdminOrderNumberPageHook