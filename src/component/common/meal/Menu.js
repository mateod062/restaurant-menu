import useAuth from "../../../hooks/useAuth";
import {Button, Form, Modal, Spinner} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import Meal from "./Meal";
import axios from "../../../api/axios";
import ErrorModal from "../error/ErrorModal";
import SpinnerModal from "../loading/SpinnerModal";
import "./Border.css"

const Menu = ({dailyMenuTitle, meals, menu, setDailyMenu, bottomLine = true}) => {
    const {auth} = useAuth()

    const editMenuFormRef = useRef()

    const [soups, setSoups] = useState([])
    const [mainMeals, setMainMeals] = useState([])
    const [sideDishes, setSideDishes] = useState([])
    const [desserts, setDesserts] = useState([])
    const [soup, setSoup] = useState(menu?.meals.filter(meal => meal.category === "Soup")[0])
    const [mainMeal, setMainMeal] = useState(menu?.meals.filter(meal => meal.category === "Main meal" || meal.category === "Pizza")[0])
    const [sideDish, setSideDish] = useState(menu?.meals.filter(meal => meal.category === "Side dish")[0])
    const [dessert, setDessert] = useState(menu?.meals.filter(meal => meal.category === "Dessert")[0])
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const [showEditMenuModal, setShowEditMenuModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)

    const handleEditMenu = async (event) => {
        event.preventDefault();

        const formData = new FormData(editMenuFormRef.current);
        const data = Object.fromEntries(formData.entries());

        const newMenu = {
            title: menu.title,
            soup: data['soup'],
            main_meal: data['mainMeal'],
            side_dish: data['sideDish'],
            dessert: data['dessert'],
            daily_menu_title: dailyMenuTitle

        }
        console.log(JSON.stringify(newMenu));

        setLoading(true)
        try {
            const responsePatchMenu = await axios.patch(`/menus/${menu.id}`, newMenu).then()
            console.log(responsePatchMenu.data)

            setDailyMenu(prevMenus => {
                return prevMenus.map(m => m.id === menu.id ? responsePatchMenu.data : m);
            });
            setShowEditMenuModal(false);
        }
        catch (error) {
            console.log(error)
            setErrorMessage("An error occurred")
        }
        window.location.reload()
        setLoading(false)
    }

    useEffect(() => {
        setSoups(meals.filter(meal => meal.category === "Soup"))
        setMainMeals(meals.filter(meal => meal.category === "Main meal" || meal.category === "Pizza"))
        setSideDishes(meals.filter(meal => meal.category === "Side dish"))
        setDesserts(meals.filter(meal => meal.category === "Dessert"))
    }, [meals])

    return (
        <>
            <div className={bottomLine
                ? "container border-bottom border-3 bottom p-2"
                : "container p-2"
            }>
                <div className={"row"}>
                    <div className={"row"}>
                        <div className={"col"}>
                            <h3>{menu.title}</h3>
                        </div>
                        {
                            auth?.accessToken
                                ? <div className={"col"} align={"end"}>
                                    <button
                                        type={"button"}
                                        className={"btn btn-primary"}
                                        onClick={() => {
                                            setShowEditMenuModal(true)
                                            console.log(soup.name)
                                            console.log(mainMeal.name)
                                            console.log(sideDish.name)
                                            console.log(dessert.name)
                                        }}
                                    >
                                        <i className={"bi bi-pencil-square"}></i>
                                        <span className={"ms-2"}>Edit</span>
                                    </button>
                                  </div>
                                : null

                        }
                      </div>
                    <div className={"col"}>
                        {soup && <Meal mealName={soup.name} mealCategory={"Soup"}/>}
                        {mainMeal && <Meal mealName={mainMeal.name} mealCategory={"Main meal"} />}
                        {sideDish && <Meal mealName={sideDish.name} mealCategory={"Side dish"} />}
                        {dessert && <Meal mealName={dessert.name} mealCategory={"Dessert"} />}
                    </div>
                </div>
            </div>

            <ErrorModal show={showErrorModal} onHide={() => setShowErrorModal(false)} message={errorMessage} />

            <SpinnerModal show={loading && !showEditMenuModal} />

            <Modal show={showEditMenuModal} onHide={() => setShowEditMenuModal(false)}>
                <Modal.Header className={"bg-primary text-white"} closeButton>
                    <Modal.Title>Edit {menu.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={editMenuFormRef} onSubmit={handleEditMenu}>
                        <Form.Group className={"mb-3"} controlId={"selectSoup"}>
                            <Form.Label>Select a soup</Form.Label>
                            <Form.Select name={"soup"} defaultValue={soup.name}>
                                {soups.map((soup) =>
                                    <option
                                        key={soup.id}
                                        value={soup.name}
                                    >
                                        {soup.name}
                                    </option>
                                )}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className={"mb-3"} controlId={"selectMainMeal"}>
                            <Form.Label>Select a main meal</Form.Label>
                            <Form.Select name={"mainMeal"} defaultValue={mainMeal.name}>
                                {mainMeals.map((mainMeal) =>
                                    <option
                                        key={mainMeal.id}
                                        value={mainMeal.name}
                                        >
                                        {mainMeal.name}
                                    </option>
                                )}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className={"mb-3"} controlId={"selectSideDish"}>
                            <Form.Label>Select a side dish</Form.Label>
                            <Form.Select name={"sideDish"} defaultValue={sideDish.name}>
                                {sideDishes.map((sideDish) =>
                                    <option
                                        key={sideDish.id}
                                        value={sideDish.name}
                                        >
                                        {sideDish.name}
                                    </option>
                                )}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className={"mb-3"} controlId={"selectDessert"}>
                            <Form.Label>Select a dessert</Form.Label>
                            <Form.Select name={"dessert"} defaultValue={dessert.name}>
                                {desserts.map((dessert) =>
                                    <option
                                        key={dessert.id}
                                        value={dessert.name}
                                        >
                                        {dessert.name}
                                    </option>
                                )}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={() => setShowEditMenuModal(false)}>
                        Close
                    </Button>
                    <Button variant={"primary"} onClick={handleEditMenu}>
                        {loading ? (
                            <Spinner animation="border" role="status" size={"sm"}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : "Save"
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default Menu;