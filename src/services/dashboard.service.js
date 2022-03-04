import axios from "axios";
import { APP_API_URL } from "../BackendAccess";
import authHeader from "./auth-header";

const getAdminDashboardData = (argItems)=>{   
    return axios.post(APP_API_URL + "/Dashboard/AdminDashboard", argItems, { headers : authHeader() });
}
const getDataOperatorDataCount = (argItems) =>{
    return axios.post(APP_API_URL + "/Dashboard/DataOperatorDashboard", argItems, { headers : authHeader() });
}
const getTeleCallerDataCount = (argItems) =>{
    return axios.post(APP_API_URL + "/Dashboard/TeleCallerDashboard", argItems, { headers : authHeader() });
}
const getDealerDataCount = (argItems) =>{
    return axios.post(APP_API_URL + "/Dashboard/DealerDashboard", argItems, { headers : authHeader() });
}


const getTeleCallerAssignChart = (argItems)=>{
    return axios.post(APP_API_URL + "/Dashboard/TelecallerAssignChart", argItems, { headers : authHeader() });
}
const getJCProcessStatus = (argItems)=>{
    return axios.post(APP_API_URL + "/Dashboard/OpenWIPChart", argItems, { headers : authHeader() });
}
const getVPSChartData = (argItems)=>{
    return axios.post(APP_API_URL + "/Dashboard/VPSChart", argItems, { headers : authHeader() });
}
const getNewProblemData = (argItems)=>{
    return axios.post(APP_API_URL + "/Dashboard/NewProblem", argItems, { headers : authHeader() });
}
const getSameProblemData = (argItems)=>{
    return axios.post(APP_API_URL + "/Dashboard/SameProblem", argItems, { headers : authHeader() });
}
const getCallReponseData = (argItems)=>{
    return axios.post(APP_API_URL + "/Dashboard/CallResponse", argItems, { headers : authHeader() });
}
const getJobCardStatus = (argItems)=>{
    return axios.post(APP_API_URL + "/Dashboard/JobCardStatus", argItems, { headers : authHeader() });
}

const getDataOperatorEntryChart = (argItems) =>{
    return axios.post(APP_API_URL + "/Dashboard/DataOperatorEntryChart", argItems, { headers : authHeader() });
}


const getDealerEntryChart = (argItems) =>{
    return axios.get(APP_API_URL + "/Dashboard/DealerEntryChart/"+ argItems, { headers : authHeader() })
}
const getDealerVPSChart = (argItems) =>{
    return axios.get(APP_API_URL + "/Dashboard/DealerVPSChart/"+ argItems, { headers : authHeader() })
}


export default{
    getAdminDashboardData,
    getDataOperatorDataCount,
    getTeleCallerDataCount,
    getDealerDataCount,

    getTeleCallerAssignChart,
    getJCProcessStatus,
    getVPSChartData,
    getNewProblemData,
    getSameProblemData,
    getCallReponseData,
    getJobCardStatus,
    getDataOperatorEntryChart,

    getDealerEntryChart,
    getDealerVPSChart
}