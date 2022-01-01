import { useEffect, useRef, useState } from "react";
import { Loading } from "react-loading-ui";
import { Toast } from "primereact/toast";
import TablePagination from '@mui/material/TablePagination';
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown";

import MasterLayout from "../_layout/_masterLayout";

import dealerMasterService from "../../services/dealer-master.service";
import jobCardInfoService from "../../services/job-card-info.service";
import modelMasterService from "../../services/model-master.service";
import userService from "../../services/user.service";
import aggregateMasterService from "../../services/aggregate-master.service";



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
    const [ServiceTypes, setServiceTypes] = useState([]);
    const [teleCallers, setTeleCallers] = useState([]);
    const [aggregates, setAggregates] = useState([]);
    const [customerFeedbackStatus, setCustomerFeedbackStatus] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [getJobCardItems, setJobCardItems] = useState({
        "pageNumber": 1,
        "pageSize": 10,
        "sortOrderBy": "",
        "sortOrderColumn": "",
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
    const [getJobCardAudit, setJobCardAudit] = useState(
        {
            "isActive": true,
            "jcaid": 0,
            "jcid": 0,
            "customerFeedback": "",
            "actualWorkDone": "",
            "gapAggregate": 0,
            "gapIdendtified": "",
            "status": 0
        }
    );
    const { jcaid, customerFeedback, actualWorkDone, gapAggregate, gapIdendtified, status } = getJobCardAudit
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
                setJobCardAudit({
                    ...getJobCardAudit,
                    isActive : response.data.data.isActive,
                    jcaid : response.data.data.jcaid,
                    jcid : argID,
                    customerFeedback : response.data.data.customerFeedback,
                    actualWorkDone : response.data.data.actualWorkDone,
                    gapAggregate : response.data.data.gapAggregate,
                    gapIdendtified : response.data.data.gapIdendtified,
                    status : response.data.data.status
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

    const handleChangePage = (event, newPage) => {
        Loading(settings);
        setPage(newPage + 1);

        jobCardInfoService.getAllJobCardsList({
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
        jobCardInfoService.getAllJobCardsList({
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

    const closeForm = () => {
        setJobCardActions({
            ...jobcardActions,
            openJobCard: false,
            updateJobCard : false
        });
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
        event.preventDefault()
        Loading(settings);
        
        if(!updateJobCard){
            jobCardInfoService.saveJobCardAudit({
                jcid,
                jcaid,
                isActive,
                actualWorkDone,
                customerFeedback,
                gapAggregate,
                gapIdendtified,
                status : parseInt(status, 10)
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
                actualWorkDone,
                customerFeedback,
                gapAggregate,
                gapIdendtified,
                status : parseInt(status, 10)
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
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        showJobcards.map((items, idx) => (
                                                            <tr key={idx} onClick={() => updateJobcard(items.jcid)}>
                                                                <td>{items.jcNumber}</td>
                                                                <td>{items.jobcardNumber}</td>
                                                                <td>
                                                                    {items.dealerName}
                                                                    <p className="text-muted mb-0">{items.dealerLocation}</p>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        JSON.parse(items.customerVoice).map((_items, idx) => (
                                                                            <span key={idx} className="badge bg-dark mb-1 mx-1">{_items}</span>
                                                                        ))
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        !items.isTelecallCompleted ?
                                                                            (
                                                                                <span className="badge bg-primary">Open</span>
                                                                            )
                                                                            :
                                                                            (
                                                                                <span className="badge bg-success">Completed</span>
                                                                            )
                                                                    }

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
                                        <form onSubmit={handleSubmit}>
                                            <div className="d-flex justify-content-end pb-1 shadow-sm">
                                                <button
                                                    className="btn btn-sm btn-outline-danger me-1"
                                                    onClick={closeForm}
                                                >
                                                    Cancel
                                                </button>
                                                <button className="btn btn-sm btn-success ms-1" type="submit">
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
                                                                    Front View
                                                                </button>
                                                                <button 
                                                                    className="btn btn-sm btn-outline-primary ms-1 mt-2"
                                                                    onClick={()=>downloadDocs({
                                                                        "documentId": jcBack,
                                                                        "documentType": "JCBack",
                                                                        "id" : jcNumber
                                                                    })}
                                                                >
                                                                    Back View
                                                                </button>
                                                            </div>
                                                        </div>
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
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor="customerFeedback"
                                                                className="form-label"
                                                            >
                                                                Customer Feedback
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="customerFeedback"
                                                                name="customerFeedback"
                                                                value={customerFeedback}
                                                                onChange={handleChange("customerFeedback")}
                                                                placeholder="Customer Feedback"
                                                                required                                                            
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor="actualWork"
                                                                className="form-label"
                                                            >
                                                                Actual work done
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="actualWork"
                                                                name="actualWorkDone"
                                                                value={actualWorkDone}
                                                                onChange={handleChange("actualWorkDone")}
                                                                placeholder="Actual Work done"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor="gapIdentifiedTextarea1"
                                                                className="form-label"
                                                            >
                                                                Gap Aggregate
                                                            </label>
                                                            <select 
                                                                className="form-select custom-select"
                                                                name="gapAggregate"
                                                                value={gapAggregate}
                                                                required
                                                                onChange={handleChange("gapAggregate")}
                                                            >
                                                                <option value="">--Select--</option>
                                                                {
                                                                    aggregates.map((items, idx)=>(
                                                                        <option value={items.id}>{items.text}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor="gapIdentifiedTextarea1"
                                                                className="form-label"
                                                            >
                                                                Gap Identified
                                                            </label>
                                                            <textarea
                                                                className="form-control"
                                                                id="gapIdentifiedTextarea1"
                                                                rows="3"
                                                                name="gapIdendtified"
                                                                value={gapIdendtified}
                                                                required
                                                                onChange={handleChange("gapIdendtified")}
                                                            >
                                                            </textarea>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor="gapIdentifiedTextarea1"
                                                                className="form-label"
                                                            >
                                                                Status
                                                            </label>
                                                            <select 
                                                                className="form-select custom-select"
                                                                name="status"
                                                                value={status}
                                                                required
                                                                onChange={handleChange("status")}
                                                            >
                                                                <option value="">--Select--</option>
                                                                {
                                                                    customerFeedbackStatus.map((items, idx)=>(
                                                                        <option value={items.id}>{items.text}</option>
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
                }


            </div>
            <Toast ref={toast} />
        </>
    )
}

export default JobCardCaller;