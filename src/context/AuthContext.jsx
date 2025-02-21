// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { app } from "../services/firebase"; // Ensure this is correct

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Google Sign-In
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            console.log("User Signed In:", result.user);
        } catch (error) {
            console.error("Login Error:", error.message);
        }
    };

    // Logout
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error.message);
        }
    };

    // Monitor Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for Authentication
export const useAuth = () => useContext(AuthContext);
