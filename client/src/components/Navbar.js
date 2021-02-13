//@flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = (props) => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
            <div className="navbar-brand">
                Note App
            </div>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/">Главная</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/about">Информация</NavLink>
                </li>
                {!props.token
                    ? <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/register">Зарегистрироватся</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Логинизироваться</NavLink>
                        </li>
                    </>
                    : <>
                        {/* <li className="nav-item"><NavLink className="nav-link" to="/userInfo">{props.user.displayName || 'Profile'}</NavLink></li> */}
                        <li className="nav-item">
                            <button className="btn btn-link text-white" onClick={() => {
                                props.logout()
                                }}>Совершить попытку выхода</button>
                        </li>
                    </>
                }

            </ul>
        </nav>
    )
}