import "./ProdectItems.css";
import ProdectItemCard from "./ProdectItemCard/ProdectItemCard";
import Spinner from "react-bootstrap/Spinner";
import ProductItemsHook from "../../../Hooks/WishList/ProductItemsHook";

const ProdectItems = (props) => {
  const [wishListData, wishListDataIsLoaded] = ProductItemsHook()
  return (
    <div className="container">
      <div className="row g-2 my-2 justify-content-start align-items-center">
        {props.isLoaded ? (
          props.productData ? (
            props.productData.map((item) => {
              return (
                <div key={item._id} className="col-sm-6 col-md-4 col-lg-3">
                  <ProdectItemCard
                    productImage={item.imageCover}
                    productDescription={item.title}
                    productRating={item.ratingAverage}
                    productPrice={item.price}
                    productPriceAfterDiscount={item.priceAfterDiscount}
                    productID={item._id}
                    productSold={item.sold}
                    productQuantity={item.quantity}
                    wishListData={wishListData}
                    wishListDataIsLoaded={wishListDataIsLoaded}
                  ></ProdectItemCard>
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

export default ProdectItems;
