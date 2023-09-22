import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { onAuthStateChanged } from 'firebase/auth';


import { auth } from '../firebase/config';
import { login, logout } from '../redux/authSlice';
import { checkingAuthentication } from '../Api';

export const useCheckAuth = () => {
    const {status} = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkingAuthentication());
        onAuthStateChanged(auth, async (user) => {
            if (!user) return dispatch(logout({}));
            const { uid, email, displayName } = user;
            dispatch(login({ uid, email, displayName }));
          });
    }, [dispatch])
    
    return {
        status
    }
}