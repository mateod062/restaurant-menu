
const MealCategory = ({category, meals}) => {
    return (
        <tbody>
            <tr className={"table-secondary"}>
                <th scope={"col"} colSpan={"2"}>{category}</th>
            </tr>
            {meals.map((meal, index) =>
                <tr key={index} className={"table-secondary border"}>
                    <td>{meal[0]}</td>
                    <td>{meal[1]}</td>
                </tr>
            )}
        </tbody>
    )
}

export default MealCategory