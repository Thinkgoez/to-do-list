import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { DarkModeSwitch } from 'react-toggle-dark-mode';
// import DarkModeToggle from "react-dark-mode-toggle";

import s from './Navbar.module.css'
import { Button } from '../common/Button'

const BtnLogOut = styled(Button)`
    &:hover{
        border-color: #000;
    }
    &:active{
        border-color: #000;
        color: #000;
        background-color: #fff;
    }
`

const Navbar = ({ isAuth, ...props }) => {
    // const [isDarkMode, setIsDarkMode] = useState(() => false);
    // const [isDarkMode2, setDarkMode2] = useState(false);

    // const toggleDarkMode = (checked) => {
    //     setDarkMode2(checked);
    // };
    return (
        <nav className={s.navbar}>
            <div className={s.navbarBrand}>Note App</div>
            <div className={s.navbarNav}>
                <div className={s.nav}>
                    <NavLink to='/' className={s.navLink} exact>Home</NavLink>
                    {/* <Nav.Link as={NavLink} to='/about' exact>Info</Nav.Link> */}
                </div>
                <div className={s.nav}>
                    {!isAuth
                        ? <>
                            <NavLink to='/register' className={s.navLink}>Registration</NavLink>
                            <NavLink to='/login' className={s.navLink}>Login</NavLink>
                        </>
                        : <>
                            <div>
                                <BtnLogOut onClick={() => {
                                    props.logout()
                                }}>Log out</BtnLogOut>
                                {/* Совершить попытку выхода */}
                            </div>
                        </>
                    }
                    {/* <DarkModeToggle
                        onChange={setIsDarkMode}
                        checked={isDarkMode}
                        size={80}
                    />
                    <DarkModeSwitch
                        style={{ marginBottom: '2rem' }}
                        checked={isDarkMode2}
                        onChange={toggleDarkMode}
                        size={50}
                    /> */}
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    isAuth: PropTypes.bool,
    logout: PropTypes.func
}

export default Navbar