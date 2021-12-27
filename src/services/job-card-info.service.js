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
    //debugger
    return axios.post(APP_API_URL + "/JobCard", argItems, {headers : authHeader()});
}


export default {
    uploadJobCard,
    createJobCard
}