import { Link } from 'react-router-dom'
import './HeaderButton.css'

const HeaderButton = (props) => {
    return (
        <Link to={props.ToLink} onClick={props.onClick} className={`header-button ${props.BtnDisplay}`}>
                    <div className='d-flex justify-content-center align-items-center '>
                    {props.children}
                    </div>
                </Link>
    )
}

export default HeaderButton



