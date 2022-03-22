import './AsideMenu.css'

import React, { useContext } from 'react'

import AdminMenu from './subcomponents/AdminMenu';
import { StoreContext } from '../../store/StoreProvider';
import UserMenu from './subcomponents/UserMenu';

const ADMIN_TYPE = 1;

const AsideMenu = () => {

    const { user } = useContext(StoreContext)

    const adminMenuComponent = user?.accessLevel === ADMIN_TYPE
        ? <AdminMenu />
        : null;

    return (
        <section className='aside-menu'>
            <div className='aside-menu-wrapper'>
                <UserMenu isUserLogged={Boolean(user)} />
                {adminMenuComponent}
            </div>
        </section >
    );
}

export default AsideMenu;