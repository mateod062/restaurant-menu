import useAuth from "../../hooks/useAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const RequireAuth = ({ adminRequired }) => {
  const {auth} = useAuth()
  const location = useLocation()

  return (
      adminRequired
          ? auth?.isAdmin
              ? <Outlet />
              : <Navigate to={"/"} state={{from: location}} replace />
          : auth?.userName
              ? <Outlet />
              : <Navigate to={"/login"} state={{from: location}} replace />
  )
}

export default RequireAuth