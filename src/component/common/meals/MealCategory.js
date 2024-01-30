import useAuth from "../../../hooks/useAuth";
import {useRef, useState} from "react";
import {
    Alert,
    Button,
    FloatingLabel,
    Form,
    InputGroup,
    Modal,
    ModalHeader,
    Placeholder, PlaceholderButton,
    Spinner
} from "react-bootstrap";
import axios from "../../../api/axios";
import ErrorModal from "../error/ErrorModal";
import SpinnerModal from "../loading/SpinnerModal";
import {LuCakeSlice, LuSoup} from "react-icons/lu";
import {GiHotMeal, GiMeal} from "react-icons/gi";
import {FaPizzaSlice} from "react-icons/fa";

const MealCategory = ({category, meals, setMeals, loading}) => {
    const {auth} = useAuth()

    const editMealFormRef = useRef()

    const [showEditMealModal, setShowEditMealModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [buttonLoading, setButtonLoading] = useState(false)
    const [editMealFormValidated, setEditMealFormValidated] = useState(false)
    const [editMealErrorMessage, setEditMealErrorMessage] = useState("")
    const [mealToEdit, setMealToEdit] = useState({name: "", category: "", price: ""})
    const [mealToDeleteId, setMealToDeleteId] = useState(null)

    const handleEditMeal = async (event) => {
        event.preventDefault();

        const formData = new FormData(editMealFormRef.current);
        const data = Object.fromEntries(formData.entries());

        const newMeal = {
            name: data['name'],
            category: data['category'],
            price: data['price']
        }
        console.log(JSON.stringify(mealToEdit));
        console.log(JSON.stringify(newMeal));

        if (!data['name'] || !data['category'] || !data['price'] || !data['price'].match(/^\d+(\.\d{1,2})?$/)) {
            setEditMealFormValidated(true)
            return;
        }

        setButtonLoading(true)
        try {
            const responsePatchMeal = await axios.patch(`/meals/${mealToEdit.id}`, newMeal)
            console.log(responsePatchMeal.data)
            const responseGetMeals = await axios.get('/meals')

            setMeals(responseGetMeals.data)
            setEditMealFormValidated(false)
            setShowEditMealModal(false);
            setMealToEdit({name: "", category: "", price: ""})
        }
        catch (error) {
            console.log(error)
            setEditMealErrorMessage("An error occurred.")
        }
        setButtonLoading(false)
    }

    const handleDeleteMeal = async (mealId) => {
        setButtonLoading(true)

        try {
            const responseDeleteMeal = await axios.delete(`/meals/${mealId}`)
            console.log(responseDeleteMeal.data)
            const responseGetMeals = await axios.get('/meals')

            setMeals(responseGetMeals.data)
            setShowErrorModal(false)

            setButtonLoading(false)
        }
        catch (error) {
            setButtonLoading(false)
            console.log(error)
            if (error?.response?.status === 400) {
                setErrorMessage("Cannot delete a meal that is in a menu")
            }
            else {
                setErrorMessage("Meal deletion failed")
            }
            setShowErrorModal(true)
        }

        setMealToDeleteId(null)
        localStorage.removeItem('meals')
    }

    const icon = () => {
        switch (category) {
            case "Pizzas": return <FaPizzaSlice/>
            case "Soups": return <LuSoup/>
            case "Main meals": return <GiHotMeal/>
            case "Side dishes": return <GiMeal/>
            case "Desserts": return <LuCakeSlice/>
            default:
        }
    }

    return (
        <>
            <tbody>
                <tr className={"border-bottom bottom text-white fs-4"}>
                    <th scope={"col"}>{category}</th>
                    <th scope={"col"} colSpan={2}>{icon()}</th>
                </tr>
                {loading ? Array.from({length: 5}).map((_, index) => (
                        <>
                            <tr className={"fs-4"}>
                                <td>
                                    <Placeholder animation={"glow"}>
                                        <Placeholder xs={5} size={"lg"} />
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder animation={"glow"}>
                                        <Placeholder xs={1} size={"lg"} />
                                    </Placeholder>
                                    {auth?.accessToken &&
                                        <PlaceholderButton variant={"primary"} xs={1} className={"ms-3"}/>
                                    }
                                    {auth?.accessToken &&
                                        <PlaceholderButton variant={"danger"} xs={1} className={"ms-3"}/>
                                    }
                                </td>
                            </tr>
                        </>
                    ))
                    : (meals.map((meal, index) =>
                        <tr key={index} className={"fs-5"}>
                            <td>{meal.name}</td>
                            <td>
                                <div className={"d-flex flex-row gap-3"}>
                                    {meal.price}€
                                    {auth?.accessToken ? (
                                        <Button variant={"primary"}
                                                onClick={() => {
                                                    setMealToEdit({...meal})
                                                    setShowEditMealModal(true)
                                                }}
                                        >
                                            <i className={"bi bi-pencil-square"}></i>
                                        </Button>
                                    ) : null
                                    }
                                    {auth?.accessToken ? (
                                        <Button variant={"danger"}
                                                onClick={() => {
                                                    console.log(meal)
                                                    setMealToDeleteId(meal.id)
                                                    handleDeleteMeal(meal.id)
                                                }}
                                        >
                                            {buttonLoading && meal.id === mealToDeleteId ? (
                                                <Spinner animation="border" role="status" size={"sm"}>
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            ) : (
                                                <i className={"bi bi-trash3-fill"}></i>
                                            )}
                                        </Button>
                                    ) : null
                                    }
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>

            <ErrorModal show={showErrorModal} onHide={() => setShowErrorModal(false)} message={errorMessage} />

            <Modal show={showEditMealModal} onHide={() => {
                setMealToEdit({name: "", category: "", price: ""})
                setShowEditMealModal(false)
            }} backdrop="static">
                <Modal.Header className={"bg-primary text-white"} closeButton>
                    <Modal.Title>Edit Meal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated={editMealFormValidated} ref={editMealFormRef} onSubmit={handleEditMeal}>
                        <Form.Group className={"mb-3"} controlId={"mealName"}>
                            <FloatingLabel label={"Name"} className={"mb-3"}>
                                <Form.Control
                                    name={"name"}
                                    placeholder={"Name"}
                                    type={"text"}
                                    defaultValue={mealToEdit.name}
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
                                    defaultChecked={mealToEdit.category === "Pizza"}
                                />
                                <Form.Check
                                    type={'radio'}
                                    id={'default-radio'}
                                    label={'Soup'}
                                    name={'category'}
                                    value={'Soup'}
                                    defaultChecked={mealToEdit.category === "Soup"}
                                />
                                <Form.Check
                                    type={'radio'}
                                    id={'default-radio'}
                                    label={'Main meal'}
                                    name={'category'}
                                    value={'Main meal'}
                                    defaultChecked={mealToEdit.category === "Main meal"}
                                />
                                <Form.Check
                                    type={'radio'}
                                    id={'default-radio'}
                                    label={'Side dish'}
                                    name={'category'}
                                    value={'Side dish'}
                                    defaultChecked={mealToEdit.category === "Side dish"}
                                />
                                <Form.Check
                                    type={'radio'}
                                    id={'default-radio'}
                                    label={'Dessert'}
                                    name={'category'}
                                    value={'Dessert'}
                                    defaultChecked={mealToEdit.category === "Dessert"}
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
                                        defaultValue={mealToEdit.price}
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
                    <Alert variant={"danger"} className={editMealErrorMessage ? "me-auto" : "invisible"}>
                        {editMealErrorMessage}
                    </Alert>
                    <Button variant={"secondary"} onClick={() => {
                            setShowEditMealModal(false)
                            setEditMealFormValidated(false)
                            setMealToEdit({name: "", category: "", price: ""})
                            setEditMealErrorMessage("")
                    }}
                    >
                        Close
                    </Button>
                    <Button variant={"primary"} onClick={handleEditMeal} className={buttonLoading ? "px-3 py-2" : ""}>
                        {buttonLoading
                            ? <Spinner animation={"border"} role={"status"} className={"text-white"} size={"sm"} />
                            : "Edit meal"
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MealCategory