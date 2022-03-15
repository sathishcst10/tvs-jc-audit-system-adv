import MasterLayout from "../_layout/_masterLayout";
import Chart from 'react-apexcharts'
import { Loading } from "react-loading-ui"
import { Calendar } from "primereact/calendar"
import { useEffect, useState } from "react";
import reportService from "../../services/report.service";
import { useSelector } from "react-redux";
import commonService from "../../services/common.service";
import dealerMasterService from "../../services/dealer-master.service";

const MonthlyReport = ()=>{
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
    const [getStates, setStates] = useState([]);
      const [getDealers, setDealers] = useState([]);
      const [getFilter, setFilter] = useState({
        "endDate": new Date(),
        "startDate" : new Date(),
        "region": "",
        "states" : 0,
        "dealer" : 0,
        "compYear" : "",
        "compMonth" : "",
      });
    const [getReportCatagories, setCategory] = useState(
        [
            'Total JC',
            'Total JC Audited',
            'Call Response', 
            'JC Found OK', 
            'VPS OK',
            'Same Problem',
            'New Problem',
            'Problem Not Captured'
        ]
    )
    const [getReportValues, setReportValues] = useState([]); 
    const {selectedYear, selectedMonth, region,states,dealer, compMonth, compYear} = getFilter;
    const {pageNumber,pageSize,sortOrderBy,sortOrderColumn,filters} = requestParam;
    const [getRegionDetails, setRegionDetails] = useState([]);
    const [getYears, setYears] = useState([]);
    const [getMonths, setMonths] = useState([]);
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
    const getYearForDropdown = ()=>{
        reportService.getYear().then(
            (response)=>{
                console.log(response);
                setYears(response.data.data)
            }
        ).catch(err=>{console.log(err)})
    }
    const getMonthForDropdown = (selYear)=>{
        Loading(settings)
        reportService.getMonth(selYear).then(
            (response)=>{
                console.log(response);
                setMonths(response.data.data.data);
                Loading()
            }
        ).catch(err=>{Loading(); console.log(err)})
    }
    
    const loadMonthlyChartByFilter = ()=>{
        Loading(settings);
        reportService.getMonthlyReport({
            pageNumber,
            pageSize,
            sortOrderBy,
            sortOrderColumn,
            filters : {
                "year" : selectedYear,
                "month" : selectedMonth,
                "region" : region,
                "dealerId" : currentUser.data.roles.roleName === 'Dealers' ? currentUser.data.user.dealerID : dealer,
                "states" : states,
                "compYear" : compYear,
                "compMonth" : compMonth
            }            
        }).then((response)=>{
            console.log("MonthlyReport",response);
            let dummyArray = [];
                response.data.data.map((items, idx)=>(
                    dummyArray.push({
                        name : items.year + "-" + items.monthName,
                        data : [
                            items.totalJCReceived,
                            items.totalJCAudited,
                            items.totalCallResponse,
                            items.jcFoundOK,
                            items.vpsokNos,
                            items.sameProblemReported,
                            items.newProblemReported,
                            items.complaintToldProblemNotCaptured
                        ]
                    })
                    
                ))
                console.log(dummyArray);
                setReportValues([]);
                setReportValues(getReportValues=>[...getReportValues, dummyArray]);
                console.log(getReportValues);
            Loading();
        }).catch((err)=>{
            Loading()
            console.log(err);
        })
    }

    const handleChange = (name) => (event) => {
        console.log(getFilter)        
        const value = event.target.value;
        if(name === 'selectedYear'){
            getMonthForDropdown(value);
        }

        if(name === 'region'){
            if(value === ""){
              getAllStates();
            }else{
              getStateByRegion(value);
            }
          }else if(name === 'states'){
            if(value === ""){
              getAllDealer();
            }else{
              getDealerByState(value)
            }
          }  


        setFilter({
            ...getFilter,
            [name] : value
        });        
    }
    
    useEffect(()=>{
        getRegions();
        getYearForDropdown();
        getAllStates();
        getAllDealer();
    },[])


    const state = {
          
        series: getReportValues[0],
        options: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            },
          },
          dataLabels : {
                style : {
                    fontSize : '1rem',
                    colors : ["#212121"]
                }
            },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: getReportCatagories,
            labels : {
                rotate: 0,
                style : {
                    fontSize : '0.8rem',
                    fontWeight : 600
                }
            }
          },
          yaxis: {
            title: {
              text: 'Counts'
            },
            labels : {            
                style : {
                    fontSize : '0.8rem',
                    fontWeight : 600
                }
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return  val + " Count"
              }
            }
          }
        },
      
      
      };

    return(
        <MasterLayout>
            <div className="row g-1">
                <div className="col-12">
                    <div className="d-flex justify-content-end p-1">
                        <select
                            className="form-select select-custom ms-1"
                            value={selectedYear}
                            name="selectedYear"
                            onChange={handleChange("selectedYear")}
                        >
                            <option value="">--Select Year--</option>
                            {
                                getYears.map((items,idx)=>(
                                    <option value={items.year} key={idx}>{items.year}</option>
                                ))
                            }
                        </select>
                        <select
                            className="form-select select-custom ms-1"
                            value={selectedMonth}
                            name="selectedMonth"
                            onChange={handleChange("selectedMonth")}
                        >
                            <option value="">--Select Month--</option>
                            {
                                getMonths.map((items,idx)=>(
                                    <option value={items.id} key={idx}>{items.text}</option>
                                ))
                            }
                        </select>
                        <span className="p-1"><i class="bi bi-chevron-double-right"></i></span>
                        <select
                            className="form-select select-custom ms-1"
                            value={compYear}
                            name="compYear"
                            onChange={handleChange("compYear")}
                        >
                            <option value="">--Select Year--</option>
                            {
                                getYears.map((items,idx)=>(
                                    <option value={items.year} key={idx}>{items.year}</option>
                                ))
                            }
                        </select>
                        
                        <select
                            className="form-select select-custom ms-1"
                            value={compMonth}
                            name="compMonth"
                            onChange={handleChange("compMonth")}
                        >
                            <option value="">--Select Month--</option>
                            {
                                getMonths.map((items,idx)=>(
                                    <option value={items.id} key={idx}>{items.text}</option>
                                ))
                            }
                        </select>
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
                        <button className="btn btn-sm btn-primary ms-2" onClick={loadMonthlyChartByFilter}>
                            Filter
                        </button>
                    </div>
                </div>
                <div className="col">
                    <div className='card card-shadow border-0 custom-radius'>
                        <h6 className='card-header'>
                            Monthly Report
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

export default MonthlyReport;