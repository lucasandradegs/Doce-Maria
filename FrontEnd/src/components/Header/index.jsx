import { Button } from "../Button";
import { Container, UserContent, AdminContent, Left, Middle, Right } from "./styles";
import { PiReceipt } from 'react-icons/pi'
import { GoSignOut } from 'react-icons/go'
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { USER_ROLE } from "../../utils/roles";

export function Header({ children }) {
    const { user, signOut } = useAuth()

    return (

        <Container>
            {[USER_ROLE.CUSTOMER].includes(user.role) &&
                <UserContent>
                    <Left>
                        <Link to="/menu">
                            <span><FiMenu size={24} /></span>
                        </Link>

                        <div className="leftSideDesktop">
                            <img src="/src/assets/explorer.svg" alt="" />
                            <h2>food explorer</h2>
                        </div>

                    </Left>

                    <Middle>
                        <div className="middleSideDesktop">
                            {children}
                        </div>

                        <img src="/src/assets/explorer.svg" alt="" />
                        <h2>food explorer</h2>

                    </Middle>

                    <Right>

                        <span><PiReceipt size={26} /></span>
                        <label htmlFor="npedidos">
                            <input
                                id="npedidos"
                            />
                        </label>
                        <p>0</p>

                        <div className="rightSideDesktop">
                            <Button icon={PiReceipt} title="Pedidos (0)" />
                            <span><GoSignOut size={22} onClick={signOut} /></span>
                        </div>
                    </Right>
                </UserContent>
            }

            {[USER_ROLE.ADMIN].includes(user.role) &&
                <AdminContent>
                    <Left>
                        <Link to="/menu">
                            <span><FiMenu size={24} /></span>
                        </Link>

                        <div className="leftSideDesktop">
                            <img src="/src/assets/explorer.svg" alt="" />
                            <h2>food explorer</h2>
                        </div>

                    </Left>

                    <Middle>
                        <div className="middleSideDesktop">
                            {children}
                        </div>

                        <img src="/src/assets/explorer.svg" alt="" />
                        <h2>food explorer</h2>

                        <span>admin</span>
                    </Middle>
                </AdminContent>
            }
        </Container>
    )
}