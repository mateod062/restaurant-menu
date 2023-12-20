import Menu from "./Menu";
import Meal from "./Meal";

const SubDailyMenu = ({title, menus, meals}) => {
    return (
        <div className={"container shadow rounded border border-5 border-darkblue w-50 mx-2 my-5"}>
            <div className={"col"}>
                <div className={"row bg-darkblue"}>
                    <h2 className={"text-white"}>{title}</h2>
                </div>
                {menus.map((menuName, i) => (
                    <div className={menuName === "Vege menu"
                        ? "row bg-secondary-subtle ps-2 pe-2 pb-2"
                        : "row bg-secondary-subtle ps-2 pe-2"}>
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