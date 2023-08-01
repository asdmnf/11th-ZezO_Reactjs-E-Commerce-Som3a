import Spinner from 'react-bootstrap/Spinner';
import CategoryHeader from "../../Components/Utilities/02-CategoryHeader/CategoryHeader";
import CategoryCard from "../../Components/Utilities/03-CategoryItems/CategoryCard/CategoryCard";
import Pagination from "../../Components/Utilities/08-Pagination/Pagination";
import SectionContainer from "../../Components/Utilities/09-SectionContainer/SectionContainer";
import CategoryPageHook from '../../Hooks/Category/CategoryPageHook';
import "./CategoryPage.css";

const CategoryPage = () => {
  
  const [data, isLoaded, totalPages, bgColors, pageNumHandle] = CategoryPageHook()


  return (
    <SectionContainer>
      <div className="category-page-header">
        <CategoryHeader BtnDisplay="d-none">التصنيفات</CategoryHeader>
      </div>
      <div className='container'>
      <div className="row justify-content-center align-items-center my-5">
        
        {
          isLoaded === true ? (data ? (data.map((item)=>{
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
      <Pagination totalPages={totalPages} pageNumHandle={pageNumHandle}></Pagination>
    </SectionContainer>
  );
};

export default CategoryPage;
