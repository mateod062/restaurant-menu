import {useState} from "react";
import "./Border.css"

const Meal = ({mealName, mealCategory}) => {
    const [name, setName] = useState(mealName);
    const [category, setCategory] = useState(mealCategory);

    return (
        <div className={"container border-bottom border-primary-subtle bottom p-1"}>
            {name}
        </div>
    );
}

export default Meal;