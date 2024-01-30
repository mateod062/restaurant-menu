import {useState} from "react";
import "./Border.css"
import {LuCakeSlice, LuSoup} from "react-icons/lu";
import {Row} from "react-bootstrap";
import {TbMeat} from "react-icons/tb";
import {GiHotMeal, GiMeal} from "react-icons/gi";

const Meal = ({mealName, mealCategory}) => {
    const [name, setName] = useState(mealName);
    const [category, setCategory] = useState(mealCategory);

    const icon = () => {
        switch (mealCategory) {
            case "Soup": return <LuSoup/>
            case "Main meal": return <GiHotMeal/>
            case "Side dish": return <GiMeal/>
            case "Dessert": return <LuCakeSlice/>
            default:
        }
    }

    return (
        <div className={"container border-bottom border-primary-subtle bottom p-1"}>
            <div className={"d-flex flex-row justify-content-between pe-4"}>
                {name}
                {icon()}
            </div>
        </div>
    );
}

export default Meal;