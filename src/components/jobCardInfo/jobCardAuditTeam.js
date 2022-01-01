import { getCardActionsUtilityClass } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Loading } from "react-loading-ui"
import jobCardInfoService from "../../services/job-card-info.service";

const JobCardAuditTeam = ()=>{
    const toast = useRef(null);
    const settings = {
        title: "",
        text: "",
        progress: false,
        progressedClose: false,
        theme: "dark",
    };

    const [getRequest, setRequest] = useState(
        {
            "pageNumber": 1,
            "pageSize": 10,
            "sortOrderBy": "",
            "sortOrderColumn": "",
            "filters": ""
        }
    );
    const [jobCardList, setJobCardList] = useState([]);
    const [jobcardActions, setJobCardActions] = useState({
        openJobcard : false,
        updateJobCard : false
    });
    const [jobCardDetails, setJobCardDetails] = useState({
        "jcid": 0,
        "userID": 0,
        "dealerID": 0,
        "dealerName": "",
        "dealerLocation": "",
        "jcNumber": "",
        "jobcardNumber": "",
        "jcFront": 0,
        "jcBack": 0,
        "isDataEntryTaken": false,
        "dataEntryTakenBy": 0,
        "isDataEntryCompleted": false,
        "isTelecallCompleted": false,
        "dmsNumber": "",
        "engineFrameNumber": "",
        "modelID": 0,
        "modelName": "",
        "vehicleNumber": "",
        "kMs": "",
        "serviceDate": "",
        "customerName": "",
        "customerMobile": "",
        "customerAddress": "",
        "saName": "",
        "technicianName": "",
        "customerVoice": "",
        "initialObservation": "",
        "finalFinding": "",
        "actionTaken": "",
        "dealerObservation": "",
        "serviceTypeID": 0,
        "serviceTypeName": "",
        "isActive": true,
        "isDeleted": false,
        "assignTeleCallerID": 0,
        "assignTeleCaller": "",
        "customerFeedback": "",
        "actualWorkDone": "",
        "gapAggregate": 0,
        "gapAggregateName": "",
        "gapIdendtified": "",
        "status": 0,
        "statusName": ""
    })
    const { pageNumber, pageSize, sortOrderBy, sortOrderColumn, filters } = getRequest;
    const { openJobcard, updateJobCard } = jobcardActions;
    const {
        jcid,
        userID,
        dealerID,
        dealerName,
        dealerLocation,
        jcNumber,
        jobcardNumber,
        jcFront,
        jcBack,
        isDataEntryTaken,
        dataEntryTakenBy,
        isDataEntryCompleted,
        isTelecallCompleted,
        dmsNumber,
        engineFrameNumber,
        modelID,
        modelName,
        vehicleNumber,
        kMs,
        serviceDate,
        customerName,
        customerMobile,
        customerAddress,
        saName,
        technicianName,
        customerVoice,
        initialObservation,
        finalFinding,
        actionTaken,
        dealerObservation,
        serviceTypeID,
        serviceTypeName,
        isActive,
        isDeleted,
        assignTeleCallerID,
        assignTeleCaller,
        customerFeedback,
        actualWorkDone,
        gapAggregate,
        gapAggregateName,
        gapIdendtified,
        status,
        statusName
    } = jobCardDetails
    const getAllJobCardLists = () =>{
        Loading(settings)
        jobCardInfoService.getJobCardListForAudit({
            pageNumber, 
            pageSize, 
            sortOrderBy, 
            sortOrderColumn, 
            filters
        }).then(
            (response)=>{
                Loading();
                console.log(response);
                setJobCardList(response.data.data.data);
            }
        ).catch(
            (err)=>{
                Loading();
                console.log(err);
            }
        )
    }

    const getJobCardData = (argID) =>{
        jobCardInfoService.getJobCardDataById(argID).then(
            (response)=>{
                console.log("DataByID", response.data.data.data[0]);

                setJobCardDetails({
                    ...jobCardDetails,
                    jcid: argID,
                    userID: response.data.data.data[0].userID,
                    dealerID: response.data.data.data[0].dealerID,
                    dealerName: response.data.data.data[0].dealerName,
                    dealerLocation: response.data.data.data[0].dealerLocation,
                    jcNumber: response.data.data.data[0].jcNumber,
                    jobcardNumber: response.data.data.data[0].jobcardNumber,
                    jcFront: response.data.data.data[0].jcFront,
                    jcBack: response.data.data.data[0].jcBack,
                    isDataEntryTaken: response.data.data.data[0].isDataEntryTaken,
                    dataEntryTakenBy: response.data.data.data[0].dataEntryTakenBy,
                    isDataEntryCompleted: response.data.data.data[0].isDataEntryCompleted,
                    isTelecallCompleted: response.data.data.data[0].isTelecallCompleted,
                    dmsNumber: response.data.data.data[0].dmsNumber,
                    engineFrameNumber: response.data.data.data[0].engineFrameNumber,
                    modelID: response.data.data.data[0].modelID,
                    modelName: response.data.data.data[0].modelName,
                    vehicleNumber: response.data.data.data[0].vehicleNumber,
                    kMs: response.data.data.data[0].kMs,
                    serviceDate: response.data.data.serviceDate,
                    customerName: response.data.data.data[0].customerName,
                    customerMobile: response.data.data.data[0].customerMobile,
                    customerAddress: response.data.data.data[0].customerAddress,
                    saName: response.data.data.data[0].saName,
                    technicianName: response.data.data.data[0].technicianName,
                    customerVoice:  response.data.data.data[0].customerVoice !== "" ? JSON.parse(response.data.data.data[0].customerVoice): [],
                    initialObservation: response.data.data.data[0].initialObservation !== "" ? JSON.parse(response.data.data.data[0].initialObservation) : [],
                    finalFinding: response.data.data.data[0].finalFinding !=="" ? JSON.parse(response.data.data.data[0].finalFinding) : [],
                    actionTaken: response.data.data.data[0].actionTaken !== "" ? JSON.parse(response.data.data.data[0].actionTaken) : [],
                    dealerObservation: response.data.data.data[0].dealerObservation !== "" ? JSON.parse(response.data.data.data[0].dealerObservation) : [],
                    serviceTypeID: response.data.data.data[0].serviceTypeID,
                    serviceTypeName: response.data.data.data[0].serviceTypeName,
                    isActive: response.data.data.data[0].isActive,
                    isDeleted: response.data.data.data[0].isDeleted,
                    assignTeleCallerID: response.data.data.data[0].assignTeleCallerID,
                    assignTeleCaller: response.data.data.data[0].assignTeleCaller,
                    customerFeedback: response.data.data.data[0].customerFeedback,
                    actualWorkDone: response.data.data.data[0].actualWorkDone,
                    gapAggregate: response.data.data.data[0].gapAggregate,
                    gapAggregateName: response.data.data.data[0].gapAggregateName,
                    gapIdendtified: response.data.data.data[0].gapIdendtified,
                    status: response.data.data.data[0].status,
                    statusName: response.data.data.data[0].statusName
                });
                console.log(customerVoice)
            }
        ).catch(
            (err)=>{
                console.log(err)
            }
        )
    }

    const downloadDocs = (argItems) =>{
        
        jobCardInfoService.downloadDocuments(argItems).then(
            (response)=>{
                const type = response.headers['content-type'];
                const _blob = new Blob([response.data], {type : type});

                // const temp = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(_blob);
                link.setAttribute('download', argItems.id +'_' +argItems.documentType+'.'+ type.split("/")[1]);
                document.body.appendChild(link);
                link.click();
                //window.location.href = imageBuilder(new Blob([response.data]));
                console.log(response)
            }
        ).catch((err)=>{console.log(err)})
    }

    const showJobCardDetails = (argID) =>{
        Loading(settings);
        jobCardInfoService.getJobCardDataById(argID).then(
            (response)=>{
                console.log("DataByID", response.data.data.data[0]);

                setJobCardDetails({
                    ...jobCardDetails,
                    jcid: argID,
                    userID: response.data.data.data[0].userID,
                    dealerID: response.data.data.data[0].dealerID,
                    dealerName: response.data.data.data[0].dealerName,
                    dealerLocation: response.data.data.data[0].dealerLocation,
                    jcNumber: response.data.data.data[0].jcNumber,
                    jobcardNumber: response.data.data.data[0].jobcardNumber,
                    jcFront: response.data.data.data[0].jcFront,
                    jcBack: response.data.data.data[0].jcBack,
                    isDataEntryTaken: response.data.data.data[0].isDataEntryTaken,
                    dataEntryTakenBy: response.data.data.data[0].dataEntryTakenBy,
                    isDataEntryCompleted: response.data.data.data[0].isDataEntryCompleted,
                    isTelecallCompleted: response.data.data.data[0].isTelecallCompleted,
                    dmsNumber: response.data.data.data[0].dmsNumber,
                    engineFrameNumber: response.data.data.data[0].engineFrameNumber,
                    modelID: response.data.data.data[0].modelID,
                    modelName: response.data.data.data[0].modelName,
                    vehicleNumber: response.data.data.data[0].vehicleNumber,
                    kMs: response.data.data.data[0].kMs,
                    serviceDate: new Date(response.data.data.data[0].serviceDate).toLocaleDateString(),
                    customerName: response.data.data.data[0].customerName,
                    customerMobile: response.data.data.data[0].customerMobile,
                    customerAddress: response.data.data.data[0].customerAddress,
                    saName: response.data.data.data[0].saName,
                    technicianName: response.data.data.data[0].technicianName,
                    customerVoice:  response.data.data.data[0].customerVoice !== "" ? JSON.parse(response.data.data.data[0].customerVoice): [],
                    initialObservation: response.data.data.data[0].initialObservation !== "" ? JSON.parse(response.data.data.data[0].initialObservation) : [],
                    finalFinding: response.data.data.data[0].finalFinding !=="" ? JSON.parse(response.data.data.data[0].finalFinding) : [],
                    actionTaken: response.data.data.data[0].actionTaken !== "" ? JSON.parse(response.data.data.data[0].actionTaken) : [],
                    dealerObservation: response.data.data.data[0].dealerObservation !== "" ? JSON.parse(response.data.data.data[0].dealerObservation) : [],
                    serviceTypeID: response.data.data.data[0].serviceTypeID,
                    serviceTypeName: response.data.data.data[0].serviceTypeName,
                    isActive: response.data.data.data[0].isActive,
                    isDeleted: response.data.data.data[0].isDeleted,
                    assignTeleCallerID: response.data.data.data[0].assignTeleCallerID,
                    assignTeleCaller: response.data.data.data[0].assignTeleCaller,
                    customerFeedback: response.data.data.data[0].customerFeedback,
                    actualWorkDone: response.data.data.data[0].actualWorkDone,
                    gapAggregate: response.data.data.data[0].gapAggregate,
                    gapAggregateName: response.data.data.data[0].gapAggregateName,
                    gapIdendtified: response.data.data.data[0].gapIdendtified,
                    status: response.data.data.data[0].status,
                    statusName: response.data.data.data[0].statusName
                });
                console.log(customerVoice);
                setJobCardActions({
                    ...jobcardActions,
                    openJobcard : true
                });  
            }
        ).catch(
            (err)=>{
                console.log(err)
            }
        )
             
        Loading();
    }
    const closeForm = ()=>{
        setJobCardActions({
            ...jobcardActions,
            openJobcard : false
        });
    }

    const excelformat=()=> {
        
        var lineArray = [];
        jobCardList.forEach(function(infoArray, index) {
            var line = infoArray.join(" \t");
            lineArray.push(index == 0 ? line : line);
        });
        var csvContent = lineArray.join("\r\n");
        var excel_file = document.createElement('a');
        excel_file.setAttribute('href', 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(csvContent));
        excel_file.setAttribute('download', 'Visitor_History.xls');
        document.body.appendChild(excel_file);
        excel_file.click();
        document.body.removeChild(excel_file);
    }

    useEffect(()=>{
        getAllJobCardLists();        
    },[])

    return (
        <>
            <div className="row g-1">
                {
                    !openJobcard ?
                    (
                        <div className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-body p-1">
                                    <button onClick={excelformat}>Download</button>
                                    <div className="table-responsive">
                                        <table className="table table-striped table-hover table-custom">
                                            <thead className="table-dark">                                        
                                                <tr>
                                                    <th>
                                                        Jobcard ID
                                                    </th>
                                                    <th>
                                                        Jobcard Number
                                                    </th>
                                                    <th>
                                                        Model Name
                                                    </th>
                                                    <th>
                                                        Customer Voice
                                                    </th>
                                                    <th>
                                                        Initial Observations
                                                    </th>
                                                    <th>
                                                        Final Findings
                                                    </th>
                                                    <th>
                                                        Action Taken
                                                    </th>
                                                    {/* <th>
                                                        Attachments
                                                    </th> */}
                                                    <th>
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    jobCardList.map((items, idx)=>(
                                                        <tr key={idx} onClick={()=>showJobCardDetails(items.jcid)}>
                                                            <td>{items.jcNumber}</td>
                                                            <td>{items.jobcardNumber}</td>
                                                            <td>{items.modelName}</td>
                                                            <td>
                                                                {
                                                                    JSON.parse(items.customerVoice).map((_items, index)=>(
                                                                        <span key={index} className="badge bg-dark mx-1 mb-1">
                                                                            {_items}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    JSON.parse(items.initialObservation).map((_items, index)=>(
                                                                        <span key={index} className="badge bg-dark mx-1 mb-1">
                                                                            {_items}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    JSON.parse(items.finalFinding).map((_items, index)=>(
                                                                        <span key={index} className="badge bg-dark mx-1 mb-1">
                                                                            {_items}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    JSON.parse(items.actionTaken).map((_items, index)=>(
                                                                        <span key={index} className="badge bg-dark mx-1 mb-1">
                                                                            {_items}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    items.status === 'Satisfied' ?
                                                                    <span className="badge bg-success">{items.status}</span>
                                                                    :
                                                                    items.status === 'Not Satisfied' ?
                                                                    <span className="badge bg-danger">{items.satisfied}</span>
                                                                    :
                                                                    <span className="badge bg-danger">{items.status}</span>
                                                                }
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
                    )
                    :
                    (
                        <div className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-body p-1">
                                    <div className="d-flex justify-content-end pb-1 shadow-sm">
                                        <button 
                                            className="btn btn-sm btn-danger" 
                                            onClick={closeForm}
                                        >
                                            Close
                                        </button>
                                    </div>
                                    <div>
                                        <div className="row g-1">
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Jobcard ID
                                                </label>
                                                <input 
                                                    value={jcNumber} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Jobcard number
                                                </label>
                                                <input 
                                                    value={jobcardNumber} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Dealer Details
                                                </label>
                                                <input 
                                                    value={dealerName} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Dealer Loacation
                                                </label>
                                                <input 
                                                    value={dealerLocation} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div className="row g-1">
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Customer Name
                                                </label>
                                                <input 
                                                    value={customerName} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Customer Mobile
                                                </label>
                                                <input 
                                                    value={customerMobile} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Customer Address
                                                </label>
                                                <input 
                                                    value={customerAddress} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Model Name
                                                </label>
                                                <input 
                                                    value={modelName} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div className="row g-1">
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Engine/Frame Number
                                                </label>
                                                <input 
                                                    value={engineFrameNumber} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    KM's
                                                </label>
                                                <input 
                                                    value={kMs} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    DMS Number
                                                </label>
                                                <input 
                                                    value={dmsNumber} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Vehicle Number
                                                </label>
                                                <input 
                                                    value={vehicleNumber} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div className="row g-1">
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Service Date
                                                </label>
                                                <input 
                                                    value={serviceDate} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Service Type
                                                </label>
                                                <input 
                                                    value={serviceTypeName} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Service Advisor Name
                                                </label>
                                                <input 
                                                    value={saName} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Technician Name
                                                </label>
                                                <input 
                                                    value={technicianName} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div className="row g-1">
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Customer Voice
                                                </label>
                                                <div className="form-control disabled">
                                                    {
                                                       customerVoice.map((items, idx)=>(
                                                            <span key={idx} className="badge bg-dark me-1 mb-1">
                                                                {items}
                                                            </span>
                                                        ))
                                                        
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    initial Observation
                                                </label>
                                                <div className="form-control disabled">
                                                    {
                                                        initialObservation.map((items, idx)=>(
                                                            <span key={idx} className="badge bg-dark me-1 mb-1">
                                                                {items}
                                                            </span>
                                                        ))
                                                        //initialObservation
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Final Finding
                                                </label>
                                                <div className="form-control disabled">
                                                    {
                                                        finalFinding.map((items, idx)=>(
                                                            <span key={idx} className="badge bg-dark me-1 mb-1">
                                                                {items}
                                                            </span>
                                                        ))
                                                        //finalFinding
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Action Taken
                                                </label>
                                                <div className="form-control disabled">
                                                    {
                                                        actionTaken.map((items, idx)=>(
                                                            <span key={idx} className="badge bg-dark me-1 mb-1">
                                                                {items}
                                                            </span>
                                                        ))
                                                        //actionTaken
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row g-1">
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Dealer Observation from Jobcard
                                                </label>
                                                <div className="form-control disabled">
                                                    {
                                                        dealerObservation.map((items, idx)=>(
                                                            <span key={idx} className="badge bg-dark me-1 mb-1">
                                                                {items}
                                                            </span>
                                                        ))
                                                        //dealerObservation
                                                    }
                                                </div>
                                            </div>
                                            
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Customer Feedback
                                                </label>
                                                <input 
                                                    value={customerFeedback} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Actual Work Done
                                                </label>
                                                <input 
                                                    value={actualWorkDone} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Gap Aggregate
                                                </label>
                                                <input 
                                                    value={gapAggregateName} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div className="row g-1">
                                           
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Gap gapIdendtified
                                                </label>
                                                <input 
                                                    value={gapIdendtified} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                                
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Status
                                                </label>
                                                <input 
                                                    value={statusName} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Jobcard Attachments
                                                </label>
                                                <div className="text-left py-0">
                                                    <button 
                                                        className="btn btn-sm btn-primary me-1"
                                                        onClick={()=>downloadDocs({
                                                            "documentId": jcFront,
                                                            "documentType": "JCFront",
                                                            "id" : jcNumber
                                                        })}
                                                    >
                                                        <i className="bi bi-download me-3"></i> 
                                                        Front 
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-primary ms-1"
                                                        onClick={()=>downloadDocs({
                                                            "documentId": jcBack,
                                                            "documentType": "JCBack",
                                                            "id" : jcNumber
                                                        })}
                                                    > 
                                                        <i className="bi bi-download me-3"></i> Back
                                                    </button>
                                                </div>
                                                
                                            </div>
                                            <div className="col-3">
                                                {/* <label className="form-label">
                                                    Actual Work Done
                                                </label>
                                                <input 
                                                    value={actualWorkDone} 
                                                    className="form-control"  
                                                    disabled
                                                /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                
                }
            </div>
        
        </>
    )
}

export default JobCardAuditTeam