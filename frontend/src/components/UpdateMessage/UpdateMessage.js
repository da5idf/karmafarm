import React from 'react'

export default function UpdateMessage({ message }) {
    console.log(message.imgUrl)
    return (
        <div className="update-message-hero">
            <div className="update-message-date-img">
                <div>{new Date(message.createdAt).toDateString()}</div>
                <img
                    src={message.imgUrl}
                />
            </div>
            <div>{message.text}</div>
        </div>
    )
}