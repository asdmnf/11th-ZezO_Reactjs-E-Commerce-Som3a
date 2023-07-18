import UserOrdersItems from '../../../Components/UserPage/UserOrdersItems/UserOrdersItems'
import UserSideBar from '../../../Components/UserPage/UserSideBar/UserSideBar'
import SectionContainer from '../../../Components/Utilities/09-SectionContainer/SectionContainer'
import UserOrdersPageHook from '../../../Hooks/Payment/UserOrdersPageHook'
import './UserOrdersPage.css'
const UserOrdersPage = () => {
  const [allOrdersDataIsLoaded, allOrdersData] = UserOrdersPageHook()
  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            <UserSideBar></UserSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header">
              <h5>اهلا {JSON.parse(localStorage.getItem("userData")).name}</h5>
            </div>
            <div className="admin-content">
              {
                allOrdersDataIsLoaded && allOrdersData.data ? (
                  allOrdersData.data.map((item) => {
                    return <UserOrdersItems 
                              key={item._id}
                              orderID={item._id}
                              orderNumber={item._id}
                              orderPaidStatus={item.isPaid}
                              orderDeliveredStatus={item.isDelivered}
                              orderTotalPrice={item.totalPayment}
                              cartItems={item.cartItems}
                              orderDate={item.createdAt}
                          ></UserOrdersItems>
                  })
                ) : <h1>لا توجد طلبات</h1>
              }
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default UserOrdersPage