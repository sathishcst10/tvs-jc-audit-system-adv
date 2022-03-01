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

export default{
    getAdminDashboardData,
    getDataOperatorDataCount,
    getTeleCallerDataCount,
    getDealerDataCount
}