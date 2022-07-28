import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import InfoModal from '../InfoModal/InfoModal';
import { getUpdateMessageModal, markUserUpdateMessageAsRead } from "../../store/userUpdateMessage";

export default function UpdateMessageModal({ user }) {
    const dispatch = useDispatch();

    const update = useSelector(state => state.userUpdateMessage)

    const [unread, setUnread] = useState(false)

    useEffect(() => {
        dispatch(getUpdateMessageModal(user.id))
            .then(response => {
                setUnread(!response.read)
            })

    }, [dispatch, user.id])


    const handleClose = () => {
        setUnread(false);
        dispatch(markUserUpdateMessageAsRead(user.id));
    }

    return unread &&
        <InfoModal
            titleText={"An update from the farm"}
            content={update.text}
            image={update.imgUrl}
            handleClose={handleClose}
        />
}
