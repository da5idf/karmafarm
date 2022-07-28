import React from 'react'

export default function UpdateMessage({ message }) {
    return (
        <div className="update-message-hero">
            <div className="update-message-date-img">
                <div>{new Date(message.createdAt).toDateString()}</div>
                <img
                    className="update-message-img"
                    src={message.imgUrl}
                    alt=""
                />
            </div>
            <div>{message.text}</div>
        </div>
    )
}