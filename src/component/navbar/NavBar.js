import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import "./NavBar.css"
import {useContext, useEffect} from "react";
import AuthContext from "../../context/AuthProvider";
import axios, {axiosPrivate} from "../../api/axios";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const NavBar = () => {

  const {auth, setAuth} = useAuth()
  const refresh = useRefreshToken()
  const axiosPrivate = useAxiosPrivate()

  const location = useLocation()

  const navigate = useNavigate()

  const handleLogout = async (event) => {
    try {
      const response = await axiosPrivate.post('auth/logout')
      setAuth({})
    }
    catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault()

      refresh()
      console.log(JSON.stringify(auth))
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [auth.accessToken])

  return (
      <>
        <nav className={"navigation"}>
          <Link to={"/"} className={"title"}>Restaurant Mini</Link>
          <div className={"navigation-menu"}>
            <ul>
              <li>
                <Link to="/">Menu</Link>
              </li>
              <li>
                <Link to="/meals">Meals</Link>
              </li>
              <li>
                <Link to="/employees">Employees</Link>
              </li>
              <li>
                <Link to="/info">Info</Link>
              </li>
              <li>
                {auth?.accessToken
                    ? <Link to={"/"} onClick={handleLogout}>Logout</Link>
                    : <Link to="/login">Login</Link>
                }
              </li>
            </ul>
          </div>
        </nav>

        <Outlet />
      </>
  )
};

export default NavBar;