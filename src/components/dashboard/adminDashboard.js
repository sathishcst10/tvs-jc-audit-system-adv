import Chart from 'react-apexcharts'

const AdminDashboard = () =>{

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
          
        series: [70, 15],
        options: {
          chart: {
            type: 'pie',
          },
          legend: {
              position : "bottom"
          },
          colors: ['#05c46b', '#ff3f34'],
          labels: ['Satisfied', 'Not Satisfied'],
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
          
        series: [70, 15],
        options: {
          chart: {
            type: 'pie',
          },
          legend: {
              position : "bottom"
          },
          colors: ['#f39c12','#05c46b'],
          labels: ['Live', 'Closed'],
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
          
        series: [44, 55],
        options: {
            chart: {
              type: 'donut',
            },
            legend: {
                position : "bottom"
            },
            labels: ['OK', 'NOT OK'],
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
          
        series: [44, 55],
        options: {
            chart: {
              type: 'donut',
            },
            legend: {
                position : "bottom"
            },
            labels: ['YES', 'NO'],
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
          
        series: [34, 55],
        options: {
            chart: {
              type: 'donut',
            },
            legend: {
                position : "bottom"
            },
            labels: ['YES', 'NO'],
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
          
        series: [15, 25,35,10],
        options: {
            chart: {
              type: 'donut',
            },
            legend: {
                position : "bottom"
            },
            labels: ['YES', 'SWITCH OFF', 'NOT REACHABLE', 'NO RESPONSE'],
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
    return(
         <>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5  g-1">
                <div className='col px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <div className="card-body">
                            <div className='row d-block d-xl-flex align-items-center'>
                                <div className='col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center'>
                                    <div className='icon-shape icon-primary'>
                                        <i class="bi bi-file-ruled"></i>
                                    </div>
                                </div>
                                <div className='col-12 col-xl-7 px-xl-0'>
                                    <p className="mb-4">Total JobCards</p>
                                    <p className="fs-30 mb-1">4006</p>   
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
                                        <i class="bi bi-calendar-check"></i>
                                    </div>
                                </div>
                                <div className='col-12 col-xl-7 px-xl-0'>
                                    <p className="mb-4">Today Entries</p>
                                    <p className="fs-30 mb-1">4006</p>   
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
                                        <i class="bi bi-check-circle"></i>
                                    </div>
                                </div>
                                <div className='col-12 col-xl-7 px-xl-0'>
                                    <p className="mb-4">Completed</p>
                                    <p className="fs-30 mb-1">4006</p>   
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
                                        <i class="bi bi-clock"></i>
                                    </div>
                                </div>
                                <div className='col-12 col-xl-7 px-xl-0'>
                                    <p className="mb-4">Pending/Open</p>
                                    <p className="fs-30 mb-1">4006</p>   
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
                                            <i class="bi bi-telephone"></i>
                                        </div>
                                </div>
                                <div className='col-12 col-xl-7 px-xl-0'>
                                    <p className="mb-4">Feedback Completed</p>
                                    <p className="fs-30 mb-1">4006</p>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>               
            </div>

            <div className='row g-1'>
                <div className='col-8 mt-4 px-3'>
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
                <div className='col-4 mt-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius h-100'>
                        <h6 className='card-header'>
                            Feedback Status
                        </h6>
                        <div className='card-body'>
                            <Chart
                                options={feedbackState.options} 
                                series={feedbackState.series} 
                                type="pie" 
                                height={350} 
                            />       
                        </div>
                    </div>  
                </div>
            </div>

            <div className='row g-1'>
                <div className='col-4 mt-4 px-3'>
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
                <div className='col-8 mt-4 px-3'>
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
                                height={350} 
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
                                height={350} 
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
                                height={350} 
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
                                height={350} 
                            />         
                        </div>
                    </div>  
                </div>
            </div>

            <div className='row g-1'>
                <div className='col-6 my-4 px-3'>
                    <div className='card card-shadow border-0 custom-radius'>
                        <h6 className='card-header'>
                            Dealers Top Ratings
                        </h6>
                        <div className='card-body'>
                            <p>Dealer Name 1 - Dealer Location - Zone</p>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
                            </div>
                            <p>Dealer Name 1 - Dealer Location - Zone</p>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style={{width: "65%"}} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">65%</div>
                            </div>
                            <p>Dealer Name 1 - Dealer Location - Zone</p>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style={{width: "55%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">55%</div>
                            </div>
                            <p>Dealer Name 1 - Dealer Location - Zone</p>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style={{width: "53%"}} aria-valuenow="53" aria-valuemin="0" aria-valuemax="100">53%</div>
                            </div>
                            <p>Dealer Name 1 - Dealer Location - Zone</p>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style={{width: "52%"}} aria-valuenow="52" aria-valuemin="0" aria-valuemax="100">52%</div>
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
                        <div class="list-group">
                            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                {/* <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"/> */}
                                <div class="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 class="mb-0">List group item heading</h6>
                                    <p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                                </div>
                                <small class="opacity-50 text-nowrap">now</small>
                                </div>
                            </a>
                            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                {/* <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"/> */}
                                <div class="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 class="mb-0">Another title here</h6>
                                    <p class="mb-0 opacity-75">Some placeholder content in a paragraph that goes a little longer so it wraps to a new line.</p>
                                </div>
                                <small class="opacity-50 text-nowrap">3d</small>
                                </div>
                            </a>
                            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                {/* <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"/> */}
                                <div class="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 class="mb-0">Third heading</h6>
                                    <p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                                </div>
                                <small class="opacity-50 text-nowrap">1w</small>
                                </div>
                            </a>
                            </div> 
                        </div>
                    </div>  
                </div>
            </div>
           
         </>
    );
}

export default AdminDashboard;