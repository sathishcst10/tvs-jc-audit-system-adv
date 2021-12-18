import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE
 } from './types';

 import AuthService from '../services/auth.services';

 export const login  = (userName, password)=>(dispatch)  =>{
     return AuthService.login(userName, password).then(
         (data)=>{
             dispatch({
                 type: LOGIN_SUCCESS,
                 payload : {user : data},
             });

             return Promise.resolve();
         },
         (error)=>{
             const message = (
                error.message && 
                error.response.data &&
                error.response.data.message) || 
                error.message ||
                error.toString();
                
                dispatch({
                    type: LOGIN_FAIL
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload : message
                });

                return Promise.reject();
            }
     );
 };

 export const logout=()=> (dispatch)=>{
    AuthService.logout();
    dispatch({
        type : LOGOUT
    });
 }