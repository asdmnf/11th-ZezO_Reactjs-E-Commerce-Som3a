import CategoryCardHook from '../../../../Hooks/Category/CategoryCardHook'
import './CategoryCard.css'


const CategoryCard = (props) => {
  const [categoryOnClickHandle] = CategoryCardHook()
  return (
      <div>
        <div className={`admin-brandControls ${props.showAdminControls === "yes" && (`d-flex`)} justify-content-around align-items-center`}>
                <div className="admin-brandControls__edit">
                    <i className="fa-solid fa-pen-to-square" onClick={() => props.editCategoryOnClickHandle(props.id)}></i>
                </div>
                <div className="admin-brandControls__remove">
                    <i className="fa-solid fa-trash" onClick={() => props.removeCategoryOnClickHandle(props.id)} ></i>
                </div>
            </div>
        <div className="category-card d-flex flex-column justify-content-center align-items-center">
          <div style={{backgroundColor: `${props.BGColor}`}} className="category-card-image d-flex justify-content-center align-items-center" onClick={() => categoryOnClickHandle(props.id)}>
            <img src={props.img} alt="" />
          </div>
          <div className="category-card-description text-center" onClick={() => categoryOnClickHandle(props.id)}>
            <span>{props.title}</span>
          </div>
        </div>
      </div>
  )
}

export default CategoryCard