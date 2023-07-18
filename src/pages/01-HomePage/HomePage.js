import './HomePage.css'
import CategoryHeader from '../../Components/Utilities/02-CategoryHeader/CategoryHeader'
import MainCarousel from '../../Components/HomePage/01-MainCarousel/MainCarousel'
import ProdectItems from '../../Components/Utilities/04-ProdectItems/ProdectItems'
import CategoryItems from '../../Components/Utilities/03-CategoryItems/CategoryItems'
import Promotion from '../../Components/Utilities/05-Promotion/Promotion'
import mobile from '../../Assets/images/mobile.png'
import laptop from '../../Assets/images/laptop.png'
import Brands from '../../Components/Utilities/06-Brands/Brands'
import HomePageHook from '../../Hooks/HomePageHook'
import CategoryBar from '../../Components/Utilities/10-CategoryBar/CategoryBar'

const HomePage = () => {
  const [slicedProductData, isLoaded, newestProductsBtnOnClickHandle, mostSalestProductsBtnOnClickHandle, marketProductsBtnOnClickHandle, homeDevicesProductsBtnOnClickHandle, samsungBrandProductsBtnOnClickHandle, mostSalesProducts, mostSalesProductsIsLoaded, marketProducts, marketProductsIsLoaded, homeDevicesProducts, homeDevicesProductsIsLoaded, samsungProducts, samsungProductsIsLoaded] = HomePageHook();
  return (
    <>
    <CategoryBar></CategoryBar>
    <MainCarousel></MainCarousel>
    <CategoryHeader ToLink="/categories">التصنيفات</CategoryHeader>
    <CategoryItems></CategoryItems>
    <CategoryHeader ToLink="/search-result" onClick={newestProductsBtnOnClickHandle} >المنتجات الحديثة</CategoryHeader>
    <ProdectItems isLoaded={isLoaded} productData={slicedProductData}></ProdectItems>
    <Promotion offer="خصم 60% على الموبايلات" img={mobile} BGColor="#ffc107" 
      searchValue="موبايل"
      categoryID="64752b5463effaf07fabf9a3"
    ></Promotion>
    <CategoryHeader ToLink="/search-result" onClick={mostSalestProductsBtnOnClickHandle}>الاكثر مبيعا</CategoryHeader>
    <ProdectItems isLoaded={mostSalesProductsIsLoaded} productData={mostSalesProducts.data}></ProdectItems>
    <Promotion offer="إستخدم كود LAPTOP للحصول على خصم يصل الى 400 جنيه" img={laptop} BGColor="#20c997" 
      searchValue="لاب توب"
      categoryID="646bfb4caaefb53bb4a51ea8"
    ></Promotion>
    <CategoryHeader ToLink="/search-result" onClick={marketProductsBtnOnClickHandle} >سوبر ماركت</CategoryHeader>
    <ProdectItems isLoaded={marketProductsIsLoaded} productData={marketProducts.data}></ProdectItems>
    <CategoryHeader ToLink="/search-result" onClick={homeDevicesProductsBtnOnClickHandle}>اجهزة منزلية</CategoryHeader>
    <ProdectItems isLoaded={homeDevicesProductsIsLoaded} productData={homeDevicesProducts.data}></ProdectItems>
    <CategoryHeader ToLink="/brands">اشهر الماركات العالمية</CategoryHeader>
    <Brands></Brands>
    <CategoryHeader ToLink="/search-result" onClick={samsungBrandProductsBtnOnClickHandle}>منتجات سامسونج</CategoryHeader>
    <ProdectItems isLoaded={samsungProductsIsLoaded} productData={samsungProducts.data}></ProdectItems>
    </>
  )
}

export default HomePage