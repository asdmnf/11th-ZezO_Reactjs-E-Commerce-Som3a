import AdminSideBar from "../../../Components/AdminPage/AdminSideBar/AdminSideBar"
import UserProfileCard from "../../../Components/UserPage/UserProfileCard/UserProfileCard"
import SectionContainer from "../../../Components/Utilities/09-SectionContainer/SectionContainer"
import AdminUsersPageHook from "../../../Hooks/admin/AdminUsersPageHook"
import "./AdminUsersPage.css"

const AdminUsersPage = () => {

  const [allUsersData, allUsersDataIsLoaded, changeRoleToAdminOnClickHandler, deactivateAccountOnClickHandler, changeToAdminLoader, deactivateAccountLoader, specificUserID, changeRoleToUserOnClickHandler, activateAccountOnClickHandler, changeToUserLoader, activateAccountLoader] = AdminUsersPageHook()

  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
          <AdminSideBar></AdminSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header">
              <h5>إدراة المستخدمين ( {allUsersData?.results} مستخدم )</h5>
            </div>
            <div className="admin-content">
              {
                allUsersDataIsLoaded ?
                  (
                    allUsersData?.data?.length ? 
                    allUsersData?.data?.map(item => {
                      return <UserProfileCard
                      key={item._id}
                      editIconDisplay="d-none"
                      userID={item._id}
                      specificUserID={specificUserID}
                      userName={item.name}
                      userPhone={item.phone}
                      userEmail={item.email}
                      userRole={item.role}
                      userActive={item.active}
                      changeRoleToAdminOnClickHandler={changeRoleToAdminOnClickHandler}
                      changeRoleToUserOnClickHandler={changeRoleToUserOnClickHandler}
                      deactivateAccountOnClickHandler={deactivateAccountOnClickHandler}
                      activateAccountOnClickHandler={activateAccountOnClickHandler}
                      changeToAdminLoader={changeToAdminLoader}
                      changeToUserLoader={changeToUserLoader}
                      deactivateAccountLoader={deactivateAccountLoader}
                      activateAccountLoader={activateAccountLoader}
                    ></UserProfileCard>
                    })
                  : <h1>لا يوجد مستخدمين</h1>
                  )
                : <h1>جارى التحميل</h1>
              }
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default AdminUsersPage