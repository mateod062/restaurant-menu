import Content from "../../component/common/content/Content";
import "./Employees.css"
import "../../component/common/meal/Border.css"
import {useEffect, useRef, useState} from "react";
import axios from "../../api/axios";
import {
    Alert,
    Button,
    FloatingLabel,
    Form,
    FormGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Placeholder, Spinner
} from "react-bootstrap";
import {HiUserAdd, HiUserRemove} from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../api/axiosPrivate";
import ErrorModal from "../../component/common/error/ErrorModal";
import "../../component/common/meal/Botun.css"

export default function Employees() {

    const {auth} = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const addEmployeeFormRef = useRef()

    const [employees, setEmployees] = useState([])
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false)
    const [addEmployeeFormValidated, setAddEmployeeFormValidated] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleAddEmployee = async (event) => {
        event.preventDefault()

        const formData = new FormData(addEmployeeFormRef.current)
        const data = Object.fromEntries(formData.entries())

        const newEmployee = {
            name: data['firstName'],
            last_name: data['lastName'],
            email: data['email'],
            password: data['password'],
            password_confirmation: data['confirmPassword'],
            is_admin: data['isAdmin'] === "on"
        }
        console.log(JSON.stringify(newEmployee))

        if (
            !data['firstName']
            || !data['lastName']
            || !data['email'].match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
            || !data['password']
            || !(data['password'] === data['confirmPassword'])
        ) {
            setAddEmployeeFormValidated(true)
            return
        }

        setLoading(true)
        try {
            const responsePostUser = await axiosPrivate.post('/auth/register', newEmployee)
            console.log(responsePostUser?.data)
            const employeeToAdd = {
                id: responsePostUser?.data?.user?.id,
                name: responsePostUser?.data?.user?.name,
                last_name: responsePostUser?.data?.user?.last_name,
                email: responsePostUser?.data?.user?.email,
                is_admin: responsePostUser?.data?.user?.is_admin,
            }

            setEmployees(prevEmployees => {
                return [...prevEmployees, employeeToAdd]
            })
            setAddEmployeeFormValidated(false)
        }
        catch (error) {
            if (error?.response?.status === 403) {
                setErrorMessage("Email address already used")
            }
            else if (error?.response?.status === 401) {
                setErrorMessage("Unauthorized")
            }
            else {
                setErrorMessage("Employee registration failed")
            }
            console.log(error)
            setShowErrorModal(true)
        }
        setLoading(false)

        setShowAddEmployeeModal(false)
    }

    const handleRemoveEmployee = async (employee) => {
        if (auth?.email === employee.email) {
            setErrorMessage("You cannot delete yourself")
            setShowErrorModal(true)
            return
        }

        setLoading(true)
        try {
            const responseDeleteUser = await axiosPrivate.delete(`/users/${employee.id}`)
            console.log(responseDeleteUser?.data)

            setEmployees(prevEmployees => {
                const newEmployees = [...prevEmployees]
                const index = newEmployees.findIndex(e => e.id === employee.id)
                newEmployees.splice(index, 1)
                return newEmployees
            })

            setLoading(false)
        }
        catch (error) {
            setLoading(false)
            if (error?.response?.status === 403) {
                setErrorMessage("You cannot delete yourself")
            }
            else if (error?.response?.status === 401) {
                setErrorMessage("Unauthorized")
            }
            else {
                setErrorMessage("Employee deletion failed")
            }
            console.log(error)
            setShowErrorModal(true)
        }
    }

    useEffect(() => {
        const getEmployees = async () => {
            setLoading(true)
            try {
                const response = await axios.get('/users')
                console.log(response.data)
                setEmployees(response.data)
            } catch (e) {
                console.error(e)
            }
            setLoading(false)
        }

        getEmployees()

    }, [])


    return (
        <>
            <Content subtitle={"Employees"}>
                <div className={"container rounded-3 border border-3 bg-black w-50 mx-auto mb-5 pt-3"}>
                    <table className={"table table-dark"}>
                        <thead>
                            <tr className={"border-bottom bottom2 fs-3"}>
                                <th scope={"col"}>First name</th>
                                <th scope={"col"}>Last name</th>
                                <th scope={"col"}>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                        {loading ? (
                            Array.from({length: 5}).map((_, index) => (
                                <tr key={index} className={"border-bottom bottom"}>
                                    <td>
                                        <Placeholder animation="glow">
                                            <Placeholder xs={10} bg={"light"}/>
                                        </Placeholder>
                                    </td>
                                    <td>
                                        <Placeholder animation="glow">
                                            <Placeholder xs={8} bg={"light"}/>
                                        </Placeholder>
                                    </td>
                                    <td>
                                        <Placeholder animation="glow">
                                            <Placeholder xs={5} bg={"light"}/>
                                        </Placeholder>
                                    </td>
                                    {auth?.accessToken && auth?.isAdmin &&
                                        (
                                            <td>
                                                <Placeholder.Button variant={"danger"} xs={8} className={"ms-auto pt-0 px-2"} />
                                            </td>
                                        )
                                    }
                                </tr>
                            ))
                        ) : (
                            employees?.length
                                ? employees.map((employee, index) => {
                                    return (
                                        <tr key={index} className={"border-bottom bottom fs-5"}>
                                            <td className={"fs-5"}>{employee.name}</td>
                                            <td className={"fs-5"}>{employee.last_name}</td>
                                            <td className={"fs-5"}>
                                                <div className={"d-flex flex-row gap-2"}>
                                                    {employee.is_admin ? 'Admin' : 'Employee'}
                                                    {auth?.accessToken && auth?.isAdmin
                                                        ? <Button variant={"danger"} className={"ms-auto pt-0 px-2"} onClick={() => {
                                                            handleRemoveEmployee(employee)
                                                        }}>
                                                            <HiUserRemove className={"text-black fs-5" } />
                                                        </Button>
                                                        : null
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr className={"border-bottom bottom fs-5"}>
                                    <td colSpan={3} align={"center"}>No employees</td>
                                </tr>
                            )
                        }
                        </tbody>
                        {auth?.accessToken && auth?.isAdmin
                            ? <tfoot>
                                <tr className={"table-secondary"}>
                                    <td colSpan={3} align={"left"}>
                                        {loading ? (
                                            <Placeholder.Button className={"background"} xs={3} />
                                        ) : (<Button className={"botun text-black fs-5 fw-bolder mt-3"} onClick={() => {
                                            setShowAddEmployeeModal(true)
                                        }}
                                        >
                                            <HiUserAdd className={"text-black me-1 mb-1"}/>
                                            Add employee
                                        </Button>)
                                        }
                                    </td>
                                </tr>
                              </tfoot>
                            : null
                        }

                    </table>
                </div>
            </Content>

            <ErrorModal show={showErrorModal} onHide={() => setShowErrorModal(false)} message={errorMessage} />

            <Modal className={"d-flex align-items-center w-100"} show={showAddEmployeeModal} onHide={() => setShowAddEmployeeModal(false)} backdrop={"static"}>
                <ModalHeader className={"background text-black fs-4 w-100"} closeButton>
                    <Modal.Title className={"fs-4"}>
                        Register new employee
                    </Modal.Title>
                </ModalHeader>
                <ModalBody className={"boja2 fs-6 border-top-0"}>
                    <Form validated={addEmployeeFormValidated} ref={addEmployeeFormRef} onSubmit={handleAddEmployee}>
                        <FormGroup controlId={"firstName"}>
                            <FloatingLabel label={"First Name"} className={"mb-3"}>
                                <Form.Control
                                    className={"sirina fs-6"}
                                    name={"firstName"}
                                    placeholder={"First Name"}
                                    type={"text"}
                                    required
                                />
                                <Form.Control.Feedback type={"invalid"}>
                                    Please enter a valid name
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </FormGroup>
                        <FormGroup controlId={"lastName"}>
                            <FloatingLabel label={"Last Name"} className={"mb-3"}>
                                <Form.Control
                                    className={"sirina fs-6"}
                                    name={"lastName"}
                                    placeholder={"Last Name"}
                                    type={"text"}
                                    required
                                />
                                <Form.Control.Feedback type={"invalid"}>
                                    Please enter a valid last name
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </FormGroup>
                        <FormGroup controlId={"email"}>
                            <FloatingLabel label={"Email"} className={"mb-3"}>
                                <Form.Control
                                    className={"sirina fs-6"}
                                    name={"email"}
                                    placeholder={"Email"}
                                    type={"email"}
                                    pattern={"[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}"}
                                    required
                                />
                                <Form.Control.Feedback type={"invalid"}>
                                    Please enter a valid email
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </FormGroup>
                        <FormGroup controlId={"password"}>
                            <FloatingLabel label={"Password"} className={"mb-3"}>
                                <Form.Control
                                    className={"sirina fs-6"}
                                    name={"password"}
                                    placeholder={"Password"}
                                    type={"password"}
                                    required
                                />
                                <Form.Control.Feedback type={"invalid"}>
                                    A password is required
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </FormGroup>
                        <FormGroup controlId={"confirmPassword"}>
                            <FloatingLabel label={"Confirm Password"} className={"mb-3"}>
                                <Form.Control
                                    className={"sirina fs-6"}
                                    name={"confirmPassword"}
                                    placeholder={"Password"}
                                    type={"password"}
                                    required
                                />
                                <Form.Control.Feedback type={"invalid"}>
                                    Passwords do not match
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </FormGroup>
                        <FormGroup>
                            <Form.Check
                                type={"checkbox"}
                                label={"Admin"}
                                name={"isAdmin"}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter className={"boja2 border-top-0"}>
                    <Button className={"fs-6 bg-black fw-semibold"} variant={"secondary"} onClick={() => {
                        setAddEmployeeFormValidated(false)
                        setShowAddEmployeeModal(false)
                    }}>
                        Close
                    </Button>
                    <Button className={"fs-6 botun text-black fw-semibold"} variant={"primary"} onClick={handleAddEmployee}>
                        {loading ? (
                            <Spinner animation="border" role="status" size={"sm"}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            "Save"
                        )
                        }
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}