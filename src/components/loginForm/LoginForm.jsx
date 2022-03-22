import './LoginForm.css'

import React, { useContext, useEffect, useState } from 'react'

import APIRequest from '../../helpers/APIRequest';
import Modal from '../modal/Modal';
import { StoreContext } from '../../store/StoreProvider';

const LoginForm = ({ handleModalClose, isModalOpen }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [validateMessage, setValidateMessage] = useState('');

    const handleLoginInput = e => setLogin(e.target.value);
    const handlePasswordInput = e => setPassword(e.target.value);

    const { setUser } = useContext(StoreContext)

    const handleLoginFormClose = (e) => {
        e.preventDefault()
        handleModalClose();
    }

    useEffect(() => {
        if (isModalOpen) resetModalInput();
    }, [isModalOpen])


    const showValidateMessage = validateMessage ? <p className='message'>{validateMessage}</p> : null;

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const { data, status } = await APIRequest.post(
            '/users',
            { login, password }
        );

        if (status === 200) {
            setUser(data.user);
            handleModalClose();
        }
        else {
            setValidateMessage(data.message)
        }
    }

    const resetModalInput = () => {
        setLogin('')
        setPassword('')
        setValidateMessage('')
    }

    return (
        <Modal shouldBeClosedOnOutClick={true} isOpen={isModalOpen} handleModalClose={handleModalClose}>
            <form className='login-form' method='post' onSubmit={handleOnSubmit}>
                <h3 style={{ textAlign: "center" }}>Logowanie</h3>
                <div className='row'>
                    <label>
                        <span>Login </span>
                        <input type="text" value={login} onChange={handleLoginInput} />
                    </label>
                </div>
                <div className='row'>
                    <label>
                        <span>Hasło </span>
                        <input type="password" value={password} onChange={handlePasswordInput} />
                    </label>
                </div>
                <div className='row'>
                    <button type='submit'>Zaloguj</button>
                    <button type="button" onClick={handleLoginFormClose}>Anuluj</button>
                </div>
                {showValidateMessage}
            </form>
        </Modal>
    );
}

export default LoginForm;