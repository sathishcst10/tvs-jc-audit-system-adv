import axios from "axios";
import { APP_API_URL } from "../BackendAccess";
import authHeader from "./auth-header";



const uploadJobCard = (argItems) =>{
    return axios.post(APP_API_URL + "/Document", argItems, 
        {
            headers :  authHeader()              
                   
        }
    )
}


export default {
    uploadJobCard
}