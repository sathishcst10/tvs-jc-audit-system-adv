import axios from "axios";
import { APP_API_URL } from "../BackendAccess";
import authHeader from "./auth-header";

const getUserRoles = () =>{
    return axios.get(APP_API_URL + "/Role/Dropdown/", {headers : authHeader()});
}

const getUserById = (userID)=>{
    return axios.get(APP_API_URL + "/user/" + userID, {headers : authHeader()})
}

const getAllUsersByPaging=(argItems)=>{
    return axios.post(APP_API_URL + "/User/AllByPaging", argItems, {headers : authHeader()})
}

const createUser = (argItems)=>{
    return axios.post(APP_API_URL + "/User", argItems, {headers : authHeader()});
}

const updateUser = (argItems) =>{
    return axios.put(APP_API_URL + "/User", argItems, {headers : authHeader()});
}

const deleteUser = (userID) =>{
    return axios.delete(APP_API_URL + "/User/" + userID, {headers : authHeader()});
}

const changeUserPassword = (argItems)=>{
    return axios.post(APP_API_URL + "User/ChangePassword", argItems, {headers : authHeader()});
}

const resetUserPassword = (argItems)=>{
    return axios.post(APP_API_URL + "/ResetPassword", argItems, {headers : authHeader()});
}

export default {
    getUserById,
    getUserRoles,
    getAllUsersByPaging,
    createUser,
    updateUser,
    deleteUser,
    changeUserPassword,
    resetUserPassword
}