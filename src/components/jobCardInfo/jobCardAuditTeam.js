import { getCardActionsUtilityClass } from "@mui/material";
import { DataTable } from 'primereact/datatable';
import TablePagination from '@mui/material/TablePagination';
import { Column } from 'primereact/column';
import exportFromJSON from "export-from-json";
import { useEffect, useRef, useState } from "react";
import { Loading } from "react-loading-ui"
import jobCardInfoService from "../../services/job-card-info.service";
import { ExportData } from "../exportData";

const JobCardAuditTeam = ()=>{
    const toast = useRef(null);
    const settings = {
        title: "",
        text: "",
        progress: false,
        progressedClose: false,
        theme: "dark",
    };
    const [totalCount, setTotalCount] = useState(0);
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
                setTotalCount(response.data.data.totalCount);
                setJobCardList(response.data.data.data);
            }
        ).catch(
            (err)=>{
                Loading();
                console.log(err);
            }
        )
    }
    const convertDate = (argDate)=>{        
        return new Date(argDate.auditDate).toLocaleDateString();
    }
    const convertServiceDate = (argDate)=>{        
        return new Date(argDate.serviceDate).toLocaleDateString();
    }
    const convertJCDate = (argDate)=>{        
        return new Date(argDate.jobCardDate).toLocaleDateString();
    }
    const convertFeedbackDate  = (argDate)=>{        
        return new Date(argDate.customerFeedbackDate).toLocaleDateString();
    }

    const changeItemsCV=(argItems)=>{
        console.log(argItems);
        let items = JSON.parse(argItems.customerVoice).map((items,idx)=>(
            <span className="badge bg-dark me-1" key={idx}>{items}</span>
        ));
        console.log(items);
        return <div>{items}</div>;
    }
    const changeItemsIO=(argItems)=>{
        console.log(argItems);
        let items = JSON.parse(argItems.initialObservation).map((items,idx)=>(
            <span className="badge bg-dark me-1" key={idx}>{items}</span>
        ));
        console.log(items);
        return <div>{items}</div>;
    }
    const changeItemsFF=(argItems)=>{
        console.log(argItems);
        let items = JSON.parse(argItems.finalFinding).map((items,idx)=>(
            <span className="badge bg-dark me-1" key={idx}>{items}</span>
        ));
        console.log(items);
        return <div>{items}</div>;
    }
    const changeItemsACKT=(argItems)=>{
        console.log(argItems);
        let items = JSON.parse(argItems.actionTaken).map((items,idx)=>(
            <span className="badge bg-dark me-1" key={idx}>{items}</span>
        ));
        console.log(items);
        return <div>{items}</div>;
    }
    const changeItemsWM=(argItems)=>{
        console.log(argItems);
        let items = JSON.parse(argItems.customerVoiceByWMHO).map((items,idx)=>(
            <span className="badge bg-dark me-1" key={idx}>{items}</span>
        ));
        console.log(items);
        return <div>{items}</div>;
    }
    const changeItemsGapIden=(argItems)=>{
        console.log(argItems);
        let items = JSON.parse(argItems.gapIdentifiedWMSA).map((items,idx)=>(
            <span className="badge bg-dark me-1" key={idx}>{items}</span>
        ));
        console.log(items);
        return <div>{items}</div>;
    }
    const changeItemsJCGap=(argItems)=>{
        console.log(argItems);
        let items = JSON.parse(argItems.jcGapRemarks).map((items,idx)=>(
            <span className="badge bg-dark me-1" key={idx}>{items}</span>
        ));
        console.log(items);
        return <div>{items}</div>;
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
        console.log("files", [jobCardList[0],jobCardList[1]])
    const data = jobCardList
       const fileName =  'Report';
       const exportType = exportFromJSON.types.csv;
       exportFromJSON({
        data,
        fileName,
        exportType
       });
    }
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      Loading(settings);
      setPage(newPage + 1);
     
      jobCardInfoService.getJobCardListForAudit({
        pageNumber : newPage + 1,
        pageSize,
        sortOrderBy,
        sortOrderColumn,
        filters,
      })
      .then((response) => {
        setTotalCount(response.data.data.totalCount);
        setJobCardList(response.data.data.data);
        Loading();
      })
      .catch((error) =>{console.log(error); Loading();});
      
    };
  
    const handleChangeRowsPerPage = (event) => {
      Loading(settings);
      jobCardInfoService.getJobCardListForAudit({
        pageNumber,
        pageSize : parseInt(event.target.value, 10),
        sortOrderBy,
        sortOrderColumn,
        filters,
      })
      .then((response) => {
        setTotalCount(response.data.data.totalCount);
        setJobCardList(response.data.data.data);
        Loading();
      })
      .catch((error) =>{console.log(error); Loading();});
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
  
    };
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
                                    <div className="d-flex justify-content-end mb-1">
                                        <button 
                                            className="btn btn-sm btn-primary" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#staticBackdrop"
                                        >
                                            Export Data
                                        </button>
                                    </div>
                                    <div className="table-responsive d-none">
                                        <table className="table table-striped table-hover table-custom">
                                            <thead className="table-dark">                                        
                                                <tr>
                                                    <th>
                                                        JC ID
                                                    </th>
                                                    <th>
                                                        Job Card Number
                                                    </th>
                                                    <th>
                                                        Audit Date
                                                    </th>
                                                    <th>
                                                        Service Date
                                                    </th>
                                                    <th>
                                                        Dealer Code
                                                    </th>
                                                    <th>
                                                        Dealer Name
                                                    </th>
                                                    <th>
                                                        Dealer Location
                                                    </th>
                                                    <th>
                                                        Area Office
                                                    </th>
                                                    <th>
                                                        Zone
                                                    </th>
                                                    <th>
                                                        DMS No.
                                                    </th>
                                                   
                                                    <th>
                                                        Frame Number
                                                    </th>
                                                    <th>
                                                        Vehicle Reg.No
                                                    </th>
                                                    <th>
                                                        Model    
                                                    </th>
                                                    <th>
                                                        KMS Run
                                                    </th>
                                                    <th>
                                                        Jobcard Date
                                                    </th>
                                                    <th>
                                                        Type of Service
                                                    </th>
                                                    <th>
                                                        Customer Name
                                                    </th>                                                        
                                                    <th>
                                                        Contact No.
                                                    </th>
                                                    <th>
                                                        S/A Name
                                                    </th>
                                                    <th>
                                                        Technician Name
                                                    </th>
                                                    <th>
                                                        JC Category(Live/Closed)
                                                    </th>
                                                    <th>
                                                        Customer Voice
                                                    </th>
                                                    <th>
                                                        Initial Observation
                                                    </th>
                                                    <th>
                                                        Final Finding
                                                    </th>
                                                    <th>
                                                        Action Taken
                                                    </th>
                                                    <th>
                                                        Understanding of Customer Voice by WM/HO 
                                                        Probing is Improper
                                                    </th>
                                                    <th>
                                                        Gap Identified Between WM/SA or Tech.
                                                    </th>
                                                    <th>
                                                        JC (OK/Not OK)
                                                    </th>
                                                    <th>
                                                        Vehicle Performance After Service(VPS)
                                                    </th>
                                                    <th>
                                                        Reason 1 For VPS NOT OK
                                                    </th>
                                                    <th>
                                                        Reason 2 For VPS NOT OK
                                                    </th>
                                                    <th>
                                                        Reason 3 For VPS NOT OK
                                                    </th>
                                                    <th>
                                                        Customer Feedback Date
                                                    </th>
                                                    <th>
                                                        No.of Days(Service to Feedback)
                                                    </th>
                                                    <th>
                                                        New Problem Reported Aftr Service
                                                    </th>
                                                    <th>
                                                        Customer Told Problem Not Capturd
                                                    </th>
                                                    <th>
                                                        Same Problem IN JC(Y/N)
                                                    </th>
                                                    <th>
                                                        JC Gap Remarks
                                                    </th>
                                                    <th>
                                                        Audit Status
                                                    </th>
                                                    <th>
                                                        Audit Done By
                                                    </th>
                                                    <th>
                                                        Call Response By Customer
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    jobCardList.map((items, idx)=>(
                                                        <tr key={idx} onClick={()=>showJobCardDetails(items.jcid)}>
                                                            <td>{items.jcNumber}</td>
                                                            <td>{items.jobcardNumber}</td>
                                                            <td>{new Date(items.auditDate).toLocaleDateString() }</td>
                                                            <td>{new Date(items.serviceDate).toLocaleDateString()}</td>
                                                            <td>{items.dealerCode}</td>
                                                            <td>
                                                                {items.dealerName}
                                                            </td>
                                                            <td>{items.dealerLocation}</td>
                                                            <td>{items.dealerState}</td>
                                                            <td>{items.dealerZone}</td>
                                                            <td>{items.dmsNumber}</td>
                                                           
                                                            <td>{items.engineFrameNumber}</td>
                                                            <td>{items.vehicleNumber}</td>
                                                            <td>{items.modelName}</td>
                                                            <td>{items.kMs}</td>
                                                            <td>{new Date(items.auditDate).toLocaleDateString()}</td>
                                                            <td>{items.serviceTypeName}</td>
                                                            <td>{items.customerName}</td>
                                                            <td>{items.customerMobile}</td>
                                                            <td>{items.saName}</td>
                                                            <td>{items.technicianName}</td>
                                                            <td>{items.jcCategoryStatus}</td>                                                            
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
                                                                    JSON.parse(items.customerVoiceByWMHO).map((_items, index)=>(
                                                                        <span key={index} className="badge bg-dark mx-1 mb-1">
                                                                            {_items}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    JSON.parse(items.gapIdentifiedWMSA).map((_items, index)=>(
                                                                        <span key={index} className="badge bg-dark mx-1 mb-1">
                                                                            {_items}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                   items.jcAuditStatus
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    items.vpsStatus
                                                                }
                                                            </td>
                                                            <td>
                                                                {items.vpsReason1}
                                                            </td>
                                                            <td>
                                                                {items.vpsReason2}
                                                            </td>
                                                            <td>
                                                                {items.vpsReason3}
                                                            </td>
                                                            <td>
                                                                {items.customerFeedbackDate}
                                                            </td>
                                                            <td>
                                                                {items.feedbackAgeing}
                                                            </td>
                                                            <td>
                                                                {items.newProblemStatus}
                                                            </td>
                                                            <td>
                                                                {items.problemNotCapturedStatus}
                                                            </td>
                                                            <td>
                                                                {items.sameProblemInJCStatus}
                                                            </td>
                                                            <td>
                                                                {
                                                                    JSON.parse(items.jcGapRemarks).map((_items, index)=>(
                                                                        <span key={index} className="badge bg-dark mx-1 mb-1">
                                                                            {_items}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </td>
                                                            <td>
                                                                {items.auditStatus}
                                                            </td>
                                                            <td>
                                                                {items.auditPerson}
                                                            </td>
                                                            <td>
                                                                {items.callResponseStatus}
                                                            </td>
                                                            {/* <td>
                                                                {
                                                                    items.status === 'Satisfied' ?
                                                                    <span className="badge bg-success">{items.status}</span>
                                                                    :
                                                                    items.status === 'Not Satisfied' ?
                                                                    <span className="badge bg-danger">{items.satisfied}</span>
                                                                    :
                                                                    <span className="badge bg-danger">{items.status}</span>
                                                                }
                                                            </td> */}
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                    <div>
                                        <DataTable value={jobCardList} scrollable scrollHeight="400px"  scrollDirection="both" className="mt-3">
                                            <Column field="jcNumber" header="JC ID" style={{ flexGrow: 1, flexBasis: '100px' }} frozen></Column>
                                            <Column field="jobcardNumber" header="Jobcard Number" style={{ flexGrow: 1, flexBasis: '200px' }} frozen></Column>
                                            <Column field="auditDate" body={convertDate} header="Audit Date" style={{ flexGrow: 1, flexBasis: '130px' }}></Column>
                                            <Column field="serviceDate" body={convertServiceDate} header="Service Date" style={{ flexGrow: 1, flexBasis: '130px' }}></Column>
                                            <Column field="dealerCode" header="Dealer Code" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="dealerName" header="Dealer Name" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="dealerLocation" header="Dealer Location" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="dealerState" header="Dealer State" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="dealerZone" header="Dealer Zone" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="dmsNumber" header="DMS No." style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="engineFrameNumber" header="Frame Number" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="vehicleNumber" header="Vehicle Reg.no" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="modelName" header="Model" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="kMs" header="KMS Run" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="jobCardDate" body={convertJCDate} header="Jobcard Date" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="serviceTypeName" header="Type of Service" style={{ flexGrow: 1, flexBasis: '250px' }}></Column>
                                            <Column field="customerName" header="Customer Name" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="customerMobile" header="Customer Contact" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="saName" header="SA Name" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="technicianName" header="Technician Name" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="jcCategoryStatus" header="JC Category" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="customerVoice" body={changeItemsCV} header="Customer Voice" style={{ flexGrow: 1, flexBasis: '350px' }}></Column>
                                            <Column field="initialObservation" body={changeItemsIO} header="Initial Observation" style={{ flexGrow: 1, flexBasis: '300px' }}></Column>
                                            <Column field="finalFinding" body={changeItemsFF} header="Final Findings" style={{ flexGrow: 1, flexBasis: '300px' }}></Column>
                                            <Column field="actionTaken" body={changeItemsACKT} header="Action Taken" style={{ flexGrow: 1, flexBasis: '300px' }}></Column>
                                            <Column field="customerVoiceByWMHO" body={changeItemsWM} header="Understanding of Customer Voice by WM/HO" style={{ flexGrow: 1, flexBasis: '300px' }}></Column>
                                            <Column field="gapIdentifiedWMSA" body={changeItemsGapIden} header="Gap Identified Between WM/SA or Tech." style={{ flexGrow: 1, flexBasis: '300px' }}></Column>
                                            <Column field="jcAuditStatus" header="JC (OK/NOT OK)" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="vpsStatus" header="Vehicle Performance After Service(VPS)	" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="vpsReason1" header="VPS Reason 1" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="vpsReason2" header="VPS Reason 2" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="vpsReason3" header="VPS Reason 3" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="customerFeedbackDate" body={convertFeedbackDate} header="Customer Feedback Date" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="feedbackAgeing" header="No.of Days(Service to Feedback)" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="newProblemStatus" header="New Problem Reported After Service" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="problemNotCapturedStatus" header="Customer Told Problem Not Capturd" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="sameProblemInJCStatus" header="Same Problem IN JC(Y/N)" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="jcGapRemarks" body={changeItemsJCGap} header="JC Gap Remarks" style={{ flexGrow: 1, flexBasis: '300px' }}></Column>
                                            <Column field="auditStatus" header="Audit Status" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="auditPerson" header="Audit Done By" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                            <Column field="callResponseStatus" header="Call Response By Customer" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                                        </DataTable>

                                        <TablePagination
                                            component="div"
                                            count={totalCount}
                                            page={page - 1}
                                            onPageChange={handleChangePage}
                                            rowsPerPage={rowsPerPage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
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
                                            
                                            
                                        </div>

                                        <div className="row g-1">
                                           
                                            
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
                                          
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                
                }
            </div>
        
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Export Data</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ExportData/>
                    </div>
                    <div className="modal-footer">
                   
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default JobCardAuditTeam