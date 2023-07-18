import BrandItemHook from '../../../../Hooks/Brand/BrandItemHook'
import './BrandItem.css'

const BrandItem = (props) => {
    const [brandOnClickHandle] = BrandItemHook()
    return (
        <div>
            <div className={`admin-brandControls ${props.showAdminControls === "yes" && (`d-flex`)} justify-content-around align-items-center`}>
                <div className="admin-brandControls__edit">
                    <i className="fa-solid fa-pen-to-square" onClick={() => props.editBrandOnClickHandle(props.id)}></i>
                </div>
                <div className="admin-brandControls__remove">
                    <i className="fa-solid fa-trash" onClick={() => props.removeBrandOnClickHandle(props.id)} ></i>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div className='brand-item-img d-flex justify-content-center align-items-center' onClick={() => brandOnClickHandle(props.id)} >
                    <img src={props.img} alt="" />
                </div>
                <div className=" text-center mt-2" style={{cursor: "pointer"}} onClick={() => brandOnClickHandle(props.id)} >{props.name}</div>
            </div>
        </div>
    )
}

export default BrandItem