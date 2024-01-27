import Menu from "./Menu";
import Meal from "./Meal";
import "./SubDailyMenu.css";
import {Col, Container, Placeholder, PlaceholderButton, Row, Spinner} from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";

const SubDailyMenu = ({title, menus, meals, setDailyMenu, loading}) => {

    const {auth} = useAuth()

    return (
        <Container className={"border rounded border-3 w-50 mx-2 my-4"}>
            <Col>
                <Row className={"background"}>
                    <h2 className={"text-black"}>{title}</h2>
                </Row>
                {loading ? Array.from({length: 3}).map((_, index) => (
                    <Row className={"bg-secondary-subtle p-3"}>
                        <Container className={"border-bottom border-2 border-black p-2"}>
                            <Row>
                                <Col>
                                    <Placeholder animation={"glow"}>
                                        <Placeholder xs={4} size={"lg"}/>
                                    </Placeholder>
                                </Col>
                                    {auth?.accessToken &&
                                        <PlaceholderButton variant={"primary"} xs={2} size={"sm"} className={"ms-auto me-4"}/>
                                    }
                            </Row>
                            <Row className={"border-bottom border-primary-subtle"}>
                                <Col>
                                    <Placeholder animation={"glow"}>
                                        <Placeholder xs={2} size={"xs"}/>
                                    </Placeholder>
                                </Col>
                            </Row>
                            <Row className={"border-bottom border-primary-subtle"}>
                                <Col>
                                    <Placeholder animation={"glow"}>
                                        <Placeholder xs={3} size={"xs"}/>
                                    </Placeholder>
                                </Col>
                            </Row>
                            <Row className={"border-bottom border-primary-subtle"}>
                                <Col>
                                    <Placeholder animation={"glow"}>
                                        <Placeholder xs={1} size={"xs"}/>
                                    </Placeholder>
                                </Col>
                            </Row>
                            <Row className={"border-bottom border-primary-subtle"}>
                                <Col>
                                    <Placeholder animation={"glow"}>
                                        <Placeholder xs={2} size={"xs"}/>
                                    </Placeholder>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                )) : (
                    menus.map((menu, i) => (
                        <Row key={i} className={i === menus.length - 1
                            ? "bg-black ps-2 pe-2 pb-2 text-white"
                            : "bg-black ps-2 pe-2 text-white"}>
                            <Menu
                                menu={menu}
                                meals={meals}
                                dailyMenuTitle={title}
                                setDailyMenu={setDailyMenu}
                                bottomLine={i !== menus.length - 1}
                            />
                        </Row>
                    ))
                )
                }
            </Col>
        </Container>
    )
}

export default SubDailyMenu