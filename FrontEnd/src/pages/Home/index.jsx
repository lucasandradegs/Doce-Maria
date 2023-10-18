import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Container, Banner } from "./styles"
import { FiSearch } from 'react-icons/fi'

export function Home() {
    return (
        <Container>
            <Header >
                <Input icon={FiSearch} placeholder="Busque por pratos ou ingredientes" />
            </ Header>
            <Banner>
                <img src="./src/assets/banner.svg" alt="" />
                <div className="main">
                    <h2>Sabores inigualáveis</h2>
                    <p>Sinta o cuidado do preparo com ingredientes selecionados</p>
                </div>
            </Banner>

        </Container>

    )
}