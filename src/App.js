import React,{useEffect, useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/Context';
import {auth} from './firebase/config'
import Post from './store/PostContext';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  })
  return (
    <div>
      <Post>
      <Router>
        <Route exact path='/'>
        <Home />
        </Route>
        <Route path='/signup'>
        <Signup/>
        </Route>
        <Route path='/login'>
        <Login/>
        </Route>
        <Route path='/create'>
        <Create/>
        </Route>
        <Route path='/view'>
        <View/>
        </Route>
      </Router>
      </Post>
    </div>
  );
}

export default App;
