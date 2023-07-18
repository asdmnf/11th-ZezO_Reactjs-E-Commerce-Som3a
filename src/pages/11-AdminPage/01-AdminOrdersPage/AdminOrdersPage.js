import AdminSideBar from '../../../Components/AdminPage/AdminSideBar/AdminSideBar'
import AdminOrdersItems from '../../../Components/AdminPage/AdminOrdersItems/AdminOrdersItems'
import SectionContainer from '../../../Components/Utilities/09-SectionContainer/SectionContainer'
import './AdminOrdersPage.css'

const AdminOrdersPage = () => {
  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar></AdminSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header">
              <h5>إدارة جميع الطلبات</h5>
            </div>
            <div className="admin-content">
            <AdminOrdersItems></AdminOrdersItems>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default AdminOrdersPage