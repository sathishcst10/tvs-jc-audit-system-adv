import axios from "axios";
import { APP_API_URL } from "../BackendAccess";

// const login = async (userName, password) =>{
//     const response = await axios
//         .post(`${APP_API_URL}/Identity/Authenticate`, { userName, password, forceLogin : true });
//         console.log(response);
//     if (response.data.data.token) {
//         debugger;
//         localStorage.setItem("user", JSON.stringify(response.data.data));
//     }
//     return response.data.data;
// }

const login = (username, password) => {
  
    return axios
      .post(APP_API_URL + "/Identity/Authenticate", {
        username,
        password,
        forceLogin : true
      })
      .then((response) => {
        if (response.data.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };

const logout = () =>{
    localStorage.removeItem("user");
}

export default {login, logout};