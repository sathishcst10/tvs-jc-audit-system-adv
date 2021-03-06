import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link, Redirect, Navigate, useNavigate } from "react-router-dom";

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

import Dashboard from "./components/dashboard";
import JobCardInformation from "./components/jobCardInfo";
import AuditReport from "./components/reports/auditReport";
import ComplaintReport from "./components/reports/complaintReport";
import MonthlyReport from "./components/reports/monthlyReport";
import AuditPercentageReport from "./components/reports/auditPercentageReports";


function App() {
  const {user : currentUser} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  // const _navigateTo = useNavigate();
  const {isLoggedIn} = useSelector(state => state.auth);
  
  useEffect(()=>{
    // var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    //   return new bootstrap.Tooltip(tooltipTriggerEl)
    // })
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

        {/* //For Super Admins */}
        <Route path = "/masters/dealerMaster" element={<DealerMaster/>} />
        <Route path = "/masters/userMaster" element = {<UserMaster/>} />
        <Route path = "/masters/modelMaster" element = {<ModelMaster/>} />
        <Route path = "/masters/aggregateMaster" element = {<AggregateMaster/>} />

        {/* //User */}
        <Route path="/jobCardInformation"  element={<JobCardInformation/>}/>      
        <Route path="/dashboard" element={<Dashboard/>}/>

        {/* Reports */}

        <Route path="/reports/AuditReports" element={<AuditReport/>}/>
        <Route path="/reports/AuditPercentageReports" element={<AuditPercentageReport/>}/>
        <Route path="/reports/ComplaintReport" element={<ComplaintReport/>}/>
        <Route path="/reports/MonthlyReport" element={<MonthlyReport/>}/>
      </Routes>      
    </Router>
    
  );
}

export default App;
