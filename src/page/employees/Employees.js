import Content from "../../component/common/content/Content";
import "./Employees.css"
import "../../component/common/meal/Border.css"

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
            <div className={"container rounded-3 border border-3 bg-black w-50 mx-auto pt-3 my-4"}>
                <table className={"table table-dark"}>
                    <thead>
                    <tr className={"border-bottom bottom2 fs-3"}>
                        <th scope={"col"}>First name</th>
                        <th scope={"col"}>Last name</th>
                        <th scope={"col"}>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((employee, index) => {
                        return (
                            <tr key={index} className={"border-bottom bottom fs-5"}>
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