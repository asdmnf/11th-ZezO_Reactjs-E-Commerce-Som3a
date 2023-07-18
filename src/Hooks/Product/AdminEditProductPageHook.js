

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getAllBrandData } from "../../Redux/Actions/brandAction"
import getAllCategory from "../../Redux/Actions/categoryAction"
import { getHomeProduct, getSpecificProduct, homeDevicesProductsAction, marketProductsAction, mostSalesProductsAction, samsungProductsAction, updateProduct } from "../../Redux/Actions/productAction/productAction"
import { getSubCategory } from "../../Redux/Actions/subCategoryAction"
import ToastifyNotification from "../ToastifyNotification"


const AdminEditProductPageHook = () => {

  const [notify] = ToastifyNotification()

  const productID = useParams()

  const navigateTo = useNavigate()

  const dispatch = useDispatch()
  const specificProductData = useSelector(state => state.getSpecificProductReducer.product)
  const specificProductDataIsLoaded = useSelector(state => state.getSpecificProductReducer.isLoaded)
  const updatedProductResponse = useSelector(state => state.updateProductReducer.updatedProductResponse)
  const updatedProductResponseIsLoaded = useSelector(state => state.updateProductReducer.isLoaded)
  // const mainCategoryData = useSelector(state => state.categoryReducer.category)
  // const mainCategoryDataIsLoaded = useSelector(state => state.categoryReducer.isLoaded)
  const subCategoryData = useSelector(state => state.subCategoryReducer.subCategoryData)
  const subCategoryDataIsLoaded = useSelector(state => state.subCategoryReducer.isLoaded)
  // const brandData = useSelector(state => state.brandReducer.brandData)
  // const brandDataIsLoaded = useSelector(state => state.brandReducer.isLoaded)
  const mainCategoryData = useSelector(state => state.category2Reducer.allCategoryData);
  const mainCategoryDataIsLoaded = useSelector(state => state.category2Reducer.allCategoryDataIsLoaded);
  const brandData = useSelector(state => state.brand2Reducer.allBrandData)
  const brandDataIsLoaded = useSelector(state => state.brand2Reducer.allBrandDataIsLoaded)
  
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPriceBeforeDiscount, setProductPriceBeforeDiscount] = useState("")
  const [productPrice, setProductPrice] = useState('')
  const [productAvailableQuantity, setProductAvailableQuantity] = useState('')
  const [productMainCategory, setProductMainCategory] = useState('')
  const [productSubCategoryDependsOnMain, setProductSubCategoryDependsOnMain] = useState([{name: "اختر تصنيف رئيسى", id:"0"}])
  const [productSubCategory, setProductSubCategory] = useState([])
  const [productBrand, setProductBrand] = useState('')
  const [colorValues, setColorValues] = useState([])
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [images, setImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([])

  const [loader, setLoader] = useState(false)
  const [updateProductIsClicked, setUpdateProductIsClicked] = useState(false)

  useEffect(() => {
    dispatch(getSpecificProduct(productID.id, "AdminEditProductPageHook"))
    // dispatch(getAllCategory("AdminEditProductPageHook"))
    dispatch(getSubCategory("AdminEditProductPageHook"))
    // dispatch(getAllBrandData("AdminEditProductPageHook"))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (specificProductData?.status === 200){
      setProductName(specificProductData?.data?.title)
      setProductDescription(specificProductData?.data?.description)
      setProductPrice(specificProductData?.data?.price)
      setProductPriceBeforeDiscount(specificProductData?.data?.priceAfterDiscount)
      setProductAvailableQuantity(specificProductData?.data?.quantity)
      setProductBrand(specificProductData.data?.brand?._id ? specificProductData?.data?.brand?._id : "")
      setColorValues(specificProductData?.data?.color)
      setImages(specificProductData?.data?.iamgesGallery)

      const imagesArray = specificProductData?.data?.iamgesGallery.map(item => {
        return item.split("/")[4]
      })
      setSelectedImages(imagesArray)
    }
    // eslint-disable-next-line
  }, [specificProductData])

  const productNameOnChangeHandle = (e) => {
    setProductName(e.target.value)
  }
  const productDescriptionOnChangeHandle = (e) => {
    setProductDescription(e.target.value)
  }
  const productPriceBeforeDiscountOnChangeHandle = (e) => {
    setProductPriceBeforeDiscount(e.target.value)
  }
  const productPriceOnChangeHandle = (e) => {
    setProductPrice(e.target.value)
  }
  const productAvailableQuantityOnChangeHandle = (e) => {
    setProductAvailableQuantity(e.target.value)
  }
  const productMainCategoryOnChangeHandle = (e) => {
    if (e.target.value !== "0"){
    const filteredSubCategoryData = (subCategoryDataIsLoaded && subCategoryData.data) && (subCategoryData.data.filter((item)=>{
      return item.mainCategory === e.target.value
    }))
    setProductSubCategoryDependsOnMain(filteredSubCategoryData)
    setProductMainCategory(e.target.value)
    setProductSubCategory([])
    }
  }
  
  const productSubCategoryOnSelectHandle = (selectedList) => {
    setProductSubCategory(selectedList)
  }
  const productSubCategoryOnRemoveHandle = (selectedList) => {
    setProductSubCategory(selectedList)
  }
  const productBrandOnChangeHandle = (e) => {
    setProductBrand(e.target.value)
  }
  const colorInputOnchangeHandle = (color) => { 
    setColorValues([...colorValues, color.hex])
  }
  const productColorOnClickHandle = (colorItem) => {
    const filteredcolorValues = colorValues.filter((item)=>{
      return item !== colorItem
    })
    setColorValues(filteredcolorValues)
  }
  const addColorIconOnClickHandle = () => {
    setShowColorPicker(!showColorPicker)
  }
  const fileInputOnChangeHandle = (e) => {
    setImages([...images, URL.createObjectURL(e.target.files[0])])
    setSelectedImages([...selectedImages, e.target.files[0]])
  }
  const imageOnClickHandle = (i) => {
    const filteredImages = images.filter((item)=>{
      return item !== images[i]
    })
    setImages(filteredImages)
    const filteredSelectedImages = selectedImages.filter((item)=>{
      return item !== selectedImages[i]
    })
    setSelectedImages(filteredSelectedImages)
  }
  const saveBtnOnClickHandle = async (e) => {
    e.preventDefault()
    if (!selectedImages.length){
      notify("info", "اضف صور المنتج")
      return
    } else if (!productName) {
      notify("info", "اضف اسم المنتج")
      return
    } else if (!productDescription) {
      notify("info", "اضف توصيف المنتج")
      return
    } else if (!productPrice) {
      notify("info", "اضف سعر المنتج")
      return
    } else if (productPrice && productPrice <= productPriceBeforeDiscount) {
      notify("warning", " السعر بعد الخصم يجب ان يكون اقل")
      return
    } else if (!productAvailableQuantity) {
      notify("info", "اضف كمية المنتج")
      return
    } else if (!productMainCategory) {
      notify("info", "اضف التصنيف الرئيسى للمنتج")
      return
    } else if (!productBrand) {
      notify("info", "اضف ماركة المنتج")
      return
    }
    const formData = new FormData()
    formData.append("imageCover", selectedImages[0])
    formData.append("title", productName)
    formData.append("description", productDescription)
    formData.append("price", productPrice)
    if (productPriceBeforeDiscount > 0) {
      formData.append("priceAfterDiscount", productPriceBeforeDiscount)
    } 
    formData.append("quantity", productAvailableQuantity)
    formData.append("mainCategory", productMainCategory)
    formData.append("brand", productBrand)
    selectedImages.map((item) => formData.append("iamgesGallery", item))
    productSubCategory.map((item) => formData.append("subCategory", item._id))
    colorValues.map((item) => formData.append("color", item))

    setLoader(true)
    await dispatch(updateProduct(productID.id, formData, "AdminEditProductPageHook"))
    setLoader(false)
    setUpdateProductIsClicked(true)
  }

  useEffect(() => {
    if (updatedProductResponseIsLoaded && updateProductIsClicked) {
      if (updatedProductResponse.status === 201) {
        notify("success", "تم تعديل المنتج بنجاح")

        dispatch(getHomeProduct("HeaderCartButtonHook-NewProducts"))
        dispatch(mostSalesProductsAction("HeaderCartButtonHook", 8, "&sort=-sold"))
        dispatch(marketProductsAction("HeaderCartButtonHook", 8, "&mainCategory=646402b6112a846cfcecc97c"))
        dispatch(homeDevicesProductsAction("HeaderCartButtonHook", 8, "&mainCategory=6466be98de0a035fda036340"))
        dispatch(samsungProductsAction("HeaderCartButtonHook", 8, "&brand=6466c273de0a035fda03635d"))
          navigateTo(`/product/${productID.id}`)
      } 



    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
    else if (updatedProductResponse?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && updateProductIsClicked) {
      notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
      setProductName("")
      setProductDescription("")
      setProductPrice("")
      setProductPriceBeforeDiscount("")
      setProductAvailableQuantity("")
      setProductMainCategory("")
      setProductBrand("")
      setColorValues([])
      setImages([])
      setSelectedImages([])
      navigateTo(`/admin/products`)
    }
  //------------------------------------------------------------------------------------------------------------------
      
      
      
      else {

        if (updatedProductResponse?.response?.data?.error?.statusMessage) {
          if (updatedProductResponse?.response?.data?.error?.statusMessage === "Invalid document id") {
            notify("error", "هناك مشكلة فى تعديل المنتج حاول مرة اخرى")
          }
        } else {
          updatedProductResponse?.response?.data?.error?.map(item => {
            if (item.msg === "Product title must be at least 10 characters") {
              notify("warning", "اسم المنتج يجب الا يقل عن 10 حروف")
            }
            if (item.msg === "Product title must be at most 100 characters") {
              notify("warning", "اسم المنتج يجب الا يزيد عن 100 حروف")
            }
            if (item.msg === "Product description must be at least 20 characters") {
              notify("warning", "وصف المنتج يجب الا يقل عن 20 حرف")
            }
            if (item.msg === "this id is not category id") {
              notify("warning", "الرقم التعريفى للتصنيف الرئيسى غير صحيح تحقق منه")
            }
            if (item.msg === "subCategory id/s is not subCategory id") {
              notify("warning", "الرقم التعريفى للتصنيف الفرعى غير صحيح تحقق منه")
            }
            if (item.msg === "one or more subcategories IDs doesn't belong to MainCategory") {
              notify("warning", "التصنيف الفرعى لا ينتمى للتصنيف الرئيسى")
            }
            if (item.msg === "this id is not brand id") {
              notify("warning", "الرقم التعريفى للماركة غير صحيح تحقق منه")
            }
            if (item.msg === "Product quantity must be numeric") {
              notify("warning", "كمية المنتج يجب ان تكون رقم")
            }
            if (item.msg === "Product quantity cannot be negative") {
              notify("warning", "كمية المنتج يجب الا تكون سالب")
            }
            if (item.msg === "Product price must be numeric") {
              notify("warning", "سعر المنتج يجب ان يكون رقم")
            }
            if (item.msg === "Product price cannot be negative") {
              notify("warning", "سعر المنتج يجب الا يكون رقم سالب")
            }
            if (item.msg === "Product priceAfterDiscount must be numeric") {
              notify("warning", "سعر المنتج بعد الخصم يجب ان يكون رقم")
            }
            if (item.msg === "Product priceAfterDiscount cannot be negative") {
              notify("warning", "سعر المنتج يجب بعد الخصم الا يكون رقم سالب")
            }
            if (item.msg === "Product priceAfterDiscount must be less than price") {
              notify("warning", "سعر المنتج بعد الخصم يجب ان يكون اقل")
            }
          })
        }
      }
    } else if (!updatedProductResponseIsLoaded && updateProductIsClicked) {
      notify("error", "هناك مشكلة فى تعديل المنتج حاول مرة اخرى")
    }
    setUpdateProductIsClicked(false)
    // eslint-disable-next-line
  }, [updateProductIsClicked])

  return [productName, productDescription, productPriceBeforeDiscount, productPrice, productAvailableQuantity, productNameOnChangeHandle, productDescriptionOnChangeHandle, productPriceBeforeDiscountOnChangeHandle, productPriceOnChangeHandle, productAvailableQuantityOnChangeHandle, mainCategoryData, brandData, productMainCategory, productSubCategory, productBrand, productMainCategoryOnChangeHandle, productSubCategoryDependsOnMain, productSubCategoryOnSelectHandle, productSubCategoryOnRemoveHandle, productBrandOnChangeHandle, colorInputOnchangeHandle, colorValues, productColorOnClickHandle, fileInputOnChangeHandle, images, imageOnClickHandle, addColorIconOnClickHandle, showColorPicker, saveBtnOnClickHandle, mainCategoryDataIsLoaded, brandDataIsLoaded, loader]
}

export default AdminEditProductPageHook