import axios from "axios";
import { APP_API_URL } from "../BackendAccess";
import authHeader from "./auth-header";


const getStates=()=>{
    return axios.get(APP_API_URL + '/State/Dropdown/', {headers: authHeader()});
}


const getAllDealersByPaging=(argItems)=>{
    //console.log(argItems);
    return axios.post(APP_API_URL + '/Dealer/AllByPaging', argItems, {headers: authHeader()});
}

const addNewDealer = (argItems) =>{
    console.log(argItems);
    return axios.post(APP_API_URL + '/Dealer', argItems, {headers: authHeader()});
}

export default {
    getStates,
    getAllDealersByPaging,
    addNewDealer
}