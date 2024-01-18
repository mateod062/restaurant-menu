import Content from "../../component/common/content/Content";
import MealCategory from "../../component/common/meals/MealCategory";
import "../../component/common/meal/Border.css"
import "./Meals.css"

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
            <div className={"container rounded border border-3 bg-black w-50 mx-auto pt-3 my-4 fs-3"}>
                <table className={"table table-dark"}>
                    <tbody>
                    <tr className={"border-bottom bottom"}>
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