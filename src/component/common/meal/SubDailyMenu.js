import Menu from "./Menu";
import Meal from "./Meal";
import "./SubDailyMenu.css"

const SubDailyMenu = ({title, menus, meals}) => {
    return (
        <div className={"container border rounded border-3 w-50 mx-2 my-4"}>
            <div className={"col"}>
                <div className={"row background"}>
                    <h2 className={"text-black"}>{title}</h2>
                </div>
                {menus.map((menuName, i) => (
                    <div className={menuName === "Vege menu"
                        ? "row bg-black ps-2 pe-2 pb-2 text-white"
                        : "row bg-black ps-2 pe-2 text-white"}>
                        <Menu name={menuName}>
                            {meals[i].map(meal => (
                                <Meal mealName={meal.mealName} mealCategory={meal.mealCategory} />
                            ))}
                        </Menu>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SubDailyMenu