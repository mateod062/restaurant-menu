import Content from "../../component/common/content/Content";
import MealCategory from "../../component/common/meals/MealCategory";
import {useEffect, useState} from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const Meals = () => {
    const pizza = [["miješana", "2"], ["margarita", "1,75"], ["miješana bez gljiva", "1,85"]]
    const juhe = [
        ["proljetna", "1,5"],
        ["bistra", "1,6"],
        ["od gljiva", "1,7"],
        ["od brokule", "1,7"],
        ["od šparoga", "1,7"],
        ["od rajčice", "1,7"]]

    const {auth} = useAuth()

    const [meals, setMeals] = useState([])
    const [soups, setSoups] = useState([])
    const [pizzas, setPizzas] = useState([])

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        const getMeals = async () => {
            try {
                const response = await axios.get('/meals', {
                    signal: controller.signal
                })
                console.log(response.data)
                isMounted && setMeals(response.data)
            } catch (e) {
                console.error(e)
            }
        }

        getMeals()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    useEffect(() => {
        if (meals?.length) {
            setPizzas(meals.filter(meal => meal.category === "pizza"))
            setSoups(meals.filter(meal => meal.category === "soup"))
        }
    }, [meals])

    return (
        <Content subtitle={"Meals"}>
            <div
                className={"container rounded-3 border border-5 border-darkblue bg-secondary-subtle w-50 mx-auto my-5"}>
                <table className={"table"}>
                    <tbody>
                    <tr className={"table-secondary border"}>
                        <th scope={"col"}>Naziv jela</th>
                        <th scope={"col"}>
                            <div className={"d-flex flex-row gap-5"}>
                                Cijena jela
                                <button type={"button"}
                                        className={auth?.accessToken ? "btn btn-primary ms-auto" : "invisible"}>
                                    <i className={"bi bi-plus-square"}></i>
                                    <span className={"ms-2"}>Add meal</span>
                                </button>
                            </div>
                        </th>
                    </tr>
                    </tbody>
                    <MealCategory category={"Pizza"} meals={pizzas}/>
                    <MealCategory category={"Juhe"} meals={soups}/>
                </table>
            </div>
        </Content>
)
};

export default Meals;