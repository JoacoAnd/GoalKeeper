import { useState } from 'react';
import styled from 'styled-components';
import { GiSoccerBall } from 'react-icons/gi';
import { AiOutlineMenu as Menu, AiOutlineClose as Close } from 'react-icons/ai'
import Flex from './Flex';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';


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

    &.ingresar {
        background-color: #11c300;
        padding: .8em;
        border-radius: 4px;
        color: #ffffff;
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
    const smallDevices = useMediaQuery("(max-width: 768px)");

    const [activeMenu, setActiveMenu] = useState(false);

    const handleActiveMenu = () => {
        setActiveMenu(!activeMenu);
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
                    <NavLink to="/">INICIO</NavLink>
                    <NavLink to="/estadisticas">ESTADISTICAS</NavLink>
                    <NavLink to="/auth">INGRESAR</NavLink>
                </NavMenu>
            </div>
            : <Flex>
            <NavLink to="/estadisticas">ESTADISTICAS</NavLink>
            <NavLink className='ingresar' to="/auth">INGRESAR</NavLink>
        </Flex>
        }
    </NavContainer>
};