import CartPageButton from "../../CartPage/CartPageButton";
import "./AdminAdd.css";
import Spinner from "react-bootstrap/Spinner";
import AdminAddCategoryHook from "../../../Hooks/Category/AdminAddCategoryHook";
import CategoryCard from "../../Utilities/03-CategoryItems/CategoryCard/CategoryCard";

const AdminAddCategory = () => {

  const [img, fileInputOnChangeHandle, textInputOnChangeHandle, text, addBtnOnClickHandle, loader, allCategoryDataIsLoaded, allCategoryData, removeCategoryOnClickHandle, editCategoryOnClickHandle, editCategoryIsClicked, saveBtnOnClickHandle] = AdminAddCategoryHook()

  return (
    <div>
      <div className="add-brand__image">
        <label htmlFor="add-image">
          <img src={img} alt="" />
        </label>
        <input
          className="d-none"
          type="file"
          name=""
          id="add-image"
          onChange={fileInputOnChangeHandle}
        />
      </div>
      <div className="col-lg-10 col-xl-8">
        <div className="add-brand__name">
          <input
            className="mt-2"
            type="text"
            placeholder="اسم التصنيف"
            onChange={textInputOnChangeHandle}
            value={text}
          />
          <div className="add-brand__btn d-flex justify-content-end align-items-center">
          {
              !editCategoryIsClicked ? (
                <CartPageButton >
                  <button onClick={addBtnOnClickHandle} >
                  اضافة التصنيف 
                  <Spinner animation="border" className={`addBrand-spinner ${!loader ? `d-none` : null}`} />
                </button>
                </CartPageButton>
              ) : 
                <CartPageButton >
                  <button onClick={saveBtnOnClickHandle} >
                  حفظ التعديل 
                  <Spinner animation="border" className={`addBrand-spinner ${!loader ? `d-none` : null}`} />
                  </button>
                </CartPageButton>
            }
          </div>
        </div>
      </div>
      <div className="admin-header my-3">
              <h5>كل التصنيفات <span className="fs-6 text-success">( {allCategoryDataIsLoaded && allCategoryData.data ? allCategoryData.data.length : "..." } تصنيف متاح )</span></h5>
            </div>
      <div className="admin-categories-items col-lg-10 col-xl-8 mt-5 d-flex flex-wrap">
      {
        allCategoryDataIsLoaded && allCategoryData.data ? (
          allCategoryData.data?.length ? (
            allCategoryData.data.map(item => {
              return (
                <div key={item._id} className="col-4 mb-5">
                  <CategoryCard
                  showAdminControls = "yes"
                  id={item._id}
                  img={item.image}
                  title={item.name}
                  removeCategoryOnClickHandle={removeCategoryOnClickHandle}
                  editCategoryOnClickHandle={editCategoryOnClickHandle}
                  ></CategoryCard>
                </div>
              )
              })
          ) : <h1>لا توجد تصنيفات</h1>
        ) : <h1>جارى التديث</h1>
      }
      </div>
    </div>
  );
};

export default AdminAddCategory;
