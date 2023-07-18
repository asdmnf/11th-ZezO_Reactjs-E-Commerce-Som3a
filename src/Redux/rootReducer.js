import { combineReducers } from "redux";
import addressReducer from "./Reducers/AddressReducer/addressReducer";
import specificAddressReducer from "./Reducers/AddressReducer/specificAddressReducer";
import forgetPasswordCodeReducer from "./Reducers/AuthenticationReducers/forgetPasswordCodeReducer";
import forgetPasswordEmailReducer from "./Reducers/AuthenticationReducers/forgetPasswordEmailReducer";
import forgetPasswordNewPassworReducer from "./Reducers/AuthenticationReducers/forgetPasswordNewPassworReducer";
import loggedUserDataReducer from "./Reducers/AuthenticationReducers/loggedUserDataReducer";
import loginReducer from "./Reducers/AuthenticationReducers/loginReducer";
import registerReducer from "./Reducers/AuthenticationReducers/registerReducer";
import brand2Reducer from "./Reducers/brand2Reducer";
import brandReducer from "./Reducers/brandReducer";
import cartReducer from "./Reducers/CartReducer/cartReducer";
import category2Reducer from "./Reducers/category2Reducer";
import categoryReducer from "./Reducers/categoryReducer";
import couponReducer from "./Reducers/CouponReducer/couponReducer";
import paymentReducer from "./Reducers/PaymentReducer/paymentReducer";
import deleteProductReducer from "./Reducers/productReducer/deleteProductReducer";
import getAllProductsByCategoryIdReducer from "./Reducers/productReducer/getAllProductsByCategoryIdReducer";
import homeDevicesProductsReducer from "./Reducers/productReducer/homeDevicesProductsReducer";
import marketProductsReducer from "./Reducers/productReducer/marketProductsReducer";
import mostSalesProductsReducer from "./Reducers/productReducer/mostSalesProductsReducer";
import { createProductReducer, getSpecificProductReducer, productHomeReducer, productPageReducer } from "./Reducers/productReducer/productReducer";
import { productSearchReducer } from "./Reducers/productReducer/productSearchReducer";
import samsungProductsReducer from "./Reducers/productReducer/samsungProductsReducer";
import specificBrandDependOnProductReducer from "./Reducers/productReducer/specificBrandDependOnProductReducer";
import specificCategoryDependOnProductReducer from "./Reducers/productReducer/specificCategoryDependOnProductReducer";
import updateProductReducer from "./Reducers/productReducer/updateProductReducer";
import reviewReducer from "./Reducers/ReviewReducers/reviewReducer";
import subCategory2Reducer from "./Reducers/subCategory2Reducer";
import subCategoryApiFilterReducer from "./Reducers/subCategoryApiFilterReducer";
import subCategoryReducer from "./Reducers/subCategoryReducer";
import userReducer from "./Reducers/UserReducer/userReducer";
import WishListReducer from "./Reducers/WishListReducer/wishListReducer";
import getAllCouponsReducer from "./Reducers/CouponReducer/getAllCouponsReducer";
import getAllUsersReducer from "./Reducers/AdminUsersReducers/getAllUsersReducer";
import usersOperatoinsReducer from "./Reducers/AdminUsersReducers/usersOperatoinsReducer";
import getAllFeesReducer from "./Reducers/AdminFeesReducers/getAllFeesReducer";
import fessReducer from "./Reducers/AdminFeesReducers/fessReducer";
import getAllCarouselReducer from "./Reducers/CarouselReducers/getAllCarouselReducer";
import carouselOperationsReducer from "./Reducers/CarouselReducers/carouselOperationsReducer";
import orderUpdateReducer from "./Reducers/PaymentReducer/orderUpdateReducer";
import emailReducer from "./Reducers/EmailReducer/emailReducer";
import loggedUserDataReducer2 from "./Reducers/LoggedUserDataReducer2/loggedUserDataReducer2";
import linkReducer from "./Reducers/linkReducer";
import review2Reducer from "./Reducers/review2Reducer";


const rootReducer = combineReducers({
  categoryReducer: categoryReducer,
  category2Reducer: category2Reducer,
  brandReducer: brandReducer,
  brand2Reducer: brand2Reducer,
  subCategoryReducer: subCategoryReducer,
  subCategory2Reducer: subCategory2Reducer,
  subCategoryApiFilterReducer: subCategoryApiFilterReducer,
  productHomeReducer: productHomeReducer,
  productPageReducer: productPageReducer,
  createProductReducer: createProductReducer,
  getSpecificProductReducer: getSpecificProductReducer,
  specificCategoryDependOnProductReducer: specificCategoryDependOnProductReducer,
  specificBrandDependOnProductReducer: specificBrandDependOnProductReducer,
  getAllProductsByCategoryIdReducer: getAllProductsByCategoryIdReducer,
  deleteProductReducer: deleteProductReducer,
  updateProductReducer: updateProductReducer,
  productSearchReducer: productSearchReducer,
  registerReducer: registerReducer,
  loginReducer: loginReducer,
  forgetPasswordEmailReducer: forgetPasswordEmailReducer,
  forgetPasswordCodeReducer: forgetPasswordCodeReducer,
  forgetPasswordNewPassworReducer: forgetPasswordNewPassworReducer,
  loggedUserDataReducer: loggedUserDataReducer,
  reviewReducer: reviewReducer,
  review2Reducer: review2Reducer,
  WishListReducer: WishListReducer,
  couponReducer: couponReducer,
  getAllCouponsReducer: getAllCouponsReducer,
  addressReducer: addressReducer,
  userReducer: userReducer,
  cartReducer: cartReducer,
  specificAddressReducer: specificAddressReducer,
  paymentReducer: paymentReducer,
  mostSalesProductsReducer: mostSalesProductsReducer,
  marketProductsReducer: marketProductsReducer,
  homeDevicesProductsReducer: homeDevicesProductsReducer,
  samsungProductsReducer: samsungProductsReducer,
  getAllUsersReducer: getAllUsersReducer,
  usersOperatoinsReducer: usersOperatoinsReducer,
  getAllFeesReducer: getAllFeesReducer,
  fessReducer: fessReducer,
  getAllCarouselReducer: getAllCarouselReducer,
  carouselOperationsReducer: carouselOperationsReducer,
  orderUpdateReducer: orderUpdateReducer,
  emailReducer: emailReducer,
  loggedUserDataReducer2: loggedUserDataReducer2,
  linkReducer: linkReducer,
})

export default rootReducer