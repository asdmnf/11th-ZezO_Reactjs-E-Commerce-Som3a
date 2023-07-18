import './CategoryItems.css'
import CategoryCard from './CategoryCard/CategoryCard'
import Spinner from 'react-bootstrap/Spinner';
import CategoryItemsHook from '../../../Hooks/Category/CategoryItemsHook';

const CategoryItems = () => {

  const [isLoaded, data, bgColors] = CategoryItemsHook()
  
  return (
    <div className='container'>
      <div className="row justify-content-center align-items-center my-5">
        {
          isLoaded ? (data.data ? (data.data.slice(0 , 5).map((item)=>{
            return <div key={item._id} className="col-12 col-sm-4 col-md-3 col-lg-2">
            <CategoryCard id={item._id} img={item.image} title={item.name} BGColor={bgColors[Math.floor(Math.random() * bgColors.length)]}></CategoryCard>
            </div>
          })) : <h1 className='text-center'>لا توجد بيانات</h1>) : 
          <>
          <Spinner animation="grow" variant='info me-1' />
          <Spinner animation="grow" variant='info me-1' />
          <Spinner animation="grow" variant='info me-1' />
          </>
        }
      </div>
    </div>
  )
}

export default CategoryItems