import React from "react";
import { signOut } from "firebase/auth";
import { auth, loginWithGoogle } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  //   const [user, setUser] = React.useState(null);
  const [user] = useAuthState(auth);

  const login = async () => {
    const user = await loginWithGoogle();

    if (!user) {
      // TODO: Handle failed login
    }

    // setUser(user);
  };

  const logout = () => {
    try {
      //   setUser(null);
      signOut(auth);
    } catch (err) {
      throw new Error("Logout Err: ", err);
    }
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthContext, AuthProvider };
