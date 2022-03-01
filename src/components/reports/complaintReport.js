import MasterLayout from "../_layout/_masterLayout";
import Chart from 'react-apexcharts';

import { Loading } from "react-loading-ui"
import { Calendar } from "primereact/calendar"
import { useEffect, useState } from "react";
import reportService from "../../services/report.service";

//subash
 const ComplaintReport = () =>{
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
    reportService.getRegionDetails().then(
      (response)=>{
        console.log("region",response)
        setRegionDetails(response.data.data.data);
      }          
    ).catch((err)=>{console.log(err)})
  }
  const getAuditReportData = () =>{
    Loading(settings)
    reportService.getJobcardComplaintReport({
      pageNumber,
      pageSize,
      sortOrderBy,
      sortOrderColumn,
      filters
    }).then((response)=>{
        console.log("chart Data", response)
        setReportCaptions([]);
        setReportValues([]);
          response.data.data.map((items, idx)=>(
            setReportValues(getReportValues=>[...getReportValues,items.values])
          ))
          response.data.data.map((items, idx)=>(
           setReportCaptions(getReportCaptions=>[...getReportCaptions, items.name])
          ))
         
           

        console.log(getReportCaptions , getReportValues);
        Loading()
    }).catch((err)=>{console.log(err); Loading();})
  }
 
  const getAuditReportDataByFilters = ()=>{
    Loading(settings)
    reportService.getJobcardComplaintReport({
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
      console.log("chart Data filter", response)
      // setReportValues(response.data.data);
     
      setReportCaptions([]);
      setReportValues([]);
      response.data.data.map((items, idx)=>(
        setReportValues(getReportValues=>[...getReportValues,items.values])
      ))
      response.data.data.map((items, idx)=>(
       setReportCaptions(getReportCaptions=>[...getReportCaptions, items.name])
      ))
        console.log(getReportValues);
        Loading()
    }).catch((err)=>{console.log(err); Loading();})
  }
  const handleChange = (name) => (event) => {
    console.log(getFilter)
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
                  columnWidth : '32px',
                  borderRadius : 8
              }
          },
          dataLabels : {
              style : {
                  fontSize : '1rem',
                  colors : ["#212121"]
              }
          },
          colors: ['#d35400'],
            xaxis : {
                categories: getReportCaptions,
                labels : {
                    rotate: -45,
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

                  <button className="btn btn-sm btn-primary ms-2" onClick={getAuditReportDataByFilters}>
                    Filter
                  </button>
              </div>
            </div>
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

export default ComplaintReport;