import React, { createContext, useState, useContext } from 'react';

// Création du contexte
export const UserContext = createContext();

// Composant Provider
const UserProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState(false);

    return (
        <UserContext.Provider value={{ userLogin, setUserLogin }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

// Hook personnalisé pour utiliser le contexte
export const useUserContext = () => {
    return useContext(UserContext);
};
