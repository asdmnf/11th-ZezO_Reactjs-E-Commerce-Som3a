

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandData2 } from "../../Redux/Actions/brandAction";
import { getAllCategoryData2 } from "../../Redux/Actions/categoryAction";
import { createProduct, getHomeProduct, homeDevicesProductsAction, marketProductsAction, mostSalesProductsAction, samsungProductsAction } from "../../Redux/Actions/productAction/productAction";
import { getAllSubCategoryData2 } from "../../Redux/Actions/subCategoryAction";
import ToastifyNotification from "../ToastifyNotification";
// import { getSubCategoryByMainCategoryId } from "../../Redux/Actions/subCategoryApiFilterAction";


const AdminAddProductPageHook = () => {

  const [notify] = ToastifyNotification()

  const dispatch = useDispatch()
  const mainCategoryData = useSelector(state => state.category2Reducer.allCategoryData);
  const mainCategoryDataIsLoaded = useSelector(state => state.category2Reducer.allCategoryDataIsLoaded);
  const subCategoryData = useSelector(state => state.subCategory2Reducer.allSubCategoryData)
  const subCategoryDataIsLoaded = useSelector(state => state.subCategory2Reducer.allSubCategoryDataIsLoaded)
  const brandData = useSelector(state => state.brand2Reducer.allBrandData)
  const brandDataIsLoaded = useSelector(state => state.brand2Reducer.allBrandDataIsLoaded)

  const createProductResponse = useSelector(item => item.createProductReducer.product)
  const createProductResponseIsLoaded = useSelector(item => item.createProductReducer.isLoaded)
  
  
  
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productPriceBeforeDiscount, setProductPriceBeforeDiscount] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productAvailableQuantity, setProductAvailableQuantity] = useState("")
  const [productMainCategory, setProductMainCategory] = useState("")
  const [productSubCategoryDependsOnMain, setProductSubCategoryDependsOnMain] = useState([{name: "اختر تصنيف رئيسى", id:"0"}])
  const [productSubCategory, setProductSubCategory] = useState([])
  const [productBrand, setProductBrand] = useState("")
  const [colorValues, setColorValues] = useState([])
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [images, setImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  
  const [loader, setLoader] = useState(false)
  const [addProductIsClicked, setAddProductIsClicked] = useState(false)

  useEffect(() => {
    // dispatch(getAllCategoryData2("AdminAddProductPageHook"))
    dispatch(getAllSubCategoryData2("AdminAddProductPageHook"))
    // dispatch(getAllBrandData2("AdminAddProductPageHook"))
    // eslint-disable-next-line
  }, [])
  
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
    } else if (parseInt(productPrice) <= parseInt(productPriceBeforeDiscount)) {
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
    const reversedSelectedImages = [...selectedImages].reverse()
    reversedSelectedImages.map((item) => formData.append("iamgesGallery", item))
    productSubCategory.map((item) => formData.append("subCategory", item._id))
    colorValues.map((item) => formData.append("color", item))

    setLoader(true)
    await dispatch(createProduct(formData, "AdminAddProductPageHook"))
    setLoader(false)
    setAddProductIsClicked(true)
  }


  useEffect(() => {
    if (createProductResponseIsLoaded && addProductIsClicked) {
      if (createProductResponse.status === 201) {
        notify("success", "تم اضافة المنتج بنجاح")
        dispatch(getHomeProduct("HeaderCartButtonHook-NewProducts"))
        dispatch(mostSalesProductsAction("HeaderCartButtonHook", 8, "&sort=-sold"))
        dispatch(marketProductsAction("HeaderCartButtonHook", 8, "&mainCategory=646402b6112a846cfcecc97c"))
        dispatch(homeDevicesProductsAction("HeaderCartButtonHook", 8, "&mainCategory=6466be98de0a035fda036340"))
        dispatch(samsungProductsAction("HeaderCartButtonHook", 8, "&brand=6466c273de0a035fda03635d"))
        
        setImages([])
        setSelectedImages([])
        setProductName('')
        setProductDescription('')
        setProductPrice('')
        setProductPriceBeforeDiscount('')
        setProductAvailableQuantity('')
        setProductMainCategory('')
        setProductSubCategory('')
        setProductBrand('')
        setColorValues([])
        window.scrollTo(0, 0)
        // eslint-disable-next-line
      } else {

        createProductResponse?.response?.data?.error?.map(item => {
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
    } else if (!createProductResponseIsLoaded && addProductIsClicked) {
      notify("error", "هناك مشكلة فى اضافة المنتج حاول مرة اخرى")
    }
    setAddProductIsClicked(false)
    // eslint-disable-next-line
  }, [addProductIsClicked])



  return [productName, productDescription, productPriceBeforeDiscount, productPrice, productAvailableQuantity, productNameOnChangeHandle, productDescriptionOnChangeHandle, productPriceBeforeDiscountOnChangeHandle, productPriceOnChangeHandle, productAvailableQuantityOnChangeHandle, mainCategoryData, brandData, productMainCategory, productSubCategory, productBrand, productMainCategoryOnChangeHandle, productSubCategoryDependsOnMain, productSubCategoryOnSelectHandle, productSubCategoryOnRemoveHandle, productBrandOnChangeHandle, colorInputOnchangeHandle, colorValues, productColorOnClickHandle, fileInputOnChangeHandle, images, imageOnClickHandle, addColorIconOnClickHandle, showColorPicker, saveBtnOnClickHandle, mainCategoryDataIsLoaded, brandDataIsLoaded, loader]
}

export default AdminAddProductPageHook