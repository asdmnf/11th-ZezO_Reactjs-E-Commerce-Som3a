import CategoryHeader from "../../Components/Utilities/02-CategoryHeader/CategoryHeader";
import SectionContainer from "../../Components/Utilities/09-SectionContainer/SectionContainer";
import "./BrandsPage.css";
import Pagination from "../../Components/Utilities/08-Pagination/Pagination";
import BrandsPageHook from "../../Hooks/Brand/BrandsPageHook";
import BrandItem from "../../Components/Utilities/06-Brands/BrandItem/BrandItem";
import { Spinner } from "react-bootstrap";

const BrandsPage = () => {
  const [totalPages, pageNumHandle, data, isLoaded] = BrandsPageHook();
  return (
    <SectionContainer>
      <CategoryHeader BtnDisplay="d-none">
        اشهر الماركات العالمية
      </CategoryHeader>
      <div className="row g-2 my-2 d-flex justify-content-center align-items-center">
        {isLoaded ? (
          data.data ? (
            data.data.map((item) => {
              return (
                <div key={item._id} className="col-12 col-sm-4 col-md-3 col-lg-2">
                  <BrandItem id={item._id} img={item.image}></BrandItem>
                </div>
              );
            })
          ) : (
            <h1 className="text-center">لا توجد بيانات</h1>
          )
        ) : (
          <>
            <Spinner animation="grow" variant="info me-1" />
            <Spinner animation="grow" variant="info me-1" />
            <Spinner animation="grow" variant="info me-1" />
          </>
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        pageNumHandle={pageNumHandle}
      ></Pagination>
    </SectionContainer>
  );
};

export default BrandsPage;
