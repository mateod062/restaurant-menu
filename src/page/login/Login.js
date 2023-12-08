import Content from "../../component/common/content/Content";
import {useState} from "react";

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
            <form onSubmit={handleSubmit}>
                <div className={"w-50 d-flex flex-column justify-content-start mx-5 mt-5"}>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" className="form-control" onChange={handleEmailChange} id={"inputEmail"} aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="inputPassowrd">Password</label>
                        <div className={"form-group row"}>
                            <div className={"col"}>
                                <input type={passwordVisible ? "text" : "password"} className="form-control" onChange={handlePasswordChange} id="inputPassword" placeholder="Password" />
                            </div>
                            <div className={"col-auto"}>
                                <button type={"button"} className={"btn btn-primary ml-5"} onClick={() => setPasswordVisible(!passwordVisible)}>
                                    {passwordVisible ? <i className={"bi bi-eye"}/> : <i className={"bi bi-eye-slash"}/>}
                                </button>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Login</button>
                </div>
            </form>
        </Content>
    )
};

export default Login;