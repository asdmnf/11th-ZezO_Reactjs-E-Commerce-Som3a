import AdminSideBar from '../../../Components/AdminPage/AdminSideBar/AdminSideBar'
import CartPageButton from '../../../Components/CartPage/CartPageButton'
import SectionContainer from '../../../Components/Utilities/09-SectionContainer/SectionContainer'
import AddSubCategoryPageHook from '../../../Hooks/SubCategory/AddSubCategoryPageHook'
import Spinner from "react-bootstrap/Spinner";
import './AddSubCategoryPage.css'
import { useNavigate } from 'react-router-dom';

const AddSubCategoryPage = () => {
  const [text, option, textInputOnChangeHandle, selectOnChangeHandle, addBtnOnClickHandle, loader, allCategoryDataIsLoaded, allCategoryData,  allSubCategoryDataIsLoaded, allSubCategoryData, removeSubCategoryOnClickHandle, editSubCategoryOnClickHandle, editSubCategoryIsClicked, saveBtnOnClickHandle] = AddSubCategoryPageHook()

  const navigateTo = useNavigate()

  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar></AdminSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header ">
              <h5>اضافة تصنيف فرعى جديد</h5>
            </div>
            <div className="admin-content">
            <div className="col-lg-10 col-xl-8">
              <div className="add-sub-category">
                <input type="text" placeholder='اسم التصنيف الفرعى' onChange={textInputOnChangeHandle} value={text}  />
                <div className="add-sub-category__select">
                <select id="add-sub-category" name="add-sub-category" onChange={selectOnChangeHandle} value={option} >
                <option value="" className='text-dark' >اختر تصنيف</option>
                  {
                    allCategoryDataIsLoaded && allCategoryData?.data ? (
                      allCategoryData.data.map(item => {
                        return <option key={item._id} value={item._id} >{item.name} </option>
                      })
                    ) : <option >لا توجد بيانات</option>
                  }
                </select>
                </div>
                <div className="add-sub-category__btn">
                {
              !editSubCategoryIsClicked ? (
                <CartPageButton >
                  <button onClick={addBtnOnClickHandle} >
                  اضافة التصنيف الفرعى 
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
              <h5 className='admin-header-subCategories'>كل التصنيفات الفرعية <span className="fs-6 text-success">( {allSubCategoryDataIsLoaded && allSubCategoryData?.data ? allSubCategoryData.data?.length : "..." } تصنيف فرعى متاح )</span></h5>
            </div>
      <div className="admin-subcategories-items col-lg-10 col-xl-8 mt-5 d-flex flex-wrap">
      {
        allSubCategoryDataIsLoaded && allSubCategoryData?.data ? (
          allSubCategoryData.data?.length ? (
            allSubCategoryData.data.map(item => {
              return (
                <div key={item._id} className="m-3">
                  <div className={`admin-brandControls d-flex justify-content-around align-items-center`}>
                <div className="admin-brandControls__edit">
                    <i className="fa-solid fa-pen-to-square" onClick={() => editSubCategoryOnClickHandle(item._id)}></i>
                </div>
                <div className="admin-brandControls__remove">
                    <i className="fa-solid fa-trash" onClick={() => removeSubCategoryOnClickHandle(item._id)} ></i>
                </div>
            </div>
            <div className="admin-subCategory-item" onClick={() => {
              sessionStorage.setItem("subCategorySortValue", `subCategory=${item._id}`)
              navigateTo("/search-result")
            }}>{item.name}</div>
                </div>
              )
              })
          ) : <h1>لا توجد تصنيفات</h1>
        ) : <h1>جارى التديث</h1>
      }
      </div>



            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default AddSubCategoryPage