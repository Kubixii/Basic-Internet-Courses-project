import '../AsideMenu.css'

import { Link } from 'react-router-dom';
import React from 'react';

const AdminMenu = () => (
    <>
        <p className='title'>Panel Administratora</p>
        <nav>
            <ul>
                <li className='link'>
                    <Link to="/manage-courses">Zarządzanie kursami</Link>
                </li>
            </ul>
        </nav>
    </>
)

export default AdminMenu;