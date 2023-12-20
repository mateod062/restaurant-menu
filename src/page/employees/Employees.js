import Content from "../../component/common/content/Content";
import "./Employees.css"

export default function Employees() {

    const employees = [
        ["Ivan", "Ivić", "Cook"],
        ["Marko", "Marić", "Cashier"],
        ["Ana", "Anić", "Cook"],
        ["Ivana", "Ivić", "Cashier"],
        ["Mate", "Matić", "Cook"],
        ["Maja", "Majić", "Cashier"],
        ["Ivo", "Ivić", "Cook"],
        ["Mia", "Mijić", "Cashier"],
        ["Iva", "Ivić", "Cook"],
        ["Luka", "Lukić", "Cashier"],
        ["Petar", "Petrović", "Cook"],
        ["Lana", "Lanić", "Cashier"],
        ["Josip", "Josipović", "Cook"],
        ["Lara", "Larić", "Cashier"],
    ]; /*Hardcoded employees*/

    return (
        <Content subtitle={"Employees"}>
            <div className={"container rounded-3 border border-5 border-darkblue bg-secondary-subtle w-50 ms-5 my-5"}>
                <table className={"table"}>
                    <thead>
                    <tr className={"table-secondary"}>
                        <th scope={"col"}>First name</th>
                        <th scope={"col"}>Last name</th>
                        <th scope={"col"}>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((employee, index) => {
                        return (
                            <tr key={index} className={"table-secondary"}>
                                <td>{employee[0]}</td>
                                <td>{employee[1]}</td>
                                <td>{employee[2]}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Content>
    )
}