import { createContext, useEffect, useState } from "react";
import { jwtDecoder } from "../utils/utils";

export const AuthContext = createContext({
  currentUser: null,
  isPremium: null,
  signIn: () => {},
  signOut: () => {},
  updateUserStatus: () => {},
});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("USER_DETAILS")),
  );

  const [isPremium, setIsPremium] = useState(false);

  const signIn = (user) => {
    localStorage.setItem("USER_DETAILS", JSON.stringify(user.user));
    localStorage.setItem("JWT_TOKEN", user.jwtToken);
    const decodedToken = jwtDecoder(user.jwtToken);
    setCurrentUser(user.user);
    setIsPremium(decodedToken.isPremium);
  };

  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("USER_DETAILS");

    localStorage.removeItem("JWT_TOKEN");
  };

  const updateUserStatus = (res = false) => {
    if (res) {
      localStorage.setItem("JWT_TOKEN", res.jwtToken);
      const decodedToken = jwtDecoder(res.jwtToken);
      setIsPremium(decodedToken.isPremium);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("JWT_TOKEN")) {
      const token = localStorage.getItem("JWT_TOKEN");
      const decodedToken = jwtDecoder(token);
      setIsPremium(decodedToken.isPremium);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, isPremium, signIn, signOut, updateUserStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
