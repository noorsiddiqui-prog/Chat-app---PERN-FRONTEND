import React from 'react';
import { SyncLoader } from 'react-spinners';

const Loader: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <SyncLoader color={'gray-900'} size={15} />
        </div>
    );
};

export default Loader;
