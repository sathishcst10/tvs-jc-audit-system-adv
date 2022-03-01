import { useEffect, useRef, useState } from "react";
import { Loading } from "react-loading-ui";
import { Toast } from "primereact/toast";
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import TablePagination from '@mui/material/TablePagination';
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown";

import MasterLayout from "../_layout/_masterLayout";

import dealerMasterService from "../../services/dealer-master.service";
import jobCardInfoService from "../../services/job-card-info.service";
import modelMasterService from "../../services/model-master.service";
import userService from "../../services/user.service";
import aggregateMasterService from "../../services/aggregate-master.service";
import commonService from "../../services/common.service";


const JobCardCaller = () => {
    const toast = useRef(null);
    const settings = {
        title: "",
        text: "",
        progress: false,
        progressedClose: false,
        theme: "dark",
    };
    const [jobcardActions, setJobCardActions] = useState({
        openJobCard: false,
        updateJobCard: false
    });
    const [showJobcards, setShowJobCards] = useState([]);
    const [modelLists, setModelLists] = useState([]);
    
    const [auditStatusList, setAuditStatus] = useState([]);
    const [confirmStatus, setConfirmStatus] = useState([]);
    const [yesNoStatus, setYesNoStatus] = useState([]);
    const [jCCategoryList, setJcCategory] = useState([]);
    const [callResponseList, setCallResponse] = useState([]);

    const [ServiceTypes, setServiceTypes] = useState([]);
    const [teleCallers, setTeleCallers] = useState([]);
    const [aggregates, setAggregates] = useState([]);
    const [getFilter, setFilter] = useState('');
    const [customerFeedbackStatus, setCustomerFeedbackStatus] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [getJobCardItems, setJobCardItems] = useState({
        "pageNumber": 1,
        "pageSize": 10,
        "sortOrderBy": "DESC",
        "sortOrderColumn": "JCID",
        "filters": ""
    });

    const { pageNumber, pageSize, sortOrderBy, sortOrderColumn, filters } = getJobCardItems;
    const { openJobCard, updateJobCard } = jobcardActions;
    const [totalCount, setTotalCount] = useState(0);
    const [getTagDesc, setTagDesc] = useState([]);
    const [getInitialObs, setInitialObs] = useState([]);
    const [getFinalFindings, setFinalFindings] = useState([]);
    const [getActionTaken, setActionTaken] = useState([]);
    const [getDealerObs, setDealerObs] = useState([]);
    const [getCustomerVoiceByWMHO, setCustomerVoiceByWMHO] = useState([]);
    const [getJcGapRemarks, setJcGapRemarks] = useState([]);
    const [getGapIdentifiedWMSA, setGapIdentifiedWMSA] = useState([]);

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
            "jcGapRemarks": "string",
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
        isDeleted
    
    } = getJobCardAudit
    const [dealerDetails, setDealerDetails] = useState({
        dealerLocation: "",
        dealerName: ""
    });
    const { dealerName, dealerLocation } = dealerDetails;
    const [saveJobCard, setSaveJobCard] = useState({
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
        "vehicleNumber": "",
        "kMs": "",
        "serviceDate": new Date(),
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
        "isActive": true,
        "assignTeleCallerID": 0
    });

    const {
        jcid,
        userID,
        dealerID,
        jcNumber,
        jobcardNumber,
        jcBack,
        jcFront,
        isDataEntryTaken,
        dataEntryTakenBy,
        isDataEntryCompleted,
        isTelecallCompleted,
        dmsNumber,
        engineFrameNumber,
        modelID,
        vehicleNumber,
        kMs,
        serviceDate = new Date(),
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
        isActive,
        assignTeleCallerID

    } = saveJobCard;

    const getAllJobCardsList = () => {
        Loading(settings);
        jobCardInfoService.getJobCardListForTeleCaller({
            pageNumber,
            pageSize,
            sortOrderBy,
            sortOrderColumn,
            filters
        }).then(
            (response) => {
                Loading();
                console.log(response);
                setTotalCount(response.data.data.totalCount);
                setShowJobCards(response.data.data.data);
            }
        ).catch((err) => {
            console.log(err);
            Loading()
        })
    }

    const getJobCardDetailsByID = (argID) => {
        jobCardInfoService.getJobCardById(argID).then(
            (response) => {
                console.log("getDetails", response);
                if(response.data.data.isTelecallCompleted){
                    setJobCardActions({
                        ...jobcardActions,
                        openJobCard : false,
                        updateJobCard : true
                    })
                }else{
                    setJobCardActions({
                        ...jobcardActions,
                        openJobCard : true,
                        updateJobCard : false
                    })
                }
                getDealerDetailsById(response.data.data.dealerID);
                setTagDesc(JSON.parse(response.data.data.customerVoice));
                setInitialObs(JSON.parse(response.data.data.initialObservation));
                setFinalFindings(JSON.parse(response.data.data.initialObservation));
                setActionTaken(JSON.parse(response.data.data.actionTaken))
                setDealerObs(
                    response.data.data.dealerObservation !== "" ? JSON.parse(response.data.data.dealerObservation) : []);

                setSaveJobCard({
                    ...saveJobCard,
                    jcid: argID,
                    userID: response.data.data.userID,
                    dealerID: response.data.data.dealerID,
                    jcNumber: response.data.data.jcNumber,
                    jobcardNumber: response.data.data.jobcardNumber,
                    jcBack: response.data.data.jcBack,
                    jcFront: response.data.data.jcFront,
                    isDataEntryTaken: response.data.data.isDataEntryTaken,
                    dataEntryTakenBy: response.data.data.dataEntryTakenBy,
                    isDataEntryCompleted: response.data.data.isDataEntryCompleted,
                    isTelecallCompleted: response.data.data.isTelecallCompleted,
                    dmsNumber: response.data.data.dmsNumber,
                    engineFrameNumber: response.data.data.engineFrameNumber,
                    modelID: response.data.data.modelID,
                    vehicleNumber: response.data.data.vehicleNumber,
                    kMs: response.data.data.kMs,
                    serviceDate: new Date(response.data.data.serviceDate),
                    customerName: response.data.data.customerName,
                    customerMobile: response.data.data.customerMobile,
                    customerAddress: response.data.data.customerAddress,
                    saName: response.data.data.saName,
                    technicianName: response.data.data.technicianName,
                    customerVoice: JSON.parse(response.data.data.customerVoice),
                    initialObservation: JSON.parse(response.data.data.initialObservation),
                    finalFinding: JSON.parse(response.data.data.finalFinding),
                    actionTaken: JSON.parse(response.data.data.actionTaken),
                    dealerObservation: response.data.data.dealerObservation !== "" ? JSON.parse(response.data.data.dealerObservation) : [],
                    serviceTypeID: response.data.data.serviceTypeID,
                    isActive: response.data.data.isActive,
                    assignTeleCallerID: response.data.data.assignTeleCallerID
                })

            }
        ).catch((err) => {
            console.log(err);
        });

        jobCardInfoService.getJobCardAuditByID(argID).then(
            (response)=>{
                console.log("Audit", response);
                setCustomerVoiceByWMHO(JSON.parse(response.data.data.customerVoiceByWMHO));
                setGapIdentifiedWMSA(JSON.parse(response.data.data.gapIdentifiedWMSA));
                setJcGapRemarks(JSON.parse(response.data.data.jcGapRemarks));
                setJobCardAudit({
                    ...getJobCardAudit,
                    isActive : response.data.data.isActive,
                    jcaid : response.data.data.jcaid,
                    jcid : argID,
                    jcCategory : response.data.data.jcCategory,
                    customerVoiceByWMHO : response.data.data.customerVoiceByWMHO !== "" ? JSON.parse(response.data.data.customerVoiceByWMHO) : [],
                    gapIdentifiedWMSA : response.data.data.gapIdentifiedWMSA !== "" ? JSON.parse(response.data.data.gapIdentifiedWMSA) : [],
                    jcStatus : response.data.data.jcStatus,
                    vps : response.data.data.vps,
                    vpsReason1 : response.data.data.vpsReason1,
                    vpsReason2 : response.data.data.vpsReason2,
                    vpsReason3 : response.data.data.vpsReason3,
                    customerFeedbackDate : new Date(response.data.data.customerFeedbackDate),
                    newProblem : response.data.data.newProblem,
                    problemNotCaptured : response.data.data.problemNotCaptured,
                    sameProblemInJC : response.data.data.sameProblemInJC,
                    jcGapRemarks : response.data.data.jcGapRemarks !== "" ? JSON.parse(response.data.data.jcGapRemarks) : [],
                    auditStatus : response.data.data.auditStatus,
                    callResponse : response.data.data.callResponse    
                })
            }
        ).catch((err)=>{console.log(err)});
    }

    const getDealerDetailsById = (argID) => {
        dealerMasterService.getDealerById(argID).then(
            (response) => {
                console.log("sele", response);
                setDealerDetails({
                    ...dealerDetails,
                    dealerName: response.data.data.dealerName,
                    dealerLocation: response.data.data.dealerLocation
                });



            }
        ).catch((err) => console.log(err));
    }

    const getAllModels = () => {
        modelMasterService.getModelLists(true).then(
            (response) => {
                console.log(response);
                setModelLists(response.data.data.data);
            }
        )
    }

    const getAllServiceTypes = () => {
        jobCardInfoService.getServiceTypes(true).then(
            (response) => {
                console.log("ServiceTypes", response);
                setServiceTypes(response.data.data.data);
            }
        ).catch((err) => console.log(err))
    }
    const getAllAggregates = ()=>{
        aggregateMasterService.getAggregateLists(true).then(
            (response)=>{
                console.log(response);
                setAggregates(response.data.data.data);
            }
        ).catch((err)=>{
            console.log(err);
        });
    }

    const getCustomerFeedBackStatus = () =>{
        jobCardInfoService.getCustomerFeedback(true).then(
            (response)=>{
                console.log(response);
                setCustomerFeedbackStatus(response.data.data.data);
            }
        ).catch((err)=>{
            console.log(err);
        })
    }

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
    const getConfirmStatusList = ()=>{
        commonService.getConfirmStatus(true).then(
            (response)=>{
                console.log("ConfirmStatus",response.data.data.data);
                setConfirmStatus(response.data.data.data);
            }
        ).catch(
            (err)=>{
                console.log(err)
            }
        )
    }

    const getYesNoStatusList = ()=>{
        commonService.getYesNoStatus(true).then(
            (response)=>{
                console.log("YesNoStatus",response.data.data.data);
                setYesNoStatus(response.data.data.data);
            }
        ).catch(
            (err)=>{
                console.log(err)
            }
        )
    }

    const getJCCategoryList = ()=>{
        commonService.getJCCategoryStatus(true).then(
            (response)=>{
                console.log("JCCategory",response.data.data.data);
                setJcCategory(response.data.data.data);

            }
        ).catch(
            (err)=>{
                console.log(err)
            }
        )
    }
    const getCallResponseStatusList = ()=>{
        commonService.getCallResponseStatus(true).then(
            (response)=>{
                console.log("CallResponse",response.data.data.data);
                setCallResponse(response.data.data.data);
            }
        ).catch(
            (err)=>{
                console.log(err)
            }
        )
    }

    const handleChangePage = (event, newPage) => {
        Loading(settings);
        setPage(newPage + 1);

        jobCardInfoService.getJobCardListForTeleCaller({
            pageNumber: newPage + 1,
            pageSize,
            sortOrderBy,
            sortOrderColumn,
            filters,
        })
            .then((response) => {
                setTotalCount(response.data.data.totalCount);
                setShowJobCards(response.data.data.data);
                Loading();
            })
            .catch((error) => { console.log(error); Loading(); });

    };

    const handleChangeRowsPerPage = (event) => {
        Loading(settings);
        jobCardInfoService.getJobCardListForTeleCaller({
            pageNumber,
            pageSize: parseInt(event.target.value, 10),
            sortOrderBy,
            sortOrderColumn,
            filters,
        })
            .then((response) => {
                setTotalCount(response.data.data.totalCount);
                setShowJobCards(response.data.data.data);
                Loading();
            })
            .catch((error) => { console.log(error); Loading(); });
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);

    };


    const updateJobcard = (argID) => {
        setJobCardActions({
            ...jobcardActions,
            openJobCard: true
        });
        getJobCardDetailsByID(argID);
    }
    const handleFilter = (name) => (event) => {
        const value = event.target.value;
        setFilter(value);
        setJobCardItems({
            ...getJobCardItems,
            "filters": {
                "jobcardNumber": value
            }
        });
    }
    const filterJobcardNumber = () => {
        getAllJobCardsList();
        setTimeout(() => {
            setJobCardItems({
                ...getJobCardItems,
                "filters": ""
            });
            setFilter("");
        }, 5000);
        
    }
    const closeForm = () => {
        setJobCardActions({
            ...jobcardActions,
            openJobCard: false,
            updateJobCard : false
        });

        setJobCardAudit({
            ...getJobCardAudit,            
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
            "jcGapRemarks": "string",
            "auditStatus": 0,
            "callResponse": 0,
            "createdDate": "",
            "createdBy": 0,
            "modifiedDate": "",
            "modifiedBy": 0,
            "isActive": true,
            "isDeleted": true
            }
        )
    }
    const addTags = async (event, items) => {
        //debugger
        if (event.target.value !== "") {
            if (items === "CustomerVoice") {
                //debugger
                setTagDesc([...getTagDesc, event.target.value]);
                //props.selectedTags([...tags, event.target.value]);

                setSaveJobCard({
                    ...saveJobCard,
                    customerVoice: [...customerVoice, event.target.value]
                });

                event.target.value = "";

            }
            else if (items === "InitialObs") {
                setInitialObs([...getInitialObs, event.target.value]);
                //props.selectedTags([...tags, event.target.value]);
                setSaveJobCard({
                    ...saveJobCard,
                    initialObservation: [...initialObservation, event.target.value]
                })
                event.target.value = "";

            }
            else if (items === "FinalFindings") {
                setFinalFindings([...getFinalFindings, event.target.value]);
                //props.selectedTags([...tags, event.target.value]);

                setSaveJobCard({
                    ...saveJobCard,
                    finalFinding: [...finalFinding, event.target.value]
                });

                event.target.value = "";
            }
            else if (items === "ActionTaken") {
                setActionTaken([...getActionTaken, event.target.value]);
                //props.selectedTags([...tags, event.target.value]);

                setSaveJobCard({
                    ...saveJobCard,
                    actionTaken: [...actionTaken, event.target.value]
                });

                event.target.value = "";
            }
            else if (items === "DealerObs") {
                setDealerObs([...getDealerObs, event.target.value]);
                //props.selectedTags([...tags, event.target.value]);

                setSaveJobCard({
                    ...saveJobCard,
                    dealerObservation: [...dealerObservation, event.target.value]
                });

                event.target.value = "";
            } 
            else if(items === "CustomerVoiceByWM"){
                setCustomerVoiceByWMHO([...getCustomerVoiceByWMHO, event.target.value]);
                event.target.value = "";
            }
            else if(items === "GapIdentifiedByWMSA"){
                setGapIdentifiedWMSA([...getGapIdentifiedWMSA, event.target.value]);
                event.target.value = "";
            }
            else if(items === "JCGapRemarks"){
                setJcGapRemarks([...getJcGapRemarks, event.target.value]);
                event.target.value = "";
            }
        }
    };
    const removeTags = (indexToRemove, items) => {
        if (items === "CustomerVoice") {
            setTagDesc([...getTagDesc.filter((_, index) => index !== indexToRemove)]);
        }
        else if (items === "InitialObs") {
            setInitialObs([...getInitialObs.filter((_, index) => index !== indexToRemove)]);
        }
        else if (items === "FinalFindings") {
            setFinalFindings([...getFinalFindings.filter((_, index) => index !== indexToRemove)]);
        }
        else if (items === "ActionTaken") {
            setActionTaken([...getActionTaken.filter((_, index) => index !== indexToRemove)]);
        }
        else if (items === "DealerObs") {
            setDealerObs([...getDealerObs.filter((_, index) => index !== indexToRemove)]);
        }
        else if(items === "CustomerVoiceByWM"){
            setCustomerVoiceByWMHO([...getCustomerVoiceByWMHO.filter((_, index) => index !== indexToRemove)]);
        }
        else if(items === "GapIdentifiedByWMSA"){
            setGapIdentifiedWMSA([...getGapIdentifiedWMSA.filter((_, index) => index !== indexToRemove)]);
        }
        else if(items === "JCGapRemarks"){
            setJcGapRemarks([...getJcGapRemarks.filter((_, index) => index !== indexToRemove)]);
        }
    };

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        // setSaveJobCard({
        //     ...saveJobCard,
        //     [name]: value
        // });
        setJobCardAudit({
            ...getJobCardAudit,
            [name] : value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        Loading(settings);
        //debugger;
        if(!updateJobCard){
            jobCardInfoService.saveJobCardAudit({
                jcid,
                jcaid,
                isActive,
                jcCategory,
                customerVoiceByWMHO : getCustomerVoiceByWMHO !== "" ? JSON.stringify(getCustomerVoiceByWMHO) : "[]",
                gapIdentifiedWMSA : getGapIdentifiedWMSA !== "" ? JSON.stringify(getGapIdentifiedWMSA) : "[]",
                jcStatus,
                vps,
                vpsReason1,
                vpsReason2,
                vpsReason3,
                customerFeedbackDate,
                newProblem,
                problemNotCaptured,
                sameProblemInJC,
                jcGapRemarks : getJcGapRemarks !== "" ? JSON.stringify(getJcGapRemarks) : "[]",
                auditStatus,
                callResponse              
            }).then(
                (response)=>{                
                    console.log(response);
                    if(response.data.success){
                        
                        toast.current.show(
                            {
                                severity: 'success',
                                summary: 'Success Message',
                                detail: response.data.message,
                                life: 3000
                            }
                        );
                        getAllJobCardsList();
                        closeForm();
                    }else{
                        
                        toast.current.show(
                            {
                                severity: 'warn',
                                summary: 'Warning Message',
                                detail: response.data.message,
                                life: 3000
                            }
                        );
                    }
                    Loading();
                }
            ).catch(
                (err)=>{
                    Loading()
                    console.log(err);
                }
            )
        }else{
            jobCardInfoService.updateJobCardAudit({
                jcid,
                jcaid,
                isActive,
                jcCategory,
                customerVoiceByWMHO : getCustomerVoiceByWMHO !== "" ? JSON.stringify(getCustomerVoiceByWMHO) : "[]",
                gapIdentifiedWMSA : getGapIdentifiedWMSA !== "" ? JSON.stringify(getGapIdentifiedWMSA) : "[]",
                jcStatus,
                vps,
                vpsReason1,
                vpsReason2,
                vpsReason3,
                customerFeedbackDate,
                newProblem,
                problemNotCaptured,
                sameProblemInJC,
                jcGapRemarks : getJcGapRemarks !== "" ? JSON.stringify(getJcGapRemarks) : "[]",
                auditStatus,
                callResponse                
            }).then(
                (response)=>{                
                    console.log(response);
                    if(response.data.success){
                        
                        toast.current.show(
                            {
                                severity: 'success',
                                summary: 'Success Message',
                                detail: response.data.message,
                                life: 3000
                            }
                        );
                        getAllJobCardsList();
                        closeForm();
                    }else{
                        
                        toast.current.show(
                            {
                                severity: 'warn',
                                summary: 'Warning Message',
                                detail: response.data.message,
                                life: 3000
                            }
                        );
                    }
                    Loading();
                }
            ).catch(
                (err)=>{
                    Loading()
                    console.log(err);
                }
            )
        }
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

    useEffect(() => {
        getAllJobCardsList();
        getAllModels();
        getAllServiceTypes();
        getAllAggregates();
        getCustomerFeedBackStatus();

        getAuditStatusList();
        getConfirmStatusList();
        getYesNoStatusList();
        getJCCategoryList();
        getCallResponseStatusList();

    }, [])

    return (
        <>
            <div className="row g-1">
                {
                    !openJobCard && !updateJobCard ?
                        (
                            <div className="col-12">
                                <div className="card shadow-sm">
                                    <div className="card-body p-1">
                                        <div className="d-flex justify-content-end mb-1">
                                            <div className="input-group me-2 searchBox" >
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    placeholder="Search..."
                                                    aria-label="Search..."
                                                    aria-describedby="button-addon2"
                                                    name="getFilter"
                                                    value={getFilter}
                                                    onChange={handleFilter("getFilter")}
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
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped table-hover table-custom">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th>
                                                            ID Number
                                                        </th>
                                                        <th>
                                                            Job Card Number
                                                        </th>
                                                        <th>
                                                            Dealer Name
                                                        </th>
                                                        <th>
                                                            Customer Feedback
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
                                                            Status
                                                        </th>
                                                        <th>
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        showJobcards.map((items, idx) => (
                                                            <tr key={idx}>
                                                                <td>{items.jcNumber}</td>
                                                                <td>{items.jobcardNumber}</td>
                                                                <td>
                                                                    {items.dealerName}
                                                                    <p className="text-muted mb-0">{items.dealerLocation}</p>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        // JSON.parse(items.customerVoice).map((_items, idx) => (
                                                                        //     <span key={idx} className="badge bg-dark mb-1 mx-1">{_items}</span>
                                                                        // ))
                                                                        
                                                                        (
                                                                            <>
                                                                            <   span className="badge captionTxt bg-dark mb-1 mx-1">
                                                                                    {JSON.parse(items.customerVoice)[0]}
                                                                                </span> 
                                                                                <Button 
                                                                                    type="button"                                                                                    
                                                                                    className="more-link"
                                                                                    tooltip={JSON.parse(items.customerVoice).map((_items, idx) => _items)} 
                                                                                    tooltipOptions={{position: 'top'}} 
                                                                                    label="More..."   
                                                                                />
                                                                                    
                                                                            </>
                                                                        )
                                                                        
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        // JSON.parse(items.initialObservation).map((_items, idx) => (
                                                                        //     <span key={idx} className="badge bg-dark mb-1 mx-1">{_items}</span>
                                                                        // ))
                                                                        
                                                                        (
                                                                            <>
                                                                            <   span className="badge captionTxt bg-dark mb-1 mx-1">
                                                                                    {JSON.parse(items.initialObservation)[0]}
                                                                                </span> 
                                                                                {/* <a 
                                                                                    href="#" 
                                                                                    className="more-link"
                                                                                    data-bs-toggle="tooltip" 
                                                                                    data-bs-placement="top"
                                                                                    title={JSON.parse(items.initialObservation).map((_items, idx) => _items)}
                                                                                >
                                                                                    More...
                                                                                </a> */}
                                                                                <Button 
                                                                                    type="button"                                                                                    
                                                                                    className="more-link"
                                                                                    tooltip={JSON.parse(items.initialObservation).map((_items, idx) => _items)} 
                                                                                    tooltipOptions={{position: 'top'}} 
                                                                                    label="More..."   
                                                                                />
                                                                            </>
                                                                        )
                                                                        
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        // JSON.parse(items.finalFinding).map((_items, idx) => (
                                                                        //     <span key={idx} className="badge bg-dark mb-1 mx-1">{_items}</span>
                                                                        // ))

                                                                        (
                                                                            <>
                                                                            <   span className="badge captionTxt bg-dark mb-1 mx-1">
                                                                                    {JSON.parse(items.finalFinding)[0]}
                                                                                </span> 
                                                                                {/* <a 
                                                                                    href="#" 
                                                                                    className="more-link"
                                                                                    data-bs-toggle="tooltip" 
                                                                                    data-bs-placement="top"
                                                                                    title={JSON.parse(items.finalFinding).map((_items, idx) => _items)}
                                                                                >
                                                                                    More...
                                                                                </a> */}
                                                                                <Button 
                                                                                    type="button"                                                                                    
                                                                                    className="more-link"
                                                                                    tooltip={JSON.parse(items.finalFinding).map((_items, idx) => _items)} 
                                                                                    tooltipOptions={{position: 'top'}} 
                                                                                    label="More..."   
                                                                                />
                                                                            </>
                                                                        )
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        // JSON.parse(items.actionTaken).map((_items, idx) => (
                                                                        //     <span key={idx} className="badge bg-dark mb-1 mx-1">{_items}</span>
                                                                        // ))

                                                                        (
                                                                            <>
                                                                            <   span className="badge captionTxt bg-dark mb-1 mx-1">
                                                                                    {JSON.parse(items.actionTaken)[0]}
                                                                                </span> 
                                                                                {/* <a 
                                                                                    href="#" 
                                                                                    className="more-link"
                                                                                    data-bs-toggle="tooltip" 
                                                                                    data-bs-placement="top"
                                                                                    title={JSON.parse(items.actionTaken).map((_items, idx) => _items)}
                                                                                >
                                                                                    More...
                                                                                </a> */}
                                                                                <Button 
                                                                                    type="button"                                                                                    
                                                                                    className="more-link"
                                                                                    tooltip={JSON.parse(items.actionTaken).map((_items, idx) => _items)} 
                                                                                    tooltipOptions={{position: 'top'}} 
                                                                                    label="More..."   
                                                                                />
                                                                            </>
                                                                        )
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        items.status==1 ?
                                                                        (
                                                                            <span className="badge bg-success">Closed</span>
                                                                           
                                                                        )
                                                                        : items.status==2 ?                                                                            
                                                                        (
                                                                            <span className="badge bg-warning">WIP</span>
                                                                        )
                                                                        :
                                                                        (
                                                                            <span className="badge bg-primary">Open</span>
                                                                        )
                                                                    }

                                                                </td>
                                                                <td>
                                                                    <button
                                                                        onClick={() => updateJobcard(items.jcid)}
                                                                        className="btn btn-sm btn-outline-primary"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
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
                                        {/* <form onSubmit={handleSubmit}> */}
                                            <div className="d-flex justify-content-end pb-1 shadow-sm">
                                                <button
                                                    className="btn btn-sm btn-outline-danger me-1"
                                                    onClick={closeForm}
                                                >
                                                    Cancel
                                                </button>
                                                <button className="btn btn-sm btn-success ms-1" type="submit" onClick={handleSubmit}>
                                                    Update Job card
                                                </button>
                                            </div>

                                            <div className="wrapper container-fluid g-1">
                                                
                                                    <div className="row g-1">
                                                        <div className="col">
                                                            <label className="form-label">ID Number</label>
                                                            <input className="form-control" value={jcNumber} disabled />
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">Jobcard Number</label>
                                                            <input className="form-control" value={jobcardNumber} disabled />
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">Dealer Details</label>
                                                            <input className="form-control" value={`${dealerName} - ${dealerLocation}`} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="row g-1">
                                                        <div className="col">
                                                            <label className="form-label">Customer Name</label>
                                                            <input
                                                                className="form-control"
                                                                name="customerName"
                                                                value={customerName}
                                                                disabled='disabled'
                                                                onChange={handleChange("customerName")}
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">Customer Mobile</label>
                                                            <input
                                                                className="form-control"
                                                                name="customerMobile"
                                                                value={customerMobile}
                                                                disabled='disabled'
                                                                onChange={handleChange("customerMobile")}
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">Customer Address</label>
                                                            <input
                                                                className="form-control"
                                                                name="customerAddress"
                                                                value={customerAddress}
                                                                disabled='disabled'
                                                                onChange={handleChange("customerAddress")}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row g-1">
                                                        <div className="col">
                                                            <label className="form-label">Model Name</label>
                                                            <select
                                                                className="form-select"
                                                                name="modelID"
                                                                value={modelID}
                                                                onChange={handleChange("modelID")}
                                                                disabled='disabled'
                                                            >
                                                                <option value={-1}>--Select model--</option>
                                                                {
                                                                    modelLists.map((items, idx) => (
                                                                        <option key={idx} value={items.id}>{items.text}</option>
                                                                    ))

                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">Engine/Frame Number</label>
                                                            <input
                                                                className="form-control"
                                                                name="engineFrameNumber"
                                                                value={engineFrameNumber}
                                                                disabled='disabled'
                                                                onChange={handleChange("engineFrameNumber")}
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">KM's</label>
                                                            <input
                                                                className="form-control"
                                                                name="kMs"
                                                                value={kMs}
                                                                disabled='disabled'
                                                                onChange={handleChange("kMs")}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className="row g-1">
                                                        <div className="col">
                                                            <label className="form-label">DMS Number</label>
                                                            <input
                                                                className="form-control"
                                                                name="dmsNumber"
                                                                value={dmsNumber}
                                                                disabled='disabled'
                                                                onChange={handleChange("dmsNumber")}
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">Vehicle Number</label>
                                                            <input
                                                                className="form-control"
                                                                name="vehicleNumber"
                                                                value={vehicleNumber}
                                                                disabled='disabled'
                                                                onChange={handleChange("vehicleNumber")}
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">Service Date</label>
                                                            {/* <input 
                                                                className="form-control" 
                                                                name="serviceDate"
                                                                value={serviceDate}     
                                                                onChange={handleChange("serviceDate")}                                                   
                                                            /> */}

                                                            <Calendar
                                                                id="basic"
                                                                value={serviceDate}
                                                                name="serviceDate"
                                                                disabled='disabled'
                                                                onChange={handleChange("serviceDate")}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row g-1">
                                                        <div className="col">
                                                            <label className="form-label">Service type</label>
                                                            <select
                                                                className="form-select"
                                                                name="serviceTypeID"
                                                                value={serviceTypeID}
                                                                onChange={handleChange("serviceTypeID")}
                                                                disabled='disabled'
                                                            >
                                                                <option value={-1}>--Select Service type--</option>
                                                                {
                                                                    ServiceTypes.map((items, idx) => (
                                                                        <option key={idx} value={items.id}>{items.text}</option>
                                                                    ))

                                                                }
                                                            </select>
                                                        </div>

                                                        <div className="col">
                                                            <label className="form-label">Service Advisor Name</label>
                                                            <input
                                                                className="form-control"
                                                                name="saName"
                                                                value={saName}
                                                                disabled='disabled'
                                                                onChange={handleChange("saName")}
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">Technician Name</label>
                                                            <input
                                                                className="form-control"
                                                                name="technicianName"
                                                                value={technicianName}
                                                                disabled='disabled'
                                                                onChange={handleChange("technicianName")}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row g-1">
                                                        <div className="col">
                                                            <div className="mb-3">
                                                                <label htmlFor="frmDesc" className="form-label">Customer Voice</label>
                                                                <div className="tags-input">
                                                                    <div className="tags-content">
                                                                        <ul className="ultag">
                                                                            {
                                                                                getTagDesc.map((tag, index) => (
                                                                                    <li key={index} className="tag">
                                                                                        <span className="tag-title">{tag}</span>
                                                                                        <i
                                                                                            className="bi bi-x-circle-fill tag-close-icon"
                                                                                            onClick={() => removeTags(index, "CustomerVoice")}
                                                                                        >
                                                                                        </i>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Press enter"
                                                                        name="customerVoice"
                                                                        disabled='disabled'
                                                                        onKeyUp={event => event.key === "Enter" ? addTags(event, "CustomerVoice") : null}

                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="mb-3">
                                                                <label htmlFor="frmDesc" className="form-label">Initial Observation</label>
                                                                <div className="tags-input">
                                                                    <div className="tags-content">
                                                                        <ul className="ultag">
                                                                            {
                                                                                getInitialObs.map((tag, index) => (
                                                                                    <li key={index} className="tag">
                                                                                        <span className="tag-title">{tag}</span>
                                                                                        <i
                                                                                            className="bi bi-x-circle-fill tag-close-icon"
                                                                                            onClick={() => removeTags(index, "InitialObs")}
                                                                                        >
                                                                                        </i>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Press enter"
                                                                        disabled='disabled'
                                                                        onKeyUp={event => event.key === "Enter" ? addTags(event, "InitialObs") : null}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="mb-3">
                                                                <label htmlFor="frmDesc" className="form-label">Final Findings</label>
                                                                <div className="tags-input">
                                                                    <div className="tags-content">
                                                                        <ul className="ultag">
                                                                            {
                                                                                getFinalFindings.map((tag, index) => (
                                                                                    <li key={index} className="tag">
                                                                                        <span className="tag-title">{tag}</span>
                                                                                        <i
                                                                                            className="bi bi-x-circle-fill tag-close-icon"
                                                                                            onClick={() => removeTags(index, "FinalFindings")}
                                                                                        >
                                                                                        </i>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Press enter"
                                                                        disabled='disabled'
                                                                        onKeyUp={event => event.key === "Enter" ? addTags(event, "FinalFindings") : null}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row g-1">
                                                        <div className="col">
                                                            <div className="mb-3">
                                                                <label htmlFor="frmDesc" className="form-label">Action Taken</label>
                                                                <div className="tags-input">
                                                                    <div className="tags-content">
                                                                        <ul className="ultag">
                                                                            {
                                                                                getActionTaken.map((tag, index) => (
                                                                                    <li key={index} className="tag">
                                                                                        <span className="tag-title">{tag}</span>
                                                                                        <i
                                                                                            className="bi bi-x-circle-fill tag-close-icon"
                                                                                            onClick={() => removeTags(index, "ActionTaken")}
                                                                                        >
                                                                                        </i>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Press enter"
                                                                        disabled='disabled'
                                                                        onKeyUp={event => event.key === "Enter" ? addTags(event, "ActionTaken") : null}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="mb-3">
                                                                <label htmlFor="frmDesc" className="form-label">Dealer Observation from Job card</label>
                                                                <div className="tags-input">
                                                                    <div className="tags-content">
                                                                        <ul className="ultag">
                                                                            {
                                                                                getDealerObs.map((tag, index) => (
                                                                                    <li key={index} className="tag">
                                                                                        <span className="tag-title">{tag}</span>
                                                                                        <i
                                                                                            className="bi bi-x-circle-fill tag-close-icon"
                                                                                            onClick={() => removeTags(index, "DealerObs")}
                                                                                        >
                                                                                        </i>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Press enter"
                                                                        disabled='disabled'
                                                                        onKeyUp={event => event.key === "Enter" ? addTags(event, "DealerObs") : null}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">Job Card Attachments</label>
                                                            <div>
                                                                <button 
                                                                    className="btn btn-sm btn-outline-primary me-1 mt-2"
                                                                    onClick={()=>downloadDocs({
                                                                        "documentId": jcFront,
                                                                        "documentType": "JCFront",
                                                                        "id" : jcNumber
                                                                    })}
                                                                >
                                                                    File - 1
                                                                </button>
                                                                {
                                                                jcBack !== 0 ?
                                                                (
                                                                    <button 
                                                                        className="btn btn-sm btn-outline-primary ms-1 mt-2"
                                                                        onClick={()=>downloadDocs({
                                                                            "documentId": jcBack,
                                                                            "documentType": "JCBack",
                                                                            "id" : jcNumber
                                                                        })}
                                                                    >
                                                                        File - 2
                                                                    </button>
                                                                )
                                                                :
                                                                (<></>)
}
                                                               
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                    </div>

                                                    <div className="row d-none">
                                                        <div className="col-4">
                                                            <label className="form-lable">Choose Telecaller</label>
                                                            <select className="form-select" name="assignTeleCallerID" value={assignTeleCallerID} onChange={handleChange("assignTeleCallerID")}>
                                                                <option>--Select Telecaller--</option>
                                                                {
                                                                    teleCallers.map((items, idx) => (
                                                                        <option key={idx} value={items.id}>{items.text}</option>
                                                                    ))

                                                                }
                                                            </select>
                                                        </div>

                                                    </div>

                                                    <div className="row g-1">
                                                       <div className="col">
                                                            <label className="form-label">Understanding of customer voice by WM/HO</label>
                                                                <div className="tags-input">
                                                                    <div className="tags-content">
                                                                        <ul className="ultag">
                                                                            {
                                                                                getCustomerVoiceByWMHO.map((tag, index) => (
                                                                                    <li key={index} className="tag">
                                                                                        <span className="tag-title">{tag}</span>
                                                                                        <i
                                                                                            className="bi bi-x-circle-fill tag-close-icon"
                                                                                            onClick={() => removeTags(index, "CustomerVoiceByWM")}
                                                                                        >
                                                                                        </i>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Press enter"
                                                                        name="CustomerVoiceByWM"
                                                                        onKeyUp={event => event.key === "Enter" ? addTags(event, "CustomerVoiceByWM") : null}

                                                                    />
                                                                </div>
                                                       </div>
                                                       <div className="col">
                                                            <label className="form-label">Gap identified by WM/SA or Tech</label>
                                                                <div className="tags-input">
                                                                    <div className="tags-content">
                                                                        <ul className="ultag">
                                                                            {
                                                                                getGapIdentifiedWMSA.map((tag, index) => (
                                                                                    <li key={index} className="tag">
                                                                                        <span className="tag-title">{tag}</span>
                                                                                        <i
                                                                                            className="bi bi-x-circle-fill tag-close-icon"
                                                                                            onClick={() => removeTags(index, "GapIdentifiedByWMSA")}
                                                                                        >
                                                                                        </i>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Press enter"
                                                                        name="GapIdentifiedByWMSA"
                                                                        onKeyUp={event => event.key === "Enter" ? addTags(event, "GapIdentifiedByWMSA") : null}

                                                                    />
                                                                </div>
                                                       </div>
                                                       <div className="col">
                                                            <label className="form-label">Jobcard (OK/Not OK)</label>
                                                            <select 
                                                                className="form-select"
                                                                name="jcStatus"
                                                                value={jcStatus}
                                                                onChange={handleChange("jcStatus")}
                                                            >
                                                                <option value="">--Select--</option>
                                                                {
                                                                    confirmStatus.map((items, idx)=>(
                                                                        <option key={idx} value={items.id}>{items.text}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                       </div>
                                                    </div>
                                                    <div className="row g-1">                                                     
                                                       <div className="col">
                                                            <label className="form-label">Vehicle performance after Service(VPS)</label>
                                                            <select 
                                                                className="form-select"
                                                                name="vps"
                                                                value={vps}
                                                                onChange={handleChange("vps")}
                                                            >
                                                                <option value="">--Select--</option>
                                                                {
                                                                    confirmStatus.map((items, idx)=>(
                                                                        <option key={idx} value={items.id}>{items.text}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                       </div>
                                                       <div className="col">
                                                            <label className="form-label">Reason 1</label>
                                                            <select 
                                                                className="form-select"
                                                                name="vpsReason1"
                                                                value={vpsReason1}
                                                                onChange={handleChange("vpsReason1")}
                                                            >
                                                                <option value="">--Select--</option>    
                                                                {
                                                                    aggregates.map((items, idx)=>(
                                                                        <option key={idx} value={items.id}>
                                                                            {items.text}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>                                                         
                                                       </div>
                                                       <div className="col">
                                                            <label className="form-label">
                                                                Reason 2
                                                            </label>                                                             
                                                            <select 
                                                                className="form-select"
                                                                name="vpsReason2"
                                                                value={vpsReason2}
                                                                onChange={handleChange("vpsReason2")}
                                                            >
                                                                <option value="">--Select--</option>   
                                                                {
                                                                    aggregates.map((items, idx)=>(
                                                                        <option key={idx} value={items.id}>
                                                                            {items.text}
                                                                        </option>
                                                                    ))
                                                                } 
                                                            </select>                                                         
                                                       </div>
                                                    </div>
                                                    <div className="row g-1">
                                                        <div className="col">
                                                            <label className="form-label">
                                                                Reason 3
                                                            </label>    
                                                            <select 
                                                                className="form-select"
                                                                name="vpsReason3"
                                                                value={vpsReason3}
                                                                onChange={handleChange("vpsReason3")}
                                                            >
                                                                <option value="">--Select--</option>    
                                                                {
                                                                    aggregates.map((items, idx)=>(
                                                                        <option key={idx} value={items.id}>
                                                                            {items.text}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>                                                         
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">
                                                                Customer Feedback Date
                                                            </label>    
                                                            <Calendar 
                                                                id="basic" 
                                                                value={customerFeedbackDate} 
                                                                name = "customerFeedbackDate"
                                                                onChange={handleChange("customerFeedbackDate")} 
                                                                required
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">
                                                                New problem reported after service
                                                            </label>    
                                                            <select 
                                                                className="form-select"
                                                                name="newProblem"
                                                                value={newProblem}
                                                                onChange={handleChange("newProblem")}
                                                            >
                                                                <option value="">--Select--</option>
                                                                {
                                                                    yesNoStatus.map((items, idx)=>(
                                                                        <option key={idx} value={items.id}>
                                                                            {items.text}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="row g-1">
                                                        
                                                        
                                                        <div className="col">
                                                            <label className="form-label">
                                                                Customer told problem not captured
                                                            </label>    
                                                            <select 
                                                                    className="form-select"
                                                                    name="problemNotCaptured"
                                                                    value={problemNotCaptured}
                                                                    onChange={handleChange("problemNotCaptured")}
                                                                >
                                                                <option value="">--Select--</option>
                                                                {
                                                                    yesNoStatus.map((items, idx)=>(
                                                                        <option key={idx} value={items.id}>
                                                                            {items.text}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">
                                                                Same problem in JC
                                                            </label>    
                                                                <select 
                                                                    className="form-select"
                                                                    name="sameProblemInJC"
                                                                    value={sameProblemInJC}
                                                                    onChange={handleChange("sameProblemInJC")}
                                                                >
                                                                <option value="">--Select--</option>
                                                                {
                                                                    yesNoStatus.map((items, idx)=>(
                                                                        <option key={idx} value={items.id}>
                                                                            {items.text}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">
                                                                JC Gap remarks
                                                            </label>    
                                                            <div className="tags-input">
                                                                <div className="tags-content">
                                                                    <ul className="ultag">
                                                                        {
                                                                            getJcGapRemarks.map((tag, index) => (
                                                                                <li key={index} className="tag">
                                                                                    <span className="tag-title">{tag}</span>
                                                                                    <i
                                                                                        className="bi bi-x-circle-fill tag-close-icon"
                                                                                        onClick={() => removeTags(index, "JCGapRemarks")}
                                                                                    >
                                                                                    </i>
                                                                                </li>
                                                                            ))
                                                                        }
                                                                    </ul>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Press enter"
                                                                    name="JCGapRemarks"
                                                                    onKeyUp={event => event.key === "Enter" ? addTags(event, "JCGapRemarks") : null}

                                                                />
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                    <div className="row g-1 mb-3">
                                                    <div className="col">
                                                            <label className="form-label">
                                                                Audit status
                                                            </label>    
                                                            <select 
                                                                    className="form-select"
                                                                    name="auditStatus"
                                                                    value={auditStatus}
                                                                    onChange={handleChange("auditStatus")}
                                                                >
                                                                <option value="">--Select--</option>
                                                                {
                                                                    auditStatusList.map((items, idx)=>(
                                                                        <option key={idx} value={items.id}>
                                                                            {items.text}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">
                                                                Call response by customer
                                                            </label>    
                                                            <select 
                                                                className="form-select"
                                                                name="callResponse"
                                                                value={callResponse}
                                                                onChange={handleChange("callResponse")}
                                                            >
                                                                <option value="">--Select--</option>
                                                                {
                                                                    callResponseList.map((items, idx)=>(
                                                                        <option key={idx} value={items.id}>
                                                                            {items.text}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">
                                                                Jobcard Category
                                                            </label>    
                                                            <select 
                                                                className="form-select"
                                                                name="jcCategory"
                                                                value={jcCategory}
                                                                onChange={handleChange("jcCategory")}
                                                            >
                                                                <option value="">--Select--</option>
                                                                {
                                                                    jCCategoryList.map((items, idx)=>(
                                                                        <option key={idx} value={items.id}>
                                                                            {items.text}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                            </div>

                                        {/* </form> */}
                                    </div>
                                </div>
                            </div>
                        )
                }


            </div>
            <Toast ref={toast} />
        </>
    )
}

export default JobCardCaller;