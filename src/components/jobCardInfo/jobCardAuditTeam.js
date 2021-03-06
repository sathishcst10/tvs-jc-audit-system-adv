import { getCardActionsUtilityClass } from "@mui/material";
import { DataTable } from 'primereact/datatable';
import TablePagination from '@mui/material/TablePagination';
import { Column } from 'primereact/column';
import exportFromJSON from "export-from-json";
import { useEffect, useRef, useState } from "react";
import { Loading } from "react-loading-ui"
import jobCardInfoService from "../../services/job-card-info.service";
import { ExportData } from "../exportData";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import commonService from "../../services/common.service";
import reportService from "../../services/report.service";
import dealerMasterService from "../../services/dealer-master.service";

const JobCardAuditTeam = () =>{
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
            "sortOrderBy": "DESC",
            "sortOrderColumn": "JCID",
            "filters": ""
        }
    );
    const [jobCardList, setJobCardList] = useState([]);
    const [dealers, setDealers] = useState([]);
    const [getRegionDetails, setRegionDetails] = useState([]);
    const [auditStatusList, setAuditStatus] = useState([]);
    const [getFilter, setFilter] = useState({
        "filterStatus":false,
        "region" : "",
        "dealerId" : 0,
        "_status" : "",
        "_jobcardNumber" : ""
    });
    const {filterStatus,region, dealerId, _status, _jobcardNumber}=getFilter;
    const [jobcardActions, setJobCardActions] = useState({
        openJobcard : false,
        updateJobCard : false
    });
    const [getCustomerVoiceByWMHO, setCustomerVoiceByWMHO] = useState([]);
    const [getJcGapRemarks, setJcGapRemarks] = useState([]);
    const [getGapIdentifiedWMSA, setGapIdentifiedWMSA] = useState([]);
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
    });
    const [getJobCardAudit, setJobCardAudit] = useState(
        {
            "isActive": true,
            "jcaid": 0,
            "jcid": 0,
            "jcCategory": 0,
            "customerVoiceByWMHO": "",
            "gapIdentifiedWMSA": "",
            "jcStatus": 0,
            "vps": 0,
            "vpsReason1": 0,
            "vpsReason2": 0,
            "vpsReason3": 0,
            "customerFeedbackDate": "",
            "newProblem": 0,
            "problemNotCaptured": 0,
            "sameProblemInJC": 0,
            "jcGapRemarks": "",
            "auditStatus": 0,
            "callResponse": 0,
            "createdDate": "",
            "createdBy": 0,
            "modifiedDate": "",
            "modifiedBy": 0,
            "isActive": true,
            "isDeleted": true
        }
    );
    const {
        jcaid,       
        jcCategory,
        customerVoiceByWMHO,
        gapIdentifiedWMSA,
        jcStatus,
        vps,
        vpsReason1,
        vpsReason2,
        vpsReason3,
        customerFeedbackDate,
        newProblem,
        problemNotCaptured,
        sameProblemInJC,
        jcGapRemarks,
        auditStatus,
        callResponse,
        createdDate,
        createdBy,
        modifiedDate,
        modifiedBy,
    
    } = getJobCardAudit
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
    } = jobCardDetails;

    const getAllJobCardLists = () =>{
        Loading(settings)
        jobCardInfoService.getJobCardListForAudit({
            pageNumber : page,
            pageSize : rowsPerPage,
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
                console.error(err);
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
        if( JSON.parse(argItems.customerVoice).length > 0){
            return <><span className="badge captionTxt bg-dark me-1">
                {
                    JSON.parse(argItems.customerVoice)[0]            
                }
                </span>
                {/* <a 
                    href="#" 
                    className="more-link"
                    data-bs-toggle="tooltip" 
                    data-bs-placement="top"
                    title={JSON.parse(argItems.customerVoice).map((_items, idx) => _items)}
                >
                    More...
                </a> */}
                <Button 
                    type="button"                                                                                    
                    className="more-link"
                    tooltip={JSON.parse(argItems.customerVoice).map((_items, idx) => _items)}
                    tooltipOptions={{position: 'top'}} 
                    label="More..."   
                />
            </>;
        }else{
            return "";
        }
    }
    const changeItemsIO=(argItems)=>{
        console.log(argItems);
        let items = JSON.parse(argItems.initialObservation).map((items,idx)=>(
            <span className="badge bg-dark me-1" key={idx}>{items}</span>
        ));
        console.log(items);
        if( JSON.parse(argItems.initialObservation).length > 0){
            return <><span className="badge captionTxt bg-dark me-1">
                {
                    JSON.parse(argItems.initialObservation)[0]            
                }
                </span>
                {/* <a 
                    href="#" 
                    className="more-link"
                    data-bs-toggle="tooltip" 
                    data-bs-placement="top"
                    title={JSON.parse(argItems.initialObservation).map((_items, idx) => _items)}
                >
                    More...
                </a> */}
                <Button 
                    type="button"                                                                                    
                    className="more-link"
                    tooltip={JSON.parse(argItems.initialObservation).map((_items, idx) => _items)}
                    tooltipOptions={{position: 'top'}} 
                    label="More..."   
                />
            </>;
        }else{
            return ""
        }
    }
    const changeItemsFF=(argItems)=>{
        console.log(argItems);
        let items = JSON.parse(argItems.finalFinding).map((items,idx)=>(
            <span className="badge bg-dark me-1" key={idx}>{items}</span>
        ));
        console.log(items);
        if( JSON.parse(argItems.finalFinding).length > 0){
            return <><span className="badge captionTxt bg-dark me-1">
                {
                    JSON.parse(argItems.finalFinding)[0]            
                }
                </span>
                {/* <a 
                    href="#" 
                    className="more-link"
                    data-bs-toggle="tooltip" 
                    data-bs-placement="top"
                    title={JSON.parse(argItems.finalFinding).map((_items, idx) => _items)}
                >
                    More...
                </a> */}
                 <Button 
                    type="button"                                                                                    
                    className="more-link"
                    tooltip={JSON.parse(argItems.finalFinding).map((_items, idx) => _items)}
                    tooltipOptions={{position: 'top'}} 
                    label="More..."   
                />
            </>;
        }else {
            return "";
        }
        
    }
    const changeItemsACKT=(argItems)=>{
        console.log(argItems);
        let items = JSON.parse(argItems.actionTaken).map((items,idx)=>(
            <span className="badge bg-dark me-1" key={idx}>{items}</span>
        ));
        console.log(items);
        if( JSON.parse(argItems.actionTaken).length >0){
            return <>
                <span className="badge captionTxt bg-dark me-1">
                {
                    JSON.parse(argItems.actionTaken)[0]            
                }
                </span>
                {/* <a 
                    href="#" 
                    className="more-link"
                    data-bs-toggle="tooltip" 
                    data-bs-placement="top"
                    title={JSON.parse(argItems.actionTaken).map((_items, idx) => _items)}
                >
                    More...
                </a> */}
                 <Button 
                    type="button"                                                                                    
                    className="more-link"
                    tooltip={JSON.parse(argItems.actionTaken).map((_items, idx) => _items)}
                    tooltipOptions={{position: 'top'}} 
                    label="More..."   
                />
            </>;
        }
        else{
            return ""
        }
        
        
    }
    const changeItemsWM=(argItems)=>{
        console.log(argItems);
        // let items = JSON.parse(argItems.customerVoiceByWMHO).map((items,idx)=>(
        //     <span className="badge bg-dark me-1" key={idx}>{items}</span>
        // ));
        
            if( JSON.parse(argItems.customerVoiceByWMHO).length !== 0){
                return <>
                
                    <span className="badge captionTxt bg-dark me-1">
                    {
                        JSON.parse(argItems.customerVoiceByWMHO)[0]
                    }
                    </span>
                    {/* <a 
                        href="#" 
                        className="more-link"
                        data-bs-toggle="tooltip" 
                        data-bs-placement="top"
                        title={JSON.parse(argItems.customerVoiceByWMHO).map((_items, idx) => _items)}
                    >
                        More...
                    </a> */}
                    <Button 
                        type="button"                                                                                    
                        className="more-link"
                        tooltip={JSON.parse(argItems.customerVoiceByWMHO).map((_items, idx) => _items)}
                        tooltipOptions={{position: 'top'}} 
                        label="More..."   
                    />
                </>;
            } else{
                return "";
            }
         
    }
    const changeItemsGapIden=(argItems)=>{
        console.log(argItems);
        // let items = JSON.parse(argItems.gapIdentifiedWMSA).map((items,idx)=>(
        //     <span className="badge bg-dark me-1" key={idx}>{items}</span>
        // ));
        
         
        
            if(JSON.parse(argItems.gapIdentifiedWMSA).length > 0){
                return <>
                    <span className="badge captionTxt bg-dark me-1">
                    {
                        JSON.parse(argItems.gapIdentifiedWMSA)[0]            
                    }
                    </span>
                    {/* <a 
                        href="#" 
                        className="more-link"
                        data-bs-toggle="tooltip" 
                        data-bs-placement="top"
                        title={JSON.parse(argItems.gapIdentifiedWMSA).map((_items, idx) => _items)}
                    >
                        More...
                    </a> */}

                    <Button 
                        type="button"                                                                                    
                        className="more-link"
                        tooltip={JSON.parse(argItems.gapIdentifiedWMSA).map((_items, idx) => _items)}
                        tooltipOptions={{position: 'top'}} 
                        label="More..."   
                    />
                </>;
            }
            else{
                return "";
            }
        
        
    }
    const changeItemsJCGap=(argItems)=>{
        console.log(argItems);
        // let items = JSON.parse(argItems.jcGapRemarks).map((items,idx)=>(
        //     <span className="badge bg-dark me-1" key={idx}>{items}</span>
        // ));
        // console.log('dsadsa',items);
        if(JSON.parse(argItems.jcGapRemarks).length > 0){
            return  <>
                        <span className="badge captionTxt bg-dark me-1">
                        {
                            JSON.parse(argItems.jcGapRemarks)[0]            
                        }
                        </span>
                        {/* <a 
                            href="#" 
                            className="more-link"
                            data-bs-toggle="tooltip" 
                            data-bs-placement="top"
                            title={JSON.parse(argItems.jcGapRemarks).map((_items, idx) => _items)}
                        >
                            More...
                        </a> */}
                        <Button 
                            type="button"                                                                                    
                            className="more-link"
                            tooltip={JSON.parse(argItems.jcGapRemarks).map((_items, idx) => _items)}
                            tooltipOptions={{position: 'top'}} 
                            label="More..."   
                        />
                    </>;
        }
        else{
            return "";
        }
            
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


        jobCardInfoService.getJobCardListForAudit({
            pageNumber, 
            pageSize, 
            sortOrderBy, 
            sortOrderColumn, 
            filters : {
                "jcid" : argID 
            }
        }).then(
            (response)=>{
                Loading();
                console.log("deep test",response);     
                setCustomerVoiceByWMHO(JSON.parse(response.data.data.data[0].customerVoiceByWMHO));
                setGapIdentifiedWMSA(JSON.parse(response.data.data.data[0].gapIdentifiedWMSA));
                setJcGapRemarks(JSON.parse(response.data.data.data[0].jcGapRemarks));
                setJobCardAudit({
                    ...getJobCardAudit,
                    isActive : response.data.data.data[0].isActive,
                    jcaid : response.data.data.data[0].jcaid,
                    jcid : argID,
                    jcCategory : response.data.data.data[0].jcCategoryStatus,
                    customerVoiceByWMHO : response.data.data.data[0].customerVoiceByWMHO !== "" ? JSON.parse(response.data.data.data[0].customerVoiceByWMHO) : [],
                    gapIdentifiedWMSA : response.data.data.data[0].gapIdentifiedWMSA !== "" ? JSON.parse(response.data.data.data[0].gapIdentifiedWMSA) : [],
                    jcStatus : response.data.data.data[0].jcStatus,
                    vps : response.data.data.data[0].vpsStatus,
                    vpsReason1 : response.data.data.data[0].vpsReason1,
                    vpsReason2 : response.data.data.data[0].vpsReason2,
                    vpsReason3 : response.data.data.data[0].vpsReason3,
                    customerFeedbackDate : new Date(response.data.data.data[0].customerFeedbackDate),
                    newProblem : response.data.data.data[0].newProblemStatus,
                    problemNotCaptured : response.data.data.data[0].problemNotCapturedStatus,
                    sameProblemInJC : response.data.data.data[0].sameProblemInJCStatus,
                    jcGapRemarks : response.data.data.data[0].jcGapRemarks !== "" ? JSON.parse(response.data.data.data[0].jcGapRemarks) : [],
                    auditStatus : response.data.data.data[0].auditStatus,
                    callResponse : response.data.data.data[0].callResponseStatus    
                })           
            }
        ).catch(
            (err)=>{
                Loading();
                console.error(err);
            }
        )


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
                    statusName: response.data.data.data[0].statusName,
                    // customerVoiceByWMHO : response.data.data.data[0].customerVoiceByWMHO !== "" ? JSON.parse(response.data.data.data[0].customerVoiceByWMHO): [],
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


        // jobCardInfoService.getJobCardAuditByID(argID).then(
        //     (response)=>{
        //         console.log("Audit", response);
        //         setCustomerVoiceByWMHO(JSON.parse(response.data.data.customerVoiceByWMHO));
        //         setGapIdentifiedWMSA(JSON.parse(response.data.data.gapIdentifiedWMSA));
        //         setJcGapRemarks(JSON.parse(response.data.data.jcGapRemarks));
        //         setJobCardAudit({
        //             ...getJobCardAudit,
        //             isActive : response.data.data.isActive,
        //             jcaid : response.data.data.jcaid,
        //             jcid : argID,
        //             jcCategory : response.data.data.jcCategory,
        //             customerVoiceByWMHO : response.data.data.customerVoiceByWMHO !== "" ? JSON.parse(response.data.data.customerVoiceByWMHO) : [],
        //             gapIdentifiedWMSA : response.data.data.gapIdentifiedWMSA !== "" ? JSON.parse(response.data.data.gapIdentifiedWMSA) : [],
        //             jcStatus : response.data.data.jcStatus,
        //             vps : response.data.data.vps,
        //             vpsReason1 : response.data.data.vpsReason1,
        //             vpsReason2 : response.data.data.vpsReason2,
        //             vpsReason3 : response.data.data.vpsReason3,
        //             customerFeedbackDate : new Date(response.data.data.customerFeedbackDate),
        //             newProblem : response.data.data.newProblem,
        //             problemNotCaptured : response.data.data.problemNotCaptured,
        //             sameProblemInJC : response.data.data.sameProblemInJC,
        //             jcGapRemarks : response.data.data.jcGapRemarks !== "" ? JSON.parse(response.data.data.jcGapRemarks) : [],
        //             auditStatus : response.data.data.auditStatus,
        //             callResponse : response.data.data.callResponse    
        //         })
        //     }
        // ).catch((err)=>{console.log(err)});

             
        //Loading();
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
    //   jobCardInfoService.getJobCardListForAudit({
    //     pageNumber : newPage + 1,
    //     pageSize,
    //     sortOrderBy,
    //     sortOrderColumn,
    //     filters,
    //   })
    //   .then((response) => {
    //     setTotalCount(response.data.data.totalCount);
    //     setJobCardList(response.data.data.data);
    //     Loading();
    //   })
    //   .catch((error) =>{console.log(error); Loading();});
      
      if(filterStatus){
        status !== "" ?
            jobCardInfoService.getJobCardListForAudit({
                pageNumber : newPage + 1,
                pageSize: rowsPerPage,
                sortOrderBy,
                sortOrderColumn,
                filters : {
                    "region" : region,
                    "dealerId" : dealerId,
                    "status" : _status,
                    "jobcardNumber" : _jobcardNumber
                }
            })
            .then((response) => {
                setTotalCount(response.data.data.totalCount);
                setJobCardList(response.data.data.data);
                Loading();
            })
            .catch((error) =>{console.log(error); Loading();})
        :
            jobCardInfoService.getJobCardListForAudit({
                pageNumber : newPage + 1,
                pageSize: rowsPerPage,
                sortOrderBy,
                sortOrderColumn,
                filters : {
                    "region" : region,
                    "dealerId" : dealerId,
                    "jobcardNumber" : _jobcardNumber
                }
            })
            .then((response) => {
                setTotalCount(response.data.data.totalCount);
                setJobCardList(response.data.data.data);
                Loading();
            })
            .catch((error) =>{console.log(error); Loading();});
        
     }
     else{
            jobCardInfoService.getJobCardListForAudit({
                pageNumber : newPage + 1,
                pageSize: rowsPerPage,
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
        
        }
    };
  
    const handleChangeRowsPerPage = (event) => {
      Loading(settings);
    //   jobCardInfoService.getJobCardListForAudit({
    //     pageNumber,
    //     pageSize : parseInt(event.target.value, 10),
    //     sortOrderBy,
    //     sortOrderColumn,
    //     filters,
    //   })
    //   .then((response) => {
    //     setTotalCount(response.data.data.totalCount);
    //     setJobCardList(response.data.data.data);
    //     Loading();
    //   })
    //   .catch((error) =>{console.log(error); Loading();});

      if(filterStatus){
        status !== "" ?
        jobCardInfoService.getJobCardListForAudit({
            pageNumber,
            pageSize : parseInt(event.target.value, 10),
            sortOrderBy,
            sortOrderColumn,
            filters : {
                "region" : region,
                "dealerId" : dealerId,
                "status" : _status,
                "jobcardNumber" : _jobcardNumber
            }
        })
        .then((response) => {
            setTotalCount(response.data.data.totalCount);
            setJobCardList(response.data.data.data);
            Loading();
        })
        .catch((error) =>{console.log(error); Loading();})
        :
        jobCardInfoService.getJobCardListForAudit({
            pageNumber,
            pageSize:parseInt(event.target.value, 10),
            sortOrderBy,
            sortOrderColumn,
            filters : {
                "region" : region,
                "dealerId" : dealerId,
                "jobcardNumber" : _jobcardNumber
            }
        })
        .then((response) => {
            setTotalCount(response.data.data.totalCount);
            setJobCardList(response.data.data.data);
            Loading();
        })
        .catch((error) =>{console.log(error); Loading();});
        
     }
     else{
        jobCardInfoService.getJobCardListForAudit({
            pageNumber,
            pageSize:parseInt(event.target.value, 10),
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
        
        }
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
  
    };

    
    const getRegions = ()=>{
        reportService.getRegionDetails().then(
            (response)=>{
            console.log("region",response)
            setRegionDetails(response.data.data.data);
            }          
        ).catch((err)=>{console.log(err)})
    }
    const getDealersListByRegion = (argID)=>{
        
        commonService.getDealersByRegion(argID).then(
            (response)=>{
                console.log("DealerbyRegion", response);
                setDealers(response.data.data.data);
               
            }
        ).catch((err)=>{console.log(err)});
    }
    const getDealerInfo = () => {
        dealerMasterService
          .getDealerForDropdown(
           true
          )
          .then((response) => {
            console.log(response);
            setDealers(response.data.data.data);
          })
          .catch((error) => console.log(error));
    };
    const getAuditStatusList = ()=>{
        commonService.getAuditStatus(true).then(
            (response)=>{
                console.log("AuditStatus",response.data.data.data);
                setAuditStatus(response.data.data.data);
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }
    const handleFilter = (name) => (event) => {
        const value = event.target.value;
        if(name === 'region'){
            if(value !== ""){
                getDealersListByRegion(value);
            }else{
                getDealerInfo();
            }
            
        }

        setFilter({
            ...getFilter,
            "filterStatus" : true,
            [name] : value
        });
    }
    const filterJobcardNumber = () => {
       // debugger
        Loading(settings)
        jobCardInfoService.getJobCardListForAudit({
            pageNumber, 
            pageSize : rowsPerPage, 
            sortOrderBy, 
            sortOrderColumn, 
            filters : {
                "region" : region,
                "dealerId" : dealerId,
                "status" : _status,
                "jobcardNumber" : _jobcardNumber
            }
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
        // setTimeout(() => {
        //     setJobCardItems({
        //         ...getJobCardItems,
        //         "filters": ""
        //     });
        //     setFilter("");
        // }, 5000);
        
    }

    const showJCID = (rowData, column)=>{
        return (<div>
            {rowData}
        {/* <a href="#" onClick={()=>setJobCardActions({ ...jobcardActions, openJobcard : true })}>{rowData}</a> */}
        </div>);
    }
    useEffect(()=>{
        getAllJobCardLists();  
        getDealerInfo();
        getRegions();
        getAuditStatusList();
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
                                        <select 
                                            name="region"
                                            value={region}
                                            onChange={handleFilter("region")}
                                            className="form-select select-custom me-1"
                                        >
                                            <option value="">--Select Region--</option>
                                            {
                                                getRegionDetails.map((items, idx)=>(
                                                    <option value={items.text} key={idx}>{items.text}</option>
                                                ))
                                            }
                                        </select>
                                        <select 
                                            className="form-select select-custom me-1"
                                            name="dealerId"
                                            value={dealerId}
                                            onChange={handleFilter("dealerId")}
                                        >
                                            <option value="">--Select Dealer--</option>
                                            {
                                                dealers.map((items, idx)=>(
                                                    <option value={items.id} key={idx}>{items.text}</option>
                                                ))
                                            }   
                                        </select>
                                        <select 
                                            className="form-select select-custom me-1"
                                            name="_status"
                                            value={_status}
                                            onChange={handleFilter("_status")}
                                        >
                                            <option value="0">--Select Status--</option>
                                            {
                                                auditStatusList.map((items, idx)=>(
                                                    <option key={idx} value={items.id}>
                                                        {items.text}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <div className="input-group me-2 searchBox" >
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Search..."
                                                aria-label="Search..."
                                                aria-describedby="button-addon2"
                                                name="_jobcardNumber"
                                                value={_jobcardNumber}
                                                onChange={handleFilter("_jobcardNumber")}
                                            />
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                type="button"
                                                id="button-addon2"
                                                onClick={filterJobcardNumber}
                                            >
                                                <i className="bi bi-search"></i>
                                            </button>

                                            
                                        </div>
                                        <button 
                                            className="btn btn-sm btn-primary" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#staticBackdrop"
                                        >
                                            Export Data
                                        </button>
                                    </div>
                                    {/* <div className="d-flex justify-content-end mb-1">
                                        <button 
                                            className="btn btn-sm btn-primary" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#staticBackdrop"
                                        >
                                            Export Data
                                        </button>
                                    </div> */}
                                   

                                    <div>
                                        <DataTable value={jobCardList} scrollable scrollHeight="400px"  scrollDirection="both" className="mt-3">
                                            <Column field="jcNumber" header="JC ID" style={{ flexGrow: 1, flexBasis: '100px' }} frozen body={(data, props) => 
                                                <div> 
                                                    <Button label={data.jcNumber} className="p-button-rounded p-button-text" 
                                                            onClick={(e) => {
                                                                showJobCardDetails(data.jcid)
                                                                console.log("row idx: " + props.rowIndex, data);
                                                            }
                                                        }/>
                                                </div>
                                            }>                
                                            </Column>
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

                                        <div className="row g-1">
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Job Card Category
                                                </label>
                                                <input 
                                                    value={jcCategory} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Understanding of Customer Voice by WM/HO
                                                </label>
                                                <div className="form-control disabled">
                                                    {
                                                        customerVoiceByWMHO.length !== 0 ? (
                                                            customerVoiceByWMHO.map((items, idx)=>(
                                                                <span key={idx} className="badge bg-dark text-wrap me-1 mb-1">
                                                                    {items}
                                                                </span>
                                                            ))
                                                        ):(<></>)                      
                                                        //dealerObservation
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Gap Identified by WM/SA
                                                </label>
                                                <div className="form-control disabled">
                                                    {
                                                        gapIdentifiedWMSA.length !==0 ?(
                                                        gapIdentifiedWMSA.map((items, idx)=>(
                                                            <span key={idx} className="badge bg-dark text-wrap me-1 mb-1">
                                                                {items}
                                                            </span>
                                                        ))
                                                        ):(<></>)
                                                        //dealerObservation
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <label className="form-label">
                                                    Jobcard Gap  Remarks
                                                </label>
                                                <div className="form-control disabled">
                                                    {
                                                        jcGapRemarks.length !== 0 ? (
                                                        jcGapRemarks.map((items, idx)=>(
                                                            <span key={idx} className="badge bg-dark text-wrap me-1 mb-1">
                                                                {items}
                                                            </span>
                                                        ))
                                                        ):(<></>)
                                                        //dealerObservation
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row g-1">
                                        <div className="col-3"> 
                                                <label className="form-label">
                                                    VPS Status
                                                </label>
                                                <input 
                                                    value={vps} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3"> 
                                                <label className="form-label">
                                                    VPS Reason 1
                                                </label>
                                                <input 
                                                    value={vpsReason1} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3"> 
                                                <label className="form-label">
                                                    VPS Reason 2
                                                </label>
                                                <input 
                                                    value={vpsReason2} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3"> 
                                                <label className="form-label">
                                                    VPS Reason 3
                                                </label>
                                                <input 
                                                    value={vpsReason3} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            
                                        </div>
                                        <div className="row g-1">
                                            <div className="col-3"> 
                                                <label className="form-label">
                                                    New Problem Reported
                                                </label>
                                                <input 
                                                    value={newProblem} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3"> 
                                                <label className="form-label">
                                                    Same Problem Reported
                                                </label>
                                                <input 
                                                    value={sameProblemInJC} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3"> 
                                                <label className="form-label">
                                                    Problem Not Captured
                                                </label>
                                                <input 
                                                    value={problemNotCaptured} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-3"> 
                                                <label className="form-label">
                                                    Call Response
                                                </label>
                                                <input 
                                                    value={callResponse} 
                                                    className="form-control"  
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div className="row g-1">
                                            <div className="col-3"> 
                                                <label className="form-label">
                                                    Call Response
                                                </label>
                                                <input 
                                                    value={callResponse} 
                                                    className="form-control"  
                                                    disabled
                                                />
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