const Menu = ({name, children}) => {

    return (
        <div className={"container border-bottom border-2 border-black p-2"}>
            <div className={"row"}>
                <div className={"col"}>
                    <h3>{name}</h3>
                </div>
                <div className={"col"}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Menu;