import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllCategoryData2 } from "../../Redux/Actions/categoryAction"


const CategoryBarHook = () => {


  const navigateTo = useNavigate()

  const dispatch = useDispatch()
  const allCategoryData = useSelector(state => state.category2Reducer.allCategoryData);
  const allCategoryDataIsLoaded = useSelector(state => state.category2Reducer.allCategoryDataIsLoaded);

  let slicedAllCategoryData = []
  if (allCategoryData?.data) {
    slicedAllCategoryData = allCategoryData.data.slice(0, 9)
  }

  // useEffect(() => {

  //   // dispatch(getAllCategoryData2("CategoryBarHook"))

  //   // eslint-disable-next-line
  // }, [])
  


  const categoryLiOnClickHandle = async (id) => {
    sessionStorage.setItem("search-value", ``)
    sessionStorage.setItem("categorySortValue", `mainCategory=${id}`)
    sessionStorage.setItem(id, id)
    sessionStorage.setItem("allBrandBoxCheck", "true")
    navigateTo("/search-result")
  }
  



  return [allCategoryDataIsLoaded, allCategoryData, categoryLiOnClickHandle, navigateTo, slicedAllCategoryData]
}

export default CategoryBarHook