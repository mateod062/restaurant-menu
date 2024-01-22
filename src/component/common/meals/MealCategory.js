import useAuth from "../../../hooks/useAuth";
import {useRef, useState} from "react";
import {Alert, Button, FloatingLabel, Form, InputGroup, Modal, ModalHeader} from "react-bootstrap";
import axios from "../../../api/axios";

const MealCategory = ({category, meals, setMeals}) => {
    const {auth} = useAuth()

    const editMealFormRef = useRef()

    const [showEditMealModal, setShowEditMealModal] = useState(false)
    const [showDeletionErrorModal, setShowDeletionErrorModal] = useState(false)
    const [editMealFormValidated, setEditMealFormValidated] = useState(false)
    const [editMealErrorMessage, setEditMealErrorMessage] = useState("")
    const [mealToEdit, setMealToEdit] = useState({name: "", category: "", price: ""})

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
    }

    const handleDeleteMeal = async (mealId) => {

        try {
            const responseDeleteMeal = await axios.delete(`/meals/${mealId}`)
            console.log(responseDeleteMeal.data)
            const responseGetMeals = await axios.get('/meals')

            setMeals(responseGetMeals.data)
            setShowDeletionErrorModal(false)
        }
        catch (error) {
            console.log(error)
            if (error?.response?.status === 400) setShowDeletionErrorModal(true)
        }
    }

    return (
        <>
            <tbody>
                <tr className={"table-secondary"}>
                    <th scope={"col"} colSpan={2}>{category}</th>
                </tr>
                {meals.map((meal, index) =>
                    <tr key={index} className={"table-secondary border"}>
                        <td>{meal.name}</td>
                        <td>
                            <div className={"d-flex flex-row gap-3"}>
                                {meal.price}€
                                <button type={"button"}
                                        className={auth?.accessToken ? "btn btn-primary" : "invisible"}
                                        onClick={() => {
                                            setMealToEdit({...meal})
                                            setShowEditMealModal(true)
                                        }}
                                >
                                    <i className={"bi bi-pencil-square"}></i>
                                </button>
                                <button type={"button"}
                                        className={auth?.accessToken ? "btn btn-danger" : "invisible"}
                                        onClick={() => {
                                            console.log(meal)
                                            handleDeleteMeal(meal.id)
                                        }}
                                >
                                    <i className={"bi bi-trash3-fill"}></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>

{/*
            Meal delete modal
*/}
            <Modal show={showDeletionErrorModal} onHide={() => setShowDeletionErrorModal(false)} >
                <ModalHeader className={"bg-danger text-white"} closeButton>
                    <Modal.Title>Error</Modal.Title>
                </ModalHeader>
                <Modal.Body>
                    <Alert variant={"danger"}>
                        Cannot delete a meal that is in a menu.
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={() => setShowDeletionErrorModal(false)}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>



{/*
            Meal add modal
*/}
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
                        {
                            setShowEditMealModal(false)
                            setEditMealFormValidated(false)
                            setMealToEdit({name: "", category: "", price: ""})
                        }
                    }}>
                        Close
                    </Button>
                    <Button variant={"primary"} onClick={handleEditMeal}>
                        Edit meal
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MealCategory