import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'
import { Loading } from 'react-loading-ui';
import { useSelector } from 'react-redux';
import dashboardService from '../../services/dashboard.service';
const DealerDashboard = () =>{
    const { user: currentUser } = useSelector((state) => state.auth);
    const settings = {
        title: "",
        text: "",
        progress: false,
        progressedClose: false,
        theme: "dark",
    };
    const [getDashboardCounts, setDashboardCounts] =  useState({
        totalJCCounts : 0,
        todayJCCounts : 0,
        auditCompletedJC : 0,
        pendingJC : 0,
        feedbackCompletedJC : 0
    });
    const {totalJCCounts, todayJCCounts, auditCompletedJC, pendingJC, feedbackCompletedJC} = getDashboardCounts;
    const [getLineChartData, setLineChartData] = useState([]);
    const [getLineChartCategory, setLineChartCategory] = useState([]);
    const [getVPSCount, setVPSCount] = useState([]);
    const fnDashboardCounts = ()=>{
        Loading(settings)
        dashboardService.getDealerDataCount(true).then(
            (response)=>{
                //console.log("user",);
                setDashboardCounts({
                    ...getDashboardCounts,
                    totalJCCounts : response.data.data.data[0].totalJC,
                    todayJCCounts : response.data.data.data[0].todayJC,
                    auditCompletedJC : response.data.data.data[0].auditCompletedJC,
                    pendingJC : response.data.data.data[0].pendingJC,
                    feedbackCompletedJC : response.data.data.data[0].feedbackCompletedJC
                });
                Loading();
            }
        ).catch(
            (err)=>{
                Loading();
                console.log(err);
            }
        )
    }

    const getDealerEntryChartByDate = ()=>{
        dashboardService.getDealerEntryChart(currentUser.data.user.dealerID).then(
            (response)=>{
                console.log(response);
                setLineChartCategory([]);
                setLineChartData([]);                
                response.data.data.data.forEach(element => {  
                    let fullDate = element.month + "-" + element.day;               
                    setLineChartCategory(getLineChartCategory=>[...getLineChartCategory, fullDate]);
                });
                response.data.data.data.forEach(element => {                   
                    setLineChartData(getLineChartData=>[...getLineChartData, element.values])
                });
               
                console.log(getLineChartData, getLineChartCategory);
            }
        ).catch((err)=>{console.log(err)});
    }
    const getDealerVPSChartData = ()=>{
        dashboardService.getDealerVPSChart(currentUser.data.user.dealerID).then((response)=>{
            console.log(response);
            setVPSCount([]);
            // response.data.data.data.forEach(element => {                   
            //     setVPSCount([element.values]);    
            // });        
            setVPSCount([
                response.data.data.data[1].values,
                response.data.data.data[0].values
            ]);
            // setTimeout(() => {
            
            // }, 1500);
            console.log(getVPSCount);
        }).catch((err)=>{console.log(err)})
    }
    const lineState = {          
        series: [{
            name: "JobCard Upload",
            data: getLineChartData
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
            categories: getLineChartCategory
          }
        }
    };

    const feedbackState = {
          
        series: getVPSCount,
        options: {
          chart: {
            type: 'pie',
          },
          legend: {
              position : "bottom"
          },
          colors: ['#05c46b', '#ff3f34'],
          labels: ['OK', 'Not OK'],
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

    useEffect(()=>{
        fnDashboardCounts();
        getDealerVPSChartData();
        getDealerEntryChartByDate();
        
    },[])

    return(
        <>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-5  g-1">
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
                                        <p className="fs-30 mb-1">{totalJCCounts}</p>   
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
                                        <p className="fs-30 mb-1">{todayJCCounts}</p>   
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
                                        <p className="fs-30 mb-1">{auditCompletedJC}</p>   
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
                                        <p className="mb-4">WIP / Open</p>
                                        <p className="fs-30 mb-1">{pendingJC}</p>   
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
                                        <p className="fs-30 mb-1">{feedbackCompletedJC}</p>   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>

            <div className='row g-1'>
                <div className='col-md-8 col-sm-12 mt-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <h6 className='card-header'>
                            Last 7 Days Jobcard Upload
                        </h6>
                        <div className='card-body'>
                            <Chart
                                options={lineState.options} 
                                series={lineState.series} 
                                type="line" 
                                height={350 + Math.floor(Math.random() * 2) + 1} 
                            />      
                        </div>
                    </div>  
                </div>
                <div className='col-md-4 col-sm-12 mt-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius h-100'>
                        <h6 className='card-header'>
                        Vehicle Performance after Service(VPS)
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
            </div>
            <div className='row g-1 d-none'>
                <div className='col-md-6 col-sm-12 my-4 px-3'>
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
                <div className='col-md-6 col-sm-12 my-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius h-100'>
                        <h6 className='card-header'>
                            Notifications
                        </h6>
                        <div className='card-body'>
                        <div className="list-group">
                            <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                {/* <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0"/> */}
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 className="mb-0">List group item heading</h6>
                                    <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                                </div>
                                <small className="opacity-50 text-nowrap">now</small>
                                </div>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                {/* <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0"/> */}
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 className="mb-0">Another title here</h6>
                                    <p className="mb-0 opacity-75">Some placeholder content in a paragraph that goes a little longer so it wraps to a new line.</p>
                                </div>
                                <small className="opacity-50 text-nowrap">3d</small>
                                </div>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                {/* <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0"/> */}
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 className="mb-0">Third heading</h6>
                                    <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                                </div>
                                <small className="opacity-50 text-nowrap">1w</small>
                                </div>
                            </a>
                            </div> 
                        </div>
                    </div>  
                </div>
            </div>
        </>
    )
}
export default DealerDashboard;