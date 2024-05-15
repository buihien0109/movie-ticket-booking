import React, { createContext, useContext, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { WS_CONNECTION_URL } from '../data/constants';

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false); // Trạng thái kết nối

    useEffect(() => {
        const socket = new SockJS(WS_CONNECTION_URL);
        const client = over(socket);

        const onConnected = () => {
            console.log("Connected to WS");
            setIsConnected(true);  // Cập nhật trạng thái kết nối khi đã kết nối
            setStompClient(client);
        }

        const onError = (err) => {
            console.log("Connection error", err);
            setIsConnected(false);  // Cập nhật trạng thái khi có lỗi kết nối
        }

        client.connect({}, onConnected, onError);

        return () => {
            if (client && client.connected) {
                client.disconnect(() => {
                    console.log("Disconnected from WS");
                    setIsConnected(false);
                });
            }
        };
    }, []);

    const value = { stompClient, isConnected };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};
