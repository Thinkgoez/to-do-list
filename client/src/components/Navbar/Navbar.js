import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'
import Nav from 'react-bootstrap/Nav'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import DarkModeToggle from "react-dark-mode-toggle";

export const Navbar = ({ isAuth, ...props }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => false);
    const [isDarkMode2, setDarkMode2] = useState(false);

    const toggleDarkMode = (checked) => {
        setDarkMode2(checked);
    };
    return (
        <nav className='navbar navbar-dark navbar-expand-lg bg-primary ps-5'>
            <div className='navbar-brand'>Note App</div>
            <div className='navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link as={NavLink} to='/' exact>Главная</Nav.Link>
                    <Nav.Link as={NavLink} to='/about' exact>Информация</Nav.Link>
                </Nav>
                <Nav>
                    {!isAuth
                        ? <>
                            <Nav.Link as={NavLink} to='/register'>Зарегистрироватся</Nav.Link>
                            <Nav.Link as={NavLink} to='/login'>Логинизироваться</Nav.Link>
                        </>
                        : <>
                            <div className='nav-item'>
                                <button className='btn btn-divnk text-white' onClick={() => {
                                    props.logout()
                                }}>Совершить попытку выхода</button>
                            </div>
                        </>
                    }
                    <DarkModeToggle
                        onChange={setIsDarkMode}
                        checked={isDarkMode}
                        size={80}
                    />
                    <DarkModeSwitch
                        style={{ marginBottom: '2rem' }}
                        checked={isDarkMode2}
                        onChange={toggleDarkMode}
                        size={50}
                    />
                </Nav>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    isAuth: PropTypes.bool,
    logout: PropTypes.func
}