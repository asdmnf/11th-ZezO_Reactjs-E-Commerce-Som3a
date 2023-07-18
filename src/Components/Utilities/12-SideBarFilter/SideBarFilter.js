import SideBarFilterHook from "../../../Hooks/SideBarFilterHook";
import "./SideBarFilter.css";

const SideBarFilter = (props) => {
  const [categoryDataIsLoaded, categoryData, brandDataIsLoaded, brandData] = SideBarFilterHook();
  return (
    <div className="sidebar-filter">
      <h5>الفئة</h5>
      <div className="sidebar-filter-item d-flex align-items-center">
        <input className="category-all-checkbox" type="checkbox" id="allCategory" value="0" onChange={props.categoryInputOnChangeHandle} ref={props.allCategoryBoxRef} />
        <label htmlFor="allCategory">الكل</label>
      </div>
      {categoryDataIsLoaded
        ? categoryData.data
          ? categoryData.data.map((item, i) => {
              return (
                <div key={item._id} className="sidebar-filter-item d-flex align-items-center">
                  <input className="category-checkbox" type="checkbox" id={item.name} value={item._id} onChange={props.categoryInputOnChangeHandle} ref={el => props.categoryBoxRef.current[i] = el} />
                  <label htmlFor={item.name}>{item.name}</label>
                </div>
              );
            })
          : null
        : null}

      <h5>الماركة</h5>
      <div className="sidebar-filter-item d-flex align-items-center">
        <input className="brand-all-checkbox" type="checkbox" id="allBrand" value="0" onChange={props.brandInputOnChangeHandle} ref={props.allBrandBoxRef} />
        <label htmlFor="allBrand" >الكل</label>
      </div>
      {brandDataIsLoaded
        ? brandData.data
          ? brandData.data.map((item, i) => {
              return (
                <div key={item._id} className="sidebar-filter-item d-flex align-items-center">
                  <input className="brand-checkbox" type="checkbox" id={item.name} value={item._id} onChange={props.brandInputOnChangeHandle} ref={el => props.brandBoxRef.current[i] = el} />
                  <label htmlFor={item.name}>{item.name}</label>
                </div>
              );
            })
          : null
        : null}

      <h5>السعر</h5>
      <div className="sidebar-filter-price">
        <label htmlFor="">من</label> 
        <input type="number" min={0} onChange={props.priceFromInputOnchangeHandle} value={props.ssPriceFrom || ""} />
      </div>
      <div className="sidebar-filter-price">
        <label htmlFor="">الى</label>
        <input type="number" min={0} onChange={props.priceToInputOnchangeHandle} value={props.ssPriceTo || ""} />
      </div>
    </div>
  );
};

export default SideBarFilter;
