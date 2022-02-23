import axios from "axios";
import { APP_API_URL } from "../BackendAccess";
import authHeader from "./auth-header";

const getJobcardAuditReport = (argItems)=>{   
    debugger
    return axios.post(APP_API_URL + "/Report/AuditReport", argItems, { headers : authHeader() });
}

const getRegionDetails = ()=>{
    return axios.get(APP_API_URL + "/State/RegionDropdown", { headers : authHeader()});
}


export default{
    getJobcardAuditReport,
    getRegionDetails
}