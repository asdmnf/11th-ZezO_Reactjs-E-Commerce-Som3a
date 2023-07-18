import { Link } from 'react-router-dom'
import './AdminSideBar.css'
import { useState } from 'react';

const AdminSideBar = () => {

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMenuButtonClick = () => {
    setIsMenuVisible(!isMenuVisible);
  }

  return (
    <div className="admin-side-bar">
      <div className="admin-sidebar-menu-icon" onClick={handleMenuButtonClick}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className={`side-bar position-fixed ${isMenuVisible ? "d-block" : ""}`}>
        <ul className='side-bar__items'>
            <Link to="/admin/profile" className='text-decoration-none text-dark'>
              <li className='side-bar__item'>الملف الشخصى</li>
            </Link>
            <Link to="/admin/users" className='text-decoration-none text-dark'>
              <li className='side-bar__item'>إدارة المستخدمين</li>
            </Link>
            <Link to="/admin/ads" className='text-decoration-none text-dark'>
              <li className='side-bar__item'>إدارة الاعلانات الترويجية</li>
            </Link>
            <Link to="/admin/fees" className='text-decoration-none text-dark'>
              <li className='side-bar__item'>إدارة الشحن والضريبة</li>
            </Link>
            <Link to="/admin/orders" className='text-decoration-none text-dark'>
              <li className='side-bar__item'>إدارة الطلبات</li>
            </Link>
          <Link to="/admin/products" className='text-decoration-none text-dark'>
            <li className='side-bar__item'>إدارة المنتجات</li>
          </Link>
          <Link to="/admin/add-coupon" className='text-decoration-none text-dark'>
            <li className='side-bar__item'>إدارة الكوبونات</li>
          </Link>
          <Link to="/admin/add-brand" className='text-decoration-none text-dark'>
            <li className='side-bar__item'>إدارة الماركات</li>
          </Link>
          <Link to="/admin/add-category" className='text-decoration-none text-dark'>
            <li className='side-bar__item'>إدارة التصنيف</li>
          </Link>
          <Link to="/admin/add-sub-category" className='text-decoration-none text-dark'>
            <li className='side-bar__item'>إدارة التصنيف الفرعى</li>
          </Link>
          <Link to="/admin/add-product" className='text-decoration-none text-dark'>
            <li className='side-bar__item'>أضف منتج</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default AdminSideBar