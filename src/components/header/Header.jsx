import './Header.css'

import React, { useContext, useState } from 'react'

import LoginForm from '../loginForm/LoginForm';
import { StoreContext } from '../../store/StoreProvider';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, setUser } = useContext(StoreContext);

    const setProperlyLabel = Boolean(user) ? 'Wyloguj się' : 'Zaloguj się';

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleLoginOnClick = () => {
        if (Boolean(user)) {
            setUser(null);
        } else {
            setIsModalOpen(true);
        }
    }
    return (
        <header>
            <div></div>
            <h1>Kursy internetowe</h1>
            <button onClick={handleLoginOnClick}>{setProperlyLabel}</button>
            <LoginForm handleModalClose={handleModalClose} isModalOpen={isModalOpen} />
        </header>
    );
}

export default Header;