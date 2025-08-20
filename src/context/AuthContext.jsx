import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '../firebase/firebse.config.js';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
   const createUser = (email, password) => {
          setLoading(true);
          return createUserWithEmailAndPassword(auth, email, password);
      };
  
      const signIn = (email, password) => {
          setLoading(true);
          return signInWithEmailAndPassword(auth, email, password);
      };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };
const authInfo = {
  user,
  createUser, signIn,logout,// এটা যোগ করতে হবে
};
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;