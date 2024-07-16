import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import { useAuthContext } from '../context/AuthContext';
import Loader from '../components/loaders/Loader';
import { Toaster } from 'react-hot-toast';

const AppRouter: React.FC = () => {
    const { authUser, isLoading } = useAuthContext();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className='p-4 h-full overflow-y-auto flex items-center justify-center'>
            <Routes>
                <Route path="/" element={authUser && authUser.id ? <Home /> : <Navigate to="/login" />} />
                <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
                <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
            </Routes>
            <Toaster />
        </div>
    );
};

export default AppRouter;
