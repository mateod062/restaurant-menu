import Content from "../../component/common/content/Content";
import {useContext, useEffect, useRef, useState} from "react";
import axios from "../../api/axios";
import {useLocation, useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";
import SpinnerModal from "../../component/common/loading/SpinnerModal";
import {Button, Card, Form, FormControl, FormGroup, FormLabel, InputGroup} from "react-bootstrap";
import ErrorModal from "../../component/common/error/ErrorModal";

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
                <Card bg={"secondary"} className={"w-50 mx-5 my-5"}>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup className={"mb-3"} controlId={"email"}>
                                <FormLabel>
                                    Email address
                                </FormLabel>
                                <FormControl
                                    type={"email"}
                                    placeholder={"Enter email"}
                                    onChange={handleEmailChange}
                                    ref={emailRef}
                                    required
                                />
                            </FormGroup>
                            <FormGroup className={"mb-3"} controlId={"password"}>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <InputGroup>
                                    <FormControl
                                        type={passwordVisible ? "text" : "password"}
                                        placeholder={"Enter password"}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <Button variant={"primary"} onClick={() => setPasswordVisible(!passwordVisible)}>
                                        {passwordVisible
                                            ? <i className={"bi bi-eye"}/>
                                            : <i className={"bi bi-eye-slash"}/>}

                                    </Button>
                                </InputGroup>
                            </FormGroup>
                            <Button variant={"primary"} type={"submit"}>
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