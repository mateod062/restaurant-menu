import "../../component/common/content/Content"
import Content from "../../component/common/content/Content";
import "./DailyMenu.css";
import SubDailyMenu from "../../component/common/meal/SubDailyMenu";
import useAuth from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import axios from "../../api/axios";

const DailyMenu = () => {

    const {auth} = useAuth();
    const [dailyMenu, setDailyMenu] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getDailyMenu = async () => {
            try {
                const response = await axios.get('/daily-menus', {
                    signal: controller.signal
                })
                console.log(response?.data)
                isMounted && setDailyMenu(response?.data)
            } catch (e) {
                console.error(e)
            }
        }

        getDailyMenu()

        return () => {
            isMounted = false
            controller.abort()
        }
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
                    <SubDailyMenu title={"Lunch"} menus={lunch}/>
                    <SubDailyMenu title={"Dinner"} menus={dinner}/>
                </div>
            </div>

        </Content>
    )
};

export default DailyMenu;
