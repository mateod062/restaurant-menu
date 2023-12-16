import {useState} from "react";

const Meal = ({mealName, mealCategory}) => {
    const [name, setName] = useState(mealName);
    const [category, setCategory] = useState(mealCategory);

    return (
        <div className={"container border-bottom border-primary-subtle p-1"}>
            {name}
        </div>
    );
}

export default Meal;