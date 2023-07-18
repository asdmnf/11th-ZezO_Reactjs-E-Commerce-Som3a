

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
// import { getAllBrandData } from "../../Redux/Actions/brandAction"
// import getAllCategory from "../../Redux/Actions/categoryAction"
import {  getAllProductsByCategoryId, getSpecificProduct, resetSpecificProductData } from "../../Redux/Actions/productAction/productAction"
import { addReview, allReviews, editReview, getSpecificReview, removeReview } from "../../Redux/Actions/ReviewAction/reviewAction"
import ToastifyNotification from "../ToastifyNotification"


const ProductPageHook = () => {

  const [notify] = ToastifyNotification()

  const navigateTo = useNavigate()

  const productId = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSpecificProduct(productId.id, "ProductPageHook"))
    dispatch(allReviews(productId.id, "ProductPageHook"))
    // eslint-disable-next-line
  }, [productId])
  
  
  const specificProductData = useSelector(state => state.getSpecificProductReducer.product)
  const isLoaded = useSelector(state => state.getSpecificProductReducer.isLoaded)
  // جديد مبقتش محتاجهم عملت بوبيوليت من الباك اند
  // const specificCategoryData = useSelector(state => state.categoryReducer.category)
  // const specificCategoryDataIsLoaded = useSelector(state => state.categoryReducer.isLoaded)
  // const specificBrandData = useSelector(state => state.brandReducer.brandData)
  // const specificBrandDataIsLoaded = useSelector(state => state.brandReducer.isLoaded)
  const allCategoryProducts = useSelector(state => state.getAllProductsByCategoryIdReducer.categoryProducts)
  const allCategoryProductsIsLoaded = useSelector(state => state.getAllProductsByCategoryIdReducer.isLoaded)
  
  useEffect(() => {
    if (specificProductData.data?.subCategory.length && specificProductData?.data?._id === productId.id){
      dispatch(getAllProductsByCategoryId(specificProductData.data?.subCategory[0]?._id, 50, "ProductPageHook"))
    }

    if(specificProductData?.response?.data?.error?.statusMessage === "Invalid document id") {
      navigateTo("/*")
      dispatch(resetSpecificProductData("ProductPageHook"))
    }

    // eslint-disable-next-line
  }, [specificProductData])


  if(allCategoryProducts.data){
    var filteredAllCategoryProducts = allCategoryProducts.data.filter((item)=>{
      return item._id !== specificProductData?.data?._id
    })
  }
  // add review
  const [reviewInput, setReviewInput] = useState('')
  const [ratingStars, setRatingStars] = useState(0)

  const addReviewResponse = useSelector(state => state.reviewReducer.addReviewResponse)
  const addReviewResponseIsLoaded = useSelector(state => state.reviewReducer.addReviewResponseIsLoaded)
  const allReviewsData = useSelector(state => state.review2Reducer.allReviewsData)
  const allReviewsDataIsLoaded = useSelector(state => state.review2Reducer.allReviewsDataIsLoaded)
  const removeReviewResponse = useSelector(state => state.reviewReducer.removeReviewResponse)
  const removeReviewResponseIsLoaded = useSelector(state => state.reviewReducer.removeReviewResponseIsLoaded)
  const specificReviewData = useSelector(state => state.reviewReducer.specificReviewData)
  const specificReviewDataIsLoaded = useSelector(state => state.reviewReducer.specificReviewDataIsLoaded)
  const editReviewResponse = useSelector(state => state.reviewReducer.editReviewResponse)
  const editReviewResponseIsLoaded = useSelector(state => state.reviewReducer.editReviewResponseIsLoaded)

  const [isClicked, setIsClicked] = useState(false)
  const [removeIconisClicked, setRemoveIconIsClicked] = useState(false)
  const [saveEditisClicked, setSaveEditIsClicked] = useState(false)

  const reviewInputOnChangeHandle = (e) => {
    setReviewInput(e.target.value)
  }

  const ratingStarsOnChangeHandle = (stars) => {
    setRatingStars(stars)
  }

  const addReviewOnClickHandle = async (e) => {
    e.preventDefault()
    if (!localStorage.getItem("userData")){
      notify("info", "يجب تسجيل الدخول اولا")
      return
    }else if (!reviewInput){
      notify("warning", "ادخل تعليق اولا")
      return null
    } else if (ratingStars === 0){
      notify("warning", "اختر نجمة واحدة على الأقل")
      return null
    }

    await dispatch(addReview(productId.id, {
      title: reviewInput,
      rating: ratingStars,
    }, "ProductPageHook"))
    setIsClicked(true)
  }

  useEffect(() => {
    if (addReviewResponseIsLoaded && isClicked){
      if (addReviewResponse.status === 201){
        notify("success", "تم اضافة التقييم بنجاح")
        setReviewInput('')
        setRatingStars(0)
        dispatch(allReviews(productId.id, "ProductPageHook"))
        dispatch(getSpecificProduct(productId.id, "ProductPageHook"))
      } else {
        // جديد
        addReviewResponse?.response?.data?.error?.map(item => {
          if (item.msg === "title must be at least 3 characters") {
            notify("warning", "التقييم يجب الا يقل عن 3 احرف")
          }
          if (item.msg === "rating must be number") {
            notify("warning", "التقييم العددى يجب ان يكون رقم")
          }
          if (item.msg === "rating must integer be between 1 and 5") {
            notify("warning", "التقييم العددى يجب ان يكون من 1 الى 5")
          }
          if (item.msg === "product not found check your product id") {
            notify("warning", "المنتج الذى تحاول تقييمه غير موجود")
          }
          if (item.msg === "you cannot review a product twice") {
            notify("warning", "لقد قمت بالتقييم مسبقا")
          }
        })
      }
      

    } else if (!addReviewResponseIsLoaded && isClicked){
      notify("error", "هناك مشكلة فى عملية الاضافة حاول مرة اخرى")
    }
    setIsClicked(false)
    //eslint-disable-next-line
  }, [isClicked])


  let isUserCommented = false

  if (localStorage.getItem("userRole") === "user"){
    if (allReviewsDataIsLoaded && allReviewsData?.data) {
      //eslint-disable-next-line
      allReviewsData.data.some(item => {
        if (item.user._id === JSON.parse(localStorage.getItem("userData"))._id){
          isUserCommented = true
        }
      })
    }
  }



  // حذف تقييم المستخدم
  let lsUserData = ""
  if (localStorage.getItem("userData")){
    lsUserData = JSON.parse(localStorage.getItem("userData"))._id;
  }

  const removeCommentOnClickHandle = async (id) => {
    await dispatch(removeReview(id, "ProductPageHook"))
    setRemoveIconIsClicked(true)
  }

  useEffect(() => {
    if (removeReviewResponseIsLoaded && removeIconisClicked){
      if (removeReviewResponse.status === 200) {
        notify("success", "تم حذف التقييم بنجاح")
        dispatch(allReviews(productId.id, "ProductPageHook"))
        dispatch(getSpecificProduct(productId.id, "ProductPageHook"))
      } 



    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
    else if (removeReviewResponse?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && removeIconisClicked) {
      notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
    }
  //------------------------------------------------------------------------------------------------------------------
      
      
      
      else {
        // جديد
        if (removeReviewResponse?.response?.data?.error?.statusMessage) {
          if (removeReviewResponse?.response?.data?.error?.statusMessage === "Invalid document id") {
            notify("error", "هناك مشكلة فى عملية الحذف حاول مرة اخرى")
          }
        } else {
          removeReviewResponse?.response?.data?.error?.map(item => {
            if (item.msg === "review not found check your review id") {
              notify("warning", "الرقم التعريفى غير صحيح تحقق منه")
            }
            if (item.msg === "you can only delete your review") {
              notify("warning", "غير مسموح بحذف تعليقات الاخرين")
            }
          })
        }
      }
    } else if (!removeReviewResponseIsLoaded && removeIconisClicked){
      notify("error", "هناك مشكلة فى عملية الاضافة حاول مرة اخرى")
    }
    setRemoveIconIsClicked(false)
    //eslint-disable-next-line
  }, [removeIconisClicked])


  //----------------------------------------------------------------------------------------------------------------
  // تعديل تقييم المستخدم
  const [show, setShow] = useState(false); 
  const [editReviewInput, setEditReviewInput] = useState('');
  const [specificReviewId, setSpecificReviewId] = useState('');

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const editCommentOnClickHandle = async (id) => {
    setSpecificReviewId(id)
    await dispatch(getSpecificReview(id, "ProductPageHook"))
  }


  useEffect(() => {
    if (specificReviewData?.status === 200){
      handleShow()
      setEditReviewInput(specificReviewData?.data?.title)
      setRatingStars(specificReviewData?.data?.rating)
    }



    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
    else if (specificReviewData?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted") {
      notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
    }
  //------------------------------------------------------------------------------------------------------------------




    //eslint-disable-next-line
  }, [specificReviewData])


  const editReviewInputOnChangeHandle = (e) => {
    setEditReviewInput(e.target.value)
  }


  const saveReviewEditOnClickHandle = async () =>{
    await dispatch(editReview(specificReviewId, {
      title: editReviewInput,
      rating: ratingStars,
    }, "ProductPageHook"))
    setSaveEditIsClicked(true)
    handleClose()
  }


  useEffect(() => {
    if (editReviewResponseIsLoaded && saveEditisClicked){
      if (editReviewResponse.status === 201){
        notify("success", "تم تعديل التقييم بنجاح")
        dispatch(allReviews(productId.id, "ProductPageHook"))
        dispatch(getSpecificProduct(productId.id, "ProductPageHook"))
      } else {
        // جديد
        if (editReviewResponse?.response?.data?.error?.statusMessage) {
          if (editReviewResponse?.response?.data?.error?.statusMessage === "Invalid document id") {
            notify("error", "هناك مشكلة فى عملية التعديل حاول مرة اخرى")
          }
        } else {
          editReviewResponse?.response?.data?.error?.map(item => {
            if (item.msg === "title must be at least 3 characters") {
              notify("warning", "التقييم يجب الا يقل عن 3 احرف")
              handleShow()
            }
            if (item.msg === "rating must be number") {
              notify("warning", "التقييم العددى يجب ان يكون رقم")
              handleShow()
            }
            if (item.msg === "rating must integer be between 1 and 5") {
              notify("warning", "التقييم العددى يجب ان يكون من 1 الى 5")
              handleShow()
            }
            if (item.msg === "product not found check your product id") {
              notify("warning", "المنتج الذى تحاول تقييمه غير موجود")
              handleShow()
            }
            if (item.msg === "you cannot review a product twice") {
              notify("warning", "لقد قمت بالتقييم مسبقا")
              handleShow()
            }
          })
        }
      }
    } else if (!addReviewResponseIsLoaded && isClicked){
      notify("error", "هناك مشكلة فى عملية التعديل حاول مرة اخرى")
    }
    setSaveEditIsClicked(false)
    //eslint-disable-next-line
  }, [saveEditisClicked])
  


  // related products carousel wishlist
  const wishListData = useSelector(state => state.WishListReducer.wishListData)
  const wishListDataIsLoaded = useSelector(state => state.WishListReducer.wishListDataIsLoaded)
  

  return [isLoaded, specificProductData, allCategoryProductsIsLoaded, filteredAllCategoryProducts, reviewInputOnChangeHandle, reviewInput, addReviewOnClickHandle, ratingStarsOnChangeHandle, ratingStars, allReviewsData, allReviewsDataIsLoaded, editCommentOnClickHandle, removeCommentOnClickHandle, lsUserData, show, handleClose, saveReviewEditOnClickHandle, editReviewInputOnChangeHandle, editReviewInput, isUserCommented, wishListData, wishListDataIsLoaded]
}

export default ProductPageHook