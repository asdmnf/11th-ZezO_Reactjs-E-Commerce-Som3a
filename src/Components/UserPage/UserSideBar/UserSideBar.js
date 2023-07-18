import { Link } from 'react-router-dom'
import { useState } from 'react'
import './UserSideBar.css'

const UserSideBar = () => {
  return (
    <div className="sidebar-and-menu position-fixed">
      <div className={`side-bar`}>
        <ul className='side-bar__items'>
          <Link to="/user/orders" className='text-decoration-none text-dark'>
            <li className='side-bar__item'>إدارة الطلبات</li>
          </Link>
          <Link to="/user/fav-products" className='text-decoration-none text-dark'>
            <li className='side-bar__item'>القائمة المفضلة</li>
          </Link>
          <Link to="/user/addresses" className='text-decoration-none text-dark'>
            <li className='side-bar__item'>العناوين الشخصية</li>
          </Link>
          <Link to="/user/profile" className='text-decoration-none text-dark'>
            <li className='side-bar__item'>الملف الشخصى</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default UserSideBar