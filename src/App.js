import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import DailyMenu from "./page/home/DailyMenu";
import Info from "./page/info/Info";
import Login from "./page/login/Login";
import Meals from "./page/meals/Meals";
import NoPage from "./page/nopage/NoPage";
import NavBar from "./component/navbar/NavBar";
import Employees from "./page/employees/Employees";

function App() {
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<DailyMenu />} />
            <Route path="info" element={<Info />} />
            <Route path="login" element={<Login />} />
            <Route path="meals" element={<Meals />} />
            <Route path={"employees"} element={<Employees />} />
            <Route path={"*"} element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
