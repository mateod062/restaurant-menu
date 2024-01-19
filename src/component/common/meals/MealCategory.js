import useAuth from "../../../hooks/useAuth";

const MealCategory = ({category, meals}) => {
    const {auth} = useAuth()

    return (
        <tbody>
            <tr className={"table-secondary"}>
                <th scope={"col"} colSpan={"2"}>{category}</th>
            </tr>
            {meals.map((meal, index) =>
                <tr key={index} className={"table-secondary border"}>
                    <td>{meal.name}</td>
                    <td>
                        <div className={"d-flex flex-row gap-3"}>
                            {meal.price}€
                            <button type={"button"}
                                    className={auth?.accessToken ? "btn btn-primary" : "invisible"}>
                                <i className={"bi bi-pencil-square"}></i>
                            </button>
                            <button type={"button"}
                                    className={auth?.accessToken ? "btn btn-danger" : "invisible"}>
                                <i className={"bi bi-trash3-fill"}></i>
                            </button>
                        </div>
                    </td>
                </tr>
            )}
        </tbody>
    )
}

export default MealCategory