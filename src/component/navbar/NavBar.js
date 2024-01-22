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

  useEffect(() => {
    console.log(auth?.username)
  }, []);

  return (
      <>
        <nav className={"navbar navbar-expand-lg fixed-top bg-primary"}>
          <div className={"container-fluid"}>
            <Link to={"/"} className={"navbar-brand text-white fw-bold"}>Restaurant Mini</Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={"nav-link"} to="/">Menu</Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link"} to="/meals">Meals</Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link"} to="/employees">Employees</Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link"} to="/info">Info</Link>
              </li>
              <li className="nav-item">
                {auth?.accessToken
                    ? <Link className={"nav-link"} to={"/"} onClick={handleLogout}>Logout</Link>
                    : <Link className={"nav-link"} to="/login">Login</Link>
                }
              </li>
            </ul>

          </div>
        </nav>

        <Outlet/>
      </>

      /*<>
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
              <li>
                <div className={auth?.accessToken ? "d-flex flex-row gap-2 mt-2" : "invisible"}>
                  <i className={"bi bi-person-fill"}></i>
                  {auth?.userName}
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <Outlet/>
      </>*/
  )
};

export default NavBar;