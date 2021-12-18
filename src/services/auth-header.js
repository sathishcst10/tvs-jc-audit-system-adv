export default function authHeader(){
    const user = JSON.parse(localStorage.getItem('user'));

    if(user && user.data.token){
        return {
            Authorization: "bearer " + user.data.token
        }
    }
    else{
        return {};
    }
}