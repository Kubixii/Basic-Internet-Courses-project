import './Courses.css'

import CourseTile from './courseTile/CourseTile'
import React from 'react'
import { StoreContext } from '../../../store/StoreProvider'
import { useContext } from 'react'

const Courses = () => {

    const { courses } = useContext(StoreContext)

    const tiles = courses.map(course => {
        return <CourseTile
            isMainPage={true}
            key={course.id}
            {...course}
        />
    })

    return (
        <section>
            <h2 className='coursesTitle'>Kursy w sprzedaży</h2>
            <ul className='coursesList'>
                {tiles}
            </ul>
        </section>
    );
}

export default Courses;