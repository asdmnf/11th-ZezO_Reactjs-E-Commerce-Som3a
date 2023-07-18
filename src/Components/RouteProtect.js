import { Outlet } from "react-router-dom"
import NotAuthorizedPage from "../pages/NotAuthorizedPage/NotAuthorizedPage"


const RouteProtect = (props) => {

  if (props.isAllowed === "yes"){
    return <Outlet></Outlet> 
  } else if (props.isAllowed === "no"){
    return <NotAuthorizedPage></NotAuthorizedPage>
  }

}

export default RouteProtect