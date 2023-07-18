import './UserAddressCard.css'

const UserAddressCard = (props) => {
  return (
    <div className={`address-card my-3 shadow ${props.bgColor}`}>
      <div className="address-card__header d-flex justify-content-between align-items-center mb-3">
        <div className="address-card__header-title ">
          <h6>{props.addressAlias}</h6>
        </div>
        <div className='d-flex align-items-center'>
          <div className="address-card__header-edit-icon">
          <i className={`fa-solid fa-pen-to-square ${props.controlIconsDisplay}`} onClick={() => props.editAddressOnClickHandle(props.addressID)}></i>
          </div>
          <div className="address-card__header-remove-icon">
          <i className={`fa-solid fa-trash ${props.controlIconsDisplay}`} onClick={() => props.removeAddressOnClickHandle(props.addressID)}></i>
          </div>
        </div>
      </div>
      <div className="address-card__body">
        <div className="address-card__address mb-2">
        {props.addressDetails}
        </div>
        <div className="address-card__phone">
          الموبايل: <span>{props.addressPhone}</span>
        </div>
      </div>
    </div>
  )
}

export default UserAddressCard