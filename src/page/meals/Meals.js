import Content from "../../component/common/content/Content";
import MealCategory from "../../component/common/meals/MealCategory";

const Meals = () => {
    const pizza = [["miješana", "2"], ["margarita", "1,75"], ["miješana bez gljiva", "1,85"]]
    const juhe = [
        ["proljetna", "1,5"],
        ["bistra", "1,6"],
        ["od gljiva", "1,7"],
        ["od brokule", "1,7"],
        ["od šparoga", "1,7"],
        ["od rajčice", "1,7"]]

    return (
        <Content subtitle={"Meals"}>
            <div className={"container rounded-3 border border-5 border-darkblue bg-secondary-subtle w-50 mx-auto my-5"}>
                <table className={"table"}>
                    <tbody>
                    <tr className={"table-secondary border"}>
                        <th scope={"col"}>Naziv jela</th>
                        <th scope={"col"}>Cijena jela</th>
                    </tr>
                    </tbody>
                    <MealCategory category={"Pizza"} meals={pizza}/>
                    <MealCategory category={"Juhe"} meals={juhe}/>
                </table>
            </div>
        </Content>
)
};

export default Meals;