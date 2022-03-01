import { useEffect } from 'react';
import { useState } from 'react';
import Chart from 'react-apexcharts'
import { Loading } from 'react-loading-ui';
import dashboardService from '../../services/dashboard.service';

const DataOperatorDashboard = () =>{
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
   
    const fnDashboardCounts = ()=>{
        Loading(settings)
        dashboardService.getDataOperatorDataCount(true).then(
            (response)=>{
                console.log(response);
                setDashboardCounts({
                    ...getDashboardCounts,
                    totalJCCounts : response.data.data.data[0].totalJC,
                    todayJCCounts : response.data.data.data[0].todayJC,
                    auditCompletedJC : response.data.data.data[0].auditCompletedJC,
                    pendingJC : response.data.data.data[0].pendingJC
                })
                Loading();
            }
        ).catch(
            (err)=>{
                Loading();
                console.log(err);
            }
        )
    }
   
    const state = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: ["Telecaller-1","Telecaller-2","Telecaller-3","Telecaller-4","Telecaller-5"]
          }
        },
        series: [
          {
            name: "series-1",
            data: [3, 4, 4, 1, 3]
          }
        ]
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
    useEffect(()=>{
       fnDashboardCounts();
    },[])
    return(
         <>
            <div className='row g-1'>
                <div className='col-3 px-3'>
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
                <div className='col-3 px-3'>
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
                <div className='col-3 px-3'>
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
                <div className='col-3  px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <div className='card-body'>
                            <div className='row d-block d-xl-flex align-items-center'>
                                <div className='col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center'>
                                    <div className='icon-shape icon-danger'>
                                        <i className="bi bi-clock"></i>
                                    </div>
                                </div>
                                <div className='col-12 col-xl-7 px-xl-0'>
                                    <p className="mb-4">Pending/Open</p>
                                    <p className="fs-30 mb-1">{pendingJC}</p>   
                                </div>
                            </div>
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
                <div className='col-md-6 mt-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <h6 className='card-header'>
                            Last 7 Days Entry's
                        </h6>
                        <div className='card-body'>
                            <Chart
                                options={lineState.options} 
                                series={lineState.series} 
                                type="line" 
                                height={320} 
                            />      
                        </div>
                    </div>  
                </div>
            </div>
           
         </>
    );
}

export default DataOperatorDashboard;