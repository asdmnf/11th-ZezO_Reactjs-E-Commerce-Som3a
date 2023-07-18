import CartItemCard from '../../Components/CartPage/CartItemCard'
import CartItemoperations from '../../Components/CartPage/CartItemoperations'
import CategoryHeader from '../../Components/Utilities/02-CategoryHeader/CategoryHeader'
import SectionContainer from '../../Components/Utilities/09-SectionContainer/SectionContainer'
import CartPageHook from '../../Hooks/Cart/CartPageHook'
import './CartPage.css'

const CartPage = () => {
  const [allCartDataIsLoaded, allCartData, deleteCartItemOnClickHandle, clearAllCartOnClickHandle, applyCouponOnClickHandle, applyCouponInput, applyCouponInputOnChangeHandle, loader]   = CartPageHook()
  return (
    <SectionContainer>
        <CategoryHeader BtnDisplay="d-none">عربة التسوق <span className='cart-counter-and-delete text-dark' >( {
          allCartDataIsLoaded && allCartData.status === 200 ? (allCartData.numberOfCartItems) : 0
        } منتج متاح <i className={`fa-solid fa-trash text-danger ${
          allCartDataIsLoaded && allCartData.status === 200 && allCartData.numberOfCartItems !== 0 ? (``) : `d-none` 
        }`} title='حذف الكل' style={{cursor: "pointer"}} onClick={clearAllCartOnClickHandle} ></i> )</span></CategoryHeader>
      <div className="cart-page container">
        <div className="row">
          <div className="col-lg-9">
            <div className="cart-items">
              {
                allCartDataIsLoaded && allCartData.status === 200 ? (
                  allCartData.data?.cartItems.length ? (
                    allCartData.data?.cartItems.map((item) => {
                      return <CartItemCard 
                        key={item._id} 
                        productQuantity={item.quantity}
                        productID={item.product._id}
                        cartItemID={item._id}
                        productImageCover={item.product.imageCover}
                        productTitle={item.product.title}
                        productCategory={item.product?.mainCategory?.name ? item.product.mainCategory.name : ""}
                        productBrand={item.product?.brand?.name ? item.product.brand.name : ""}
                        productColor={item.color}
                        productPrice={item.itemPrice}
                        singleProductPrice={item.product.priceAfterDiscount ? item.product.priceAfterDiscount : item.product.price}
                        deleteCartItemOnClickHandle={deleteCartItemOnClickHandle}
                      ></CartItemCard>
                    })
                  ) : <h1>عربة التسوق فارغة</h1>
                ) : allCartDataIsLoaded && allCartData?.response?.status === 404 ? (
                  <h1>عربة التسوق فارغة</h1>
                ) : localStorage.getItem('userData') ? (<h1>جارى التحديث</h1>) : <h1>يجب تسجيل الدخول</h1> 
              }
            </div>
          </div>
          <div className="col-lg-3">
            <CartItemoperations
              disabledBTN={allCartData?.data?.cartItems?.length ? false : true}
              allCartDataIsLoaded={allCartDataIsLoaded}
              allCartData={allCartData}
              applyCouponOnClickHandle={applyCouponOnClickHandle}
              applyCouponInput={applyCouponInput}
              applyCouponInputOnChangeHandle={applyCouponInputOnChangeHandle}
              loader={loader}
            ></CartItemoperations>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default CartPage