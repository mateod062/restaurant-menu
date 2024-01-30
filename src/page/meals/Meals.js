import Content from "../../component/common/content/Content";
import MealCategory from "../../component/common/meals/MealCategory";
import {useEffect, useRef, useState} from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import {
    Modal,
    Button,
    Form,
    InputGroup,
    FloatingLabel,
    Card,
    FormCheck,
    Alert,
    Table,
    ModalHeader, Placeholder, Spinner, PlaceholderButton
} from "react-bootstrap";
import "./Meals.css"
import "../../component/common/meal/Border.css"
import ErrorModal from "../../component/common/error/ErrorModal";

const Meals = () => {
    const localStorage = window.localStorage

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
    const [errorMessage, setErrorMessage] = useState("")
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleAddMeal = async (event) => {
        event.preventDefault();

        const formData = new FormData(addMealFormRef.current);
        const data = Object.fromEntries(formData.entries());

        const newMeal = {
            name: data['name'],
            category: data['category'],
            price: data['price']
        }

        if (!data['name'] || !data['category'] || !data['price'] || !data['price'].match(/^\d+(\.\d{1,2})?$/)) {
            setAddMealFormValidated(true)
            return;
        }

        setLoading(true)
        try {
            const responsePostMeal = await axios.post('/meals', newMeal)
            console.log(responsePostMeal.data)
            const responseGetMeals = await axios.get('/meals')
            console.log(responseGetMeals.data)

            setMeals(responseGetMeals?.data)
            localStorage.setItem('meals', JSON.stringify(responseGetMeals.data));

            setAddMealFormValidated(false)
            setShowModal(false);
        }
        catch (error) {
            console.log(error)
            setErrorMessage("An error occurred.")
        }
        setLoading(false)

        localStorage.removeItem('meals')
    }

    useEffect(() => {
        const storedMeals = JSON.parse(localStorage.getItem('meals'))
        if (storedMeals) {
            setMeals(storedMeals)
        }
        else {
            const getMeals = async () => {
                setLoading(true)
                try {
                    const response = await axios.get('/meals')
                    console.log(response.data)
                    setMeals(response.data)
                    localStorage.setItem('meals', JSON.stringify(response.data));
                } catch (e) {
                    console.error(e)
                }
                setLoading(false)
            }

            getMeals()
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
            <div className={"container rounded border border-3 bg-black w-50 mx-auto pt-3 my-4 fs-3"}>
                <Table variant={"dark"}>
                    <thead className={"bg-darkblue"}>
                      <tr className={"border-bottom bottom"}>
                        <th scope={"col"}>Naziv jela</th>
                        <th scope={"col"}>
                            <div className={"d-flex flex-row gap-5"}>
                                Cijena jela
                                {loading && auth?.accessToken && (
                                    <PlaceholderButton variant={"primary"} xs={3} className={"ms-auto"} />
                                )}
                                {!loading && auth?.accessToken && (
                                    <Button
                                        variant={"primary"}
                                        className={auth?.accessToken ? "ms-auto" : "invisible"}
                                        onClick={() => setShowModal(true)}
                                    >
                                        <i className={"bi bi-plus-square"}></i>
                                        <span className={"ms-2"}>Add meal</span>
                                    </Button>
                                )}
                            </div>
                        </th>
                      </tr>
                    </thead>
                    <MealCategory category={"Pizzas"} meals={pizzas} setMeals={setMeals} loading={loading}/>
                    <MealCategory category={"Soups"} meals={soups} setMeals={setMeals} loading={loading}/>
                    <MealCategory category={"Main meals"} meals={mainMeals} setMeals={setMeals} loading={loading}/>
                    <MealCategory category={"Side dishes"} meals={sideDishes} setMeals={setMeals} loading={loading}/>
                    <MealCategory category={"Desserts"} meals={desserts} setMeals={setMeals} loading={loading}/>
                </Table>
            </div>

            <ErrorModal show={showErrorModal} onHide={() => setShowErrorModal(false)} message={errorMessage} />

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
                    <Button variant={"secondary"} onClick={() => {
                        {
                            setShowModal(false)
                            setAddMealFormValidated(false)
                        }
                    }}>
                        Close
                    </Button>
                    <Button variant={"primary"} onClick={handleAddMeal}>
                        {loading ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : "Add meal"
                        }
                    </Button>
                </Modal.Footer>
            </Modal>

        </Content>

    )
};

export default Meals;