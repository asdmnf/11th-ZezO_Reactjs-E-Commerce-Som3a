import './CategoryHeader.css'
import HeaderButton from '../01-Header/HeaderButton/HeaderButton'

const CategoryHeader = (props) => {
  return (
    <div className='category-header container d-flex justify-content-between align-items-center'>
      <span>{props.children}</span>
      <HeaderButton ToLink={props.ToLink} BtnDisplay={props.BtnDisplay} onClick={props.onClick} >المزيد</HeaderButton>
    </div>
  )
}

export default CategoryHeader