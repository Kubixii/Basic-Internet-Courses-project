import './MyCourses.css'

import React, { useContext } from 'react'

import CourseTile from '../courses/courseTile/CourseTile';
import { StoreContext } from '../../../store/StoreProvider';

const MyCourses = () => {

    const { user, courses } = useContext(StoreContext)

    const tiles = courses
        .filter(course => user.courses.includes(course.id))
        .map(course => {
            return (
                <CourseTile key={course.id} {...course} />
            )
        })

    return (
        <section>
            <h2 className='user-courses-title'>Moje kursy</h2>
            <ul className='user-courses-list'>
                {tiles}
            </ul>
        </section>
    );
}

export default MyCourses;