import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../firebase.init';

const useUser = () => {
    const [user] = useAuthState(auth);
    const {displayName, email} = user;
    return [displayName,email]
};

export default useUser;