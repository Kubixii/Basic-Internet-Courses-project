import '../AsideMenu.css'

import { Link } from 'react-router-dom';
import React from 'react';

const UserMenu = ({ isUserLogged }) => {
    const link = (
        <li className='link'>
            <Link to='/my-courses'>Moje zakupione kursy</Link>
        </li>
    )

    return (
        <>
            <p className='title'>Panel użytkownika</p>
            <nav>
                <ul>
                    <li className='link'>
                        <Link to="/">Kursy w sprzedaży</Link>
                    </li>
                    {isUserLogged && link}
                </ul>
            </nav>
        </>
    )
}

export default UserMenu;