import { useEffect, useState } from 'react';
import { ConversationType } from '../types/types';
import toast from 'react-hot-toast';

const useGetConversation = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [conversations, setConversations] = useState<ConversationType[] | null>(null);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/messages/conversations', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch conversations');
                }
                const data = await response.json();
                setConversations(data);
                // setAuthUser(data[0].user);
            } catch (error: any) {
                console.error(error);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getConversations();
    }, []);

    return { loading, conversations };
};

export default useGetConversation;
