import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/Context';
import ContextProvider from './store/Context';
import {firebaseApp} from './firebase/config';

ReactDOM.render(

    <FirebaseContext.Provider value={{firebaseApp}}>
        <ContextProvider>
            <App />
        </ContextProvider>
    </FirebaseContext.Provider>
, document.getElementById('root'));
