import MasterLayout from "../_layout/_masterLayout";
import Chart from 'react-apexcharts'
import { Loading } from "react-loading-ui"
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import dashboardService from "../../services/dashboard.service";
import { start } from "@popperjs/core";


const AuditReport = () => {
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
      const [getFilter, setFilter] = useState({
        "endDate": new Date(),
        "startDate" : new Date(),
        "region": ""
      });
      const {endDate, startDate, region} = getFilter;
      const {pageNumber,pageSize,sortOrderBy,sortOrderColumn,filters} = requestParam;
      const [getRegionDetails, setRegionDetails] = useState([]);

      const getRegions = ()=>{
        dashboardService.getRegionDetails().then(
          (response)=>{
            console.log("region",response)
            setRegionDetails(response.data.data.data);
          }          
        ).catch((err)=>{console.log(err)})
      }
      const getAuditReportData = () =>{
        Loading(settings)
        dashboardService.getJobcardAuditReport({
          pageNumber,
          pageSize,
          sortOrderBy,
          sortOrderColumn,
          filters
        }).then((response)=>{
          console.log("chart Data", response)
          setReportValues([
              response.data.data.data[0].totalJCReceived, 
              response.data.data.data[0].totalJCAudited,
              response.data.data.data[0].jcFoundOK,
              response.data.data.data[0].vpsokNos,
              response.data.data.data[0].sameProblemReported,
              response.data.data.data[0].newProblemReported,
              response.data.data.data[0].complaintToldProblemNotCaptured
            ]);
          setReportCaptions(
            [
              "Total JC Received",
              "Total JC Audited",
              "Total JC Found OK",
              "VPS OK No's",
              "Same Problem Reported",
              "New Problem Reported",
              "Customer Told Problem not Captured"
            ]
          )
            console.log(getReportValues);
            Loading()
        }).catch((err)=>{console.log(err); Loading();})
      }
    
      const getAuditReportDataByFilters = ()=>{
        Loading(settings)
        dashboardService.getJobcardAuditReport({
          pageNumber,
          pageSize,
          sortOrderBy,
          sortOrderColumn,
          filters : {
           "startDate" : new Date(startDate).toLocaleDateString(),
           "endDate" : new Date(endDate).toLocaleDateString(),
           "region" : region,
           "dealerId" : 0
          }
        }).then((response)=>{
          console.log("chart Data", response)
          setReportValues([
              response.data.data.data[0].totalJCReceived, 
              response.data.data.data[0].totalJCAudited,
              response.data.data.data[0].jcFoundOK,
              response.data.data.data[0].vpsokNos,
              response.data.data.data[0].sameProblemReported,
              response.data.data.data[0].newProblemReported,
              response.data.data.data[0].complaintToldProblemNotCaptured
            ]);
          setReportCaptions(
            [
              "Total JC Received",
              "Total JC Audited",
              "Total JC Found OK",
              "VPS OK No's",
              "Same Problem Reported",
              "New Problem Reported",
              "Customer Told Problem not Captured"
            ]
          )
            console.log(getReportValues);
            Loading()
        }).catch((err)=>{console.log(err); Loading();})
      }
      const handleChange = (name) => (event) => {
        console.log(getFilter)
        debugger
        const value = event.target.value;
        setFilter({
            ...getFilter,
            [name] : value
        });
        console.log(endDate, startDate)
      }
      useEffect(()=>{
        getAuditReportData();
        getRegions();
      },[])
      const state = {
        options: {
          chart: {
            id: "basic-bar"
          },
         
          plotOptions : {
              bar : {
                  columnWidth : '20px',
                  borderRadius : 8
              }
          },
          dataLabels : {
              style : {
                  fontSize : '1rem'
              }
          },
            xaxis : {
                categories: getReportCaptions,
                labels : {
                    rotate: 0,
                    style : {
                        fontSize : '0.8rem',
                        fontWeight : 600
                    }
                }
            },
            yaxis : {
                labels : {            
                    style : {
                        fontSize : '0.8rem',
                        fontWeight : 600
                    }
                }
            }
        },
        series: [
          {
            name: "series-1",
            data: getReportValues
          }
        ]
      };
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
                        className="date-picker-text"
                      />
                      <span className="px-1 py-2 ">to</span>
                      <Calendar
                        id="basicTo"                     
                        value={endDate} 
                        name="endDate"
                        onChange={handleChange("endDate")}
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
                            <Chart
                                options={state.options}
                                series={state.series}
                                type="bar"
                                height="520px"
                            />      
                        </div>
                    </div>  
                </div>
            </div>
        </MasterLayout>
    )
}

export default AuditReport;