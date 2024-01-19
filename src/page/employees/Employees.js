import Content from "../../component/common/content/Content";
import "./Employees.css"
import {useEffect, useState} from "react";
import axios from "../../api/axios";

export default function Employees() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getEmployees = async () => {
            try {
                const response = await axios.get('/users', {
                    signal: controller.signal
                })
                console.log(response.data)
                isMounted && setUsers(response.data)
            } catch (e) {
                console.error(e)
            }
        }

        getEmployees()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])


    return (
        <Content subtitle={"Employees"}>
            <div className={"container rounded-3 border border-5 border-darkblue bg-secondary-subtle w-50 mx-auto my-5"}>
                <table className={"table"}>
                    <thead>
                    <tr className={"table-secondary"}>
                        <th scope={"col"}>First name</th>
                        <th scope={"col"}>Last name</th>
                        <th scope={"col"}>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users?.length
                        ? users.map((employee, index) => {
                            return (
                                <tr key={index} className={"table-secondary"}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.is_admin ? 'Admin' : 'Employee'}</td>
                                </tr>
                            )
                            })
                        :
                            <tr className={"table-secondary"}>
                            <td colSpan={3} align={"center"}>No employees</td>
                            </tr>
                    }
                </tbody>
                </table>
            </div>
        </Content>
    )
}