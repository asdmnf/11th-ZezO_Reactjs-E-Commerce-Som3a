import CategoryHeader from "../../Components/Utilities/02-CategoryHeader/CategoryHeader";
import ProdectItems from "../../Components/Utilities/04-ProdectItems/ProdectItems";
import Pagination from "../../Components/Utilities/08-Pagination/Pagination";
import SectionContainer from "../../Components/Utilities/09-SectionContainer/SectionContainer";
import CategoryBar from "../../Components/Utilities/10-CategoryBar/CategoryBar";
import SortBar from "../../Components/Utilities/11-SortBar/SortBar";
import SideBarFilter from "../../Components/Utilities/12-SideBarFilter/SideBarFilter";
import MostSalesPageHook from "../../Hooks/Product/MostSalesPageHook";
import "./NewestSalesPage.css";

const NewestSalesPage = () => {
  const [
    totalPages, pageNumHandle, productData, totalProductsLength, isLoaded,] = MostSalesPageHook();
  return (
    <SectionContainer>
      <CategoryBar></CategoryBar>
      <SortBar
        productsCount={`${
          totalProductsLength ? totalProductsLength.length : ``
        }`}
      ></SortBar>
      <SideBarFilter></SideBarFilter>
      <CategoryHeader BtnDisplay="d-none">المنتجات الحديثة</CategoryHeader>
      <ProdectItems
        isLoaded={isLoaded}
        productData={productData}
      ></ProdectItems>
      <Pagination
        totalPages={totalPages}
        pageNumHandle={pageNumHandle}
      ></Pagination>
    </SectionContainer>
  );
};

export default NewestSalesPage;
