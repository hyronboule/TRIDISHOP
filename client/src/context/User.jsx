import React, { createContext, useState, useContext, useEffect } from 'react';


// Création du contexte
export const UserContext = createContext();


// Composant Provider
const UserProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState(false);
    const [token, setToken] = useState("")
    const [parsedToken, setParsedToken] = useState(null);
    const [infoUser, setInfoUser] = useState({
        pseudo: "",
        email: "",
    });

    useEffect(() => {
        if (token) {
            setUserLogin(false);
            const decodedToken = tokenParsed(token); 
            setParsedToken(decodedToken);
            
            if (decodedToken) {
                setInfoUser({
                    pseudo: decodedToken.pseudo,
                    email: decodedToken.email
                });
            }
        } else {
            setUserLogin(true);
        }
    }, [token]);

    const tokenParsed = (token) => {
        try {
            const base64Url = token.split('.')[1];

            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );

            return JSON.parse(jsonPayload);

        } catch (err) {
            console.error('Invalid token', err);
            setParsedToken(null);
        }
    };

    return (
        <UserContext.Provider value={{ userLogin, setUserLogin, setToken, infoUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

// Hook personnalisé pour utiliser le contexte
export const useUserContext = () => {
    return useContext(UserContext);
};