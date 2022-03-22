import './CourseTile.css'

import React, { useContext } from 'react'

import APIRequest from '../../../../helpers/APIRequest'
import { StoreContext } from '../../../../store/StoreProvider'
import { useNavigate } from 'react-router-dom';

const CourseTile = ({ authors, price, title, id, isMainPage }) => {
    const authorsString = authors.join(", ")
    const image = 'https://picsum.photos/200';

    const navigate = useNavigate();

    const { user, setUser } = useContext(StoreContext);

    const buyCourseButtonHandler = async () => {
        try {
            const { data, status } = await APIRequest.patch(
                '/users',
                {
                    login: user.login,
                    courseId: id,
                }
            );

            if (status === 202) {
                setUser(data.user);
                navigate('/my-courses')
            }
        } catch (error) {
            console.warn(error)
        }
    }

    const isMainCoursesList = Boolean(user && isMainPage);
    const didUserBought = Boolean(user?.courses.includes(id));

    const buttonType = didUserBought ? <button>Otwórz kurs</button> : <button onClick={buyCourseButtonHandler}>Zakup kurs</button>;

    const tileButton = isMainCoursesList ? buttonType : null;

    return (
        <li className='courseTileListElement'>
            <article className='courseTile'>
                <h3 className='courseTileTitle'>{title}</h3>
                <img src={image} alt={title} className='coursesTitleImage' />
                <p className='coursesTitlePrice'>{`Koszt kursu ${price}zł`}</p>
                <p className='coursesTitleAuthors'>{`Autorstwa: ${authorsString}`}</p>
                {tileButton}

            </article>
        </li>
    );
}

export default CourseTile;