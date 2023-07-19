import SectionContainer from "../../Components/Utilities/09-SectionContainer/SectionContainer";
import CategoryBar from "../../Components/Utilities/10-CategoryBar/CategoryBar";
import ProductCarousel from "../../Components/Utilities/13-ProductCarousel/ProductCarousel";
import PrpductRating from "../../Components/Utilities/14-PrpductRating/PrpductRating";
import ProductButtonStyle from "../../Components/Utilities/15-ProductButtonStyle/ProductButtonStyle";
import ProductContent from "../../Components/Utilities/16-ProductContent/ProductContent";
import ProductUserCommentCard from "../../Components/Utilities/17-ProductUserCommentCard/ProductUserCommentCard";
import ReactStars from "react-rating-stars-component";
import ProductPageHook from "../../Hooks/Product/ProductPageHook";
import ProdectItems from "../../Components/Utilities/04-ProdectItems/ProdectItems";
import CategoryHeader from "../../Components/Utilities/02-CategoryHeader/CategoryHeader";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import { ToastContainer } from "react-toastify";
import "./ProductPage.css";

import ProdectItemCard from "../../Components/Utilities/04-ProdectItems/ProdectItemCard/ProdectItemCard";
import Carousel from 'react-elastic-carousel'

const ProductPage = () => {
  const [isLoaded, specificProductData, allCategoryProductsIsLoaded, filteredAllCategoryProducts, reviewInputOnChangeHandle, reviewInput, addReviewOnClickHandle, ratingStarsOnChangeHandle, ratingStars, allReviewsData, allReviewsDataIsLoaded, editCommentOnClickHandle, removeCommentOnClickHandle, lsUserData, show, handleClose, saveReviewEditOnClickHandle, editReviewInputOnChangeHandle, editReviewInput, isUserCommented, wishListData, wishListDataIsLoaded] = ProductPageHook();

  const secondExample = {
    size: 20,
    count: 5,
    color: "#ffc107",
    activeColor: "#ffc107",
    isHalf: false,
    a11y: true,
    emptyIcon: <i className="fa-regular fa-star"></i>,
    halfIcon: <i className="fa-solid fa-star-half-stroke"></i>,
    filledIcon: <i className="fa-solid fa-star"></i>,
    value: ratingStars,
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1},
    { width: 576, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3, itemsToScroll: 3 },
    { width: 992, itemsToShow: 4, itemsToScroll: 4 },
  ]

  return (
    <SectionContainer>
      <CategoryBar></CategoryBar>
      <div className="product-page container">
        <div className="row gap-5 gap-lg-0">
          <div className="col-lg-3">
            <ProductCarousel
              specificProductData={specificProductData.data}
              isLoaded={isLoaded}
            ></ProductCarousel>
          </div>
          <div className="col-lg-7">
            <ProductContent
              specificProductData={specificProductData.data}
              isLoaded={isLoaded}
            ></ProductContent>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="product-rating-comment shadow-sm">
              <div className="product-rating-comment-header d-flex">
                <p>التقييمات</p>
                <PrpductRating
                  rate={
                    isLoaded ? (
                      specificProductData?.data ? (
                        specificProductData.data?.ratingAverage
                      ) : (
                        "0"
                      )
                    ) : (
                      <Spinner animation="grow" variant="info me-1" />
                    )
                  }
                ></PrpductRating>
                <div className="product-rating-comment-header-count">
                  ({" "}
                  {isLoaded ? (
                    specificProductData?.data ? (
                      specificProductData.data?.ratingQuantity
                    ) : (
                      "0"
                    )
                  ) : (
                    <Spinner animation="grow" variant="info me-1" />
                  )}{" "}
                  تقييمات )
                </div>
              </div>
              <div className="product-rating-comment-body">
                <div className={`product-rating-comment-body-profile d-flex align-items-center mb-2 ${localStorage.getItem("userRole") === "admin" || isUserCommented === true ? `d-none` : null}`}>
                  <div className="product-rating-comment-body-username ms-3">
                    {localStorage.getItem("userData")
                      ? JSON.parse(localStorage.getItem("userData")).name
                      : null}
                  </div>

                  {localStorage.getItem("userData") ? (
                    <ReactStars
                      {...secondExample}
                      onChange={ratingStarsOnChangeHandle}
                    />
                  ) : null}
                </div>
                <div className="product-rating-comment-body-text">
                  <textarea
                    name=""
                    id=""
                    placeholder="اكتب تعليق"
                    onChange={reviewInputOnChangeHandle}
                    value={reviewInput}
                    disabled={localStorage.getItem("userRole") === "admin" || isUserCommented === true ? true : false}
                  ></textarea>
                </div>
                <div className={`product-rating-comment-body-button d-flex justify-content-end mt-2 ${localStorage.getItem("userRole") === "admin" || isUserCommented === true ? `d-none` : null}`}>
                  <ProductButtonStyle onClick={addReviewOnClickHandle}>
                    أضف تعليقك
                  </ProductButtonStyle>
                </div>
                <div className="comment-cards mt-4">
                  {allReviewsDataIsLoaded ? (
                    allReviewsData.data ? (
                      allReviewsData.data?.map((item) => {
                        return (
                          <ProductUserCommentCard
                            key={item._id}
                            name={item.user.name}
                            rate={item.rating}
                            comment={item.title}
                            id={item._id}
                            editCommentOnClickHandle={editCommentOnClickHandle}
                            removeCommentOnClickHandle={
                              removeCommentOnClickHandle
                            }
                            showUserControls={
                              lsUserData === item.user._id || localStorage.getItem("userRole") === "admin" ? "yes" : null
                            }
                          />
                        );
                      })
                    ) : (
                      <h1>لا توجد بيانات</h1>
                    )
                  ) : (
                    <h1>جارى التحديث</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${allCategoryProductsIsLoaded && filteredAllCategoryProducts?.length ? `` : `d-none`}`}>
          <CategoryHeader BtnDisplay="d-none">منتجات ذات صلة</CategoryHeader>

          <Carousel breakPoints={breakPoints} pagination={false} itemPadding={[0, 2]}>
            {
              filteredAllCategoryProducts?.map(item => {
                return (
                  <div key={item._id} className="related-products-carousel col-12">
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
                )
              })
            }
</Carousel>



        </div>
      </div>
      <div className="edit-rating-modal">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>تعديل التقييم</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactStars
              {...secondExample}
              onChange={ratingStarsOnChangeHandle}
            />
            <div className="product-rating-comment-body-text">
              <textarea
                name=""
                id=""
                placeholder="اكتب تعليق"
                onChange={editReviewInputOnChangeHandle}
                value={editReviewInput}
                ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark rounded-3" onClick={handleClose}>
              إالغاء
            </Button>
            <ProductButtonStyle onClick={saveReviewEditOnClickHandle}>
              حفظ التعديل
            </ProductButtonStyle>
          </Modal.Footer>
        </Modal>
      </div>
    </SectionContainer>
  );
};

export default ProductPage;
