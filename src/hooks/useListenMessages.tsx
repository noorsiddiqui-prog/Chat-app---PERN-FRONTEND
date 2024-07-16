import { useEffect } from "react";

import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
import notificationSound from "../assets/sounds/notification.mp3"

// This hook listens for new messages from the server and updates the local state. It also plays a notification sound.
const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true
            const sound = new Audio(notificationSound)
            sound.play()
            setMessages([...messages, newMessage])
        })
    }, [socket, messages, setMessages])

    return () => {
        socket?.off("newMessage")
    }

}
export default useListenMessages;