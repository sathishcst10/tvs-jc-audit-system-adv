import MasterLayout from "../_layout/_masterLayout";
import Chart from 'react-apexcharts';
import { useState } from "react";


const ComplaintReport = () =>{
    const [getReportCaptions, setReportCaptions]= useState([
        "Vehicle Noise",
        "Starting Problem",
        "Brake Related",
        "Running OFF",
        "Kicker Related",
        "Tyre Related",
        "Electrical Related",
        "Cluster Related",
        "Engine Related",
        "Accessories Related",
        "Parts Damaged",
        "Stand Related",
        "Seat Related",
        "Wheel Related",
        "Gear Related",
        "Vehicle Cleaning",
        "Battery Related",
        "Idling Related",
        "Suspension Related",
        "Lock set Related",
        "Handle Bar Related"
    ]);
    const [getReportValues, setReportValues]= useState([
        8,6,4,3,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1
    ])
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
                  fontSize : '1rem'
              }
          },
          colors: ['#d35400'],
            xaxis : {
                categories: [
                    "Vehicle Noise",
                    "Starting Problem",
                    "Brake Related",
                    "Running OFF",
                    "Kicker Related",
                    "Tyre Related",
                    "Electrical Related",
                    "Cluster Related",
                    "Engine Related",
                    "Accessories Related",
                    "Parts Damaged",
                    "Stand Related",
                    "Seat Related",
                    "Wheel Related",
                    "Gear Related",
                    "Vehicle Cleaning",
                    "Battery Related",
                    "Idling Related",
                    "Suspension Related",
                    "Lock set Related",
                    "Handle Bar Related"
                ],
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