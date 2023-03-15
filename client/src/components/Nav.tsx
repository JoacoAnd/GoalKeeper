import { useState } from 'react';
import styled from 'styled-components';
import { GiSoccerBall } from 'react-icons/gi';
import { AiOutlineMenu as Menu, AiOutlineClose as Close } from 'react-icons/ai'
import Flex from './Flex';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/reducers/auth';

const NavContainer = styled.nav`
    position: relative;
    margin: 2em auto;
    width: 80%;
    background-color: white;
    height: 5em;   
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;

    h1{
        font-size: 2rem;
    }
`

const SoccerBallIcon = styled(GiSoccerBall)`
    font-size: 2rem;
    margin-right: .2em;
    color: #e2ac56;
`

const NavLink = styled(Link)`
    text-decoration: none;
    color: #000;
    font-weight: 600;
    margin: 1em;

    &.relleno {
        padding: .8em;
        border-radius: 4px;
        color: #ffffff;
    }

    &.ingresar {
        background-color: #11c300;
    }

    &.logout {
        background-color: #c30000;
    }
    `

const NavMenu = styled.div`
    right: -100%;
    position: fixed;
    transition: all 300ms ease;
    &.active {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ffffff;
        width: 80%;
        right: 10%;
    }
`

const ToggleButton = styled.div`
    cursor: pointer;
    background-color: #25a519;
    font-size: 2rem;
    color: #ffffff;
    padding: .2em;
    border-radius: 4px;
    display: flex;
    align-items: center;
`

export const Nav = () => {
    // ESTADOS
    const [activeMenu, setActiveMenu] = useState(false);
    const smallDevices = useMediaQuery("(max-width: 768px)");
    
    // HOOKS
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.auth);

    // FUNCIONES
    const handleActiveMenu = () => {
        setActiveMenu(!activeMenu);
    };

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        localStorage.removeItem("user");
        dispatch(logout());
        navigate("/");
    };

    return <NavContainer>
        <Flex>
            <SoccerBallIcon />
            <h1><NavLink to="/">GOALKEEPER</NavLink></h1>
        </Flex>
        {
            smallDevices ? 
            <div>
                <ToggleButton onClick={handleActiveMenu}>
                    { activeMenu ? <Close /> : <Menu /> } 
                </ToggleButton>
                <NavMenu style={{zIndex: "99"}} className={activeMenu ? "active" : ""}>
                    {
                        !user ? 
                        <>
                            <NavLink to="/">INICIO</NavLink>
                            <NavLink to="/auth">INGRESAR</NavLink>
                        </>
                        :
                        <>
                            <NavLink to="/estadisticas">ESTADISTICAS</NavLink>
                            <NavLink to="/perfil">PERFIL</NavLink>                        
                            <NavLink onClick={handleLogout} to="/">LOGOUT</NavLink>
                        </>
                    }
                    
                </NavMenu>
            </div>
            : <Flex>
                {
                    !user ? <>
                        <NavLink className='relleno ingresar' to="/auth">INGRESAR</NavLink>
                    </>
                    :  <>
                        <NavLink to="/estadisticas">ESTADISTICAS</NavLink> 
                        <NavLink style={{textTransform: "uppercase"}} to="/perfil">{user!.username || ""}</NavLink> 
                        <NavLink onClick={handleLogout} to="/" className='relleno logout'>LOGOUT</NavLink>
                    </>
                }
        </Flex>
        }
    </NavContainer>
};