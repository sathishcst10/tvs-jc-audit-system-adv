import { useEffect, useRef, useState } from "react";
import { Loading } from "react-loading-ui";
import { Toast } from "primereact/toast";

import TablePagination from '@mui/material/TablePagination';
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown";


import dealerMasterService from "../../services/dealer-master.service";

import jobCardInfoService from "../../services/job-card-info.service";
import modelMasterService from "../../services/model-master.service";
import userService from "../../services/user.service";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import { ExportData } from "../exportData";
import reportService from "../../services/report.service";
import commonService from "../../services/common.service";
// import MasterLayout from "../_layout/_masterLayout"

const JobCardOperator = () => {
    const toast = useRef(null);
    const settings = {
        title: "",
        text: "",
        progress: false,
        progressedClose: false,
        theme: "dark",
    };
    const [jobcardActions, setJobCardActions] = useState({
        newJobCard : false,
        openJobCard: false,
        updateJobCard: false
    });
    const [totalCount, setTotalCount] = useState(0);
    const [getTagDesc, setTagDesc] = useState([]);
    const [getInitialObs, setInitialObs] = useState([]);
    const [getFinalFindings, setFinalFindings] = useState([]);
    const [getActionTaken, setActionTaken] = useState([]);
    const [getDealerObs, setDealerObs] = useState([]);
    const [dealers, setDealers] = useState([]);
    const [modelLists, setModelLists] = useState([]);
    const [ServiceTypes, setServiceTypes] = useState([]);
    const [teleCallers, setTeleCallers] = useState([]);
    const [getFilter, setFilter] = useState({
        "filterStatus":false,
        "region" : "",
        "dealerId" : 0,
        "status" : "",
        "_jobcardNumber" : ""
    });
    const {region, dealerId, status, _jobcardNumber, filterStatus}=getFilter;
    const { openJobCard, updateJobCard, newJobCard } = jobcardActions;
    const [showJobcards, setShowJobCards] = useState([]);
    const [fileUpload, setFileUpload] = useState({
        jcfront: 0,
        jcback: 0
    });
    const [selectedDocument, setSelectedDocument] = useState({
        frontType : "",
        frontFileName : ""
       
    });

    const [selectedDoc, setSelectedDoc] = useState({
        backType : "",
        backFileName : ""
    })
    const {frontType, frontFileName} = selectedDocument;
    const {backType, backFileName} = selectedDoc;
    const formData_front = new FormData();
    const formData_back = new FormData();
    const {jcfront, jcback } = fileUpload;
    const [getAllJobCards, setAllJobCards] = useState(
        {
            "pageNumber": 1,
            "pageSize": 10,
            "sortOrderBy": "DESC",
            "sortOrderColumn": "JCID",
            "filters": ""
        }
    );

    const { pageNumber, pageSize, sortOrderBy, sortOrderColumn, filters } = getAllJobCards;
    const [dealerDetails, setDealerDetails] = useState({
        dealerLocation : "",
        dealerName : ""
    });
    const [getState , setState] = useState([]);
    const [getDealersList , setDealersList] = useState([]);
    const [getRegionDetails, setRegionDetails] = useState([]);
    const {dealerName, dealerLocation} = dealerDetails;
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
        jobCardInfoService.getJobCardDetailsForOperator({
            pageNumber : page,
            pageSize : rowsPerPage,
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
            Loading();
            console.log(err)
        })
    }
    const modifyJobCardStatus = (argID) =>{
        jobCardInfoService.updateJobCardStatus({
            "jcid": argID
          }).then(
            (response)=>{
                console.log("Job Card Taken" , response);
            }
        ).catch((err)=>console.log(err));
    }
    const getUpdateForm = (argID) => {        
        setJobCardActions({
            ...jobcardActions,
            openJobCard: true
        })
        modifyJobCardStatus(argID);
        getJobCardDetailsByID(argID);
    }

    const getDealerDetailsById = (argID)=>{
        dealerMasterService.getDealerById(argID).then(
            (response)=>{
                console.log("sele" , response);
                setDealerDetails({
                    ...dealerDetails,
                    dealerName : response.data.data.dealerName,
                    dealerLocation : response.data.data.dealerLocation
                });

                

            }
        ).catch((err)=>console.log(err));
    }

    const getAllModels = () =>{
        modelMasterService.getModelLists(true).then(
            (response)=>{
                console.log(response);
                setModelLists(response.data.data.data);
            }
        )
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
    const getAllServiceTypes = () =>{
        jobCardInfoService.getServiceTypes(true).then(
            (response)=>{
                console.log("ServiceTypes", response);
                setServiceTypes(response.data.data.data);
            }
        ).catch((err)=>console.log(err))
    }
    const getAllStatesList = ()=>{
        dealerMasterService.getStates(true).then(
            (response)=>{
                console.log("State : ",response);
                setState(response.data.data.data);
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }

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
    const loadDealersByState =(event)=>{
        console.log("stateSelected",event.target.value);

        dealerMasterService.getDealerByState(event.target.value).then(
            (response)=>{
                console.log(response)
                setDealers(response.data.data.data);
            }
        ).catch((err)=>{
            console.log(err);
        })

        // dealerMasterService.getDealerByState(event.target.value).then(
        //     (response)=>{
        //         console.log(response)

        //     }
        // ).catch((err)=>{console.log(err)});

    }
    const getAllTeleCallersList = ()=>{
        userService.getTeleCallersList(true).then(
            (response)=>{
                console.log("Telecaller", response);
                setTeleCallers(response.data.data.data);
            }
        ).catch((err)=>console.log(err));
    }

    const getJobCardDetailsByID = (argID) =>{
        jobCardInfoService.getJobCardById(argID).then(
            (response)=>{
                console.log("getDetails", response);
                getDealerDetailsById(response.data.data.dealerID);
                setTagDesc(JSON.parse(response.data.data.customerVoice));
                setInitialObs(JSON.parse(response.data.data.initialObservation));
                setFinalFindings(JSON.parse(response.data.data.finalFinding));
                setActionTaken(JSON.parse(response.data.data.actionTaken))
                setDealerObs(
                     response.data.data.dealerObservation !== "" ? JSON.parse(response.data.data.dealerObservation) : []);

                setSaveJobCard({
                    ...saveJobCard,
                    jcid : argID,
                    userID : response.data.data.userID, 
                    dealerID : response.data.data.dealerID,
                    jcNumber : response.data.data.jcNumber,
                    jobcardNumber : response.data.data.jobcardNumber,
                    jcBack : response.data.data.jcBack,
                    jcFront : response.data.data.jcFront,
                    isDataEntryTaken : response.data.data.isDataEntryTaken,
                    dataEntryTakenBy : response.data.data.dataEntryTakenBy,
                    isDataEntryCompleted : response.data.data.isDataEntryCompleted,
                    isTelecallCompleted : response.data.data.isTelecallCompleted,
                    dmsNumber : response.data.data.dmsNumber,
                    engineFrameNumber : response.data.data.engineFrameNumber,
                    modelID : response.data.data.modelID,
                    vehicleNumber : response.data.data.vehicleNumber,
                    kMs : response.data.data.kMs,
                    serviceDate : new Date(response.data.data.serviceDate),
                    customerName : response.data.data.customerName,
                    customerMobile : response.data.data.customerMobile,
                    customerAddress : response.data.data.customerAddress,
                    saName : response.data.data.saName,
                    technicianName : response.data.data.technicianName,
                    customerVoice : JSON.parse(response.data.data.customerVoice),
                    initialObservation : JSON.parse(response.data.data.initialObservation),
                    finalFinding : JSON.parse(response.data.data.finalFinding),
                    actionTaken : JSON.parse(response.data.data.actionTaken),
                    dealerObservation : response.data.data.dealerObservation !== "" ? JSON.parse(response.data.data.dealerObservation) : [],
                    serviceTypeID : response.data.data.serviceTypeID,
                    isActive : response.data.data.isActive,
                    assignTeleCallerID : response.data.data.assignTeleCallerID
                })

                // setSaveJobCard({
                //     ...saveJobCard,
                //     jcid : argID,
                //     userID : response.data.data.userID,
                //     dealerID : response.data.data.dealerID,
                //     jcNumber : response.data.data.jcNumber,
                //     jobcardNumber : response.data.data.jobcardNumber,
                //     isDataEntryTaken : response.data.data.isDataEntryTaken,
                //     dataEntryTakenBy: response.data.data.dataEntryTakenBy,
                //     jcBack : response.data.data.jcBack,
                //     jcFront : response.data.data.jcFront,
                //     customerVoice : JSON.parse(response.data.data.customerVoice),
                //     initialObservation : JSON.parse(response.data.data.initialObservation),
                //     finalFinding : JSON.parse(response.data.data.finalFinding),
                //     actionTaken : JSON.parse(response.data.data.actionTaken),
                // })

            }
        ).catch((err)=>{
            console.log(err);
        })
    }
    const handleFilter = (name) => (event) => {
        //debugger;
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
        // setAllJobCards({
        //     ...getAllJobCards,
        //     "filters": {
        //         [name]: value
        //     }
        // });
        console.log(getFilter);
    }
    const filterJobcardNumber = () => {
        Loading(settings)
        console.log(getFilter);
        // setAllJobCards({
        //     ...getAllJobCards,
        //     "filters": {
        //         "region" : region,
        //         "dealerId" : dealerId,
        //         "status" : status,
        //         "jobcardNumber" : _jobcardNumber
        //     }
        // });
        status !== "" ?
        jobCardInfoService.getJobCardDetailsForOperator(
        {
            pageNumber,
            pageSize,
            sortOrderBy,
            sortOrderColumn,
            filters : {
                "region" : region,
                "dealerId" : dealerId,
                "status" : status === 'true' ? true : false,
                "jobcardNumber" : _jobcardNumber
            }
        }).then(
            (response) => {
                Loading();
                console.log(response);
                setTotalCount(response.data.data.totalCount);
                setShowJobCards(response.data.data.data);
            }
        ).catch((err) => {
            Loading();
            console.log(err)
        })
        :
        jobCardInfoService.getJobCardDetailsForOperator(
            {
                pageNumber,
                pageSize,
                sortOrderBy,
                sortOrderColumn,
                filters : {
                    "region" : region,
                    "dealerId" : dealerId,
                    "jobcardNumber" : _jobcardNumber
                }
            }).then(
                (response) => {
                    Loading();
                    console.log(response);
                    setTotalCount(response.data.data.totalCount);
                    setShowJobCards(response.data.data.data);
                }
            ).catch((err) => {
                Loading();
                console.log(err)
            })
        // setTimeout(() => {
        //     setAllJobCards({
        //         ...getAllJobCards,
        //         "filters": ""
        //     });
        //     setFilter("");
        // }, 5000);
        
    }
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleFiles = dType => event => {
        if (dType === "JCFront") {
            formData_front.append("DocumentFile", event.target.files[0]);
            formData_front.append("DocumentType", dType);
            uploadFront();
        }
        else {
            formData_back.append("DocumentFile", event.target.files[0]);
            formData_back.append("DocumentType", dType);
            uploadBack();
        }
    }
    const handleChangePage = (event, newPage) => {
      Loading(settings);
      setPage(newPage + 1);
      //debugger
     if(filterStatus){
        status !== "" ?
        jobCardInfoService.getJobCardDetailsForOperator({
            pageNumber : newPage + 1,
            pageSize : rowsPerPage,
            sortOrderBy,
            sortOrderColumn,
            filters : {
                "region" : region,
                "dealerId" : dealerId,
                "status" : status === 'true' ? true : false,
                "jobcardNumber" : _jobcardNumber
            }
        })
        .then((response) => {
            setTotalCount(response.data.data.totalCount);
            setShowJobCards(response.data.data.data);
            Loading();
        })
        .catch((error) =>{console.log(error); Loading();})
        :
        jobCardInfoService.getJobCardDetailsForOperator({
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
            setShowJobCards(response.data.data.data);
            Loading();
        })
        .catch((error) =>{console.log(error); Loading();});
        
     }
     else{
        jobCardInfoService.getJobCardDetailsForOperator({
            pageNumber : newPage + 1,
            pageSize: rowsPerPage,
            sortOrderBy,
            sortOrderColumn,
            filters,
        })
        .then((response) => {
            setTotalCount(response.data.data.totalCount);
            setShowJobCards(response.data.data.data);
            Loading();
        })
        .catch((error) =>{console.log(error); Loading();});
        
        }
    }
    const createNewJobcard = ()=>{
        
        setJobCardActions({
            ...jobcardActions,
            openJobCard : false,
            updateJobCard : false,
            newJobCard : true
        })
    }
    const handleChangeRowsPerPage = (event) => {
      Loading(settings);
    //   jobCardInfoService.getJobCardDetailsForOperator({
    //     pageNumber,
    //     pageSize : parseInt(event.target.value, 10),
    //     sortOrderBy,
    //     sortOrderColumn,
    //     filters,
    //   })
    //   .then((response) => {
    //     setTotalCount(response.data.data.totalCount);
    //     setShowJobCards(response.data.data.data);
    //     Loading();
    //   })
    //   .catch((error) =>{console.log(error); Loading();});
      if(filterStatus){
        status !== "" ?
        jobCardInfoService.getJobCardDetailsForOperator({
            pageNumber,
            pageSize : parseInt(event.target.value, 10),
            sortOrderBy,
            sortOrderColumn,
            filters : {
                "region" : region,
                "dealerId" : dealerId,
                "status" : status === 'true' ? true : false,
                "jobcardNumber" : _jobcardNumber
            }
        })
        .then((response) => {
            setTotalCount(response.data.data.totalCount);
            setShowJobCards(response.data.data.data);
            Loading();
        })
        .catch((error) =>{console.log(error); Loading();})
        :
        jobCardInfoService.getJobCardDetailsForOperator({
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
            setShowJobCards(response.data.data.data);
            Loading();
        })
        .catch((error) =>{console.log(error); Loading();});
        
     }
     else{
        jobCardInfoService.getJobCardDetailsForOperator({
            pageNumber,
            pageSize:parseInt(event.target.value, 10),
            sortOrderBy,
            sortOrderColumn,
            filters,
        })
        .then((response) => {
            setTotalCount(response.data.data.totalCount);
            setShowJobCards(response.data.data.data);
            Loading();
        })
        .catch((error) =>{console.log(error); Loading();});
        
        }
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
  
    };

    const uploadFront = () => {
        Loading(settings);
        jobCardInfoService.uploadJobCard(formData_front).then(
            (res) => {
                console.log(res);
                if(res.data.success){
                    Loading();
                    toast.current.show(
                        {
                            severity: 'success',
                            summary: 'Success Message',
                            detail: res.data.message,
                            life: 3000
                        }
                    );
                    setFileUpload({
                        ...fileUpload,
                        jcfront: res.data.data.documentId
                    });
                    
                }else{
                    Loading();
                    toast.current.show(
                        {
                            severity: 'error',
                            summary: 'Error Message',
                            detail: res.data.message,
                            life: 3000
                        }
                    );
                }
                // setSaveJobCard({
                //     ...saveJobCard,
                //     jcFront : res.data.data.documentId
                // })

               
                
            }
        ).catch((err) => {console.log(err); Loading()})
    }
    const uploadBack = () => {
        Loading(settings)
        jobCardInfoService.uploadJobCard(formData_back).then(
            (response) => {
                debugger;

                console.log(response);
                if(response.data.success){
                    Loading();
                    toast.current.show(
                        {
                            severity: 'success',
                            summary: 'Success Message',
                            detail: response.data.message,
                            life: 3000
                        }
                    );
                    setFileUpload({
                        ...fileUpload,
                        jcback: response.data.data.documentId
                    })
                }else{
                    toast.current.show(
                        {
                            severity: 'error',
                            summary: 'Error Message',
                            detail: response.data.message,
                            life: 3000
                        }
                    );
                    Loading()
                }
                
               
                // setSaveJobCard({
                //     ...saveJobCard,
                //     jcBack : res.data.data.documentId
                // })
            }
        ).catch((err) => {console.log(err); Loading()})

    }

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        setSaveJobCard({
            ...saveJobCard,
            [name]: value
        });
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        Loading(settings);
        jobCardInfoService.updateJobCard({
            jcid,
            userID,
            dealerID,
            jcNumber,
            jobcardNumber,
            jcBack,
            jcFront,
            isDataEntryTaken,
            dataEntryTakenBy,
            isDataEntryCompleted : true,
            isTelecallCompleted,
            dmsNumber,
            engineFrameNumber,
            modelID,
            vehicleNumber,
            kMs,
            serviceDate,
            customerName,
            customerMobile,
            customerAddress,
            saName,
            technicianName,
            customerVoice: customerVoice !== "" ? JSON.stringify(customerVoice) : "[]",
            initialObservation: initialObservation !== "" ? JSON.stringify(initialObservation) : "[]",
            finalFinding: finalFinding !== "" ? JSON.stringify(finalFinding) : "[]",
            actionTaken: actionTaken !== "" ? JSON.stringify(actionTaken) : "[]",
            dealerObservation : dealerObservation !== "" ? JSON.stringify(dealerObservation) : "[]",
            serviceTypeID,
            isActive,
            assignTeleCallerID
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
                    Loading();
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
                    Loading();
                }
            }
        ).catch((err)=>{console.log(err); Loading()})
    }

    const handleSaveJobcard = (event)=>{
        Loading(settings);
        console.log(saveJobCard);
      
        if(jobcardNumber !== "" && jcfront !== 0) {
            jobCardInfoService.createJobCard({
                jcid,
                userID,
                dealerID,
                jcNumber,
                jobcardNumber,
                jcBack: jcback,
                jcFront: jcfront,
                isDataEntryTaken,
                dataEntryTakenBy,
                isDataEntryCompleted,
                isTelecallCompleted,
                dmsNumber,
                engineFrameNumber,
                modelID,
                vehicleNumber,
                kMs,
                serviceDate,
                customerName,
                customerMobile,
                customerAddress,
                saName,
                technicianName,
                customerVoice: customerVoice !== "" ? JSON.stringify(customerVoice) : "[]",
                initialObservation: initialObservation !== "" ? JSON.stringify(initialObservation) : "[]",
                finalFinding: finalFinding !== "" ? JSON.stringify(finalFinding) : "[]",
                actionTaken: actionTaken !== "" ? JSON.stringify(actionTaken) : "[]",
                dealerObservation,
                serviceTypeID,
                isActive,
                assignTeleCallerID
            }).then(
                (response) => {
                    console.log("OneRes",response);
                    if (response.data.success) {

                        toast.current.show(
                            {
                                severity: 'success',
                                summary: 'Success Message',
                                detail: response.data.message,
                                life: 3000
                            }
                        );

                        // setJobCard({
                        //     ...jobCard,
                        //     newJobCard: false
                        // });
                        // getJobCardForDealer();
                        closeForm();
                        Loading();
                    } else {

                        toast.current.show(
                            {
                                severity: 'warn',
                                summary: 'Warning Message',
                                detail: response.data.message,
                                life: 3000
                            }
                        );
                        Loading();
                    }
                }
            ).catch((err) => {console.log(err); Loading();});
        }else{
            toast.current.show(
                {
                    severity: 'warn',
                    summary: 'Warning Message',
                    detail: "Please fill required fields.",
                    life: 3000
                }
            );
            Loading();
        }
    }

    const closeForm = () => {
        setJobCardActions({
            ...jobcardActions,
            openJobCard: false,
            updateJobCard: false,
            newJobCard : false
        });

        setSaveJobCard({
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
        })
        setTagDesc([]);
        setActionTaken([]);
        setInitialObs([]);
        setFinalFindings([]);
        getAllJobCardsList();
    }

    const addTags = async (event, items) => {
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
        }
    };
    const removeTags = (indexToRemove, items) => {
        if (items === "CustomerVoice") {
            setTagDesc([...getTagDesc.filter((_, index) => index !== indexToRemove)]);
            setSaveJobCard({
                ...saveJobCard,
                customerVoice: [...customerVoice.filter((_, index) => index !== indexToRemove)]
            });
        }
        else if (items === "InitialObs") {
            setInitialObs([...getInitialObs.filter((_, index) => index !== indexToRemove)]);
            setSaveJobCard({
                ...saveJobCard,
                initialObservation: [...initialObservation.filter((_, index) => index !== indexToRemove)]
            })
        }
        else if (items === "FinalFindings") {
            setFinalFindings([...getFinalFindings.filter((_, index) => index !== indexToRemove)]);
            setSaveJobCard({
                ...saveJobCard,
                finalFinding: [...finalFinding.filter((_, index) => index !== indexToRemove)]
            });
        }
        else if (items === "ActionTaken") {
            setActionTaken([...getActionTaken.filter((_, index) => index !== indexToRemove)]);
            setSaveJobCard({
                ...saveJobCard,
                actionTaken: [...actionTaken.filter((_, index) => index !== indexToRemove)]
            });
        }
        else if (items === "DealerObs") {
            setDealerObs([...getDealerObs.filter((_, index) => index !== indexToRemove)]);
            setSaveJobCard({
                ...saveJobCard,
                dealerObservation: [...dealerObservation.filter((_, index) => index !== indexToRemove)]
            });
        }
    };
    
    const downloadDocs = (argItems) =>{        
        jobCardInfoService.downloadDocuments(argItems).then(
            (response)=>{
                const type = response.headers['content-type'];
                const _blob = new Blob([response.data], {type : type});
                console.log("FileTYpe",type);
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
        getAllTeleCallersList();
        getDealerInfo();
        getAllStatesList();
        getRegions();
    }, [])
    return (
        <>
            <div className="row g-1">
                {
                    !openJobCard && !newJobCard ?
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
                                                name="status"
                                                value={status}
                                                onChange={handleFilter("status")}
                                            >
                                                <option value="">--Select Status--</option>
                                                <option value="false">Open</option>
                                                <option value="true">Completed</option>
                                            </select>
                                            {/* <button className="btn btn-sm btn-dark me-1">
                                                Filter
                                            </button> */}
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
                                                className="btn btn-sm btn-primary me-1" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#staticBackdrop"
                                            >
                                                Export Data
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-primary ms-1"
                                                onClick={createNewJobcard}
                                            >
                                                New Jobcard
                                            </button>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped table-hover table-custom">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th>ID No.</th>
                                                        <th>Job Card Number</th>
                                                        <th>Dealer Name</th>
                                                        <th>Customer Feedback</th>
                                                        <th>Initial Observation</th>
                                                        <th>Final Finding</th>
                                                        <th>Action Taken</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        showJobcards.map((items, index) => (
                                                            <tr key={index} >
                                                                <td>{items.jcNumber}</td>
                                                                <td>{items.jobcardNumber}</td>
                                                                <td>
                                                                    {items.dealerName}
                                                                    <p className="text-muted mb-0">{items.dealerLocation}</p>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        
                                                                        (
                                                                            <>
                                                                            <   span className="badge captionTxt bg-dark mb-1 mx-1">
                                                                                    {JSON.parse(items.customerVoice)[0]}
                                                                                </span> 
                                                                                {/* <a 
                                                                                    href="#" 
                                                                                    className="more-link"
                                                                                    data-bs-toggle="tooltip" 
                                                                                    data-bs-placement="top"
                                                                                    title={JSON.parse(items.customerVoice).map((_items, idx) => _items)}
                                                                                >
                                                                                    More...
                                                                                </a> */}
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
                                                                {/* <td>
                                                                    <a className="lnkAction" href="#">View</a>
                                                                </td> */}
                                                                <td>

                                                                    {
                                                                        (!items.isDataEntryTaken && !items.isDataEntryCompleted)  ? (
                                                                            <span className="badge bg-primary">Open</span>
                                                                        )
                                                                        : (items.isDataEntryTaken &&  !items.isDataEntryCompleted)?
                                                                        (
                                                                            <span className="badge bg-warning">Processing</span>
                                                                        )
                                                                        : (items.isDataEntryCompleted && items.isDataEntryTaken)?(<span className="badge bg-success">Completed</span>)
                                                                        :
                                                                        (
                                                                            <span className="badge bg-primary">Open</span>
                                                                        )
                                                                    }
                                                                    
                                                                </td>
                                                                <td>
                                                                    <button 
                                                                        onClick={() => getUpdateForm(items.jcid)} 
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
                                        </div>
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
                        )  : openJobCard ?
                        (
                            <div className="col-12">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    className="btn btn-sm btn-outline-danger me-1"
                                                    onClick={closeForm}
                                                >
                                                    Cancel
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-success ms-1" 
                                                    type="submit"
                                                >
                                                    Update Job card
                                                </button>
                                            </div>
                                            <div className="">
                                                <div className="row">
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
                                                <div className="row">
                                                    <div className="col">
                                                        <label className="form-label">Customer Name</label>
                                                        <input 
                                                            className="form-control" 
                                                            name="customerName"
                                                            value={customerName}
                                                            onChange={handleChange("customerName")}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label className="form-label">Customer Mobile</label>
                                                        <input 
                                                            className="form-control" 
                                                            name="customerMobile"
                                                            value={customerMobile}
                                                            onChange={handleChange("customerMobile")}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label className="form-label">Customer Address</label>
                                                        <input 
                                                            className="form-control" 
                                                            name="customerAddress"
                                                            value={customerAddress}
                                                            onChange={handleChange("customerAddress")}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <label className="form-label">Model Name</label>
                                                        <select 
                                                            className="form-select" 
                                                            name="modelID" 
                                                            value={modelID} 
                                                            onChange={handleChange("modelID")}
                                                            required
                                                        >
                                                            <option value="" selected>--Select model--</option>
                                                            {
                                                                modelLists.map((items, idx)=>(
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
                                                            onChange={handleChange("engineFrameNumber")}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label className="form-label">KM's</label>
                                                        <input 
                                                            className="form-control" 
                                                            name="kMs"
                                                            value={kMs}
                                                            onChange={handleChange("kMs")}
                                                            required
                                                        />
                                                    </div>                                               
                                                    
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <label className="form-label">DMS Number</label>
                                                        <input 
                                                            className="form-control" 
                                                            name="dmsNumber"
                                                            value={dmsNumber}        
                                                            onChange={handleChange("dmsNumber")}     
                                                            required                                           
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label className="form-label">Vehicle Number</label>
                                                        <input 
                                                            className="form-control" 
                                                            name="vehicleNumber"
                                                            value={vehicleNumber}    
                                                            onChange={handleChange("vehicleNumber")}  
                                                            required                                                  
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
                                                            name = "serviceDate"
                                                            onChange={handleChange("serviceDate")} 
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <label className="form-label">Service type</label>
                                                        <select 
                                                            className="form-select" 
                                                            name="serviceTypeID" 
                                                            value={serviceTypeID} 
                                                            onChange={handleChange("serviceTypeID")}
                                                            required
                                                        >
                                                            <option value="">--Select Service type--</option>
                                                            {
                                                                ServiceTypes.map((items, idx)=>(
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
                                                            onChange={handleChange("saName")}     
                                                            required                                            
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label className="form-label">Technician Name</label>
                                                        <input 
                                                            className="form-control" 
                                                            name="technicianName"
                                                            value={technicianName}    
                                                            onChange={handleChange("technicianName")}     
                                                            required                                               
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
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
                                                                    onKeyUp={event => event.key === "Enter" ?  addTags(event, "CustomerVoice") : null}
                                                                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
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
                                                                    onKeyUp={event => event.key === "Enter" ? addTags(event, "InitialObs") : null}
                                                                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
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
                                                                    onKeyUp={event => event.key === "Enter" ? addTags(event, "FinalFindings") : null}
                                                                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
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
                                                                    onKeyUp={event => event.key === "Enter" ? addTags(event, "ActionTaken") : null}
                                                                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
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
                                                                    onKeyUp={event => event.key === "Enter" ? addTags(event, "DealerObs") : null}
                                                                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
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
                                                                File 1
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
                                                                        File 2
                                                                    </button>
                                                                )
                                                                :
                                                                (<></>)
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-4">
                                                        <label className="form-lable">Choose Telecaller</label>
                                                        <select 
                                                            className="form-select" 
                                                            name="assignTeleCallerID" 
                                                            value={assignTeleCallerID} 
                                                            onChange={handleChange("assignTeleCallerID")}
                                                            required
                                                        >
                                                            <option value="">--Select Telecaller--</option>
                                                            {
                                                                teleCallers.map((items, idx)=>(
                                                                    <option key={idx} value={items.id}>{items.text}</option>
                                                                ))
                                                                
                                                            }
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                        : newJobCard ? 
                        (
                            <div className="col-12">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-end">
                                            <button
                                                className="btn btn-sm btn-danger me-1"
                                                onClick={closeForm}
                                            >
                                                Cancel    
                                            </button> 
                                            <button 
                                                className="btn btn-sm btn-success ms-1"
                                                onClick={handleSaveJobcard}
                                            >
                                                Save Jobcard
                                            </button>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label htmlFor="frmDealer" className="form-label">State</label>
                                                        <select 
                                                            className="form-select"
                                                            name="StateID"     
                                                            onChange={loadDealersByState}                                                   
                                                        >
                                                            <option value="">--Select State--</option>
                                                            { getState.map((items, idx) => (
                                                                <option key={idx} value={items.id}>
                                                                    {items.text}
                                                                </option>
                                                                ))
                                                            }
                                                        </select>
                                                </div>
                                            </div>
                                            <div className="col">
                                            <div className="mb-3">
                                                    <label htmlFor="frmDealer" className="form-label">Dealer Details</label>
                                                        <select 
                                                            className="form-select"
                                                            name="dealerID"
                                                            value={dealerID}
                                                            onChange={handleChange("dealerID")}
                                                        >
                                                            <option value="">--Select Dealer--</option>
                                                            { dealers.map((items, idx) => (
                                                                <option key={idx} value={items.id}>
                                                                    {items.text}
                                                                </option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                            </div>
                                            <div className="col">
                                            <div className="mb-3">
                                                    <label
                                                        htmlFor="jobCardNumber"
                                                        className="form-label"
                                                    >
                                                        Job Card Number<sup>*</sup>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="jobCardNumber"
                                                        placeholder="Job Card Number"
                                                        name="jobcardNumber"
                                                        value={jobcardNumber}
                                                        onChange={handleChange("jobcardNumber")}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                            <div className="mb-3">
                                                    <label htmlFor="frmDesc" className="form-label">Customer Voice</label>
                                                    <div className="tags-input">
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
                                                        <input
                                                            type="text"
                                                            placeholder="Press enter"
                                                            name="customerVoice"
                                                            onKeyUp={event => event.key === "Enter" ? addTags(event, "CustomerVoice") : null}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                            <div className="mb-3">
                                                    <label htmlFor="frmDesc" className="form-label">Initial Observation</label>
                                                    <div className="tags-input">
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
                                                        <input
                                                            type="text"
                                                            placeholder="Press enter"
                                                            onKeyUp={event => event.key === "Enter" ? addTags(event, "InitialObs") : null}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                            <div className="mb-3">
                                                    <label htmlFor="frmDesc" className="form-label">Final Findings</label>
                                                    <div className="tags-input">
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
                                                        <input
                                                            type="text"
                                                            placeholder="Press enter"
                                                            onKeyUp={event => event.key === "Enter" ? addTags(event, "FinalFindings") : null}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                            <div className="mb-3">
                                                    <label htmlFor="frmDesc" className="form-label">Action Taken</label>
                                                    <div className="tags-input">
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
                                                        <input
                                                            type="text"
                                                            placeholder="Press enter"
                                                            onKeyUp={event => event.key === "Enter" ? addTags(event, "ActionTaken") : null}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                            <div className="mb-2">
                                                    <label htmlFor="formFileFront" className="form-label">
                                                       Attachment - 1<sup>*</sup>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        id="formFileFront"
                                                        onChange={handleFiles("JCFront")}
                                                    />
                                                   
                                                   <label className="mt-1">
                                                        <span className="badge bg-success me-1">{frontType}</span>
                                                        <span className="badge bg-success ms-1">{frontFileName}</span>
                                                   </label>
                                                </div>
                                            </div>
                                            <div className="col">
                                            <div className="mb-3">
                                                    <label htmlFor="formFile" className="form-label">
                                                        Attachment - 2 <small>(Optional)</small>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        id="formFileBack"
                                                        onChange={handleFiles("JCBack")}
                                                    />
                                                    
                                                    <label className="mt-1">  
                                                        <span className="badge bg-success me-1">{backType}</span>
                                                        <span className="badge bg-success ms-1">{backFileName}</span>
                                                    </label>
                                                    {
                                                    updateJobCard &&
                                                    <p className="text-danger">Note : If select any image it will be overwrite existing image/file.</p>
                                                }
                                                </div>
                                            </div>
                                        </div>                                       
                                    </div>
                                </div>                            
                            </div>
                        ):(<></>)

                }

            </div>
            <Toast ref={toast} />


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


export default JobCardOperator;