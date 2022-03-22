import './Content.css'

import { Route, Routes as Switch } from 'react-router-dom';

import AdminPanel from '../adminPanel/AdminPanel';
import CourseDetails from '../adminPanel/courseDetails/CourseDetails';
import Courses from '../courses/Courses';
import MyCourses from '../myCourses/MyCourses';
import { StoreContext } from '../../../store/StoreProvider';
import { useContext } from 'react';

const ADMIN_TYPE = 1
const Content = () => {

    const { user, courses } = useContext(StoreContext)

    const isUserLogged = Boolean(user)
    const isAdmin = user?.accessLevel === ADMIN_TYPE

    return (
        <main className='content'>
            <Switch>
                <Route exact path="/" element={<Courses />} />
                {isUserLogged && <Route path="/my-courses" element={<MyCourses />} />}
                {isAdmin && <Route path="/manage-courses" element={<AdminPanel />} />}
            </Switch>
        </main>
    );
}

export default Content;