'use client';

import React, {createContext, useContext, useState, ReactNode, useEffect} from "react";
import {User} from "@/vulog/users";
import {Token} from "@/vulog/auth";

type UserContextType = {
    token: Token | null;
    setToken: (user: Token | null) => void;
    user: User | null;
    setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
    token: null,
    setToken: () => {},
    user: null,
    setUser: () => {},
});

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [token, setToken] = useState<Token | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (token) {
            sessionStorage.setItem('token', JSON.stringify(token));
        } else {
            const strToken = sessionStorage.getItem('token');
            if (strToken) setToken(JSON.parse(strToken));
        }
    }, [token]);

    return (
        <UserContext.Provider
            value={{
                token,
                setToken,
                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => useContext(UserContext);
