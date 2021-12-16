import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import { SignIn } from "./components/signin/signin";
import { DealerMaster } from "./components/dealers/dealerMaster";



function App() {
  return (

    <Router>
      <div className="App">
      
      </div>
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
