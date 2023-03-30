import Cookies from "js-cookie";
import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { getUser } from "../services/apiService";
import { decodeToken } from "../services/tokenService";

type Props = {
    children?: React.ReactNode
};

interface Auth {
    username: string;
    token: string;
};

type SetAuth = (auth: Auth) => void

interface Context {
    auth: Auth;
    setAuth: SetAuth
}

const defaultContext: Context = {
    auth: {
        username: "",
        token: ""
    },
    setAuth: () => undefined
}

const AuthContext = createContext(defaultContext);

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState({ username: "", token: "" });

    const fetchUserAndSetAuth = async (token: string, id: string) => {
        const { username } = await getUser(token, id)

        setAuth({
            username,
            token
        })
    }

    useEffect(() => {
        const token = Cookies.get("token")
        if (!auth.token && token) {
            const { id } = decodeToken(token)
            fetchUserAndSetAuth(token, id)
        }
    }, [auth.token])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;