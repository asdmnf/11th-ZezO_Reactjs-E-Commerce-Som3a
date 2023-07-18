import AdminAddCategory from '../../../Components/AdminPage/AdminAdd/AdminAddCategory'
import AdminSideBar from '../../../Components/AdminPage/AdminSideBar/AdminSideBar'
import SectionContainer from '../../../Components/Utilities/09-SectionContainer/SectionContainer'
import './AddCategoryPage.css'

const AddCategoryPage = () => {
  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar></AdminSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header">
              <h5>اضافة تصنيف جديد</h5>
            </div>
            <div className="admin-content">
            <AdminAddCategory title="" inputPlaceHolder=""></AdminAddCategory>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default AddCategoryPage