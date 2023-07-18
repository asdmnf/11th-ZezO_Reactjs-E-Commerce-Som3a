import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addToCart, getAllCartItems } from "../../Redux/Actions/CartAction/cartAction"
import ToastifyNotification from "../ToastifyNotification"


const ProductContentHook = (specificProductData) => {
  const [notify] = ToastifyNotification()
  const [colorValue, setColorValue] = useState("")

  const dispatch = useDispatch()
  const addToCartResponse = useSelector(state => state.cartReducer.addToCartResponse)
  const addToCartResponseIsLoaded = useSelector(state => state.cartReducer.addToCartResponseIsLoaded)

  const [loader, setLoader] = useState(false)
  const [addToCartIsClicked, setAddToCartIsClicked] = useState(false)

  // ---------------------------------------------------------------------------------------------
  // add to cart 

  const colorOnClickHandle = (color) => {
    setColorValue(color)
  }

  const addToCartOnClickHandle = async () => {
    if (localStorage.getItem("userData")){
      if (localStorage.getItem("userRole") === "admin") {
        return
      }
      if (specificProductData.color?.length && !colorValue){
        notify("warning", "يجب اختيار اللون اولا")
        return
      }

      setLoader(true)
      await dispatch(addToCart({
        product: specificProductData._id,
        quantity: 1,
        color: colorValue,
      }, "ProductContentHook"))
      setLoader(false)
      setAddToCartIsClicked(true)
      dispatch(getAllCartItems("ProductContentHook"))
    } else {
      notify("info", "يجب تسجيل الدخول اولا")
    }
  }

  useEffect(() => {
    if (addToCartResponseIsLoaded && addToCartIsClicked) {
      if (addToCartResponse.status === 201){
        notify("success", "تم اضافة المنتج للعربة بنجاح")
      } else {

        if (addToCartResponse?.response?.data?.error?.statusMessage) {
          if (addToCartResponse?.response?.data?.error?.statusMessage === "not enought quantity for this product please wait to resupply or try to reduce quantity") {
            notify("warning", "الكمية لا تكفى حاول فى وقت لاحق")
          }
        } else if (addToCartResponse.code === "ERR_NETWORK") {
          notify("error", "خطأ فى الاتصال بالسيرفر حاول مرة اخرى")
        }
      }
    } else if (!addToCartResponseIsLoaded && addToCartIsClicked) {
      notify("error", "حدث خطأ حاول مرة اخرى")
    }
    setAddToCartIsClicked(false)
    // eslint-disable-next-line
  }, [addToCartIsClicked])
  

  // ---------------------------------------------------------------------------------------------





  // ---------------------------------------------------------------------------------------------
  // لما تتكى على التصنيف من صفحة المنتج

  const navigateTo = useNavigate()

  const categoryItemOnClickHandle = (id) => {
    sessionStorage.setItem("search-value", ``)
    sessionStorage.setItem("categorySortValue", `mainCategory=${id}`)
    sessionStorage.setItem(id, id)
    sessionStorage.setItem("allBrandBoxCheck", "true")
    navigateTo("/search-result")
  }

  // ---------------------------------------------------------------------------------------------


  // ---------------------------------------------------------------------------------------------
  // لما تتكى على الماركة من صفحة المنتج


  const brandItemOnClickHandle = (id) => {
    sessionStorage.setItem("search-value", ``)
    sessionStorage.setItem("brandSortValue", `brand=${id}`)
    sessionStorage.setItem(id, id)
    sessionStorage.setItem("allCategoryBoxCheck", "true")
    navigateTo("/search-result")
  }

  // ---------------------------------------------------------------------------------------------


  return [addToCartOnClickHandle, colorOnClickHandle, colorValue, loader, categoryItemOnClickHandle, brandItemOnClickHandle]
}

export default ProductContentHook