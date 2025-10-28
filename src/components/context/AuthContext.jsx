import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRoles(decoded.roles || []);
            } catch (e) {
                console.error("Invalid token", e);
                setRoles([]);
            }
        } else {
            setRoles([]);
        }
    }, [token]);

    const login = (jwt) => {
        localStorage.setItem("token", jwt);
        setToken(jwt);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setRoles([]);
    };

    return (
        <AuthContext.Provider value={{ token, roles, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
