import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Container, Content } from "./styles";
import { PiCaretLeftBold } from "react-icons/pi";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "../../components/Button";
import { PiReceipt } from 'react-icons/pi'
import { Footer } from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { InputHeader } from "../../components/InputHeader";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import { useEffect, useState } from "react";


export function Details({ ingredients }) {
    const [data, setData] = useState(null)

    const params = useParams()
    const { user } = useAuth()

    const imageURL = data && `${api.defaults.baseURL}/files/${data.image}`


    useEffect(() => {
        async function fetchPlates() {
            const response = await api.get(`/plates/${params.id}`)
            setData(response.data)
        }

        fetchPlates()
    }, [])



    return (
        <Container>
            <Header >
                <InputHeader icon={FiSearch} placeholder="Busque por pratos ou ingredientes" />
            </ Header>
            {
                data &&
                <Content>

                    <Link to="/">
                        <ButtonText icon={PiCaretLeftBold} title="voltar" />
                    </Link>
                    <div className="TitleSection">
                        <img src={imageURL} alt="" />
                        <div className="TileDesktop">
                            <h2>{data.name}</h2>
                            <p>{data.description}</p>
                            <div className="IngredientsSection">
                                <div className="Ingredients">
                                    {
                                        data.ingredients.map(title => (
                                            <span
                                                key={String(title.id)}
                                                ingredient={title.ingredient}
                                            >{title.ingredient}</span>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="Details">
                                <AiOutlineMinus size={24} />
                                <h4>01</h4>
                                <AiOutlinePlus size={24} />
                                <Button className="mobileButton" icon={PiReceipt} title="pedir ∙ R$ 25,00" />
                                <Button className="desktopButton" title="incluir ∙ " />
                            </div>
                        </div>
                    </div>
                </Content>
            }

            <Footer />
        </Container>
    )
}