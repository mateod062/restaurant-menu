import {createContext, useEffect, useReducer, useState} from "react";
import axiosPrivate from "../api/axiosPrivate";
import createAxiosPrivate from "../api/axiosPrivate";

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(() => {
        const savedAuth = sessionStorage.getItem('auth');
        return savedAuth ? JSON.parse(savedAuth) : {};
    });

    useEffect(() => {
        sessionStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext