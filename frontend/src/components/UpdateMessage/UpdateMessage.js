import React from 'react'

export default function UpdateMessage({ message }) {
    return (
        <div className="update-message-hero">
            <div>{new Date(message.createdAt).toDateString()}</div>
            <div>{message.text}</div>
        </div>
    )
}