import React, { createContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { newThreadMessage } from '../store/thread.js';

//import client-side socket package
//https://socket.io/docs/v4/client-initialization/
import { io } from 'socket.io-client';

//create context
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();

    //useRef will allow socket to persist for the full lifetime of the component.
    const socket = useRef();

    const sessionUser = useSelector((state) => state.session.user);

    // Once user logged in, open socket connection, by default connects immediately upon creation
    useEffect(() => {
        // create websocket
        if (sessionUser) {
            // defaults to trying to connect to the host that serves the page.
            // the server URL will be deduced from the window.location object
            // works because frontend is served on the same domain as the server on heroku or via a proxy(?)
            socket.current = io();
            // socket.id - each new socket is assigned a random 20 character unique and synced with server
            // socket.connected - boolean describing whether socket is currently connected to server
            console.log('Socket Connected');

            socket.current.on('message:new', ({ message, members, receiver }) => {
                dispatch(newThreadMessage(message, members, receiver));
            });
        }

        // when component unmounts, disconnect from socket
        return () => {
            if (sessionUser) {
                socket.current.disconnect();
                console.log('Socket disconnected');
            }
        };
    }, [dispatch, sessionUser]);

    return (
        <>
            <SocketContext.Provider value={{ socket }}>
                {children}
            </SocketContext.Provider>
        </>
    );
};

/*
SOCKET DATA FLOW:
  User hits submit:
    Thunk dispatched to update database (persist data)
      If error, display error,
      If response is ok:
        Server emits event which this file listens for.
        Each event dispatches directly to the store.

  Edge cases,
  -If some how disconnected to internet or server, how do you know if received all broacast messages?
    -could send a state variable to validate against, and if state not up to date, then send fetch to db
    -or could fetch based on a setInterval
  -Make db persistence seem instant:
    -For client who sent message, it appears as if sent it, only if goes wrong do you throw error and remove message
    -originator doesn't know other's haven't seen their message yet, if db persistence errors, then show errors

To read later (socket.io react component):
  https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65
  https://developer.okta.com/blog/2021/07/14/socket-io-react-tutorial
  https://www.fullstacklabs.co/blog/chat-application-react-express-socket-io
  https://www.valentinog.com/blog/socket-react/
  */