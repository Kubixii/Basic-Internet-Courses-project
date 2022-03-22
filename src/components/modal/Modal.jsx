import './Modal.css'

import React, { useEffect, useRef } from 'react'

import ReactDOM from 'react-dom';

const Modal = ({ children, isOpen, shouldBeClosedOnOutClick, handleModalClose }) => {

    const modalRef = useRef(null);
    const prevActivElement = useRef(null);

    useEffect(() => {
        if (!modalRef.current) { return; }

        const { current: modal } = modalRef;

        if (isOpen) {
            prevActivElement.current = document.activeElement;
            modal.showModal();
        } else if (prevActivElement.current) {
            modal.close();
            prevActivElement.current.focus();
        }
    }, [isOpen])

    useEffect(() => {
        const { current: modal } = modalRef;

        const handleCancel = e => {
            e.preventDefault();
            handleModalClose();
        }

        modal.addEventListener('cancel', handleCancel)

        return () => {
            modal.removeEventListener('cancel', handleCancel)
        }
    }, [handleModalClose])
    const handleOutClick = ({ target }) => {
        const { current } = modalRef;

        if (shouldBeClosedOnOutClick && target === current) {
            handleModalClose()
        }
    }
    return ReactDOM.createPortal((
        <dialog className='modal' ref={modalRef} onClick={handleOutClick}>
            {children}
        </dialog>
    ), document.body);
}

export default Modal;