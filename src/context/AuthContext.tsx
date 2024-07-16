import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface AuthUserType {
    id: string;
    fullName: string;
    username: string;
    profilePic: string;
}

const AuthContext = createContext<{
    authUser: AuthUserType | null;
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
    isLoading: boolean;
}>({
    authUser: null,
    setAuthUser: () => { },
    isLoading: false,
});

export const useAuthContext = () => {
    return useContext(AuthContext) as {
        authUser: AuthUserType | null;
        setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
        isLoading: boolean;
    };
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                const data = await res.json();
                console.log("response me", res)

                if (!res.ok) {
                    throw new Error(data.error);
                }
                setAuthUser(data);
            } catch (error: any) {
                toast.error(error.message)
            } finally {
                setIsLoading(false);
            }
        };

        fetchAuthUser();
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
