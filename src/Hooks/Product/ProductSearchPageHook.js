

// الصفحة دى ماشية من تحت لفوق

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncError, useLocation, useNavigate, useParams } from "react-router-dom";
import { queryProduct } from "../../Redux/Actions/productAction/productAction";

const ProductSearchPageHook = () => {

  // ايكونة التوجل بتاعة الريسبونسيف
  const [showSideBar, setShowSideBar] = useState(true)
  const toggleSideBarOnClickHandle = () => {
    setShowSideBar(!showSideBar)
  }


  // 6- تصنيف الصب كاتيجورى
  const subCategorySortValue = sessionStorage.getItem("subCategorySortValue")






  const path = useLocation()

  // 5- تصنيف السعر

  let priceFromSortValue = sessionStorage.getItem('priceFromSortValue')
  let priceToSortValue = sessionStorage.getItem('priceToSortValue')
  let ssPriceFrom = sessionStorage.getItem('ssPriceFrom')
  let ssPriceTo = sessionStorage.getItem('ssPriceTo')
  const [priceFrom, setPriceFrom] = useState("")
  const [priceTo, setPriceTo] = useState("")
  const priceFromInputOnchangeHandle = (e) =>{ 
    if (e.target.value === ""){
      sessionStorage.setItem('priceFromSortValue', "")
    } else {
      sessionStorage.setItem('priceFromSortValue', `price[gte]=${e.target.value}`)
    }
    setPriceFrom(e.target.value)
    sessionStorage.setItem('ssPriceFrom', e.target.value)
  }
  const priceToInputOnchangeHandle = (e) =>{
    if (e.target.value === ""){
      sessionStorage.setItem('priceToSortValue', "")
    } else {
      sessionStorage.setItem('priceToSortValue', `price[lte]=${e.target.value}`)
    }
    setPriceTo(e.target.value)
    sessionStorage.setItem('ssPriceTo', e.target.value)
  }
  useEffect(() => {
    if (priceFrom || priceTo) {
      searchFunction("priceSortValue")
    }
    // eslint-disable-next-line
  }, [priceFrom, priceTo])



  const allBrandBoxRef = useRef([]) // ماسك بيها صندوق الكل
  const brandBoxRef = useRef([]) // ماسك بيها بقيت الصناديق


  // eslint-disable-next-line
  brandBoxRef.current.map(item => {
    if(item.value === sessionStorage.getItem(item.value)){
      return item.checked = true
    }
  })

  if (sessionStorage.getItem('allBrandBoxCheck') === "true"){
    allBrandBoxRef.current.checked = true
  }

  if (allBrandBoxRef.current.checked){
    // eslint-disable-next-line
    brandBoxRef.current.map(item => {
      sessionStorage.removeItem(item.value)
      item.checked = false
    })
  }


  // 4- تصنيف الماركة

  let brandSortValue = sessionStorage.getItem('brandSortValue')
  const [brandCheckBoxId, setBrandCheckBoxId] = useState([])
  const [brandSortValueIsClicked, setBrandSortValueIsClicked] = useState(false)
  const [brandSortValue2IsClicked, setBrandSortValue2IsClicked] = useState(false)
  const brandInputOnChangeHandle = (e) => {
    if (e.target.value === "0" && e.target.checked === true){
      sessionStorage.setItem('brandSortValue', "")
      setBrandCheckBoxId([])
      sessionStorage.setItem('allBrandBoxCheck', "true")



      // 3
      sessionStorage.removeItem("ssBrandCheckBoxId")



      sessionStorage.setItem('subCategorySortValue', "")

    } else if (e.target.value !== "0"){
      if (e.target.checked === true) {
        setBrandCheckBoxId([...brandCheckBoxId, e.target.value])

        sessionStorage.setItem(e.target.value, e.target.value) 
        allBrandBoxRef.current.checked = false 
        sessionStorage.removeItem('allBrandBoxCheck')
      } else if (e.target.checked === false){
        const filteredBrandCheckBoxId = brandCheckBoxId.filter(item => item !== e.target.value)
        setBrandCheckBoxId(filteredBrandCheckBoxId)
        sessionStorage.removeItem(e.target.value)
        if (!filteredBrandCheckBoxId.length){
          sessionStorage.setItem('brandSortValue', "")


      sessionStorage.setItem('subCategorySortValue', "")
        }
      }
    } else if (e.target.value === "0" && e.target.checked === false){
      e.target.checked = true
    }
    setBrandSortValue2IsClicked(true)

  }
  useEffect(() => {

    // 1
    if (brandCheckBoxId.length > 0) {
      sessionStorage.setItem("ssBrandCheckBoxId", JSON.stringify(brandCheckBoxId))
    }
    if (sessionStorage.getItem("brandSortValue") === "") {
      sessionStorage.removeItem("ssBrandCheckBoxId")
    }


    const brandDispatchSort = brandCheckBoxId.map(item => `brand=${item}`).join("&") 

    if (brandCheckBoxId.length){
      sessionStorage.setItem('brandSortValue', brandDispatchSort)
      setBrandSortValueIsClicked(true)
    }
    if (sessionStorage.getItem("brandSortValue") === "") {
      allBrandBoxRef.current.checked = true
      setBrandSortValueIsClicked(true) 
    }
    // eslint-disable-next-line
  }, [brandCheckBoxId])

  useEffect(() => {
    if (brandSortValueIsClicked && brandSortValue2IsClicked) {
      searchFunction("brandSortValue")
    }
    setBrandSortValueIsClicked(false)
    setBrandSortValue2IsClicked(false)
    // eslint-disable-next-line
  }, [brandSortValueIsClicked])
  
  



  // 2
  useEffect(() => {
    if (sessionStorage.getItem("brandSortValue") && !sessionStorage.getItem("ssBrandCheckBoxId")) {
      setBrandCheckBoxId([sessionStorage.getItem("brandSortValue").slice(6, 34)])
    }
  }, [])

  useEffect(() => {
    if (brandCheckBoxId.length === 0 && JSON.parse(sessionStorage.getItem("ssBrandCheckBoxId")) !== null) {
      setBrandCheckBoxId(JSON.parse(sessionStorage.getItem("ssBrandCheckBoxId")))
    }
    // eslint-disable-next-line
  }, [])


  

  
  // 3- تصنيف الفئة

  let categorySortValue = sessionStorage.getItem('categorySortValue')

    const allCategoryBoxRef = useRef([]) // ماسك بيها صندوق الكل
    const categoryBoxRef = useRef([]) // ماسك بيها بقيت الصناديق
  
    // eslint-disable-next-line
    categoryBoxRef.current.map(item => {
      if(item.value === sessionStorage.getItem(item.value)){
        return item.checked = true
      }
    })
  
    if (sessionStorage.getItem('allCategoryBoxCheck') === "true"){
      allCategoryBoxRef.current.checked = true
    }
  
    if (allCategoryBoxRef.current.checked){
      // eslint-disable-next-line
      categoryBoxRef.current.map(item => {
        sessionStorage.removeItem(item.value)
        item.checked = false
      })
    }



  const [categoryCheckBoxId, setCategoryCheckBoxId] = useState([])
  const [categorySortValueIsClicked, setCategorySortValueIsClicked] = useState(false)
  const [categorySortValue2IsClicked, setCategorySortValue2IsClicked] = useState(false)

  const categoryInputOnChangeHandle = (e) => {
    if (e.target.value === "0" && e.target.checked === true){
      sessionStorage.setItem('categorySortValue', "")
      setCategoryCheckBoxId([])
      sessionStorage.setItem("categoryCheckBoxId", [])

      sessionStorage.setItem('allCategoryBoxCheck', "true")


      // 3
      sessionStorage.removeItem("ssCategoryCheckBoxId")


      sessionStorage.setItem('subCategorySortValue', "")



    } else if (e.target.value !== "0"){
      if (e.target.checked === true) {
        setCategoryCheckBoxId([...categoryCheckBoxId, e.target.value])

        sessionStorage.setItem(e.target.value, e.target.value)
        allCategoryBoxRef.current.checked = false
        sessionStorage.removeItem('allCategoryBoxCheck')
      } else if (e.target.checked === false){
        const filteredCategoryCheckBoxId = categoryCheckBoxId.filter(item => item !== e.target.value)
        setCategoryCheckBoxId(filteredCategoryCheckBoxId)
        sessionStorage.removeItem(e.target.value)
        if (!filteredCategoryCheckBoxId.length){
          sessionStorage.setItem('categorySortValue', "")
          

      sessionStorage.setItem('subCategorySortValue', "")
        }
      }
    } else if (e.target.value === "0" && e.target.checked === false){
      e.target.checked = true
    }
    setCategorySortValue2IsClicked(true)

  }

  useEffect(() => {


    // 1
    if (categoryCheckBoxId.length > 0) {
      sessionStorage.setItem("ssCategoryCheckBoxId", JSON.stringify(categoryCheckBoxId))
    }
    if (sessionStorage.getItem("categorySortValue") === "") {
      sessionStorage.removeItem("ssCategoryCheckBoxId")
    }


    const categoryDispatchSort = categoryCheckBoxId.map(item => `mainCategory=${item}`).join("&") 
    
    if (categoryCheckBoxId.length){
      sessionStorage.setItem('categorySortValue', categoryDispatchSort)
      setCategorySortValueIsClicked(true)
    }
    if (sessionStorage.getItem("categorySortValue") === "") {
      allCategoryBoxRef.current.checked = true
      setCategorySortValueIsClicked(true)
    }
    // eslint-disable-next-line
  }, [categoryCheckBoxId])
  

  useEffect(() => {
    if (categorySortValueIsClicked && categorySortValue2IsClicked) {
      searchFunction("categorySortValue")
    }
    setCategorySortValueIsClicked(false)
    setCategorySortValue2IsClicked(false)
    // eslint-disable-next-line
  }, [categorySortValueIsClicked])
  



  // 2
  useEffect(() => {
    if (sessionStorage.getItem("categorySortValue") && !sessionStorage.getItem("ssCategoryCheckBoxId")) {
      setCategoryCheckBoxId([sessionStorage.getItem("categorySortValue").slice(13, 39)])
    }
  }, [])

  useEffect(() => {
    if (categoryCheckBoxId.length === 0 && JSON.parse(sessionStorage.getItem("ssCategoryCheckBoxId")) !== null) {
      setCategoryCheckBoxId(JSON.parse(sessionStorage.getItem("ssCategoryCheckBoxId")))
    }
    // eslint-disable-next-line
  }, [])
  


  

  const [topLeftSortValueIsClicked, setTopLeftSortValueIsClicked] = useState(false)

  // 2- upper left Filter

  let topLeftSortValue = sessionStorage.getItem('topLeftSortValue')
  const topLeftSortLiOnClickHandle = (sort) => {
    sessionStorage.setItem('topLeftSortValue', sort)
    setTopLeftSortValueIsClicked(true)
  }
  
  useEffect(() => {
    if (topLeftSortValueIsClicked){
      searchFunction("topLeftSortValue")
    }
    setTopLeftSortValueIsClicked(false)
    // eslint-disable-next-line
  }, [topLeftSortValueIsClicked])
  

  // 1- البحث

  let searchValue = sessionStorage.getItem("search-value");

  const dispatch = useDispatch();
  useEffect(() => {
      searchFunction("searchValue")
    // eslint-disable-next-line
  }, [searchValue])

  const searchFunction = async (log) => {
    const keyword = searchValue ?  `&keyword=${searchValue}` : ""
    const topLeft = topLeftSortValue ?  `&sort=${topLeftSortValue}` : ""
    const category = categorySortValue ? `&${categorySortValue}` : ""
    const brand = brandSortValue ? `&${brandSortValue}` : ""
    const priceFrom = priceFromSortValue ? `&${priceFromSortValue}` : ""
    const priceTo = priceToSortValue ? `&${priceToSortValue}` : ""


    const subCategory = category || brand ? "" : (subCategorySortValue ? `&${subCategorySortValue}` : "")


      await dispatch(queryProduct(`${keyword}${topLeft}${category}${brand}${priceFrom}${priceTo}${subCategory}`, `ProductSearchPageHook-${log}`));
  };

  
  const searchData = useSelector((state) => state.productSearchReducer.searchedProducts.data);
  const searchDataIsLoaded = useSelector((state) => state.productSearchReducer.isLoaded);
  const searchDataTotalResults = useSelector((state) => state.productSearchReducer.searchedProducts.results);
  const searchDataTotalPages = useSelector((state) => state.productSearchReducer.totalPages);

  const pageNumHandle = async (pageNum) => {
    const keyword = searchValue ?  `&keyword=${searchValue}` : ""
    const topLeft = topLeftSortValue ?  `&sort=${topLeftSortValue}` : ""
    const category = categorySortValue ? `&${categorySortValue}` : ""
    const brand = brandSortValue ? `&${brandSortValue}` : ""
    const priceFrom = priceFromSortValue ? `&${priceFromSortValue}` : ""
    const priceTo = priceToSortValue ? `&${priceToSortValue}` : ""

    const subCategory = category || brand ? "" : (subCategorySortValue ? `&${subCategorySortValue}` : "")

    await dispatch(queryProduct(`limit=8&page=${pageNum}${keyword}${topLeft}${category}${brand}${priceFrom}${priceTo}${subCategory}`, "ProductSearchPageHook-Pagination"))
  }


  return [searchData, searchDataIsLoaded, searchDataTotalResults, searchDataTotalPages, pageNumHandle, topLeftSortLiOnClickHandle, categoryInputOnChangeHandle, brandInputOnChangeHandle, priceFromInputOnchangeHandle, priceToInputOnchangeHandle, ssPriceFrom, ssPriceTo, brandBoxRef, allBrandBoxRef, categoryBoxRef, allCategoryBoxRef, showSideBar, toggleSideBarOnClickHandle];
};

export default ProductSearchPageHook;
