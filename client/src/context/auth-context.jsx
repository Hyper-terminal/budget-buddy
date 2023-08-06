import {createContext, useState} from "react";

export const AuthContext = createContext({
    currentUser: null,
    signIn: () => {
    },
    signOut: () => {
    },
    updateUserStatus: () => {
    }
});

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("USER_DETAILS"))
    );

    const signIn = (user) => {
        setCurrentUser(user.user);
        localStorage.setItem("JWT_TOKEN", user.jwtToken);
        localStorage.setItem("USER_DETAILS", JSON.stringify(user));
    };

    const signOut = () => {
        setCurrentUser(null);
        localStorage.removeItem("USER_DETAILS");
        localStorage.removeItem("JWT_TOKEN");
    };

    const updateUserStatus = (isPremium) => {
        setCurrentUser(prev => {
            return {
                ...prev, isPremium
            }
        })
    }

    return (
        <AuthContext.Provider value={{currentUser, signIn, signOut, updateUserStatus}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
