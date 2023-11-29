import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";
import axios from "axios";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Create a password-based account
    const signUpUserWithEmailAndPassword = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // ign in a user with an email address and password
    const logInWithEmailAndPassword = (email, password) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Handle the sign-in flow with the Firebase SDK
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const githubProvider = new GithubAuthProvider();
    const signInWithGithub = () => {
        setIsLoading(true);
        return signInWithPopup(auth, githubProvider)
    }

    const logOut = () => {
        setIsLoading(true)
        return signOut(auth)
    };

    // Get the currently signed-in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);

            if (currentUser) {
                const user = { email: currentUser.email };
                axios.post('https://server-iota-peach-25.vercel.app/jwt', user).then(res => {

                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                    }

                }).catch(err => console.log(err));

            } else {
                localStorage.removeItem('access-token')
            }
        });

        return () => unsubscribe()
    }, []);

    const authentication = { user, isLoading, signUpUserWithEmailAndPassword, logInWithEmailAndPassword, signInWithGoogle, signInWithGithub, logOut }

    return <AuthContext.Provider value={authentication}>{children}</AuthContext.Provider>
};

export default AuthProvider;