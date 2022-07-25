import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './UpdateMessage.css'
import { deleteLastUpdate, getUpdateMessages, modifyLatestUpdate, newUpdateMessage } from '../../store/updateMessages';
import UpdateMessage from './UpdateMessage';
import { toggleConfirm } from '../../utils';

export default function UpdateMessages() {
    const dispatch = useDispatch();

    const updateMessages = useSelector(state => state.updateMessages);
    const userId = useSelector(state => state.session.user.id)

    const [newUpdate, setNewUpdate] = useState(true)
    const [text, setText] = useState("")
    const [confirmationText, setConfirmationText] = useState("Update delivered!")
    const [buttonText, setButtonText] = useState("Send new update")

    useEffect(() => {
        dispatch(getUpdateMessages())
    }, [dispatch])

    const handleSelection = (e) => {
        setNewUpdate(!newUpdate)
        if (e.target.id === "new-update") {
            setButtonText("Send new update")
            setConfirmationText("Update delivered!")
            setText("")
        } else {
            setButtonText("Send modified update")
            setConfirmationText("Update modified and delivered!")
            setText(updateMessages[0].text)
        }
    }

    const deleteUpdate = (e) => {
        e.stopPropagation();
        dispatch(deleteLastUpdate(updateMessages[0].id));
        setConfirmationText("Update deleted");
        toggleConfirm("newest-update-confirmation")
        setText("")
        setNewUpdate(true);
    }

    const handleSubmit = (e) => {
        e.stopPropagation();

        if (e.target.innerText === "Send new update") {
            dispatch(newUpdateMessage(text, userId));
            toggleConfirm("newest-update-confirmation")
            setNewUpdate(true);
            setText("");
        } else {
            const updateId = updateMessages[0].id
            console.log(text);
            dispatch(modifyLatestUpdate({ updateId, text }))
            toggleConfirm("newest-update-confirmation");
            setNewUpdate(true);
            setButtonText("Send new update")
            setText("");
        }
    }

    return (
        <div className="page-hero">
            <div className="page-content">
                <div className="page-title">Your update history</div>
                <div id="update-message-inputs">
                    <input
                        type="checkbox"
                        id="new-update"
                        checked={newUpdate}
                        onChange={handleSelection}
                    />
                    <label
                        htmlFor="new-update"
                    >
                        Send new update
                    </label>
                    {/* catch when there have been no updates */}
                    {updateMessages[0] &&
                        <>
                            <input
                                type="checkbox"
                                id="modify-update"
                                checked={!newUpdate}
                                onChange={handleSelection}
                            />
                            <label
                                htmlFor="modify-update"
                            >
                                Modify or Delete your last update
                            </label>
                        </>
                    }
                </div>
                <div id="newest-update-container" className='green-bg'>
                    <textarea
                        id="newest-update-textarea"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div id="update-message-buttons">
                        <button className='basic-button' onClick={handleSubmit}>{buttonText}</button>
                        {!newUpdate && <button className='red-button' onClick={deleteUpdate}>Delete this update</button>}
                    </div>
                    <div id="newest-update-confirmation" className="appear-from-right">
                        <div>{confirmationText}</div>
                    </div>
                </div>
                <div id="update-messages-container">
                    {
                        updateMessages.map(message =>
                            <UpdateMessage message={message} key={Math.random()} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
