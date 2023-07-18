import { useNavigate } from 'react-router-dom'
import './CarouselItem.css'

const CarouselItem = (props) => {

    const navigateTo = useNavigate()

    return (
        <div style={{backgroundImage: `url(${props.backgroundImage})`, backgroundColor: `${props.BGColor}`}} className='main-carousel-item d-flex justify-content-center align-items-center' onClick={() => {
            navigateTo("/search-result")
            sessionStorage.setItem("search-value", props.searchWord)
        }}>
            <div className={`carousel-controls d-flex align-items-center ${localStorage.getItem("userRole") === "admin" ? "" : "d-none"}`}>
                <div className="carousel-controls__edit">
                    <i className="fa-solid fa-pen-to-square shadow-lg" onClick={(e) => {
                        e.stopPropagation()
                        props.editCarouselOnClickHandle(props.carouselID)
                    }} ></i>
                </div>
                <div className="carousel-controls__remove">
                    <i className="fa-solid fa-trash shadow-lg" onClick={(e) => {
                        e.stopPropagation()
                        props.deleteCarouselOnClickHandle(props.carouselID)
                    }}></i>
                </div>
            </div>
            <img src={props.img} alt="" />
            <p>{props.offer}</p>
        </div>
    )
}

export default CarouselItem