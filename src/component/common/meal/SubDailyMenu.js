import Menu from "./Menu";
import Meal from "./Meal";

const SubDailyMenu = ({title, menus}) => {
    return (
        <div className={"container shadow rounded border border-5 border-darkblue w-50 mx-2 my-5"}>
            <div className={"col"}>
                <div className={"row bg-darkblue"}>
                    <h2 className={"text-white"}>{title}</h2>
                </div>
                {menus.map((menu, i) => (
                    <div key={i} className={i === menus.length - 1
                        ? "row bg-secondary-subtle ps-2 pe-2 pb-2"
                        : "row bg-secondary-subtle ps-2 pe-2"}>
                        <Menu name={menu.title} bottomLine={i !== menus.length - 1}>
                            <Meal mealName={menu.soup} mealCategory={"Soup"} />
                            <Meal mealName={menu.main_meal} mealCategory={"Main meal"} />
                            <Meal mealName={menu.side_dish} mealCategory={"Side dish"} />
                            <Meal mealName={menu.dessert} mealCategory={"Dessert"} />
                        </Menu>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SubDailyMenu