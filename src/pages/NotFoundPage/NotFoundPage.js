import som3a from "../../Assets/images/Logo-png.png"

const NotFoundPage = () => {
  return (
    <div className="not-authorized-page d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src={som3a} className="" alt="" />
        <h1 className="text-success mt-3">Not Found</h1>
      </div>
    </div>
  )
}

export default NotFoundPage