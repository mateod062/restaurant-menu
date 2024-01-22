import useAuth from "../../../hooks/useAuth";

const Menu = ({name, children, bottomLine = true}) => {
    const {auth} = useAuth()

    return (
        <div className={bottomLine
            ? "container border-bottom border-2 border-black p-2"
            : "container p-2"
        }>
            <div className={"row"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h3>{name}</h3>
                    </div>
                    {
                        auth?.accessToken
                            ? <div className={"col"} align={"end"}>
                                <button type={"button"} className={"btn btn-primary"}>
                                    <i className={"bi bi-pencil-square"}></i>
                                    <span className={"ms-2"}>Edit</span>
                                </button>
                            </div>
                            : null

                    }
                </div>
                <div className={"col"}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Menu;