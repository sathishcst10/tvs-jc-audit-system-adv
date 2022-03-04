import axios from "axios";
import { APP_API_URL } from "../BackendAccess";
import authHeader from "./auth-header";


const getAuditStatus = (argID)=>{
    return axios.get(APP_API_URL + "/Status/GetAuditStatusDropdwon/" + argID, {headers: authHeader()});
}

const getConfirmStatus = (argID)=>{
    return axios.get(APP_API_URL + "/Status/GetOkNotokMasterDropdwon/" + argID, {headers: authHeader()});
}

const getYesNoStatus = (argID)=>{
    return axios.get(APP_API_URL + "/Status/GetYesNoMasterDropdwon/" + argID, {headers: authHeader()});
}

const getJCCategoryStatus = (argID)=>{
    return axios.get(APP_API_URL + "/Status/GetJCCategoryMasterDropdwon/" + argID, {headers: authHeader()});
}

const getCallResponseStatus = (argID)=>{
    return axios.get(APP_API_URL + "/Status/GetCallResponseStatusMasterDropdwon/" + argID, {headers: authHeader()});
}

const getDealersByRegion = (argID)=>{
    return axios.get(APP_API_URL + "/Dealer/DealerDropdownFilterByRegion/" + argID, {headers: authHeader()});
}


export default {
    getAuditStatus,
    getConfirmStatus,
    getYesNoStatus,
    getJCCategoryStatus,
    getCallResponseStatus,
    getDealersByRegion
}