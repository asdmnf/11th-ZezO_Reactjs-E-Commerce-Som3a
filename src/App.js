import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Utilities/01-Header/Header";
import Footer from "./Components/Utilities/07-Footer/Footer";
import HomePage from "./pages/01-HomePage/HomePage";
import CategoryPage from "./pages/02-CategoryPage/CategoryPage";
import MostSalesPage from "./pages/03-MostSalesPage/MostSalesPage";
import NewestSalesPage from "./pages/04-NewestSalesPage/NewestSalesPage";
import BrandsPage from "./pages/05-BrandsPage/BrandsPage";
import LoginPage from "./pages/06-LoginPage/LoginPage";
import RegisterPage from "./pages/07-RegisterPage/RegisterPage";
import ProductPage from "./pages/08-ProductPage/ProductPage";
import CartPage from "./pages/09-CartPage/CartPage";
import PaymentMethodPage from "./pages/10-PaymentMethodPage/PaymentMethodPage";
import AdminOrdersPage from "./pages/11-AdminPage/01-AdminOrdersPage/AdminOrdersPage";
import AdminProductsPage from "./pages/11-AdminPage/03-AdminProductsPage/AdminProductsPage";
import AdminOrderNumberPage from "./pages/11-AdminPage/02-AdminOrderNumberPage/AdminOrderNumberPage";
import AddBrandPage from "./pages/11-AdminPage/04-AdminAddBrandPage/AddBrandPage";
import AddCategoryPage from "./pages/11-AdminPage/05-AdminAddCategoryPage/AddCategoryPage";
import AddSubCategoryPage from "./pages/11-AdminPage/06-AdminAddSubCategoryPage/AddSubCategoryPage";
import AdminAddProductPage from "./pages/11-AdminPage/07-AdminAddProductPage/AdminAddProductPage";
import UserOrdersPage from "./pages/12-UserPage/01-UserOrdersPage/UserOrdersPage";
import UserFavouriteProductsPage from "./pages/12-UserPage/02-UserFavouriteProductsPage/UserFavouriteProductsPage";
import UserAddressesPage from "./pages/12-UserPage/03-UserAddressesPage/UserAddressesPage";
// import UserNewAddressPage from "./pages/12-UserPage/04-UserNewAddressPage/UserNewAddressPage";
import UserProfilePage from "./pages/12-UserPage/06-UserProfilePage/UserProfilePage";
// import UserEditAddressPage from "./pages/12-UserPage/05-UserEditAddressPage/UserEditAddressPage";
import ScrollToTop from "./Components/ScrollToTop";
import AdminEditProductPage from "./pages/11-AdminPage/08-AdminEditProductPage/AdminEditProductPage";
import ProductSearchPage from "./pages/13-ProductSearchPage/ProductSearchPage";
import ForgetPasswordPage from "./pages/14-ForgetPasswordPage/ForgetPasswordPage";
import AdminAddCoupon from "./pages/11-AdminPage/09-AdminAddCoupon/AdminAddCoupon";
// import RouteProtect from "./Components/RouteProtect";
import UserOrderDetailsPage from "./pages/12-UserPage/07-UserOrderDetailsPage/UserOrderDetailsPage";
import AdminProfilePage from "./pages/11-AdminPage/10-AdminProfilePage/AdminProfilePage";
import AdminUsersPage from "./pages/11-AdminPage/11-AdminUsersPage/AdminUsersPage";
import AdminAdsPage from "./pages/11-AdminPage/12-AdminAdsPage/AdminAdsPage";
import AdminFeesPage from "./pages/11-AdminPage/13-AdminFeesPage/AdminFeesPage";
import FloatingEmailIcon from "./Components/FloatingEmailIcon";
import RouteProtect from "./Components/RouteProtect";
import { useSelector } from "react-redux";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";


function App() {

  const anyData = useSelector(state => state.linkReducer.anyData)
  return (
    <Router basename="/11th-ZezO_Reactjs-E-Commerce-Som3a">
      <ScrollToTop></ScrollToTop>
      <Header></Header>
      <FloatingEmailIcon></FloatingEmailIcon>
      <Routes>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/categories" element={<CategoryPage></CategoryPage>}></Route>
        <Route path="/brands" element={<BrandsPage></BrandsPage>}></Route>
        <Route path="/product/:id" element={<ProductPage></ProductPage>}></Route>
        <Route path="/search-result" element={<ProductSearchPage></ProductSearchPage>}></Route>
        <Route path="/cart" element={<CartPage></CartPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/forget-password" element={<ForgetPasswordPage></ForgetPasswordPage>}></Route>

        <Route element={<RouteProtect isAllowed={localStorage.getItem("userRole") === "admin" ? "yes" : "no" }></RouteProtect>}>
            <Route path="/admin/profile" element={<AdminProfilePage></AdminProfilePage>}></Route>
            <Route path="/admin/users" element={<AdminUsersPage></AdminUsersPage>}></Route>
            <Route path="/admin/ads" element={<AdminAdsPage></AdminAdsPage>}></Route>
            <Route path="/admin/fees" element={<AdminFeesPage></AdminFeesPage>}></Route>
            <Route path="/admin/orders" element={<AdminOrdersPage></AdminOrdersPage>}></Route>
            <Route path="/admin/orders/:id" element={<AdminOrderNumberPage></AdminOrderNumberPage>}></Route>
            <Route path="/admin/products" element={<AdminProductsPage></AdminProductsPage>}></Route>
            <Route path="/admin/add-brand" element={<AddBrandPage></AddBrandPage>}></Route>
            <Route path="/admin/add-category" element={<AddCategoryPage></AddCategoryPage>}></Route>
            <Route path="/admin/add-sub-category" element={<AddSubCategoryPage></AddSubCategoryPage>}></Route>
            <Route path="/admin/add-product" element={<AdminAddProductPage></AdminAddProductPage>}></Route>
            <Route path="/admin/edit-product/:id" element={<AdminEditProductPage></AdminEditProductPage>}></Route>
            <Route path="/admin/add-coupon" element={<AdminAddCoupon></AdminAddCoupon>}></Route>
        </Route>

        <Route element={<RouteProtect isAllowed={localStorage.getItem("userRole") === "user" ? "yes" : "no" }></RouteProtect>}>
            <Route path="/user/orders" element={<UserOrdersPage></UserOrdersPage>}></Route>
            <Route path="/user/order-details/:id" element={<UserOrderDetailsPage></UserOrderDetailsPage>}></Route>
            <Route path="/user/fav-products" element={<UserFavouriteProductsPage></UserFavouriteProductsPage>}></Route>
            <Route path="/user/addresses" element={<UserAddressesPage></UserAddressesPage>}></Route>
            <Route path="/user/profile" element={<UserProfilePage></UserProfilePage>}></Route>
            <Route path="/cart/payment-method" element={<PaymentMethodPage></PaymentMethodPage>}></Route>
        </Route>

        
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
