import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={s.header}>

        <div className={s.loginBlock }>
            { props.isAuth ?
                <div className={s.header_box}>
                    <div>
                        <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />
                       <span>{props.login}</span>
                    </div>
                    <div>
                        <button onClick={props.logoutData}>log out</button>
                    </div>
                </div> :
                <NavLink to={"/login"}>Login</NavLink>
            }

        </div>
    </header>
};

export default Header;