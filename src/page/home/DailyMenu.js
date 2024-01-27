import "../../component/common/content/Content"
import Content from "../../component/common/content/Content";
import "./DailyMenu.css";
import SubDailyMenu from "../../component/common/meal/SubDailyMenu";
import useAuth from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import axios from "../../api/axios";
import meals from "../meals/Meals";

const DailyMenu = () => {

    const {auth} = useAuth();
    const [meals, setMeals] = useState([])
    const [dailyMenu, setDailyMenu] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchItems = async () => {
            setLoading(true)
            try {
                const getMenusResponse = await axios.get('/daily-menus')
                const getMealsResponse = await axios.get('/meals')
                console.log(getMenusResponse?.data)
                console.log(getMealsResponse?.data)
                setMeals(getMealsResponse?.data)
                setDailyMenu(getMenusResponse?.data)
            }
            catch (error) {
                console.log(error)
            }
            setLoading(false)
        }

        fetchItems()

    }, [])

    useEffect(() => {
        if (dailyMenu?.length) {
            const lunchMenus = dailyMenu.reduce((acc, curr) => {
                if (curr.title === "Lunch") acc.push(...curr.menus);
                return acc;
            }, []);

            const dinnerMenus = dailyMenu.reduce((acc, curr) => {
                if (curr.title === "Dinner") acc.push(...curr.menus);
                return acc;
            }, []);

            setLunch(lunchMenus);
            setDinner(dinnerMenus);
        }
    }, [dailyMenu])

    return (
        <Content subtitle={"Menu"}>
            <div className={"d-flex flex-column gap-3 mx-5"}>
                <div className={"d-flex flex-column mx-5"}>
                    <SubDailyMenu title={"Lunch"} menus={lunch} meals={meals} setDailyMenu={setDailyMenu} loading={loading}/>
                    {console.log(lunch)}
                    <SubDailyMenu title={"Dinner"} menus={dinner} meals={meals} setDailyMenu={setDailyMenu} loading={loading}/>
                </div>
            </div>

        </Content>
    )
};

export default DailyMenu;
