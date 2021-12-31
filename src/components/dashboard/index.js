import { useSelector } from "react-redux";
import MasterLayout from "../_layout/_masterLayout"
import AdminDashboard from "./adminDashboard";
import CallerDashboard from "./callerDashboard";
import DealerDashboard from "./dealerDashboard";

const Dashboard = ()=>{

    const {user : currentUser} = useSelector((state)=>state.auth);
    console.log(currentUser.data.roles.roleName);

    return(
        <MasterLayout pageMap={['Dashboard']}>
            {
             currentUser.data.roles.roleName === 'Telecallers' ?
                <CallerDashboard/>
                :
                currentUser.data.roles.roleName === 'Dealers' ?
                <DealerDashboard/>
                :
                <></>                
            }
            
            
            {/* <AdminDashboard/> */}
            
            
        </MasterLayout>
    )
}

export default Dashboard;