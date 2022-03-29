//subash
import { Link, useLocation } from "react-router-dom";
import Chart from 'react-apexcharts'
import { Toast } from "primereact/toast";
import dashboardService from "../../services/dashboard.service";
import { Loading } from "react-loading-ui";
import { useEffect, useRef, useState } from "react";

const CallerDashboard = () =>{ 
   const toast = useRef(null);
    const settings = {
        title: "",
        text: "",
        progress: false,
        progressedClose: false,
        theme: "dark",
    };
  const [dashboardDetails, setdashboardDetails] = useState({
    TotalJC: 0,
    TodayJC: 0,
    AuditCompletedJC:0,
    PendingJC:0,
    FeedbackCompletedJC:0
});
const { TotalJC, TodayJC ,AuditCompletedJC,PendingJC,FeedbackCompletedJC} = dashboardDetails;
const [getVPSCount, setVPSCount] = useState([]);
const [getNewPbmCount, setNewPbmCount] = useState([]);
const [getSamePbmCount, setSamePbmCount] = useState([]);
const [getCallResponseLabels, setCallResponseLabels] = useState([]);
const [getCallResponseCounts, setCallResponseCounts] = useState([]);
const [getJCProcessStatusCount, setJCProcessStatusCount] = useState([]);
const [getJobCardStatus, setJobCardStatus] = useState([]);
const [getTelecallerCatogory,setTelecallerCatogory] = useState([]);
const [getTelecallerData,setTelecallerData] = useState([]);
const getAdminDashboardList = () => {
  Loading(settings);
  dashboardService.getAdminDashboardData(true).then(
      (response) => {        
          setdashboardDetails({
            ...dashboardDetails,           
            TotalJC:response.data.data.data[0].totalJC,
            TodayJC:response.data.data.data[0].todayJC,
            AuditCompletedJC:response.data.data.data[0].auditCompletedJC,
            PendingJC:response.data.data.data[0].pendingJC,
            FeedbackCompletedJC:response.data.data.data[0].feedbackCompletedJC         
        })
        Loading();       
      }
  ).catch((err) => {
      console.log(err);
      Loading()
  })
}

const getTeleCallerAssignData = ()=>{
  dashboardService.getTeleCallerAssignChart(true).then(
    (response)=>{
      
      var tempArray =[];
      var tempArray2 = [];
      console.log("Res-TeleCallerAssign", response);
      response.data.data.data.map((items,idx)=>{        
        tempArray.push(items.values);
        tempArray2.push(items.name);
      })
      setTelecallerCatogory(tempArray2);
      setTelecallerData(tempArray);
      console.log(tempArray, tempArray2);
      console.log(getTelecallerCatogory, getTelecallerData);
    }
  ).catch((err)=>{
    console.error(err);
  })
}

const getJCProcessStatusChart = ()=>{
  dashboardService.getJCProcessStatus(true).then(
    (response)=>{
      console.log("Res-OPen/WIP Status", response);
      setJCProcessStatusCount([
        response.data.data.data[0].wipCount,
        response.data.data.data[0].openCount
      ])
    }
  ).catch((err)=>{
    console.error(err)
  })
}

const getVPSChartDetails = ()=>{
  dashboardService.getVPSChartData(true).then(
    (response)=>{
      console.log("Res-VPS Chart", response);
      //setVPSCount([]);     
      setVPSCount([
        response.data.data.data[0].values,
        response.data.data.data[1].values
      ])
      console.log(getVPSCount);     
    }
  ).catch((err)=>console.error(err));
}

const getNewProblemDataChart = ()=>{
  dashboardService.getNewProblemData(true).then(
    (response)=>{
      console.log("Res-New Problem", response);
      setNewPbmCount([
        response.data.data.data[0].values,
        response.data.data.data[1].values
      ])
    }
  ).catch((err)=>{console.error(err)})
}

const getSameProblemDataChart = ()=>{
  dashboardService.getSameProblemData(true).then(
    (response)=>{
      console.log("Res-Same Problem", response)
      setSamePbmCount([
        response.data.data.data[0].values,
        response.data.data.data[1].values
      ])
    }
  ).catch((err)=>{console.error(err)})
}

const getCallReponseDataChart =()=>{
  dashboardService.getCallReponseData(true).then(
    (response)=>{
      console.log("Res-Call Response",response);
      setCallResponseLabels([]);
      setCallResponseCounts([])
      response.data.data.data.map((items, idx)=>{
        setCallResponseLabels(getCallResponseLabels=>[...getCallResponseLabels,items.name]);
        setCallResponseCounts(getCallResponseLabels=>[...getCallResponseLabels,items.values]);
      })
      console.log(getCallResponseCounts, getCallResponseLabels);
    }
  ).catch((err)=>{console.error(err)})
}

const getJobCardStatusChart = () =>{
  dashboardService.getJobCardStatus(true).then(
    (response)=>{
      console.log("Res-JobCardStatus", response);
      // setTimeout(() => {
        var temp_array =[];
        response.data.data.data.map((items, idx)=>{
          temp_array.push(items.values);
        })
        setJobCardStatus(temp_array)  
        console.log(getJobCardStatus)
      // }, 1500);
      
    }
  ).catch((err)=>{console.error(err)})
}
    
      const state = {
        options: {
          chart: {
            id: "basic-bar"
          },
          plotOptions : {
            bar : {
                columnWidth : '8px',
                borderRadius : 8
            }
          },
          dataLabels : {
            style : {
                fontSize : '1rem',
                colors : ["#212121"]
            }
        },
          xaxis: {
            categories: getTelecallerCatogory,
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
        series: [{data:getTelecallerData}]
      };

      const lineState = {          
        series: [{
            name: "Desktops",
            data: [4, 12, 8, 6, 3, 5, 9]
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: '',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['18-Jan', '19-Jan', '20-Jan', '21-Jan', '22-Jan', '23-Jan', '24-Jan'],
          }
        },
      
      
      };

      const allState = {
          
        series: [{
          name: 'JC Upload',
          data: [44, 55, 57, 56, 61, 58, 63]
        }, {
          name: 'Data Entry',
          data: [76, 85, 101, 98, 87, 105, 91]
        }, {
          name: 'Telecalls',
          data: [35, 41, 36, 26, 45, 48, 52]
        }],
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
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['18-Jan', '19-Jan', '20-Jan', '21-Jan', '22-Jan', '23-Jan', '24-Jan'],
          },
          yaxis: {
            title: {
              text: '(Counts)'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return  val
              }
            }
          }
        },
      
      
      };
      const feedbackState = {
          
        series: getJCProcessStatusCount,
        options: {
          chart: {
            type: 'pie',
          },
          legend: {
              position : "bottom",
              fontWeight : 600
          },
          dataLabels : {
            style : {
                fontSize : '0.9rem',
                colors : ["#212121"]
            },
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: '#000',
              opacity: 0.0
            }
          },
          colors: ['#f1c40f', '#d35400'],
          labels: ['WIP', 'OPEN'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      
      
      };

      const JCState = {
          
        series: getJobCardStatus,
        options: {
          chart: {
            type: 'pie',
          },
          legend: {
              position : "bottom",
              fontWeight : 600
          },
          dataLabels : {
            style : {
                fontSize : '0.9rem',
                colors : ["#212121"]
            },
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: '#000',
              opacity: 0.0
            }
          },         
          colors: ['#05c46b','#f39c12'],
          labels: ['Closed','Live'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      
      
      };

      const VPSState = {
          
        series: getVPSCount,
        options: {
            chart: {
              type: 'donut'              
            },
            colors: ['#e74c3c', '#27ae60'],
            legend: {
                position : "bottom",
                fontWeight : 600
            },
            dataLabels : {
              style : {
                  fontSize : '0.9rem',
                  colors : ["#212121"]
              },
              dropShadow: {
                enabled: false,
                top: 1,
                left: 1,
                blur: 1,
                color: '#000',
                opacity: 0.0
              }
            },
            labels: ['NOT OK', 'OK'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },   
      
      };
      const NewPbmState = {
          
        series: getNewPbmCount,
        options: {
            chart: {
              type: 'donut',
            },
            colors: [ '#27ae60','#e74c3c'],
            legend: {
                position : "bottom",
                fontWeight : 600
            },
            dataLabels : {
              style : {
                  fontSize : '0.9rem',
                  colors : ["#212121"]
              },
              dropShadow: {
                enabled: false,
                top: 1,
                left: 1,
                blur: 1,
                color: '#000',
                opacity: 0.0
              }
            },
            labels: ['No', 'YES'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },   
      
      };
      const SamePbmState = {
          
        series: getSamePbmCount,
        options: {
            chart: {
              type: 'donut',
            },
            colors: ['#2ecc71','#e74c3c'],
            legend: {
                position : "bottom",
                fontWeight : 600
            },
            dataLabels : {
              style : {
                  fontSize : '0.9rem',
                  colors : ["#212121"]
              },
              dropShadow: {
                enabled: false,
                top: 1,
                left: 1,
                blur: 1,
                color: '#000',
                opacity: 0.0
              }
            },
            labels: ['NO', 'YES'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },   
      
      };
      const CallResState = {
          
        series: getCallResponseCounts,
        options: {
            chart: {
              type: 'donut',
            },
            
            legend: {
                position : "bottom",
                fontWeight : 600
            },
            dataLabels : {
              style : {
                  fontSize : '0.9rem',
                  colors : ["#212121"]
              },
              dropShadow: {
                enabled: false,
                top: 1,
                left: 1,
                blur: 1,
                color: '#000',
                opacity: 0.0
              }
            },
            labels: getCallResponseLabels,
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },   
      
      };
      useEffect(() => {
        getAdminDashboardList();
        getVPSChartDetails();
        getNewProblemDataChart();
        getSameProblemDataChart();
        getCallReponseDataChart();
        getJCProcessStatusChart();
        getTeleCallerAssignData();
        getJobCardStatusChart();
    },[])

    return(
         <>
         
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5  g-1">
            
               
                <div className='col px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <div className="card-body">
                            <div className='row d-block d-xl-flex align-items-center'>
                                <div className='col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center'>
                                    <div className='icon-shape icon-primary'>
                                        <i className="bi bi-file-ruled"></i>
                                    </div>
                                </div>
                                <div className='col-12 col-xl-7 px-xl-0'>
                                    <p className="mb-4">Total JobCards</p>
                                  
                                    <p className="fs-30 mb-1"> {TotalJC} </p>   
                                   
                                </div>
                            </div>
                                                   
                        </div>
                    </div>
                </div>
                <div className='col px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <div className='card-body'>
                            <div className='row d-block d-xl-flex align-items-center'>
                                <div className='col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center'>
                                    <div className='icon-shape icon-dark'>
                                        <i className="bi bi-calendar-check"></i>
                                    </div>
                                </div>
                                <div className='col-12 col-xl-7 px-xl-0'>
                                    <p className="mb-4">Today Entries</p>
                                    <p className="fs-30 mb-1">{TodayJC}</p>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <div className='card-body'>
                            <div className='row d-block d-xl-flex align-items-center'>
                                <div className='col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center'>
                                    <div className='icon-shape icon-success'>
                                        <i className="bi bi-check-circle"></i>
                                    </div>
                                </div>
                                <div className='col-12 col-xl-7 px-xl-0'>
                                    <p className="mb-4">Completed</p>
                                    <p className="fs-30 mb-1">{AuditCompletedJC}</p>   
                                </div>
                            </div>                           
                        </div>
                    </div>
                </div>
                <div className='col  px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <div className='card-body'>
                            <div className='row d-block d-xl-flex align-items-center'>
                                <div className='col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center'>
                                    <div className='icon-shape icon-danger'>
                                        <i className="bi bi-clock"></i>
                                    </div>
                                </div>
                                <div className='col-12 col-xl-7 px-xl-0'>
                                    <p className="mb-4">WIP/Open</p>
                                    <p className="fs-30 mb-1">{PendingJC}</p>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
                <div className='col  px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <div className='card-body'>
                            <div className='row d-block d-xl-flex align-items-center'>
                                <div className='col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center'>
                                        <div className='icon-shape icon-dark'>
                                            <i className="bi bi-telephone"></i>
                                        </div>
                                </div>
                                <div className='col-12 col-xl-7 px-xl-0'>
                                    <p className="mb-4">Feedback Completed</p>
                                    <p className="fs-30 mb-1">{FeedbackCompletedJC}</p>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>     
            
            </div>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4 g-1'>
                <div className='col mt-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius h-100'>
                        <h6 className='card-header'>
                            Vehicle Performance after Service(VPS)
                        </h6>
                        <div className='card-body'>
                            <Chart
                                options={VPSState.options} 
                                series={VPSState.series} 
                                type="donut" 
                                height={350 + Math.floor(Math.random() * 2) + 1} 
                            />  
                        </div>
                    </div>  
                </div>
                <div className='col mt-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <h6 className='card-header'>
                            New Problem After Service
                        </h6>
                        <div className='card-body'>
                            <Chart
                                options={NewPbmState.options} 
                                series={NewPbmState.series} 
                                type="donut" 
                                height={350 + Math.floor(Math.random() * 2) + 1} 
                            />         
                        </div>
                    </div>  
                </div>

                <div className='col mt-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <h6 className='card-header'>
                            Same Problem in JC
                        </h6>
                        <div className='card-body'>
                            <Chart
                                options={SamePbmState.options} 
                                series={SamePbmState.series} 
                                type="donut" 
                                height={350 + Math.floor(Math.random() * 2) + 1} 
                            />          
                        </div>
                    </div>  
                </div>

                <div className='col mt-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <h6 className='card-header'>
                            Call Response by Customer
                        </h6>
                        <div className='card-body'>
                            <Chart
                                options={CallResState.options} 
                                series={CallResState.series} 
                                type="donut" 
                                height={350 + Math.floor(Math.random() * 2) + 1}
                            />         
                        </div>
                    </div>  
                </div>
            </div>
            <div className='row g-1'>
                <div className='col-md-6 mt-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <h6 className='card-header'>
                            Today's Telecallers Allocation
                        </h6>
                        <div className='card-body'>
                            <Chart
                              options={state.options}
                              series={state.series}
                              type="bar"
                              height="320px"
                            />      
                        </div>
                    </div>  
                </div>
                <div className='col-md-3 mt-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius h-100'>
                        <h6 className='card-header'>
                            WIP/OPEN
                        </h6>
                        <div className='card-body'>
                            <Chart
                                options={feedbackState.options} 
                                series={feedbackState.series} 
                                type="pie" 
                                height={350 + Math.floor(Math.random() * 2) + 1} 
                            />       
                        </div>
                    </div>  
                </div>
                <div className='col-md-3 mt-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius h-100'>
                        <h6 className='card-header'>
                            Jobcard Status
                        </h6>
                        <div className='card-body'>
                            <Chart
                                options={JCState.options} 
                                series={JCState.series} 
                                type="pie" 
                                height={350 + Math.floor(Math.random() * 2) + 1} 
                            />  
                        </div>
                    </div>  
                </div>
            </div>

            <div className='row g-1 d-none'>
                <div className='col-md-4 mt-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius h-100'>
                        <h6 className='card-header'>
                            Jobcard Status
                        </h6>
                        <div className='card-body'>
                            <Chart
                                options={JCState.options} 
                                series={JCState.series} 
                                type="pie" 
                                height={350} 
                            />  
                        </div>
                    </div>  
                </div>
                <div className='col-md-8 mt-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <h6 className='card-header'>
                            Last 7 Days Entry's
                        </h6>
                        <div className='card-body'>
                            <Chart
                                options={allState.options}
                                series={allState.series}
                                type="bar"
                                height="320px"
                            />         
                        </div>
                    </div>  
                </div>
            </div>

            

            <div className='row g-1 d-none'>
                <div className='col-6 my-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <h6 className='card-header'>
                            Dealers Top Ratings
                        </h6>
                        <div className='card-body'>
                            <p>Dealer Name 1 - Dealer Location - Zone</p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
                            </div>
                            <p>Dealer Name 1 - Dealer Location - Zone</p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: "65%"}} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">65%</div>
                            </div>
                            <p>Dealer Name 1 - Dealer Location - Zone</p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: "55%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">55%</div>
                            </div>
                            <p>Dealer Name 1 - Dealer Location - Zone</p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: "53%"}} aria-valuenow="53" aria-valuemin="0" aria-valuemax="100">53%</div>
                            </div>
                            <p>Dealer Name 1 - Dealer Location - Zone</p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: "52%"}} aria-valuenow="52" aria-valuemin="0" aria-valuemax="100">52%</div>
                            </div>
                        </div>
                    </div>  
                </div>
                <div className='col-6 my-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius h-100'>
                        <h6 className='card-header'>
                            Notifications
                        </h6>
                        <div className='card-body'>
                        <div className="list-group">
                            <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                {/* <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0"/> */}
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 className="mb-0">List group item heading</h6>
                                    <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                                </div>
                                <small className="opacity-50 text-nowrap">now</small>
                                </div>
                            </Link>
                            <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                {/* <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0"/> */}
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 className="mb-0">Another title here</h6>
                                    <p className="mb-0 opacity-75">Some placeholder content in a paragraph that goes a little longer so it wraps to a new line.</p>
                                </div>
                                <small className="opacity-50 text-nowrap">3d</small>
                                </div>
                            </Link>
                            <Link to="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                {/* <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0"/> */}
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 className="mb-0">Third heading</h6>
                                    <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                                </div>
                                <small className="opacity-50 text-nowrap">1w</small>
                                </div>
                            </Link>
                            </div> 
                        </div>
                    </div>  
                </div>
            </div>
            <Toast ref={toast} />
         </>
    );
}

export default CallerDashboard;