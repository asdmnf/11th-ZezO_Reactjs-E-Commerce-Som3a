import { useNavigate } from 'react-router-dom'
import './Promotion.css'

const Promotion = (props) => {
    const navigateTo = useNavigate()
    return (
        <div className='container'>
                <div style={{backgroundColor: `${props.BGColor}`}} className="promotion-card d-flex flex-column flex-sm-row  justify-content-around align-items-center m-5 rounded-4 shadow" onClick={() => {
                    navigateTo("/search-result")
                    sessionStorage.setItem("search-value", props.searchValue)
                    sessionStorage.setItem(props.categoryID, props.categoryID)
                    sessionStorage.setItem("allBrandBoxCheck", "true")
                }}>
                    <div className="promotion-card-offer">
                        <p>{props.offer}</p>
                    </div>
                    <div className="promotion-card-image">
                        <img src={props.img} alt="" />
                    </div>
                </div>
        </div>
    )
}

export default Promotion