import Content from "../../component/common/content/Content";
import {useState} from "react";
import "./Login.css"

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <Content subtitle={"Login"}>
            <form onSubmit={handleSubmit} className={"d-flex justify-content-center"}>
                <div className={"w-50 d-flex flex-column mx-5 mt-5"}>
                    <div className="form-group">
                        <label htmlFor="inputEmail" className={"fs-3 boja"}>Email address</label>
                        <input type="email" className="form-control boja2 border border-2" onChange={handleEmailChange} id={"inputEmail"} aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="inputPassowrd" className={"fs-3 boja"}>Password</label>
                        <div className={"form-group row"}>
                            <div className={"col"}>
                                <input type={passwordVisible ? "text" : "password"} className="form-control boja2 border border-2" onChange={handlePasswordChange} id="inputPassword" placeholder="Password" />
                            </div>
                            <div className={"col-auto"}>
                                <button type={"button"} className={"btn btn-primary botun border-2 ml-5"} onClick={() => setPasswordVisible(!passwordVisible)}>
                                    {passwordVisible ? <i className={"bi bi-eye boja3"}/> : <i className={"bi bi-eye-slash boja3"}/>}
                                </button>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary botun border-2 text-black fw-bolder fs-4 mt-3 py-0">Login</button>
                </div>
            </form>
        </Content>
    )
};

export default Login;