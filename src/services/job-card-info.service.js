import axios from "axios";
import { APP_API_URL } from "../BackendAccess";
import authHeader from "./auth-header";


const user = JSON.parse(localStorage.getItem('user'));

const uploadJobCard = (argItems) =>{
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

export default {
    uploadJobCard,
    createJobCard,
    getJobCardDetailForDealer,
    getJobCardById,
    updateJobCard,
    deleteJobCard
}