import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategoryData2 } from "../../Redux/Actions/categoryAction"


const CategoryItemsHook = () => {
  
  // useEffect(() => {
  //   // dispatch(getAllCategoryData2("CategoryItemsHook"))
  //   // eslint-disable-next-line
  // }, [])

  const dispatch = useDispatch()
  const data = useSelector(state => state.category2Reducer.allCategoryData);
  const isLoaded = useSelector(state => state.category2Reducer.allCategoryDataIsLoaded);

  const bgColors = ["#6610f2","#6f42c1","#d63384","#fd7e14","#20c997","#343a40","#0d6efd","#6c757d","#198754","#0dcaf0","#ffc107","#dc3545","wheat"]


  

  return [isLoaded, data, bgColors]

}

export default CategoryItemsHook