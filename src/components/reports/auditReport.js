import MasterLayout from "../_layout/_masterLayout";
import Chart from 'react-apexcharts'
import { useEffect, useState } from "react";
import dashboardService from "../../services/dashboard.service";


const AuditReport = () => {
    const [requestParam, setRequestParam] = useState({
        "pageNumber": 0,
        "pageSize": 0,
        "sortOrderBy": "",
        "sortOrderColumn": "",
        "filters": ""
      });
      const [getReportValues, setReportValues] = useState([]);
      const [getReportCaptions, setReportCaptions] = useState([]);
      const {pageNumber,pageSize,sortOrderBy,sortOrderColumn,filters} = requestParam;
      const getAuditReportData = () =>{
        dashboardService.getJobcardAuditReport({
          pageNumber,
          pageSize,
          sortOrderBy,
          sortOrderColumn,filters
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
        }).catch((err)=>console.log(err))
      }
    
    
      useEffect(()=>{
        getAuditReportData();
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
                <div className="col">
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