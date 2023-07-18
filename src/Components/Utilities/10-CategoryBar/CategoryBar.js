import CategoryBarHook from '../../../Hooks/Category/CategoryBarHook'
import './CategoryBar.css'

const CategoryBar = () => {
  const [allCategoryDataIsLoaded, allCategoryData, categoryLiOnClickHandle, navigateTo, slicedAllCategoryData] = CategoryBarHook()
  return (
    <div className="category-bar d-none d-md-flex align-items-center shadow">
      <div className="container">
        <ul className='d-flex'>
          {
            allCategoryDataIsLoaded && allCategoryData.data ? (
              slicedAllCategoryData.map(item => {
                return <li key={item._id} className='category-bar-item' onClick={() => categoryLiOnClickHandle(item._id)} >{item.name}</li>
              })
            ) : null
          }
          <li className='category-bar-item' onClick={() => navigateTo("/categories")} >المزيد</li>
        </ul>
      </div>
    </div>
  )
}

export default CategoryBar