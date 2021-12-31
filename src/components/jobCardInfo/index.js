import { useSelector } from "react-redux";
import MasterLayout from "../_layout/_masterLayout";
import JobCardAuditTeam from "./jobCardAuditTeam";
import JobCardDealers from "./jobCardDealers";
import JobCardOperator from "./jobCardOperator";
import JobCardCaller from "./jobCardTelecaller";

const JobCardInformation = () =>{

    const {user : currentUser} = useSelector((state)=>state.auth);

    return(
        <MasterLayout pageMap={['Dashboard','Job Card Information']}>
            {
                currentUser.data.roles.roleName === 'Dealers' ?
                    <JobCardDealers/>
                :  
                currentUser.data.roles.roleName === 'Telecallers' ?
                    <JobCardCaller/>
                :  
                currentUser.data.roles.roleName === 'Data Operator' ?
                    <JobCardOperator/>
                :
                    <JobCardAuditTeam/>
            }
            

        </MasterLayout>
    )
}

export default JobCardInformation;