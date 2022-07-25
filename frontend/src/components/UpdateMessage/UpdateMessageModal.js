import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import './UpdateMessageModal.css'
import { Modal } from '../../context/Modal';
import { getUpdateMessageModal, markUserUpdateMessageAsRead } from "../../store/userUpdateMessage";

export default function UpdateMessageModal({ user }) {
    const dispatch = useDispatch();

    const text = useSelector(state => state.userUpdateMessage.text)

    const [showUpdateModal, setShowUpdateModal] = useState(false)

    useEffect(() => {
        dispatch(getUpdateMessageModal(user.id))
            .then(response => setShowUpdateModal(!response.read))

    }, [dispatch, user.id])


    const handleClose = () => {
        setShowUpdateModal(false);
        dispatch(markUserUpdateMessageAsRead(user.id));
    }

    return showUpdateModal &&
        <Modal onClose={handleClose}>
            <div
                id="updateMessage-modal-hero"
                className="red-bg"
            >
                <div id="updateMessage-modal-title" className='red-text'>
                    <i className="fa-solid fa-circle-info"></i>
                    <div>An update from the farm</div>
                </div>
                <i
                    className="fa-solid fa-x"
                    onClick={handleClose}
                ></i>
                <div
                    id="updateMessage-modal-text"
                >
                    {text}
                </div>
                <button
                    id="updateMessage-modal-button"
                    className="blue-button"
                    onClick={handleClose}
                >
                    OK
                </button>
            </div>
        </Modal>
}
