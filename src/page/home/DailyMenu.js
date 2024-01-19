import "../../component/common/content/Content"
import Content from "../../component/common/content/Content";
import "./DailyMenu.css";
import SubDailyMenu from "../../component/common/meal/SubDailyMenu";
import useAuth from "../../hooks/useAuth";

const DailyMenu = () => {

    const {auth} = useAuth();

    /*const[menu, setMenu] = useState(null);

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
    }, []);*/

    const menus = ["Menu 1", "Menu 2", "Vege menu"];
    const meals = [
        [
            {mealName: "Bistra juha", mealCategory: "Soup"},
            {mealName: "Pohano", mealCategory: "Meat"},
            {mealName: "Pomfrit", mealCategory: "Side"}
        ],
        [
            {mealName: "Juha od brokule", mealCategory: "Soup"},
            {mealName: "Pljeskavice", mealCategory: "Meat"},
            {mealName: "Pomfrit", mealCategory: "Side"}
        ],
        [
            {mealName: "Proljetna juha", mealCategory: "Soup"},
            {mealName: "Medaljoni od soje", mealCategory: "Vegetarian"},
            {mealName: "Pomfrit", mealCategory: "Side"}
        ]
    ] /*Hard-coded, to be refactored */

    return (
        <Content subtitle={"Menu"}>
            {/*<div className={"container rounded border border-5 border-darkblue w-50 m-5"}>
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
          </div>*/}
            <div className={"d-flex flex-column gap-3"}>
                <button type={"button"} className={auth?.accessToken ? "btn btn-primary ms-auto me-5" : "invisible"}>
                    <i className={"bi bi-pencil-square"}></i>
                    <span className={"ms-2"}>Edit menu</span>
                </button>
                <div className={"d-flex flex-row mx-5"}>
                <SubDailyMenu title={"Lunch"} menus={menus} meals={meals}/>
                    <SubDailyMenu title={"Dinner"} menus={menus} meals={meals}/>
                </div>
            </div>

        </Content>
    )
};

export default DailyMenu;
