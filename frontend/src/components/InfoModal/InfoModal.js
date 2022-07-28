import React from 'react';

import './InfoModal.css'
import { Modal } from '../../context/Modal';

export default function InfoModal({ titleText, content, image, handleClose }) {
    return (
        <Modal onClose={handleClose}>
            <div
                id="InfoModal-hero"
                className="red-bg"
            >
                <div id="InfoModal-title" className='red-text'>
                    <i className="fa-solid fa-circle-info"></i>
                    <div>{titleText}</div>
                </div>
                <i
                    className="fa-solid fa-x"
                    onClick={handleClose}
                ></i>
                {image &&
                    <img
                        id="InfoModal-img"
                        src={image}
                        alt=""
                    />
                }
                <div
                    id="InfoModal-text"
                >
                    {content}
                </div>
                <button
                    id="InfoModal-button"
                    className="blue-button"
                    onClick={handleClose}
                >
                    OK
                </button>
            </div>
        </Modal>

    )
}
