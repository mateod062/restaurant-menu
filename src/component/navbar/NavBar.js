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
        <nav className={"navbar navbar-expand-lg fixed-top bg-primary"}>
          <div className={"container-fluid"}>
            <div className={"d-flex flex-row gap-2 ms-3"}>
              <FaUtensils className={"navbar-nav text-white my-auto"} />
              <Link to={"/"} className={"navbar-brand text-white fw-bold"}>Restaurant Mini kod tete Ivke</Link>
            </div>
            <ul className="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
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
                    ? <button className={"nav-link"} onClick={handleLogout}>Logout</button>
                    : <Link className={"nav-link"} to="/login">Login</Link>
                }
              </li>
              <li className={"nav-item"}>
                {auth?.accessToken
                    ? <div className={"d-flex flex-row gap-1 mt-2 ms-3"}>
                      <i className={"bi bi-person-fill"}></i>
                      <span className={""}>{auth?.firstName}</span>
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