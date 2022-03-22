import './CoursePopup.css'

import React, { useContext, useState } from 'react'

import APIRequest from '../../../../helpers/APIRequest';
import Modal from '../../../modal/Modal'
import { StoreContext } from '../../../../store/StoreProvider';

const CoursePopup = ({
    authors = [],
    hidePopup,
    isEditMode = true,
    isPopupOpen,
    id,
    img = '',
    price = 0,
    title = ''
}) => {
    const [formAuthors, setFormAuthors] = useState(authors);
    const [formAuthor, setFormAuthor] = useState('');
    const [formImage, setFormImage] = useState(img);
    const [formPrice, setFormPrice] = useState(price);
    const [formTitle, setFormTitle] = useState(title);

    const handleFormAuthor = ({ target }) => setFormAuthor(target.value)
    const handleFormImage = ({ target }) => setFormImage(target.value)
    const handleFormPrice = ({ target }) => setFormPrice(target.value)
    const handleFormTitle = ({ target }) => setFormTitle(target.value)

    const { setCourses } = useContext(StoreContext);

    const formSubmitHandler = async e => {
        e.preventDefault()

        const courseObject = {
            authors: formAuthors,
            id,
            img: formImage,
            title: formTitle,
            price: formPrice
        }
        if (isEditMode) {
            const { data, status } = await APIRequest.put('/courses', courseObject)

            if (status === 202) {
                setCourses(data.courses);
            }
        }
        else {
            const { data, status } = await APIRequest.post('/courses', courseObject);

            if (status === 201) {
                setCourses(data.courses)
            }
        }

        hidePopup()
    }

    const addAuthor = (e) => {
        e.preventDefault();
        setFormAuthors(prev => [...prev, formAuthor])
        setFormAuthor('');
    }
    const deleteAuthor = e => {
        const authorToDelete = e.target.dataset.author;

        setFormAuthors(prev => prev.filter(author => author !== authorToDelete));
    }
    const authorsList = formAuthors.map(author => (
        <li key={author}>
            <p>{author}</p>
            <button onClick={deleteAuthor} data-author={author}>Usuń</button>
        </li>
    ))

    const correctLabel = isEditMode ? "Aktualizuj kurs" : "Dodaj kurs";

    return (
        <Modal isOpen={isPopupOpen} handleOnClose={hidePopup}>
            <div className='.course-popup'>
                <form className='.course-popup-form' onSubmit={formSubmitHandler}>
                    <div className='.course-popup-form-row'>
                        <label >
                            Autor:
                            <input type="text" className='.course-popup-input' value={formAuthor} onChange={handleFormAuthor} />
                            <button onClick={addAuthor}>Dodaj autora</button>
                        </label>
                    </div>
                    <div className='.course-popup-form-row'>
                        <label >
                            Obraz url:
                            <input type="text" className='.course-popup-input' value={formImage} onChange={handleFormImage} />

                        </label>
                    </div>
                    <div className='.course-popup-form-row'>
                        <label >
                            Cena:
                            <input type="number" className='.course-popup-input' value={formPrice} onChange={handleFormPrice} />

                        </label>
                    </div>
                    <div className='.course-popup-form-row'>
                        <label >
                            Tytuł:
                            <input type="text" className='.course-popup-input' value={formTitle} onChange={handleFormTitle} />

                        </label>
                    </div>
                    <button type='submit'>{correctLabel}</button>
                    <button onClick={hidePopup}>Anuluj</button>
                </form>
                <p>Lista autorów: </p>
                <ul>
                    {authorsList}
                </ul>
            </div>
        </Modal>
    );
}

export default CoursePopup;