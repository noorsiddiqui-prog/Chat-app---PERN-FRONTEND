import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
    const [loading, setLoading] = useState<boolean>(false);
    // const [conversations, setConversations] = useState<ConversationType[] | null>(null);
    const { messages, setMessages, selectedConversation }: any = useConversation()
    useEffect(() => {
        const getMessages = async () => {

            if (!selectedConversation) return;
            setLoading(true);
            setMessages([])
            try {
                const response = await fetch(`/api/messages/${selectedConversation.id}`, {
                    method: 'GET',
                    // headers: {
                    //     // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    //     'Cache-Control': 'no-cache',
                    //     'Pragma': 'no-cache',
                    // },
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch conversations');
                }
                const data = await response.json();
                console.log("response", response)
                setMessages(data)
            } catch (error: any) {
                console.error(error);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getMessages();
    }, [selectedConversation, setMessages]);

    return { loading, messages };
};

export default useGetMessages;
