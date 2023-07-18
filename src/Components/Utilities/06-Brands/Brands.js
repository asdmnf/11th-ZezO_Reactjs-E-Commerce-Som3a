import BrandItem from "./BrandItem/BrandItem";
import "./Brands.css";
import BrandsHook from "../../../Hooks/Brand/BrandsHook";
import { Spinner } from "react-bootstrap";

const Brands = () => {
  const [data, isLoaded] = BrandsHook();

  return (
    <div className="container">
      <div className="row g-2 my-2 d-flex justify-content-center align-items-center">
        {isLoaded ? (
          data.data ? (
            data.data.slice(0, 5).map((item) => {
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
    </div>
  );
};

export default Brands;
