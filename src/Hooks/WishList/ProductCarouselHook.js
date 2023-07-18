import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addToWishList, getAllWishList, removeWishList } from "../../Redux/Actions/WishListAction/wishListAction"
import ToastifyNotification from "../ToastifyNotification"


const ProductCarouselHook = () => {

  const productID = useParams()

  const [notify] = ToastifyNotification()
  const dispatch = useDispatch()
  const wishListData = useSelector(state => state.WishListReducer.wishListData)
  const wishListDataIsLoaded = useSelector(state => state.WishListReducer.wishListDataIsLoaded)
  const addWishListResponse = useSelector(state => state.WishListReducer.addWishListResponse)
  const addWishListResponseIsLoaded = useSelector(state => state.WishListReducer.addWishListResponseIsLoaded)
  const removeWishListResponse = useSelector(state => state.WishListReducer.removeWishListResponse)
  const removeWishListResponseIsLoaded = useSelector(state => state.WishListReducer.removeWishListResponseIsLoaded)

  const [favIconIsClicked, setFavIconIsClicked] = useState(false)

  const [showSolidFavIcon, setShowSolidFavIcon] = useState(false)

  // useEffect(() => {
  //   if (localStorage.getItem("userData")){
  //     // dispatch(getAllWishList("ProductCarouselHook"))
  //   }
  //   // eslint-disable-next-line
  // }, [])

  
  const favIconOnClickHandle = async (id) => {
    if (!localStorage.getItem("userData")){ 
      notify("info", "قم بتسجيل الدخول أولا")
      return
    }
    if (wishListDataIsLoaded){ 
      const filteredWishListData =  wishListData.data.some(item => item.product._id === id)
      if (!filteredWishListData){
        await dispatch(addToWishList({
          product: id
      }, "ProductCarouselHook"))
      setShowSolidFavIcon(true)
    } else if (filteredWishListData){
      await dispatch(removeWishList(id, "ProductCarouselHook"))
      setShowSolidFavIcon(false) 
    }
    setFavIconIsClicked(true)
  }
}

useEffect(() => {
    if (wishListDataIsLoaded && wishListData.status === 200){ 
        const filteredWishListData =  wishListData.data.some(item => item.product._id === productID.id)
        if (!filteredWishListData){
        setShowSolidFavIcon(false)
        } else if (filteredWishListData){
        setShowSolidFavIcon(true)
        }
  }
// eslint-disable-next-line
}, [wishListData, productID])

const lsUserData = localStorage.getItem("userData");
useEffect(() => { 
  if (!localStorage.getItem("userData")){
    setShowSolidFavIcon(false)
  }
}, [lsUserData])


  useEffect(() => {
    if (addWishListResponseIsLoaded && favIconIsClicked){
      if (addWishListResponse.status === 201){
        notify("success", "تم الاضافة للمفضلة بنجاح")
        dispatch(getAllWishList("ProductCarouselHook"))
      } else {
        notify("error", "هناك مشكلة فى عملية الاضافة حاول مرة اخرى")
      }
    }
    if (removeWishListResponseIsLoaded && favIconIsClicked){
      if (removeWishListResponse.status === 200){
        notify("success", "تم الحذف من المفضلة بنجاح")
        dispatch(getAllWishList("ProductCarouselHook"))
      } else {

        if (removeWishListResponse?.response?.data?.error?.statusMessage) {
          if (removeWishListResponse?.response?.data?.error?.statusMessage === "wishlistDocument not found check product id") {
            notify("error", "الرقم التعريفى غير صحيح")
          }
        } else {
          notify("error", "هناك مشكلة فى عملية الحذف حاول مرة اخرى")
        }
      }
    }
    setFavIconIsClicked(false)
    // eslint-disable-next-line
  }, [favIconIsClicked])

  return [favIconOnClickHandle, showSolidFavIcon]
}

export default ProductCarouselHook