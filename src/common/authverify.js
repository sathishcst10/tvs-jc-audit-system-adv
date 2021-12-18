import {history} from '../helpers/history';

const parseJwt = (token) => {
    try{
        return JSON.parse(atob(token.split(".")[1]));
    }
    catch(e){
        return null;
    }
}

const authVerify = (props) =>{
    history.listen(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        if(user){
            const decodeJwt = parseJwt(user.token);
            if(decodeJwt.exp * 1000 < Date.now()){
                props.logout();
            }
        }
    });

    return <div></div>;
};

export default authVerify;