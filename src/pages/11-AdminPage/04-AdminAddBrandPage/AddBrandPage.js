import AdminAddBrand from '../../../Components/AdminPage/AdminAdd/AdminAddBrand'
import AdminSideBar from '../../../Components/AdminPage/AdminSideBar/AdminSideBar'
import SectionContainer from '../../../Components/Utilities/09-SectionContainer/SectionContainer'
import './AddBrandPage.css'

const AddBrandPage = () => {
  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar></AdminSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header">
              <h5>اضافة ماركة جديدة</h5>
            </div>
            <div className="admin-content">
            <AdminAddBrand></AdminAddBrand>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default AddBrandPage