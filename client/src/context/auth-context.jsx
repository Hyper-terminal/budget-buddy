import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  currentUser: null,
  signIn: () => {},
  signOut: () => {},
});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

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

  useEffect(() => {
    if (localStorage.getItem("USER_DETAILS"))
      setCurrentUser(JSON.parse(localStorage.getItem("USER_DETAILS")));
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
