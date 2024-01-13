import {Link, Outlet} from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {
  return (
      <>
        <nav className={"navbar bg-black"}>
          <Link to={"/"} className={"fs-1 ps-4 pb-3 text-decoration-none title col"}>Restaurant Mini</Link>
          <ul className={"navigation-menu list-group list-group-horizontal"}>
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
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        <Outlet/>
      </>
  )
};

export default NavBar;

/*import {Link, Outlet} from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {
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
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Outlet />
      </>
  )
};

export default NavBar;*/