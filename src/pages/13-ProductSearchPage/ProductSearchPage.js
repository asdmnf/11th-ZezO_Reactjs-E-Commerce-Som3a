import CategoryHeader from "../../Components/Utilities/02-CategoryHeader/CategoryHeader";
import ProdectItems from "../../Components/Utilities/04-ProdectItems/ProdectItems";
import Pagination from "../../Components/Utilities/08-Pagination/Pagination";
import SectionContainer from "../../Components/Utilities/09-SectionContainer/SectionContainer";
import SortBar from "../../Components/Utilities/11-SortBar/SortBar";
import SideBarFilter from "../../Components/Utilities/12-SideBarFilter/SideBarFilter";
import ProductSearchPageHook from "../../Hooks/Product/ProductSearchPageHook";
import "./ProductSearchPage.css";

const ProductSearchPage = () => {
  const [searchData, searchDataIsLoaded, searchDataTotalResults, searchDataTotalPages, pageNumHandle, topLeftSortLiOnClickHandle, categoryInputOnChangeHandle, brandInputOnChangeHandle, priceFromInputOnchangeHandle, priceToInputOnchangeHandle, ssPriceFrom, ssPriceTo, brandBoxRef, allBrandBoxRef, categoryBoxRef, allCategoryBoxRef, showSideBar, toggleSideBarOnClickHandle] = ProductSearchPageHook()
  return (
    <SectionContainer>

      <SortBar
        topLeftSortLiOnClickHandle={topLeftSortLiOnClickHandle}
        productsCount={`${
          searchDataTotalResults ? searchDataTotalResults : `0`
        }`}
      ></SortBar>
      <div className="sideBar-and-products row m-0">
        <div className="sideBar-icon d-sm-none" onClick={toggleSideBarOnClickHandle}>
          <i className="fa-solid fa-gears"></i>
        </div>
        <div className={`sideBar col-sm-3 col-md-2 ${showSideBar === true ? "d-block" : ""}`}>
        <SideBarFilter 
        categoryInputOnChangeHandle = {categoryInputOnChangeHandle} 
        brandInputOnChangeHandle = {brandInputOnChangeHandle}
        priceFromInputOnchangeHandle = {priceFromInputOnchangeHandle}
        priceToInputOnchangeHandle = {priceToInputOnchangeHandle}
        ssPriceFrom = {ssPriceFrom}
        ssPriceTo = {ssPriceTo}
        allBrandBoxRef = {allBrandBoxRef}
        brandBoxRef = {brandBoxRef}
        allCategoryBoxRef = {allCategoryBoxRef}
        categoryBoxRef = {categoryBoxRef}
      ></SideBarFilter>
        </div>
        <div className="col-sm-9 col-md-10">

      <ProdectItems
        productData={searchData}
        isLoaded={searchDataIsLoaded}
      ></ProdectItems>
      <Pagination
        totalPages={searchDataTotalPages}
        pageNumHandle={pageNumHandle}
      ></Pagination>
        </div>
      </div>
      
      
    </SectionContainer>
  );
};

export default ProductSearchPage;