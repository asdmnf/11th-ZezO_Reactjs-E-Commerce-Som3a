import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllAddresses, getSpecificAddressFix } from "../../Redux/Actions/AddressAction/addressAction"
import { getAllCartItems, resetAllCartItems } from "../../Redux/Actions/CartAction/cartAction"
import { createCashOrder, getCheckoutSession } from "../../Redux/Actions/PaymentAction/PaymentAction"
import { resetSpecificAddressData } from "../../Redux/Reducers/AddressReducer/specificAddressReducer"
import ToastifyNotification from "../ToastifyNotification"
import { getSpecificProduct } from "../../Redux/Actions/productAction/productAction"


const PaymentMethodPageHook = () => {

  const [notify] = ToastifyNotification()

  const navigateTo = useNavigate()

  const [cartID, setCartID] = useState('')
  const [paymentMethod, setpaymentMethod] = useState('')
  const [addressTitle, setAddressTitle] = useState('')
  const [addressDetails, setAddressDetails] = useState('')
  const [addressphone, setAddressphone] = useState('')
  const [addressId, setAddressId] = useState('')
  
  const dispatch = useDispatch()
  const allCartData = useSelector(state => state.cartReducer.allCartData)
  const allCartDataIsLoaded = useSelector(state => state.cartReducer.allCartDataIsLoaded)
  const allAddressesData = useSelector(state => state.addressReducer.allAddressesData)
  const allAddressesDataIsLoaded = useSelector(state => state.addressReducer.allAddressesDataIsLoaded)
  // const specificAddressData = useSelector(state => state.specificAddressReducer.specificAddressData)
  // const specificAddressDataIsLoaded = useSelector(state => state.specificAddressReducer.specificAddressDataIsLoaded)
  const createCashOrderResponse = useSelector(state => state.paymentReducer.createCashOrderResponse)
  const createCashOrderResponseIsLoaded = useSelector(state => state.paymentReducer.createCashOrderResponseIsLoaded)
  const checkoutSessionData = useSelector(state => state.paymentReducer.checkoutSessionData)
  const checkoutSessionDataIsLoaded = useSelector(state => state.paymentReducer.checkoutSessionDataIsLoaded)

  const [loader, setLoader] = useState(false)
  const [buyItemsIsClicked, setBuyItemsIsClicked] = useState(false)

  const specificProductData = useSelector(state => state.getSpecificProductReducer.product)
  const specificProductDataIsLoaded = useSelector(state => state.getSpecificProductReducer.isLoaded)
  const [quantityLessProducts, setQuantityLessProducts] = useState([])
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    dispatch(getAllAddresses("PaymentMethodPageHook"))
    // eslint-disable-next-line
  }, [])

  // قيمة طريقة الدقع
  const visaSelectOnChangeHandle = (e) => {
    setpaymentMethod(e.target.id)
  }

  const cashSelectOnChangeHandle = (e) => {
    setpaymentMethod(e.target.id)
  }



  const addressSelectOnChangeHandle = async (e) => {
    if (e.target.value === "0"){
      return
    } else {
      let specificAddress = allAddressesData?.data?.addresses.filter(item => {
        return item._id === e.target.value
      })
      setAddressTitle(specificAddress[0].title)
      setAddressDetails(specificAddress[0].fullAddress)
      setAddressphone(specificAddress[0].phone)
      setAddressId(specificAddress[0]._id)
    }
  }

  useEffect(() => {
    if (allCartDataIsLoaded && allCartData.status === 200 && allCartData.data){
      setCartID(allCartData.data?._id)
    }
    // eslint-disable-next-line
  }, [allCartDataIsLoaded])


  

  const buyItemsOnClickHandle = async () => {
    if (!localStorage.getItem("userData")){
      notify("info", "يجب تسجيل الدخول اولا")
      return
    }else if (!paymentMethod){
      notify('warning', 'يجب اختيار طريقة دفع اولا')
    return
    }else if (!addressDetails){
      notify('warning', 'يجب اختيار عنوان اولا')
      return
    } else {
      setLoader(true)
      // cash order
      if (paymentMethod === "cash") {
        await dispatch(createCashOrder(cartID, {
          shippingAddress: addressId,
          paymentMethod: paymentMethod
        }, "PaymentMethodPageHook"))
        // visa order
      } else if (paymentMethod === "visa") {
        await dispatch(getCheckoutSession(cartID, {
          shippingAddress: addressId,
        }, "PaymentMethodPageHook"))
      }
      
      setLoader(false)
      setBuyItemsIsClicked(true)
      setIsClicked(true)
    }
  }

  useEffect(() => {
    // cash order notification
    if (createCashOrderResponseIsLoaded && buyItemsIsClicked){
      if (createCashOrderResponse.status === 201){
        notify('success', 'تم الطلب بنجاح')
        setTimeout(() => {
          navigateTo("/user/orders")
          dispatch(resetAllCartItems("PaymentMethodPageHook"))
        }, 1500);
      } else {

        if (createCashOrderResponse?.response?.data?.error?.statusMessage) {
          if (createCashOrderResponse?.response?.data?.error?.statusMessage.includes("not have enought quantity please wait to resupply or try to reduce quantity or contact admin")) {
            const productID = createCashOrderResponse.response.data.error.statusMessage.split(" ")[2].split(",")[0]
            
            dispatch(getSpecificProduct(productID, "PaymentMethodPageHook"))
            // notify('error', 'منتج او اكثر كميتهم لا تكفى حاول فى وقت لاحق')
          }
          if (createCashOrderResponse?.response?.data?.error?.statusMessage === "failed to create order document") {
            notify('error', 'حدث خطأ حاول مرة اخرى')
          }
        } else {
          createCashOrderResponse?.response?.data?.error.map(item => {
            if (item.msg === "no cart found for this user check cartID") {
              notify('warning', 'لا توجد عربة لهذا المستخدم تحقق من الرقم التعريفى للعربة')
            }
            if (item.msg === "user doesn't have any addresses yet please add one to use it here") {
              notify('warning', 'لا توجد عناوين لهذا المستخدم اضف عنوان اولا')
            }
            if (item.msg === "this address id in not belong to this user") {
              notify('warning', 'هذا العنوان لا ينتمى لهذا المستخدم تحقق من الرقم التعريفى للعنوان')
            }
          })
        }
      }
    }



    // visa order notification
    if (checkoutSessionDataIsLoaded && buyItemsIsClicked){
      if (checkoutSessionData.status === 201){
        notify('success', 'جارى التحويل لاتمام الدفع')
        setTimeout(() => {
          window.location.href = checkoutSessionData?.data?.session?.url
        }, 1500);
      } else {

        if (checkoutSessionData?.response?.data?.error?.statusMessage) {
          if (checkoutSessionData?.response?.data?.error?.statusMessage.includes("not have enought quantity please wait to resupply or try to reduce quantity or contact admin")) {
            const productID = checkoutSessionData.response.data.error.statusMessage.split(" ")[2].split(",")[0]
            
            dispatch(getSpecificProduct(productID, "PaymentMethodPageHook"))
          }
          if (checkoutSessionData?.response?.data?.error?.statusMessage === "failed to create session") {
            notify('error', 'حدث خطأ حاول مرة اخرى')
          }
        } else {
          checkoutSessionData?.response?.data?.error.map(item => {
            if (item.msg === "no cart found for this user check cartID") {
              notify('warning', 'لا توجد عربة لهذا المستخدم تحقق من الرقم التعريفى للعربة')
            }
            if (item.msg === "user doesn't have any addresses yet please add one to use it here") {
              notify('warning', 'لا توجد عناوين لهذا المستخدم اضف عنوان اولا')
            }
            if (item.msg === "this address id in not belong to this user") {
              notify('warning', 'هذا العنوان لا ينتمى لهذا المستخدم تحقق من الرقم التعريفى للعنوان')
            }
          })
        }
      }
    }
    setBuyItemsIsClicked(false)
    // eslint-disable-next-line
  }, [buyItemsIsClicked])


  useEffect(() => {
    if (specificProductData.status === 200) {
      setQuantityLessProducts([specificProductData.data])
    }
  }, [specificProductData])

  useEffect(() => {
    if (quantityLessProducts && isClicked) {
      quantityLessProducts.map(item => {
        notify('warning', `الكمية لا تكفى لهذا المنتج: ${item.title}`)
      })
      setIsClicked(false)
    }
  }, [quantityLessProducts])
  
  
  
  

  

  return [allCartDataIsLoaded, allCartData, allAddressesDataIsLoaded, allAddressesData, addressSelectOnChangeHandle, buyItemsOnClickHandle, visaSelectOnChangeHandle, cashSelectOnChangeHandle, loader, addressTitle, addressDetails, addressphone, paymentMethod]
}

export default PaymentMethodPageHook