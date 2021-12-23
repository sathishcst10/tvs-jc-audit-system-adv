import axios from "axios";
import { APP_API_URL } from "../BackendAccess";
import authHeader from "./auth-header";

const getAggregateById = (argID)=>{
    return axios.get(APP_API_URL + "/Aggregate/" + argID, {headers : authHeader()});
}

const getAggregateLists = (argID) =>{
    return axios.get(APP_API_URL + "/Aggregate/Dropdown/" + argID, {headers : authHeader()});
}

const getAggregateAllPaging = (argItems) =>{
    return axios.post(APP_API_URL + "/Aggregate/AllByPaging", argItems, {headers : authHeader()});
}

const createAggregate = (argItems) =>{
    return axios.post(APP_API_URL + "/Aggregate", argItems, {headers : authHeader()});
}

const updateAggregate = (argItems) =>{
    return axios.put(APP_API_URL + "/Aggregate", argItems, {headers : authHeader()});
}

const deleteAggregate = (argID) =>{
    return axios.delete(APP_API_URL + "/Aggregate/" + argID, {headers : authHeader()});
}


export default {
    getAggregateById,
    getAggregateLists,
    getAggregateAllPaging,
    createAggregate,
    updateAggregate,
    deleteAggregate
}