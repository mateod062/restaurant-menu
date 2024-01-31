import {Link, Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import "./NavBar.css"
import {useContext, useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import {FaUtensils} from "react-icons/fa";
import useAxiosPrivate from "../../api/axiosPrivate";
import SpinnerModal from "../common/loading/SpinnerModal";

const NavBar = () => {

  const {auth, setAuth} = useAuth()
  const axiosPrivate = useAxiosPrivate()

  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/login"

  const [loading, setLoading] = useState(false)

  const handleLogout = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      await axiosPrivate.post('auth/refresh', {}, {
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`
        }
      });
    } catch (refreshError) {
      console.error('Failed to refresh auth:', refreshError);
      sessionStorage.removeItem('auth');
    }

    setAuth({});
    navigate(from, {replace: true})
    setLoading(false)
  }

  useEffect(() => {
    console.log(auth?.username)
  }, []);

  return (
      <>
        <nav className={"navbar navbar-expand-lg fixed-top bg-black"}>
          <div className={"container-fluid"}>
            <div className={"d-flex flex-row gap-2 ms-3"}>
              <FaUtensils className={"navbar-nav text my-auto fs-2"} />
              <Link to={"/"} className={"navbar-brand text fw-bold fs-2"}>Restaurant Mini</Link>
            </div>
            <ul className="navbar-nav fs-3">
              <li className="nav-item">
                <Link className={"nav-link text"} to="/">Menu</Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link text"} to="/meals">Meals</Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link text"} to="/employees">Employees</Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link text"} to="/info">Info</Link>
              </li>
              <li className="nav-item">
                {auth?.accessToken
                    ? <button className={"nav-link text"} onClick={handleLogout}>Logout</button>
                    : <Link className={"nav-link text"} to="/login">Login</Link>
                }
              </li>
              <li className={"nav-item"}>
                {auth?.accessToken
                    ? <div className={"d-flex flex-row gap-1 mt-2 ms-4"}>
                      <i className={"bi bi-person-fill text"}></i>
                      <span className={"text"}>{auth?.firstName}</span>
                    </div>
                    : null
                }
              </li>
            </ul>
          </div>
        </nav>

        <Outlet/>

        <SpinnerModal show={loading} />
      </>
  )
};

export default NavBar;