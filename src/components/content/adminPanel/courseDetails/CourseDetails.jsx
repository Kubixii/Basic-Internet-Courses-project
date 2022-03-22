import React, { useContext, useState } from 'react'

import APIRequest from '../../../../helpers/APIRequest';
import CoursePopup from '../coursePopup/CoursePopup';
import { StoreContext } from '../../../../store/StoreProvider';

const CourseDetails = (props) => {


    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { setCourses } = useContext(StoreContext)
    const { title, id } = props;

    const showPopup = () => setIsPopupOpen(true);
    const closePopup = e => {
        if (e) e.preventDefault();
        setIsPopupOpen(false);
    }



    const deleteCourseHandler = async () => {
        try {
            const { status } = await APIRequest.delete(`/courses/${id}`)

            if (status === 200) {
                setCourses(prev => prev.filter(course => course.id !== id));
            }
        } catch (error) {
            console.warn(error)
        }
    }
    return (
        <details>
            <summary>{title}</summary>
            <button onClick={showPopup}>Edytuj</button>
            <button onClick={deleteCourseHandler}>Usuń</button>
            <CoursePopup hidePopup={closePopup} isPopupOpen={isPopupOpen} {...props} />
        </details>
    );
}

export default CourseDetails;