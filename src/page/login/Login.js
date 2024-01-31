import Content from "../../component/common/content/Content";
import {useContext, useEffect, useRef, useState} from "react";
import axios from "../../api/axios";
import {useLocation, useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";
import SpinnerModal from "../../component/common/loading/SpinnerModal";
import {Button, Card, Form, FormControl, FormGroup, FormLabel, InputGroup} from "react-bootstrap";
import ErrorModal from "../../component/common/error/ErrorModal";
import "./Login.css"

const Login = () => {

    const {setAuth} = useAuth()

    const emailRef = useRef()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)

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
            setLoading(true)
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
            const firstName = response?.data?.name
            const lastName = response?.data?.last_name
            const isAdmin = response?.data?.is_admin

            setAuth({
                firstName,
                lastName,
                email,
                password,
                isAdmin,
                accessToken
            })
            setEmail('')
            setPassword('')

            sessionStorage.setItem('auth', JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                isAdmin,
                accessToken
            }));

            navigate(from, {replace: true})
        } catch (e) {
            if (!e?.response?.status) {
                setErrorMessage("No server response")
            }
            else if (e?.response?.status === 401) {
                setErrorMessage("Incorrect email or password")
            }
            else {
                setErrorMessage("Login Failed")
            }
            setShowErrorModal(true)
        }

        setLoading(false)
    };

    return (
        <>
            <Content subtitle={"Login"}>
                <Card className={"container pb-3 w-50 bg-white bg-opacity-10"}>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup className={"mb-3"} controlId={"email"}>
                                <FormLabel className={"fs-3 boja"}>
                                    Email address
                                </FormLabel>
                                <FormControl
                                    type={"email"}
                                    className={"form-control boja2 border border-2"}
                                    placeholder={"Enter email"}
                                    onChange={handleEmailChange}
                                    ref={emailRef}
                                    required
                                />
                            </FormGroup>
                            <FormGroup className={"mb-3"} controlId={"password"}>
                                <FormLabel className={"fs-3 boja"}>
                                    Password
                                </FormLabel>
                                <InputGroup>
                                    <FormControl
                                        type={passwordVisible ? "text" : "password"}
                                        className={"form-control boja2 border border-2"}
                                        placeholder={"Enter password"}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <Button variant={"primary"} className={"botun border-2 ml-5"} onClick={() => setPasswordVisible(!passwordVisible)}>
                                        {passwordVisible
                                            ? <i className={"bi bi-eye boja3"}/>
                                            : <i className={"bi bi-eye-slash boja3"}/>}

                                    </Button>
                                </InputGroup>
                            </FormGroup>
                            <Button variant={"primary"} className={"botun border-2 text-black fw-bolder fs-4 mt-3 py-0 w-100"} type={"submit"}>
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Content>

            <SpinnerModal show={loading} />

            <ErrorModal show={showErrorModal} onHide={() => setShowErrorModal(false)} message={errorMessage} />
        </>
    )
};

export default Login;