import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBrandData2 } from "../Redux/Actions/brandAction"
import { getAllCategoryData2 } from "../Redux/Actions/categoryAction"


const SideBarFilterHook = () => {

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   // جديد تحسين الدسيباتش
  //   // dispatch(getAllCategoryData2("SideBarFilterHook"))
  //   // dispatch(getAllBrandData2("SideBarFilterHook"))
  //   // eslint-disable-next-line
  // }, [])
  
  const categoryData = useSelector(state => state.category2Reducer.allCategoryData)
  const categoryDataIsLoaded = useSelector(state => state.category2Reducer.allCategoryDataIsLoaded)
  const brandData = useSelector(state => state.brand2Reducer.allBrandData)
  const brandDataIsLoaded = useSelector(state => state.brand2Reducer.allBrandDataIsLoaded)

  return [categoryDataIsLoaded, categoryData, brandDataIsLoaded, brandData]
}

export default SideBarFilterHook