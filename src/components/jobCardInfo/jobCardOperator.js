import { useEffect, useState } from "react";
import { Loading } from "react-loading-ui";
import dealerMasterService from "../../services/dealer-master.service";

import jobCardInfoService from "../../services/job-card-info.service";
import modelMasterService from "../../services/model-master.service";
import userService from "../../services/user.service";
import MasterLayout from "../_layout/_masterLayout"

const JobCardOperator = () => {
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

    const [getTagDesc, setTagDesc] = useState([]);
    const [getInitialObs, setInitialObs] = useState([]);
    const [getFinalFindings, setFinalFindings] = useState([]);
    const [getActionTaken, setActionTaken] = useState([]);
    const [getDealerObs, setDealerObs] = useState([]);

    const [modelLists, setModelLists] = useState([]);
    const [ServiceTypes, setServiceTypes] = useState([]);
    const [teleCallers, setTeleCallers] = useState([]);

    const { openJobCard, updateJobCard } = jobcardActions;
    const [showJobcards, setShowJobCards] = useState([]);
    const [getAllJobCards, setAllJobCards] = useState(
        {
            "pageNumber": 1,
            "pageSize": 10,
            "sortOrderBy": "",
            "sortOrderColumn": "",
            "filters": ""
        }
    );

    const { pageNumber, pageSize, sortOrderBy, sortOrderColumn, filters } = getAllJobCards;
    const [dealerDetails, setDealerDetails] = useState({
        dealerLocation : "",
        dealerName : ""
    });
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
        isActive,
        assignTeleCallerID

    } = saveJobCard;

    const getAllJobCardsList = () => {
        Loading(settings);
        jobCardInfoService.getJobCardDetailsForOperator({
            pageNumber,
            pageSize,
            sortOrderBy,
            sortOrderColumn,
            filters
        }).then(
            (response) => {
                Loading();
                console.log(response);
                setShowJobCards(response.data.data.data);
            }
        ).catch((err) => {
            Loading();
            console.log(err)
        })
    }
    const modifyJobCardStatus = (argID) =>{
        jobCardInfoService.updateJobCardStatus(argID).then(
            (response)=>{
                console.log("Job Card Taken" , response);
            }
        ).catch((err)=>console.log(err));
    }
    const getUpdateForm = (argID) => {
        console.log(argID);
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

    const getAllServiceTypes = () =>{
        jobCardInfoService.getServiceTypes(true).then(
            (response)=>{
                console.log("ServiceTypes", response);
                setServiceTypes(response.data.data.data);
            }
        ).catch((err)=>console.log(err))
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
                setFinalFindings(JSON.parse(response.data.data.initialObservation));
                setActionTaken(JSON.parse(response.data.data.actionTaken))

                setSaveJobCard({
                    ...saveJobCard,
                    jcid : argID,
                    userID : response.data.data.userID,
                    dealerID : response.data.data.dealerID,
                    jcNumber : response.data.data.jcNumber,
                    jobcardNumber : response.data.data.jobcardNumber,
                    jcBack : response.data.data.jcBack,
                    jcFront : response.data.data.jcFront,
                    customerVoice : JSON.parse(response.data.data.customerVoice),
                    initialObservation : JSON.parse(response.data.data.initialObservation),
                    finalFinding : JSON.parse(response.data.data.finalFinding),
                    actionTaken : JSON.parse(response.data.data.actionTaken),
                })

            }
        ).catch((err)=>{
            console.log(err);
        })
    }
    const handleChange = (name) => (event) => {
        const value = event.target.value;
        setSaveJobCard({
            ...saveJobCard,
            [name]: value
        });
    }

    const handleSubmit = ()=>{
        debugger
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
            customerVoice: customerVoice != "" ? JSON.stringify(customerVoice) : "[]",
            initialObservation: initialObservation != "" ? JSON.stringify(initialObservation) : "[]",
            finalFinding: finalFinding != "" ? JSON.stringify(finalFinding) : "[]",
            actionTaken: actionTaken != "" ? JSON.stringify(actionTaken) : "[]",
            dealerObservation : dealerObservation != "" ? JSON.stringify(dealerObservation) : "[]",
            serviceTypeID,
            isActive,
            assignTeleCallerID
        }).then(
            (response)=>{
                console.log(response);
            }
        ).catch((err)=>{console.log(err)})
    }

    const closeForm = () => {
        setJobCardActions({
            ...jobcardActions,
            openJobCard: false,
            updateJobCard: false
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
    
    useEffect(() => {
        getAllJobCardsList();
        getAllModels();
        getAllServiceTypes();
        getAllTeleCallersList();
    }, [])
    return (
        <MasterLayout pageMap={['Home', 'Job Card Information']}>
            <div className="row g-1">
                {
                    !openJobCard ?
                        (
                            <div className="col-12">
                                <div className="card shadow-sm">
                                    <div className="card-body p-1">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-hover table-custom">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th>ID No.</th>
                                                        <th>Job Card Number</th>
                                                        <th>Dealer Name</th>
                                                        <th>Customer Feedback</th>
                                                        <th>Attachments</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        showJobcards.map((items, index) => (
                                                            <tr key={index} onClick={() => getUpdateForm(items.jcid)}>
                                                                <td>{items.jcNumber}</td>
                                                                <td>{items.jobcardNumber}</td>
                                                                <td>
                                                                    {items.dealerName}
                                                                    <p className="text-muted mb-0">{items.dealerLocation}</p>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        JSON.parse(items.customerVoice).map((_items, idx) => (
                                                                            <span key={idx} className="badge bg-dark mx-1">{_items}</span>
                                                                        ))
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <a className="lnkAction" href="#">View</a>
                                                                </td>
                                                                <td>

                                                                    {
                                                                        (!items.isDataEntryTaken) ? (
                                                                            <span className="badge bg-success">Open</span>
                                                                        )
                                                                        :
                                                                        (
                                                                            <span className="badge bg-warning">Processing</span>
                                                                        )
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
                        ) :
                        (
                            <div className="col-12">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-end">
                                            <button
                                                className="btn btn-sm btn-outline-danger me-1"
                                                onClick={closeForm}
                                            >
                                                Cancel
                                            </button>
                                            <button className="btn btn-sm btn-success ms-1" onClick={handleSubmit}> 
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
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Customer Mobile</label>
                                                    <input 
                                                        className="form-control" 
                                                        name="customerMobile"
                                                        value={customerMobile}
                                                        onChange={handleChange("customerMobile")}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Customer Address</label>
                                                    <input 
                                                        className="form-control" 
                                                        name="customerAddress"
                                                        value={customerAddress}
                                                        onChange={handleChange("customerAddress")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <label className="form-label">Model Name</label>
                                                    <select className="form-select" name="modelID" value={modelID} onChange={handleChange("modelID")}>
                                                        <option value={-1}>--Select model--</option>
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
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">KM's</label>
                                                    <input 
                                                        className="form-control" 
                                                        name="kMs"
                                                        value={kMs}
                                                        onChange={handleChange("kMs")}
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
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Vehicle Number</label>
                                                    <input 
                                                        className="form-control" 
                                                        name="vehicleNumber"
                                                        value={vehicleNumber}    
                                                        onChange={handleChange("vehicleNumber")}                                                    
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Service Date</label>
                                                    <input 
                                                        className="form-control" 
                                                        name="serviceDate"
                                                        value={serviceDate}     
                                                        onChange={handleChange("serviceDate")}                                                   
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <label className="form-label">Service type</label>
                                                    <select className="form-select" name="serviceTypeID" value={serviceTypeID}  onChange={handleChange("serviceTypeID")}>
                                                        <option value={-1}>--Select Service type--</option>
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
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Technician Name</label>
                                                    <input 
                                                        className="form-control" 
                                                        name="technicianName"
                                                        value={technicianName}    
                                                        onChange={handleChange("technicianName")}                                                    
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
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Job Card Attachments</label>
                                                    <div>
                                                        <button className="btn btn-sm btn-outline-primary me-1 mt-2">Front View</button>
                                                        <button className="btn btn-sm btn-outline-primary ms-1 mt-2">Back View</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-4">
                                                    <label className="form-lable">Choose Telecaller</label>
                                                    <select className="form-select" name="assignTeleCallerID" value={assignTeleCallerID} onChange={handleChange("assignTeleCallerID")}>
                                                        <option>--Select Telecaller--</option>
                                                        {
                                                            teleCallers.map((items, idx)=>(
                                                                <option key={idx} value={items.id}>{items.text}</option>
                                                            ))
                                                            
                                                        }
                                                    </select>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                }

            </div>
        </MasterLayout>
    )
}


export default JobCardOperator;