const MealCategory = ({category, meals}) => {
    return (
        <tbody>
            <tr className={"border-bottom bottom text-white fs-4"}>
                <th scope={"col"} colSpan={"2"}>{category}</th>
            </tr>
            {meals.map((meal, index) =>
                <tr key={index} className={"fs-5"}>
                    <td>{meal[0]}</td>
                    <td>{meal[1]}</td>
                </tr>
            )}
        </tbody>
    )
}

export default MealCategory