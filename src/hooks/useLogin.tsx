import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username: string, password: string) => {
        try {
            setLoading(true);
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            // localStorage.setItem('token', data.token);

            if (!res.ok) throw new Error(data.error || 'Login failed');
            setAuthUser(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                console.log('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;
