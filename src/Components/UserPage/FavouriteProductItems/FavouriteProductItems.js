import ProdectItemCard from '../../Utilities/04-ProdectItems/ProdectItemCard/ProdectItemCard'
import './FavouriteProductItems.css'
import FavouriteProductItemsHook from '../../../Hooks/WishList/FavouriteProductItemsHook'

const FavouriteProductItems = () => {
  const [wishListData, wishListDataIsLoaded, favIconOnClickHandle, showSolidFavIcon] = FavouriteProductItemsHook()
  return (
    <div className="row g-3">
      {
        wishListDataIsLoaded && wishListData.status === 200 ? (
          wishListData?.data?.length ? (
            wishListData.data.map((item)=>{
              return <div className="col-sm-6 col-md-4" key={item._id}>
              <ProdectItemCard 
                productID={item.product?._id} 
                productImage={item.product?.imageCover} 
                productDescription={item.product?.title} 
                productRating={item.product?.ratingAverage} 
                productPrice={item.product?.price}
                productPriceAfterDiscount={item.product?.priceAfterDiscount}
                favIconOnClickHandle={favIconOnClickHandle}
                showSolidFavIcon={showSolidFavIcon} 
              ></ProdectItemCard>
            </div>
            })
          ) : <h1>لا توجد منتجات مفضلة</h1>
        ) : wishListDataIsLoaded && wishListData?.response?.data?.message === "User recently changed password! Please login again.." ? (<h1>اعد تسجيل الدخول لتفعيل القايمة المفضلة</h1>) : <h1>جارى التحديث</h1>
      }
    </div>
  )
}

export default FavouriteProductItems