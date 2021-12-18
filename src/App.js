import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import { SignIn } from "./components/signin/signin";
import { DealerMaster } from "./components/dealers/dealerMaster";

import {logout} from './actions/auth';
import { clearMessage } from './actions/message'

import {history} from './helpers/history';
import eventBus from "./common/eventBus";


function App() {
  const {user : currentUser} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   history.listen((location)=>{
  //     dispatch(clearMessage())
  //   });


  // }, [dispatch]);

  // const logout = useCallback(()=>{
  //   dispatch(logout());
  // }, [dispatch]);


  // useEffect(()=>{
  //   //console.log(currentUser);

  //   eventBus.on("logout", ()=>{
  //     logout();
  //   })
  // }, [currentUser, logout])


  return (

    <Router history={history}>
      <Routes>
        <Route exact path="/" element={<SignIn/>}/>           
        <Route exact path="/signin" element={<SignIn/>}/>  
        {/* <Route exact path="/signup" element={}/> */}


        <Route path="/dealerMaster" element={<DealerMaster/>}/>
      </Routes>    
  
    </Router>
    
  );
}

export default App;
