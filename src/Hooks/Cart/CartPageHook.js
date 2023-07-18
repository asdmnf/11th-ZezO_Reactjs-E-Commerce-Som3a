import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { applyCoupon, clearAllCartItems, getAllCartItems, removeItemFromCart } from "../../Redux/Actions/CartAction/cartAction"
import ToastifyNotification from "../ToastifyNotification"




const CartPageHook = () => {
  const [notify] = ToastifyNotification()

  const [applyCouponInput, setApplyCouponInput] = useState('')

  const dispatch = useDispatch()
  const allCartData = useSelector(state => state.cartReducer.allCartData)
  const allCartDataIsLoaded = useSelector(state => state.cartReducer.allCartDataIsLoaded)
  const removeFromCartResponse = useSelector(state => state.cartReducer.removeFromCartResponse)
  const removeFromCartResponseIsLoaded = useSelector(state => state.cartReducer.removeFromCartResponseIsLoaded)
  const clearAllCartResponse = useSelector(state => state.cartReducer.clearAllCartResponse)
  const clearAllCartResponseIsLoaded = useSelector(state => state.cartReducer.clearAllCartResponseIsLoaded)
  const applyCouponResponse = useSelector(state => state.cartReducer.applyCouponResponse)
  const applyCouponResponseIsLoaded = useSelector(state => state.cartReducer.applyCouponResponseIsLoaded)

  const [loader, setLoader] = useState(false)

  const [deleteCartItemIsClicked, setDeleteCartItemIsClicked] = useState(false)
  const [clearAllCartIsClicked, setClearAllCartIsClicked] = useState(false)
  const [applyCouponIsClicked, setApplyCouponIsClicked] = useState(false)

  // -------------------------------------------------------------------------------------

  useEffect(() => { 
    if (localStorage.getItem('userData') && localStorage.getItem("userRole") === "user"){
    }
    // eslint-disable-next-line
  }, [])
  
  // -------------------------------------------------------------------------------------




  // -------------------------------------------------------------------------------------
  // حذف منتج واحد من العربة

  const deleteCartItemOnClickHandle = async (id) => {
    await dispatch(removeItemFromCart(id, "CartPageHook"))
    setDeleteCartItemIsClicked(true)
  }

  useEffect(() => {
    if (removeFromCartResponseIsLoaded && deleteCartItemIsClicked){
      if (removeFromCartResponse.status === 200){
        notify("success", "تم حذف المنتج بنجاح")
        dispatch(getAllCartItems("CartPageHook"))
      } else {

        if (removeFromCartResponse?.response?.data?.error?.statusMessage) {
          if (removeFromCartResponse?.response?.data?.error?.statusMessage === "cart item product not found check cart item id") {
            notify("warning", "الرقم التعريفى لعنصر العربة غير صحيح تحقق منه")
          }
        }
      }
    } else if (!removeFromCartResponseIsLoaded && deleteCartItemIsClicked) {
        notify("error", "هناك مشكلة فى حذف المنتج حاول مرة اخرى")
    }
    setDeleteCartItemIsClicked(false)
    // eslint-disable-next-line
  }, [deleteCartItemIsClicked])
  

  // -------------------------------------------------------------------------------------




  // -------------------------------------------------------------------------------------
  // حذف كل المنتجات من العربة

  const clearAllCartOnClickHandle = async () => {
    await dispatch(clearAllCartItems("CartPageHook"))
    setClearAllCartIsClicked(true)
  }

  useEffect(() => {
    if (clearAllCartResponseIsLoaded && clearAllCartIsClicked){
      if (clearAllCartResponse.status === 200){
        notify("success", "تم حذف كل المنتجات بنجاح")
        dispatch(getAllCartItems("CartPageHook"))
      } else {

        if (clearAllCartResponse?.response?.data?.error?.statusMessage) {
          if (clearAllCartResponse?.response?.data?.error?.statusMessage === "failed to clear, user cart not found") {
            notify("warning", "حدث خطأ اثناء الحذف العربة غير موجودة")
          }
        }
      }
    } else if (!clearAllCartResponseIsLoaded && clearAllCartIsClicked) {
      notify("error", "هناك مشكلة فى حذف المنتجات حاول مرة اخرى")
    }
    setClearAllCartIsClicked(false)
    // eslint-disable-next-line
  }, [clearAllCartIsClicked])
  

  // -------------------------------------------------------------------------------------


  const applyCouponInputOnChangeHandle = (e) => {
    setApplyCouponInput(e.target.value)
  }

  const applyCouponOnClickHandle = async () => {
    if (localStorage.getItem('userData')){
      if (!applyCouponInput) {
        notify("warning", "ادخل كود الخصم اولا")
        return
      }
    } else {
      notify("info", "يجب تسجيل الدخول اولا")
      return
    }
    setLoader(true)
    await dispatch(applyCoupon({
      name: applyCouponInput
    }, "CartPageHook"))
    setLoader(false)
    setApplyCouponIsClicked(true)
  }

  useEffect(() => {
    if (applyCouponResponseIsLoaded && applyCouponIsClicked){
      if (applyCouponResponse.status === 201){
        notify("success", "تم تطبيق كوبون الخصم بنجاح")
        dispatch(getAllCartItems("CartPageHook"))
      } else {

        applyCouponResponse?.response?.data?.error?.map(item => {
          if (item.msg === "coupon not found check coupon name") {
            notify("warning", "الكوبون غير موجود لدينا تحقق منه مجددا")
          }
          if (item.msg === "coupon expired") {
            notify("warning", "الكوبون منتهى الصلاحية")
          }
        })
      }
    } else if (!applyCouponResponseIsLoaded && applyCouponIsClicked) {
      notify("error", "هناك مشكلة فى تطبيق الكوبون حاول مرة اخرى")
    }
    setApplyCouponIsClicked(false)
    // eslint-disable-next-line
  }, [applyCouponIsClicked])



  // -------------------------------------------------------------------------------------

  return [allCartDataIsLoaded, allCartData, deleteCartItemOnClickHandle, clearAllCartOnClickHandle, applyCouponOnClickHandle, applyCouponInput, applyCouponInputOnChangeHandle, loader] 
}

export default CartPageHook