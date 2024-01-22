import Content from "../../component/common/content/Content";
import MealCategory from "../../component/common/meals/MealCategory";
import {useEffect, useRef, useState} from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import {Modal, Button, Form, InputGroup, FloatingLabel, Card, FormCheck, Alert, Table} from "react-bootstrap";
import "./Meals.css"
const Meals = () => {
    const {auth} = useAuth()

    const addMealFormRef = useRef()

    const [meals, setMeals] = useState([])
    const [soups, setSoups] = useState([])
    const [pizzas, setPizzas] = useState([])
    const [mainMeals, setMainMeals] = useState([])
    const [sideDishes, setSideDishes] = useState([])
    const [desserts, setDesserts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [addMealFormValidated, setAddMealFormValidated] = useState(false)
    const [addMealErrorMessage, setAddMealErrorMessage] = useState("")

    const handleAddMeal = async (event) => {
        event.preventDefault();
        const form = event.currentTarget

        const formData = new FormData(addMealFormRef.current);
        const data = Object.fromEntries(formData.entries());

        const newMeal = {
            name: data['name'],
            category: data['category'],
            price: data['price']
        }
        console.log(JSON.stringify(newMeal));

        if (!data['name'] || !data['category'] || !data['price'] || !data['price'].match(/^\d+(\.\d{1,2})?$/)) {
            setAddMealFormValidated(true)
            return;
        }

        try {
            const responsePostMeal = await axios.post('/meals', newMeal)
            console.log(responsePostMeal.data)
            const responseGetMeals = await axios.get('/meals')

            setMeals(responseGetMeals.data)
            setAddMealFormValidated(false)
            setShowModal(false);
        }
        catch (error) {
            console.log(error)
            setAddMealErrorMessage("An error occurred.")
        }
    }

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
            setPizzas(meals.filter(meal => meal.category === "Pizza"))
            setSoups(meals.filter(meal => meal.category === "Soup"))
            setMainMeals(meals.filter(meal => meal.category === "Main meal"))
            setSideDishes(meals.filter(meal => meal.category === "Side dish"))
            setDesserts(meals.filter(meal => meal.category === "Dessert"))
        }
    }, [meals])

    return (
        <Content subtitle={"Meals"}>
            <div
                className={"container rounded-3 border border-5 border-darkblue bg-secondary-subtle w-50 mx-auto my-5"}>
                <Table>
                    <thead className={"bg-darkblue"}>
                    <tr className={"table-secondary border"}>
                        <th scope={"col"}>Naziv jela</th>
                        <th scope={"col"}>
                            <div className={"d-flex flex-row gap-5"}>
                                Cijena jela
                                <button
                                    type={"button"}
                                    className={auth?.accessToken ? "btn btn-primary ms-auto" : "invisible"}
                                    onClick={() => setShowModal(true)   }
                                >
                                    <i className={"bi bi-plus-square"}></i>
                                    <span className={"ms-2"}>Add meal</span>
                                </button>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <MealCategory category={"Pizze"} meals={pizzas} setMeals={setMeals}/>
                    <MealCategory category={"Juhe"} meals={soups} setMeals={setMeals}/>
                    <MealCategory category={"Glavna jela"} meals={mainMeals} setMeals={setMeals}/>
                    <MealCategory category={"Prilozi"} meals={sideDishes} setMeals={setMeals}/>
                    <MealCategory category={"Deserti"} meals={desserts} setMeals={setMeals}/>
                </Table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
                <Modal.Header className={"bg-primary text-white"} closeButton>
                    <Modal.Title>Add Meal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated={addMealFormValidated} ref={addMealFormRef} onSubmit={handleAddMeal}>
                        <Form.Group className={"mb-3"} controlId={"mealName"}>
                            <FloatingLabel label={"Name"} className={"mb-3"}>
                                <Form.Control
                                    name={"name"}
                                    placeholder={"Name"}
                                    type={"text"}
                                    required
                                />
                                <Form.Control.Feedback type={"invalid"}>
                                    Please enter a valid name
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className={"mb-3"} controlId={"mealCategory"}>
                            <Form.Label>Select category</Form.Label>
                            <div key={'default-radio'} className={"d-flex flex-row gap-3 mb-3"}>
                                <Form.Check
                                    type={'radio'}
                                    id={'default-radio'}
                                    label={'Pizza'}
                                    name={'category'}
                                    value={'Pizza'}
                                    defaultChecked
                                />
                                <Form.Check
                                    type={'radio'}
                                    id={'default-radio'}
                                    label={'Soup'}
                                    name={'category'}
                                    value={'Soup'}
                                />
                                <Form.Check
                                    type={'radio'}
                                    id={'default-radio'}
                                    label={'Main meal'}
                                    name={'category'}
                                    value={'Main meal'}
                                />
                                <Form.Check
                                    type={'radio'}
                                    id={'default-radio'}
                                    label={'Side dish'}
                                    name={'category'}
                                    value={'Side dish'}
                                />
                                <Form.Check
                                    type={'radio'}
                                    id={'default-radio'}
                                    label={'Dessert'}
                                    name={'category'}
                                    value={'Dessert'}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className={"mb-3"} controlId={"mealPrice"}>
                            <InputGroup hasValidation className={"mb-3"}>
                                <FloatingLabel label={"Price"}>
                                    <Form.Control
                                        name={"price"}
                                        placeholder={"Price"}
                                        type={"text"}
                                        inputMode={"decimal"}
                                        min={0}
                                        pattern="^\d+(\.\d{1,2})?$"
                                        required
                                    />
                                    <Form.Control.Feedback type={"invalid"}>
                                        Please enter a valid price
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Alert variant={"danger"} className={addMealErrorMessage ? "me-auto" : "invisible"}>
                        {addMealErrorMessage}
                    </Alert>
                    <Button variant={"secondary"} onClick={() => {
                        {
                            setShowModal(false)
                            setAddMealFormValidated(false)
                        }
                    }}>
                        Close
                    </Button>
                    <Button variant={"primary"} onClick={handleAddMeal}>
                        Add meal
                    </Button>
                </Modal.Footer>
            </Modal>

        </Content>

    )
};

export default Meals;