import Content from "../../component/common/content/Content";
import {useContext, useEffect, useRef, useState} from "react";
import axios from "../../api/axios";
import {useLocation, useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";

const Login = () => {

    const {setAuth} = useAuth()

    const emailRef = useRef()
    const errorRef = useRef()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrorMessage("")
    }, [email, password])

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(email, password)

        if (email === "" || password === "") {
            setErrorMessage("Email and password are required")
        }

        try {
            const response = await axios.post(
                '/auth/login',
                JSON.stringify({
                    email: email, password: password
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,
                }
            )

            console.log(JSON.stringify(response?.data))

            const accessToken = response?.data?.access_token
            const userName = response?.data?.name
            const isAdmin = response?.data?.is_admin

            setAuth({
                userName,
                email,
                password,
                isAdmin,
                accessToken
            })
            setEmail('')
            setPassword('')

            navigate(from, {replace: true})
        } catch (e) {
            if (!e?.originalStatus) {
                setErrorMessage("No server response")
            }
            else if (e.originalStatus === 401) {
                setErrorMessage("Incorrect email or password")
            }
            else {
                setErrorMessage("Login Failed")
            }
        }
    };

    return (
        <Content subtitle={"Login"}>
            <form onSubmit={handleSubmit}>
                <div className={"w-50 d-flex flex-column justify-content-start mx-5 mt-5"}>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            onChange={handleEmailChange}
                            ref={emailRef}
                            id={"inputEmail"}
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="inputPassowrd">Password</label>
                        <div className={"form-group row"}>
                            <div className={"col"}>
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    className="form-control"
                                    onChange={handlePasswordChange}
                                    id="inputPassword"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div className={"col-auto"}>
                                <button
                                    type={"button"}
                                    className={"btn btn-primary ml-5"}
                                    onClick={() => setPasswordVisible(!passwordVisible)}>
                                    {passwordVisible
                                        ? <i className={"bi bi-eye"}/>
                                        : <i className={"bi bi-eye-slash"}/>}
                                </button>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Login</button>
                    <div className={errorMessage ? "text-danger" : "d-none"}>
                        <p ref={errorRef} aria-live={"assertive"}>
                            {errorMessage}
                        </p>
                    </div>
                </div>
            </form>
        </Content>
    )
};

export default Login;