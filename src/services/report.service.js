import axios from "axios";
import { APP_API_URL } from "../BackendAccess";
import authHeader from "./auth-header";


const getRegionDetails = ()=>{
    return axios.get(APP_API_URL + "/State/RegionDropdown", { headers : authHeader()});
}

const getYear = () =>{
    return axios.post(APP_API_URL + "/Report/GetYearDropdown", true, { headers : authHeader() });
}
const getMonth = (argItems) =>{
    return axios.get(APP_API_URL + "/Report/GetMonthDropDown/"+ argItems,  { headers : authHeader() });
}


const getJobcardAuditReport = (argItems)=>{   
    return axios.post(APP_API_URL + "/Report/AuditReport", argItems, { headers : authHeader() });
}
const getJobcardAuditPercentageReport = (argItems)=>{   
    return axios.post(APP_API_URL + "/Report/AuditReportPercentage", argItems, { headers : authHeader() });
}
const getJobcardComplaintReport = (argItems)=>{   
    return axios.post(APP_API_URL + "/Report/ComplaintReport", argItems, { headers : authHeader() });
}
const getMonthlyReport = (argItems)=>{
    return axios.post(APP_API_URL + "/Report/MonthlyReport", argItems, { headers : authHeader() });
}

export default {
    getRegionDetails,
    getYear,
    getMonth,
    getJobcardAuditReport,
    getJobcardComplaintReport,
    getMonthlyReport,
    getJobcardAuditPercentageReport
}