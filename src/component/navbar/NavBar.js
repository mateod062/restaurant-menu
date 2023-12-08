import {Link, Outlet} from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {
  return (
      <>
        <nav className={"navigation"}>
          <Link to={"/"} className={"title"}>Menu</Link>
          <div className={"navigation-menu"}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/meals">Meals</Link>
              </li>
              <li>
                <Link to="/info">Info</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Outlet />
      </>
  )
};

export default NavBar;