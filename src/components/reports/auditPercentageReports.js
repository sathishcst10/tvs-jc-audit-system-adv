import MasterLayout from "../_layout/_masterLayout";
import Chart from 'react-apexcharts'
import { Loading } from "react-loading-ui"
import { Calendar } from "primereact/calendar"
import { useEffect, useState } from "react";
import reportService from "../../services/report.service";
import { useSelector } from "react-redux";
import commonService from "../../services/common.service";
import dealerMasterService from "../../services/dealer-master.service";

//subash
const AuditPercentageReport = () => {
      const { user: currentUser } = useSelector((state) => state.auth);
      const settings = {
        title: "",
        text: "",
        progress: false,
        progressedClose: false,
        theme: "dark",
      };
      const [requestParam, setRequestParam] = useState({
        "pageNumber": 0,
        "pageSize": 0,
        "sortOrderBy": "",
        "sortOrderColumn": "",
        "filters": ""
      });
      const [getReportValues, setReportValues] = useState([]);
      const [getReportCaptions, setReportCaptions] = useState([]);
      const [getStates, setStates] = useState([]);
      const [getDealers, setDealers] = useState([]);
      const [getFilter, setFilter] = useState({
        "endDate": new Date(),
        "startDate" : new Date(),
        "region": "",
        "states" : 0,
        "dealer" : 0
      });
      const {endDate, startDate, region, states,dealer} = getFilter;
      const {pageNumber,pageSize,sortOrderBy,sortOrderColumn,filters} = requestParam;
      const [getRegionDetails, setRegionDetails] = useState([]);

      const getRegions = ()=>{
        reportService.getRegionDetails().then(
          (response)=>{
            console.log("region",response)
            setRegionDetails(response.data.data.data);
          }          
        ).catch((err)=>{console.log(err)})
      }
      const getAllStates = ()=>{
        dealerMasterService.getStates().then(
          (response)=>{
            console.log("getStates", response);
            setStates(response.data.data.data);
          }
        ).catch((err)=>{console.error(err)});
      }
      const getAllDealer = ()=>{
        dealerMasterService.getDealerForDropdown(true).then(
          (response)=>{
            console.log(response);
            setDealers(response.data.data.data)
          }
        ).catch((err)=>{console.error(err)});
      }
      const getDealerByState = (argId)=>{
        dealerMasterService.getDealerByState(argId).then(
          (response)=>{
            setDealers(response.data.data.data);
          }
        ).catch((err)=>{console.error(err)})
      }
      const getStateByRegion = (argID)=>{
        commonService.getStatesByRegion(argID).then(
          (response)=>{
            console.log("getStates", response);
            setStates(response.data.data.data);
          }
        ).catch((err)=>{console.error(err)});
      }
      const getAuditReportData = () =>{
        Loading(settings)
        reportService.getJobcardAuditPercentageReport({
          pageNumber,
          pageSize,
          sortOrderBy,
          sortOrderColumn,
          filters :{
            "dealerId" : currentUser.data.roles.roleName === 'Dealers' ? currentUser.data.user.dealerID : 0
          }
        }).then((response)=>{
          console.log("chart Data", response)
          setReportValues([
              response.data.data.data[0]
            ]);
          setReportCaptions(
            [
              "Total JC",
              "Total JC Audited",
              "Call Response",
              "JC Found OK",
              "VPS OK",
              "Same Problem",
              "New Problem",
              "Problem not Captured"
            ]
          )
            console.log(getReportValues);
            Loading()
        }).catch((err)=>{console.log(err); Loading();})
      }
    
      const getAuditReportDataByFilters = ()=>{
        Loading(settings)
        reportService.getJobcardAuditReport({
          pageNumber,
          pageSize,
          sortOrderBy,
          sortOrderColumn,
          filters : {
           "startDate" : new Date(startDate).toLocaleDateString(),
           "endDate" : new Date(endDate).toLocaleDateString(),
           "region" : region,
           "dealerId" : currentUser.data.roles.roleName === 'Dealers' ? currentUser.data.user.dealerID : dealer,
           "states" : states
          }
        }).then((response)=>{
          console.log("chart Data", response)
          setReportValues([
              response.data.data.data[0].totalJCReceived, 
              response.data.data.data[0].totalJCAudited,
              response.data.data.data[0].totalCallResponse,
              response.data.data.data[0].jcFoundOK,
              response.data.data.data[0].vpsokNos,
              response.data.data.data[0].sameProblemReported,
              response.data.data.data[0].newProblemReported,
              response.data.data.data[0].complaintToldProblemNotCaptured
            ]);
          setReportCaptions(
            [
              "Total JC",
              "Total JC Audited",
              "Call Response",
              "JC Found OK",
              "VPS OK",
              "Same Problem",
              "New Problem",
              "Problem not Captured"
            ]
          )
            console.log(getReportValues);
            Loading()
        }).catch((err)=>{console.log(err); Loading();})
      }
      const handleChange = (name) => (event) => {
        console.log(getFilter)
        const value = event.target.value;

        if(name === 'region'){
          if(value == ""){
            getAllStates();
          }else{
            getStateByRegion(value);
          }
        }else if(name === 'states'){
          if(value == ""){
            getAllDealer();
          }else{
            getDealerByState(value)
          }
        } 

        setFilter({
            ...getFilter,
            [name] : value
        });
        console.log(endDate, startDate)
      }
      useEffect(()=>{
        console.log(currentUser);
        getAuditReportData();
        getRegions();
        getAllStates();
        getAllDealer();
      },[])
     
    return(
        <MasterLayout>
            <div className='row g-1'>
                <div className="col-12">
                  <div className="d-flex justify-content-end p-1">
                      <Calendar
                        id="basicFrom"    
                        value={startDate}                  
                        name="startDate"
                        onChange={handleChange("startDate")}
                        placeholder="DD/MM/YYYY"
                        className="date-picker-text"
                      />
                      <span className="px-1 py-2 ">to</span>
                      <Calendar
                        id="basicTo"                     
                        value={endDate} 
                        name="endDate"
                        onChange={handleChange("endDate")}
                        placeholder="DD/MM/YYYY"
                        className="date-picker-text"                      
                      />                      
                    
                      <select 
                        className="form-select select-custom ms-1"
                        value={region}
                        name="region"
                        onChange={handleChange("region")}
                      >
                        <option value="">--Select Region--</option>
                        {
                          getRegionDetails.map((items, idx)=>(
                            <option value={items.text} key={idx}>{items.text}</option>
                          ))
                        }
                      </select>
                      <select 
                        className="form-select select-custom ms-1"
                        value={states}
                        name="states"
                        onChange={handleChange("states")}>
                          <option value="">--Select State--</option>
                          {
                          getStates.map((items, idx)=>(
                            <option value={items.id} key={idx}>{items.text}</option>
                          ))
                        }
                      </select>
                      <select 
                        className="form-select select-custom ms-1"
                        value={dealer}
                        name="dealer"
                        onChange={handleChange("dealer")}>
                          <option value="">--Select Dealer--</option>
                          {
                          getDealers.map((items, idx)=>(
                            <option value={items.id} key={idx}>{items.text}</option>
                          ))
                        }
                      </select>
                      <button className="btn btn-sm btn-primary ms-2" onClick={getAuditReportDataByFilters}>
                        Filter
                      </button>
                  </div>
                </div>
                <div className="col-12">
                    <div className='card card-shadow border-0 custom-radius'>
                        <h6 className='card-header'>
                            Audit Report
                        </h6>
                        <div className='card-body'>
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered table-custom table-custom-2">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Region</th>
                                            <th>Total JC</th>
                                            <th>Total JC Audited</th>
                                            <th>Total JC Audit(%)</th>
                                            <th>Call Response</th>
                                            <th>Call Response(%)</th>
                                            <th>JC Found OK</th>
                                            <th>JC Found OK(%)</th>
                                            <th>VPS OK</th>
                                            <th>VPS OK(%)</th>
                                            <th>Same Problem</th>
                                            <th>Same Problem(%)</th>
                                            <th>New Problem</th>
                                            <th>New Problem(%)</th>
                                            <th>Problem Not Captured</th>
                                            <th>Problem Not Captured(%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getReportValues.map((items, idx)=>(
                                                <tr key={idx}>
                                                    <td>
                                                        {items.region}
                                                    </td>
                                                    <td>
                                                        {items.totalJCReceived}
                                                    </td>
                                                    <td>
                                                        {items.totalJCAudited}
                                                    </td>
                                                    <td>
                                                        {items.totalJCAuditedPercentage}
                                                    </td>
                                                    <td>
                                                        {items.totalCallResponse}
                                                    </td>
                                                    <td>
                                                        {items.totalCallResponsePercentage}
                                                    </td>
                                                    <td>
                                                        {items.jcFoundOK}
                                                    </td>
                                                    <td>
                                                        {items.jcFoundOKPercentage}
                                                    </td>
                                                    <td>
                                                        {items.vpsokNos}
                                                    </td>
                                                    <td>
                                                        {items.vpsokNosPercentage}
                                                    </td>
                                                    <td>
                                                        {items.sameProblemReported}
                                                    </td>
                                                    <td>
                                                        {items.sameProblemReportedPercentage}
                                                    </td>
                                                    <td>
                                                        {items.newProblemReported}
                                                    </td>
                                                    <td>
                                                        {items.newProblemReportedPercentage}
                                                    </td>
                                                    <td>
                                                        {items.complaintToldProblemNotCaptured}
                                                    </td>
                                                    <td>
                                                        {items.complaintToldProblemNotCapturedPercentage}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                </table>
                            </div> 
                        </div>
                    </div>  
                </div>
            </div>
        </MasterLayout>
    )
}

export default AuditPercentageReport;