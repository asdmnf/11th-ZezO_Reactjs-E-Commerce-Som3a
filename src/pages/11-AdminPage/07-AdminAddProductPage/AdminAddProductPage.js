import AdminSideBar from "../../../Components/AdminPage/AdminSideBar/AdminSideBar";
import CartPageButton from "../../../Components/CartPage/CartPageButton";
import SectionContainer from "../../../Components/Utilities/09-SectionContainer/SectionContainer";
// import MultiImageInput from 'react-multiple-image-input';
import AdminAddProductPageHook from "../../../Hooks/Product/AdminAddProductPageHook";
import { nanoid } from "nanoid";
import addImage from '../../../Assets/images/add-image.png'
import { CompactPicker } from "react-color";
import Multiselect from "multiselect-react-dropdown";
import Spinner from "react-bootstrap/Spinner";
import "./AdminAddProductPage.css";

const AdminAddProductPage = () => {

  const [productName, productDescription, productPriceBeforeDiscount, productPrice, productAvailableQuantity, productNameOnChangeHandle, productDescriptionOnChangeHandle, productPriceBeforeDiscountOnChangeHandle, productPriceOnChangeHandle, productAvailableQuantityOnChangeHandle, mainCategoryData, brandData, productMainCategory, productSubCategory, productBrand, productMainCategoryOnChangeHandle, productSubCategoryDependsOnMain, productSubCategoryOnSelectHandle, productSubCategoryOnRemoveHandle, productBrandOnChangeHandle, colorInputOnchangeHandle, colorValues, productColorOnClickHandle, fileInputOnChangeHandle, images, imageOnClickHandle, addColorIconOnClickHandle, showColorPicker, saveBtnOnClickHandle, mainCategoryDataIsLoaded, brandDataIsLoaded, loader] = AdminAddProductPageHook()

  const options = productSubCategoryDependsOnMain

  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar></AdminSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header">
              <h5>اضافة منتج جديد</h5>
            </div>
            <div className="admin-content">
              <div className="admin-add-product">
                <div className="col-lg-10 col-xl-8">
                  <p className="text-secondary">صور المنتج ( اقصى عدد 5 صور - والأولى هى الصورة الرئيسية للمنتج ) <br /> * اضغط على الصورة لحذفها</p>
                  <div className="product-images">
                    {
                      images ? (images.map((item, i)=>{
                        return <img key={nanoid()} src={images[i]} alt="" title="حذف" onClick={()=>{imageOnClickHandle(i)}} />
                      })) : null
                    }
                    <label htmlFor="upload-image" className={`upload-image ${images.length === 5 ? `d-none` : ``}`}>
                    <img src={addImage} alt="" />
                    
                  </label>
                  <input type="file" alt="" id="upload-image" className="d-none" multiple onChange={fileInputOnChangeHandle}/>
                  </div>
                  <input type="text" max={99} placeholder="اسم المنتج" onChange={productNameOnChangeHandle} value={productName} style={{height: "60px"}} />
                  <textarea placeholder="وصف المنتج" onChange={productDescriptionOnChangeHandle} value={productDescription}></textarea>
                  <input type="number" min={1} placeholder="سعر المنتج " onChange={productPriceOnChangeHandle} value={productPrice} />
                  <input type="number" placeholder="سعر المنتج بعد الخصم" onChange={productPriceBeforeDiscountOnChangeHandle} value={productPriceBeforeDiscount} />
                  <input type="number" min={1} placeholder="الكمية المتاحة " onChange={productAvailableQuantityOnChangeHandle} value={productAvailableQuantity} />
                  <select id="admin-add-product" name="admin-add-product" onChange={productMainCategoryOnChangeHandle} value={productMainCategory} >
                    <option value="0">التصنيف الرئيسى</option>
                    {
                      mainCategoryDataIsLoaded && mainCategoryData.data ? (mainCategoryData?.data.map((item)=>{ 
                        return <option key={item._id} value={item._id}>{item.name}</option>
                      })) : <option >لا توجد بيانات</option>
                    }
                  </select>


                  <Multiselect
                  options={options}
                  placeholder = "التصنيف الفرعى"
                  multi = {true}
                  searchable = {true}
                  closeOnScroll = {true}
                  direction = "ltr"
                  className="admin-add-product__multi-select"
                  onSelect={productSubCategoryOnSelectHandle}
                  onRemove={productSubCategoryOnRemoveHandle}
                  displayValue="name" 
                  selectedValues = {productSubCategory}
                  />


                  <select id="admin-add-product" name="admin-add-product" onChange={productBrandOnChangeHandle} value={productBrand} > 
                    <option value="0">الماركة</option>
                    {
                      brandDataIsLoaded && brandData.data ? (brandData.data.map((item)=>{
                        return <option key={item._id} value={item._id}>{item.name}</option>
                      })) : <option>لا توجد بيانات</option>
                    }
                  </select>
                  <div className="admin-add-product__color">
                    <h6>الالوان المتاحة للمنتج</h6>
                    <div className="d-flex align-items-center">
                      {colorValues ? ( colorValues.map((colorItem)=>{ 
                        return <span key={nanoid()} className="shadow" style={{backgroundColor: colorItem}} onClick={()=>{
                          productColorOnClickHandle(colorItem)
                        }} ></span>
                      })) : null}
                      <i className={`fa-solid fa-circle-plus ${!showColorPicker ? `d-block` : `d-none`}`} onClick={addColorIconOnClickHandle}></i>
                      <i className={`fa-solid fa-circle-xmark ${showColorPicker ? `d-block` : `d-none`}`} onClick={addColorIconOnClickHandle}></i>
                      <div className={`color-picker mt-2 ${!showColorPicker ? `d-none` : null}`}>
                    </div>
                    </div>
                  </div>
                  <div className={`color-picker mt-2 ${!showColorPicker ? `d-none` : null}`}>
                      <CompactPicker onChangeComplete = {colorInputOnchangeHandle} />
                  </div>
                  <div className="admin-add-product__btn">
                    <CartPageButton>
                      <button onClick={saveBtnOnClickHandle}>
                        اضف المنتج
                        <Spinner animation="border" className={`addBrand-spinner ${!loader ? `d-none` : null}`} />
                      </button>
                    </CartPageButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default AdminAddProductPage;
