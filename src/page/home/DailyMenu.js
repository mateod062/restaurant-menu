import "../../component/common/content/Content"
import Content from "../../component/common/content/Content";
import "./DailyMenu.css";
import {useEffect, useState} from "react";
import Config from "../../config/Config"
import async from "async";
import axios from "axios";
import {set} from "react-hook-form";
import Menu from "../../component/common/meal/Menu";
import Meal from "../../component/common/meal/Meal";
const DailyMenu = () => {
    const[menu, setMenu] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(Config.REST_API_URL + "/api/menu");
                setMenu(response);
            }
            catch (e) {
                console.error("Error fetching menu: ", e);
            }
        }
    }, []);


    return (
      <Content subtitle={"Menu"}>
          <div className={"container rounded border border-5 border-darkblue w-50 m-5"}>
              <div className={"col"}>
                  <div className={"row bg-darkblue"}>
                      <h2 className={"text-white"}>Lunch</h2>
                  </div>
                  <div className={"row bg-secondary-subtle ps-2 pe-2"}>
                      <Menu name={"Menu 1"}>
                        <div className={"col"}>
                            <Meal mealName={"Bistra juha"} mealCategory={"Soup"} />
                            <Meal mealName={"Pohano"} mealCategory={"Meat"} />
                            <Meal mealName={"Pomfrit"} mealCategory={"Side"} />
                        </div>
                      </Menu>
                  </div>
                  <div className={"row bg-secondary-subtle ps-2 pe-2"}>
                      <Menu name={"Menu 2"}>
                          <Meal mealName={"Juha od brokule"} mealCategory={"Soup"} />
                          <Meal mealName={"Pljeskavice"} mealCategory={"Meat"} />
                          <Meal mealName={"Pomfrit"} mealCategory={"Side"} />
                      </Menu>
                  </div>
                  <div className={"row bg-secondary-subtle ps-2 pe-2 pb-2"}>
                      <Menu name={"Vege menu"}>
                          <Meal mealName={"Proljetna juha"} mealCategory={"Soup"} />
                          <Meal mealName={"Medaljoni od soje"} mealCategory={"Vegetarian"} />
                          <Meal mealName={"Pomfrit"} mealCategory={"Side"} />
                      </Menu>
                  </div>
              </div>
          </div>
      </Content>
    )
};

export default DailyMenu;