import React, { useContext, useState } from 'react';

import CourseDetails from './courseDetails/CourseDetails';
import CoursePopup from './coursePopup/CoursePopup';
import { StoreContext } from '../../../store/StoreProvider';

const AdminPanel = () => {
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const { courses } = useContext(StoreContext);

    const showPopup = () => setIsPopUpOpen(true);

    const closePopup = e => {
        if (e) e.preventDefault();
        setIsPopUpOpen(false);
    }

    const coursesElements = courses.map(course => <CourseDetails key={course.id} {...course} />)

    return (
        <section>
            {coursesElements}
            <button onClick={showPopup}>Dodaj nowy kurs</button>
            <CoursePopup isPopupOpen={isPopUpOpen} hidePopup={closePopup} isEditMode={false} />
        </section>
    );
}

export default AdminPanel;