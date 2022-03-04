import axios from "axios";
import { APP_API_URL } from "../BackendAccess";
import authHeader from "./auth-header";


const user = JSON.parse(localStorage.getItem('user'));

const uploadJobCard = (argItems) =>{
    //debugger;232131
    return axios.post(APP_API_URL + "/Document", argItems, 
        {headers : {
            Authorization: "bearer " + user.data.token,
            "Content-Type" : "multipart/form-data"
        }}        
    )
}

const createJobCard = (argItems)=>{
    return axios.post(APP_API_URL + "/JobCard", argItems, {headers : authHeader()});
}

const getJobCardDetailForDealer = (argItems)=>{
    return axios.post(APP_API_URL + "/JobCard/AllByPagingByDealer", argItems, {headers : authHeader()})
}

const getJobCardById = (argID)=>{
    return axios.get(APP_API_URL + "/JobCard/" + argID, {headers: authHeader()});
}

const updateJobCard = (argItems)=>{
    return axios.put(APP_API_URL + "/JobCard", argItems, {headers : authHeader()});
}

const deleteJobCard = (argID)=>{
    return axios.delete(APP_API_URL + "/JobCard/" + argID, {headers : authHeader()});
}

const getDocumnetByID = (argID)=>{
    return axios.get(APP_API_URL + "/Document/" + argID, {headers: authHeader()});
}

const downloadDocuments = (argItems)=>{
    return axios.post(APP_API_URL + "/Document/Download", argItems, {headers : authHeader(), responseType : 'blob'},);
}


const getJobCardDetailsForOperator = (argItems)=>{
    return axios.post(APP_API_URL + "/JobCard/AllByPagingByDataOperator", argItems, 
        {headers:authHeader()}
    );
}

const getServiceTypes = (argID)=>{
    return axios.get(APP_API_URL + "/ServiceType/Dropdown/" + argID, {headers : authHeader()});
}

const updateJobCardStatus = (argItems)=>{   
    return axios.post(APP_API_URL + "/JobCard/UpdateJobCardTakenByDataOperator", argItems, { headers : authHeader() });
}


//Job Card for Telecaller
const getJobCardListForTeleCaller = (argItems) =>{
    return axios.post(APP_API_URL + "/JobCard/AllByPagingByTeleCallers", argItems,  {headers : authHeader()})
}
const getCustomerFeedback = (argID)=>{
    return axios.get(APP_API_URL + "/CustomerFeedbackStatus/Dropdown/" + argID, { headers : authHeader()});
}

const saveJobCardAudit = (argItems) =>{
    return axios.post(APP_API_URL + "/JobCardAudit", argItems, { headers : authHeader() });
}
const updateJobCardAudit = (argItems)=>{
    return axios.put(APP_API_URL + "/JobCardAudit", argItems, { headers : authHeader() });
}
const getJobCardAuditByID = (argID)=>{
    return axios.get(APP_API_URL + "/JobCardAudit/" + argID, { headers : authHeader() });
}

const getJobCardListForAudit = (argItems)=>{
    return axios.post(APP_API_URL + "/JobCard/AllByPagingByAuditTeam", argItems, {headers : authHeader()});
}

const getJobCardDataById = (argID) =>{
    return axios.get(APP_API_URL + "/JobCard/GetAllJobCardDataById/" + argID, { headers : authHeader() })
}

const getAllDataForExport = (argItems) =>{
    return axios.post(APP_API_URL + "/JobCard/AllByPaging", argItems, {headers:authHeader()})
}

const getExcelExport = (argItems) =>{
    return axios.post(APP_API_URL + "/JobCard/ExportJobCard", argItems, {headers:authHeader(), responseType: 'arraybuffer' })
}

export default {
    uploadJobCard,
    createJobCard,
    getJobCardDetailForDealer,
    getJobCardById,
    updateJobCard,
    deleteJobCard,
    getDocumnetByID,
    downloadDocuments,
    getJobCardDetailsForOperator,
    getServiceTypes,
    updateJobCardStatus,

    getJobCardListForTeleCaller,
    getCustomerFeedback,
    saveJobCardAudit,
    updateJobCardAudit,
    getJobCardAuditByID,

    getJobCardListForAudit,
    getJobCardDataById,

    getAllDataForExport,
    getExcelExport
}