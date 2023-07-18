import { useNavigate } from "react-router-dom"


const CategoryCardHook = () => {


  const navigateTo = useNavigate()

  const categoryOnClickHandle = (id) => {
    sessionStorage.setItem("search-value", ``)
    sessionStorage.setItem("categorySortValue", `mainCategory=${id}`)
    sessionStorage.setItem(id, id)
    sessionStorage.setItem("allBrandBoxCheck", "true")
    navigateTo("/search-result")
  }

  return [categoryOnClickHandle]
}

export default CategoryCardHook