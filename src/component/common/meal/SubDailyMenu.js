import Menu from "./Menu";
import Meal from "./Meal";
import {Spinner} from "react-bootstrap";

const SubDailyMenu = ({title, menus, setDailyMenu, loading}) => {

    return (
        <div className={"container shadow rounded border border-5 border-darkblue w-50 mx-2 my-5"}>
            <div className={"col"}>
                <div className={"row bg-darkblue"}>
                    <h2 className={"text-white"}>{title}</h2>
                </div>
                {loading ? (
                    <div className={"row bg-secondary-subtle p-5"}>
                        <Spinner animation="border" role="status" className={"mx-auto"}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    menus.map((menu, i) => (
                            <div key={i} className={i === menus.length - 1
                                ? "row bg-secondary-subtle ps-2 pe-2 pb-2"
                                : "row bg-secondary-subtle ps-2 pe-2"}>
                                <Menu
                                    menu={menu}
                                    dailyMenuTitle={title}
                                    setDailyMenu={setDailyMenu}
                                    bottomLine={i !== menus.length - 1}
                                />
                            </div>
                        ))
                )
                }
            </div>
        </div>
    )
}

export default SubDailyMenu