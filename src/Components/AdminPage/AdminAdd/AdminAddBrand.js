import CartPageButton from '../../CartPage/CartPageButton'
import AdminAddBrandHook from '../../../Hooks/Brand/AdminAddBrandHook';
import Spinner from 'react-bootstrap/Spinner';
import BrandItem from '../../Utilities/06-Brands/BrandItem/BrandItem';
import './AdminAdd.css'

const AdminAddBrand = () => {
  const [img, fileInputOnChangeHandle, textInputOnChangeHandle, text, addBtnOnClickHandle, loader, allBrandDataIsLoaded, allBrandData, removeBrandOnClickHandle, editBrandOnClickHandle, editBrandIsClicked, saveBtnOnClickHandle] = AdminAddBrandHook()
  return (
    <div>
      <div className="add-brand__image">
        <label htmlFor="add-image">
          <img src={img} alt="" />
        </label>
        <input className="d-none" type="file" name="" id="add-image" onChange={fileInputOnChangeHandle} />
      </div>
      <div className="col-lg-10 col-xl-8">
        <div className="add-brand__name">
          <input className="mt-2" type="text" placeholder="اسم الماركة" onChange={textInputOnChangeHandle} value={text} />
          <div className={`add-brand__btn d-flex justify-content-end align-items-center`}>
            {
              !editBrandIsClicked ? (
                <CartPageButton >
                  <button onClick={addBtnOnClickHandle} >
                  اضافة الماركة 
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
              <h5>كل الماركات <span className="fs-6 text-success">( {allBrandDataIsLoaded && allBrandData.data ? allBrandData.data.length : "..." } ماركة متاحة )</span></h5>
            </div>
      <div className="admin-brands-items col-lg-10 col-xl-8 mt-5 d-flex flex-wrap">
      {
        allBrandDataIsLoaded && allBrandData.data ? (
          allBrandData.data.length ? (
            allBrandData.data.map(item => {
              return (
                <div key={item._id} className="col-4 mb-5">
                  <BrandItem
                  showAdminControls = "yes"
                  id={item._id}
                  img={item.image}
                  name={item.name}
                  removeBrandOnClickHandle={removeBrandOnClickHandle}
                  editBrandOnClickHandle={editBrandOnClickHandle}
                  ></BrandItem>
                </div>
              )
              })
          ) : <h1>لا توجد ماركات</h1>
        ) : <h1>جارى التديث</h1>
      }
      </div>
    </div>
  )
}

export default AdminAddBrand