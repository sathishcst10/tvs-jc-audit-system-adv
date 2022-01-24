import { useSelector } from "react-redux";
import MasterLayout from "../_layout/_masterLayout"
import AdminDashboard from "./adminDashboard";
import CallerDashboard from "./callerDashboard";
import DataOperatorDashboard from "./dataOperatorDashboard";
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
                currentUser.data.roles.roleName === 'Data Operator' ?
                <DataOperatorDashboard/>
                :
                <AdminDashboard/>
            }
            
            
            {/* <AdminDashboard/> */}
            
            
        </MasterLayout>
    )
}

export default Dashboard;