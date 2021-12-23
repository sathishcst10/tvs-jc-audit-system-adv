import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link, Redirect, Navigate, useNavigate } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import { SignIn } from "./components/signin/signin";

import { DealerMaster } from "./components/masters/dealerMaster";
import { UserMaster } from "./components/masters/userMaster";
import { ModelMaster } from "./components/masters/modelMaster";

import {logout} from './actions/auth';
import { clearMessage } from './actions/message'

import {history} from './helpers/history';
import eventBus from "./common/eventBus";
import { AggregateMaster } from "./components/masters/aggregateMaster";
import JobCardInfo from "./components/jobCardInfo";



function App() {
  const {user : currentUser} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  //const _navigateTo = useNavigate();
  const {isLoggedIn} = useSelector(state => state.auth);
  
  useEffect(()=>{
    debugger
    history.listen((location)=>{
      console.log('loc',location);
      dispatch(clearMessage())
    });
  }, [dispatch]);

  // const logout = useCallback(()=>{
  //   dispatch(logout());
  // }, [dispatch]);


  useEffect(()=>{
    //console.log(currentUser);

    eventBus.on("logout", ()=>{
      logout();
    })
  }, [currentUser, logout])

  // if(isLoggedIn){
  //   return _navigateTo("/masters/dealerMaster");
  // }
 

  return (
    <Router history={history}>
      <Routes>
        <Route exact path="/" element={<SignIn/>}/>           
        <Route exact path="/signin" element={<SignIn/>}/>  
        {/* <Route exact path="/signup" element={}/> */}

        //For Super Admins
        <Route path = "/masters/dealerMaster" element={<DealerMaster/>} />
        <Route path = "/masters/userMaster" element = {<UserMaster/>} />
        <Route path = "/masters/modelMaster" element = {<ModelMaster/>} />
        <Route path = "/masters/aggregateMaster" element = {<AggregateMaster/>} />

        //User
        <Route path="/jobCardInformation"  element={<JobCardInfo/>}/>
      </Routes>      
    </Router>
    
  );
}

export default App;
