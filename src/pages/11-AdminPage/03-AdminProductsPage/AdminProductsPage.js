import AdminSideBar from "../../../Components/AdminPage/AdminSideBar/AdminSideBar";
import ProdectItemCard from "../../../Components/Utilities/04-ProdectItems/ProdectItemCard/ProdectItemCard";
import SectionContainer from "../../../Components/Utilities/09-SectionContainer/SectionContainer";
import AdminProductsPageHook from "../../../Hooks/Product/AdminProductsPageHook";
import Spinner from "react-bootstrap/Spinner";
import "./AdminProductsPage.css";

const AdminProductsPage = () => {
  const [productData, productDataIsLoaded, productDeleteIconOnClickHandle] = AdminProductsPageHook();
  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar></AdminSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header">
              <h5>إدارة جميع المنتجات ( {
                productDataIsLoaded ? (productData?.length) : <Spinner animation="grow" variant="info me-1" />
                } منتج )</h5>
            </div>
            <div className="admin-content">
              <div className="row g-2 my-2 justify-content-start align-items-center">
                {productDataIsLoaded
                  ? productData.length
                    ? productData.map((item) => {
                        return (
                          <div key={item._id} className="col-sm-6 col-md-4">
                            <ProdectItemCard
                              productDeleteIconOnClickHandle = {productDeleteIconOnClickHandle}
                              productItemData = {item}
                              productImage={item.imageCover}
                              productDescription={item.title}
                              productRating={item.ratingAverage}
                              productPrice={item.price}
                              productPriceAfterDiscount={item.priceAfterDiscount}
                              productID={item._id}
                              productSold={item.sold}
                              productQuantity={item.quantity}
                              showAdminControls="yes"
                            ></ProdectItemCard>
                          </div>
                        );
                      })
                    : <h1>لا توجد بيانات</h1>
                  : (
                    <>
                      <Spinner animation="grow" variant="info me-1" />
                      <Spinner animation="grow" variant="info me-1" />
                      <Spinner animation="grow" variant="info me-1" />
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default AdminProductsPage;
