import axios from "axios";
import { APP_API_URL } from "../BackendAccess";
import authHeader from "./auth-header";

const getModelById = (argID)=>{
    return axios.get(APP_API_URL + "/Model/" + argID, {headers : authHeader()});
}

const getModelLists = (argID) =>{
    return axios.get(APP_API_URL + "/Model/Dropdown/" + argID, {headers : authHeader()});
}

const getModelAllPaging = (argItems) =>{
    return axios.post(APP_API_URL + "/Model/AllByPaging", argItems, {headers : authHeader()});
}

const createModel = (argItems) =>{
    return axios.post(APP_API_URL + "/Model", argItems, {headers : authHeader()});
}

const updateModel = (argItems) =>{
    return axios.put(APP_API_URL + "/Model", argItems, {headers : authHeader()});
}

const deleteModel = (argID) =>{
    return axios.delete(APP_API_URL + "/Model/" + argID, {headers : authHeader()});
}



export default {
    getModelById,
    getModelLists,
    getModelAllPaging,
    createModel,
    updateModel,
    deleteModel
}