// store/firebaseContext.js
import React, { createContext, useState } from "react";
import {firebaseApp, firestore} from "../firebase/config";

export const FirebaseContext = createContext(null);

export const AuthContext = createContext(null)
 
export default function ContextProvider({children}) {
    const [user, setUser] = useState(null)

    return(
        <FirebaseContext.Provider value={{firebase: firebaseApp, firestore}}>
            <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
        </FirebaseContext.Provider>
    )
}