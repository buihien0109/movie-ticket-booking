import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const useWebSocket = (onMessageReceived) => {
    const stompClient = useRef(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        stompClient.current = Stomp.over(socket);

        stompClient.current.connect({}, function (frame) {
            stompClient.current.subscribe('/topic/seatUpdate', (message) => {
                onMessageReceived(JSON.parse(message.body));
            });
        });

        return () => {
            if (stompClient.current) {
                stompClient.current.disconnect();
            }
        };
    }, [onMessageReceived]);

    const sendMessage = (destination, body) => {
        if (stompClient.current) {
            stompClient.current.send(destination, {}, JSON.stringify(body));
        }
    };

    return sendMessage;
};