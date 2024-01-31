import Content from "../../component/common/content/Content";
import Mini from "./Mini.jpg"
import Mini_5 from "./Mini_5.jpg"
import Mini_linija from "./Mini_linija.jpg"
import Mini_terasa from "./Mini_terasa.jpg"

const Info = () => {
    return (
        <Content subtitle={"Info"}>
            <div className={"d-flex align-items-center mx-5 mb-5 row fw-semibold"}>
                <div className={"col text-white"}>
                    <p className={"row fs-3"}>Uz nekoliko vrsti meni obroka, gotovih jela i jela s roštilja, studentima su ovdje u ponudi i pizze.</p>
                    <ul className={"row ms-5 fs-4"}>
                        <li>Broj sjedećih mjesta: 109 + terasa</li>
                        <li>Dnevni kapacitet obroka: 1000</li>
                    </ul>
                </div>
                <div className={"col"}>
                    <div className={"row"}>
                        <img className={"col-6 img-fluid"} src={Mini_linija} alt={"Poslužna linija mini-a"}/>
                        <img className={"col-6 img-fluid"} src={Mini} alt={"Prostor sa stolovima"}/>
                    </div>
                    <div className={"row"}>
                        <img className={"col-6 mt-4 img-fluid"} src={Mini_terasa} alt={"Terasa mini-a"}/>
                        <img className={"col-6 mt-4 img-fluid"} src={Mini_5} alt={"Prostor sa stolovima iz drugog kuta"}/>
                    </div>
                </div>
            </div>
        </Content>
    )
};

export default Info;