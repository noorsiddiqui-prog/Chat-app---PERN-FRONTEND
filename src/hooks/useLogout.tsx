import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Define types
interface LogoutResponse {
    error?: string;
}

const useLogout: any = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
            });
            const data: LogoutResponse = await res.json();

            if (!res.ok) throw new Error(data.error || 'Logout failed');
            setAuthUser(null);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                console.log('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout, setAuthUser };
};

export default useLogout;
