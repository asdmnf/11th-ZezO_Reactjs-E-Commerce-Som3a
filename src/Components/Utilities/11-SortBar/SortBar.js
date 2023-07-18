import "./SortBar.css";

const SortBar = (props) => {
  return (
    <div className="sort-bar container d-flex justify-content-between align-items-center">
      <p className="m-0">{props.productsCount} منتج متاح</p>
      <div className="sort-bar-dropdown">
        <div className="dropdown">
          <button type="button" data-bs-toggle="dropdown">
            <i className="fas fa-filter"></i>
            تصنيف حسب
          </button>
          <ul className="dropdown-menu shadow">
            <li>
              <h5 className="dropdown-header">السعر</h5>
            </li>
            <li className="dropdown-item sort-bar-dropdown-item" onClick={()=> props.topLeftSortLiOnClickHandle("+price")} >من الأقل للأكثر</li>
            <li className="dropdown-item sort-bar-dropdown-item" onClick={()=> props.topLeftSortLiOnClickHandle("-price")}>من الأكثر للأقل</li>
            <li>
              <h5 className="dropdown-header">الحالة</h5>
            </li>
            <li className="dropdown-item sort-bar-dropdown-item" onClick={()=> props.topLeftSortLiOnClickHandle("-sold")}>الاكثر مبيعا</li>
            <li className="dropdown-item sort-bar-dropdown-item" onClick={()=> props.topLeftSortLiOnClickHandle("-ratingQuantity")}>  الاكثر تقييما</li>
            <li className="dropdown-item sort-bar-dropdown-item" onClick={()=> props.topLeftSortLiOnClickHandle("-updatedAt")}>من الاحدث الى الاقدم</li>
            <li className="dropdown-item sort-bar-dropdown-item" onClick={()=> props.topLeftSortLiOnClickHandle("+updatedAt")}>من الاقدم الى الاحدث</li>
            <h5 className="dropdown-header">استعادة التصنيف</h5>
            <li className="dropdown-item sort-bar-dropdown-item" onClick={()=> props.topLeftSortLiOnClickHandle("")}>الرجوع الى القيم الاصلية</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
