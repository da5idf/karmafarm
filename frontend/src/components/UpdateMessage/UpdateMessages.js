import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './UpdateMessage.css'
import { getUpdateMessages, modifyLatestUpdate } from '../../store/updateMessages';
import UpdateMessage from './UpdateMessage';
import { toggleConfirm } from '../../utils';

export default function UpdateMessages() {
    const dispatch = useDispatch();

    const updateMessages = useSelector(state => state.updateMessages);

    const [text, setText] = useState("")
    const [confirmationText, setConfirmationText] = useState("")

    useEffect(() => {
        dispatch(getUpdateMessages())
            .then(messages => setText(messages[0].text))
    }, [dispatch])

    const deleteUpdate = () => {

    }

    const handleModification = (e) => {
        e.stopPropagation();

        const updateId = updateMessages[0].id
        dispatch(modifyLatestUpdate({ updateId, text }))
        setConfirmationText("Update modified and delivered!");
        toggleConfirm("newest-update-confirmation")
    }

    return (
        <div className="page-hero">
            <div className="page-content">
                <div className="page-title">Your update history</div>
                <div className="page-subtitle">Modify or delete your latest update.</div>
                <div id="newest-update-container" className='green-bg'>
                    <textarea
                        id="newest-update-textarea"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div id="update-message-buttons">
                        <button className='red-button' onClick={deleteUpdate}>Delete this update</button>
                        <button className='basic-button' onClick={handleModification}>Send modifeid update</button>
                    </div>
                    <div id="newest-update-confirmation" className="appear-from-right">
                        <div>{confirmationText}</div>
                    </div>
                </div>
                <div id="update-messages-container">
                    {
                        updateMessages.slice(1).map(message =>
                            <UpdateMessage message={message} key={Math.random()} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
