import FavouriteProductItems from '../../../Components/UserPage/FavouriteProductItems/FavouriteProductItems'
import UserSideBar from '../../../Components/UserPage/UserSideBar/UserSideBar'
import SectionContainer from '../../../Components/Utilities/09-SectionContainer/SectionContainer'
import './UserFavouriteProductsPage.css'

const UserFavouriteProductsPage = () => {
  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            <UserSideBar></UserSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header">
              <h5>المنتجات المفضلة</h5>
            </div>
            <div className="admin-content mt-5">
            <FavouriteProductItems></FavouriteProductItems>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default UserFavouriteProductsPage