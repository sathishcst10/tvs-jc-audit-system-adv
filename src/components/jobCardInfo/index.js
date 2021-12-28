import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";
import jobCardInfoService from "../../services/job-card-info.service";
import MasterLayout from "../_layout/_masterLayout";



const JobCardInfo = () => {
    const toast = useRef(null);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [jobCard, setJobCard] = useState({
        newJobCard: false,
        updateJobCard: false,
        closeJobCard: false
    });
    const [getTagDesc, setTagDesc] = useState([]);
    const [getInitialObs, setInitialObs] = useState([]);
    const [getFinalFindings, setFinalFindings] = useState([]);
    const [getActionTaken, setActionTaken] = useState([]);
    const [getFilter, setFilter] = useState('');
    const { newJobCard, updateJobCard, closeJobCard } = jobCard;

    const [fileUpload, setFileUpload] = useState({
        jcfront: 0,
        jcback: 0
    });


    const [getJobCardDetails, setJobCardDetails] = useState({
        "pageNumber": 1,
        "pageSize": 10,
        "sortOrderBy": "",
        "sortOrderColumn": "",
        "filters": ""
    });
    const [showJobCardDetails, setShowJobCardDetails] = useState([]);
    const { pageNumber, pageSize, sortOrderBy, sortOrderColumn, filters } = getJobCardDetails;

    const formData_front = new FormData();
    const formData_back = new FormData();
    const { jcfront, jcback } = fileUpload;

    const [_customerVoice, setCustomerVoice] = useState([]);

    const [jobcardDocument, setJobCardDocument] = useState({
        "DocumentId": 0,
        "DocumentType": "",
        "FileName": "",
        "FilePath": "",
        "ContentType": "",
        "DocumentDate": "",
        "DocumentFile": "",
        "IsActive": true,
        "CreatedDate": "",
        "CreatedBy": "",
        "ModifiedDate": "",
        "ModifiedBy": "",
        "IsDeleted": false
    });

    const [saveJobCard, setSaveJobCard] = useState({
        "jcid": 0,
        "userID": currentUser.data.user.userId,
        "dealerID": currentUser.data.user.dealerID,
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


    const {
        DocumentId,
        DocumentType,
        FileName,
        FilePath,
        ContentType,
        DocumentDate,
        DocumentFile,
        IsActive,
        CreatedBy,
        CreatedDate,
        ModifiedBy,
        ModifiedDate,
        IsDeleted

    } = jobcardDocument


    const createJobCard = () => {
        setJobCard({
            newJobCard: true
        });
    }
    const getDataForUpdate = (argID)=>{
        jobCardInfoService.getJobCardById(argID).then(
            (response)=>{
                //debugger;
                setJobCard({
                    ...jobCard,
                    updateJobCard : true
                });
                setSaveJobCard({
                    ...saveJobCard,
                    jcid : argID,
                    jcNumber : response.data.data.jcNumber,
                    jobcardNumber : response.data.data.jobcardNumber,
                    jcBack : response.data.data.jcBack,
                    jcFront : response.data.data.jcFront,
                    customerVoice : JSON.parse(response.data.data.customerVoice),
                    initialObservation : JSON.parse(response.data.data.initialObservation),
                    finalFinding : JSON.parse(response.data.data.finalFinding),
                    actionTaken : JSON.parse(response.data.data.actionTaken)
                });
                setFileUpload({
                    ...fileUpload,
                    jcback : response.data.data.jcBack,
                    jcfront : response.data.data.jcFront,
                });
                setTagDesc(...getTagDesc, JSON.parse(response.data.data.customerVoice));
                setInitialObs(JSON.parse(response.data.data.initialObservation));
                setFinalFindings(JSON.parse(response.data.data.initialObservation));
                setActionTaken(JSON.parse(response.data.data.actionTaken))
                console.log(response);
            }
        ).catch((err)=>console.log(err));
    }
    const addTags = async (event, items) => {
        if (event.target.value !== "") {
            if (items === "CustomerVoice") {
                debugger
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
    };

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
    const handleChange = (name) => (event) => {
        const value = event.target.value;
        setSaveJobCard({
            ...saveJobCard,
            [name]: value
        });
    }

    const uploadFront = () => {
        jobCardInfoService.uploadJobCard(formData_front).then(
            (res) => {
                debugger;
                console.log(res);
                // setSaveJobCard({
                //     ...saveJobCard,
                //     jcFront : res.data.data.documentId
                // })

                setFileUpload({
                    ...fileUpload,
                    jcfront: res.data.data.documentId
                })
            }
        ).catch((err) => console.log(err))
    }
    const uploadBack = () => {

        jobCardInfoService.uploadJobCard(formData_back).then(
            (response) => {
                console.log(response);

                setFileUpload({
                    ...fileUpload,
                    jcback: response.data.data.documentId
                })
                // setSaveJobCard({
                //     ...saveJobCard,
                //     jcBack : res.data.data.documentId
                // })
            }
        ).catch((err) => console.log(err))

    }
    const closeForm = () => {
        setJobCard({
            ...jobCard,
            newJobCard: false,
            updateJobCard: false,
            closeJobCard: false
        });
        setSaveJobCard({
            ...saveJobCard,
            jcFront: 0,
            jcBack: 0,
            customerVoice: "",
            initialObservation: "",
            actionTaken: "",
            jobcardNumber: "",
            finalFinding: ""
        });
        setTagDesc([]);
        setInitialObs([]);
        setFinalFindings([]);
        setActionTaken([]);
    }
    const handleSubmit = () => {
       if(!updateJobCard) { 
        if(jobcardNumber != "") {
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
                customerVoice: customerVoice != "" ? JSON.stringify(customerVoice) : "[]",
                initialObservation: initialObservation != "" ? JSON.stringify(initialObservation) : "[]",
                finalFinding: finalFinding != "" ? JSON.stringify(finalFinding) : "[]",
                actionTaken: actionTaken != "" ? JSON.stringify(actionTaken) : "[]",
                dealerObservation,
                serviceTypeID,
                isActive,
                assignTeleCallerID
            }).then(
                (response) => {
                    console.log(response);
                    if (response.data.success) {

                        toast.current.show(
                            {
                                severity: 'success',
                                summary: 'Success Message',
                                detail: response.data.message,
                                life: 3000
                            }
                        );

                        setJobCard({
                            ...jobCard,
                            newJobCard: false
                        });
                        getJobCardForDealer();
                        closeForm();
                    } else {

                        toast.current.show(
                            {
                                severity: 'warn',
                                summary: 'Warning Message',
                                detail: response.data.message,
                                life: 3000
                            }
                        );
                    }
                }
            ).catch((err) => console.log(err));
        }
    }
    else 
    {
        //debugger
        console.log(jcid);
        jobCardInfoService.updateJobCard({
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
            customerVoice: customerVoice != "" ? JSON.stringify(customerVoice) : "[]",
            initialObservation: initialObservation != "" ? JSON.stringify(initialObservation) : "[]",
            finalFinding: finalFinding != "" ? JSON.stringify(finalFinding) : "[]",
            actionTaken: actionTaken != "" ? JSON.stringify(actionTaken) : "[]",
            dealerObservation,
            serviceTypeID,
            isActive,
            assignTeleCallerID
        }).then(
            (response)=>{
                if (response.data.success) {

                    toast.current.show(
                        {
                            severity: 'success',
                            summary: 'Success Message',
                            detail: response.data.message,
                            life: 3000
                        }
                    );

                    setJobCard({
                        ...jobCard,
                        newJobCard: false,
                        updateJobCard : false
                    });
                    getJobCardForDealer();
                    closeForm();
                } else {

                    toast.current.show(
                        {
                            severity: 'warn',
                            summary: 'Warning Message',
                            detail: response.data.message,
                            life: 3000
                        }
                    );
                }
            }
        )
    }
        


    }

    const getJobCardForDealer = () => {
        jobCardInfoService.getJobCardDetailForDealer({
            pageNumber, pageSize, sortOrderBy, sortOrderColumn, filters
        }).then(
            (response) => {
                console.log(response);
                setShowJobCardDetails(response.data.data.data);
            }
        ).catch((err) => console.log(err));
    }
    const handleFilter = (name) => (event) => {
        const value = event.target.value;
        setFilter(value);
        setJobCardDetails({
            ...getJobCardDetails,
            "filters": {
                "jobcardNumber": value
            }
        });
    }
    const filterJobcardNumber = () => {
        getJobCardForDealer();
        setTimeout(() => {
            setJobCardDetails({
                ...getJobCardDetails,
                "filters": ""
            });
            setFilter("");
        }, 5000);
        console.log(getJobCardDetails);
    }

    useEffect(() => {
        getJobCardForDealer();
    }, [])

    return (
        <MasterLayout pageMap={['Home', 'Job Card Information']}>
            <div className="row g-1">
                {
                    !newJobCard && !updateJobCard ?
                        (
                            <div className="col-12">
                                <div className="card shadow-sm">
                                    <div className="card-body p-1">
                                        <div className="d-flex justify-content-end mb-1">
                                            <div class="input-group me-2 searchBox" >
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
                                                    class="btn btn-sm btn-outline-secondary"
                                                    type="button"
                                                    id="button-addon2"
                                                    onClick={filterJobcardNumber}
                                                >
                                                    <i class="bi bi-search"></i>
                                                </button>
                                            </div>

                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={createJobCard}
                                            >
                                                Create Job card
                                            </button>
                                        </div>
                                        <table className="table table-striped table-hover table-custom">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>ID No</th>
                                                    <th>Job Card Number</th>
                                                    <th>Customer Voice</th>
                                                    <th>Initial Observation</th>
                                                    <th>Final Findings</th>
                                                    <th>Action Taken</th>
                                                    <th>Attachments</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    showJobCardDetails.map((items, idx) => (
                                                        <tr key={idx}>
                                                            <td>
                                                                {items.jcNumber}
                                                            </td>
                                                            <td>
                                                                <a href="#" className="lnkAction">
                                                                    {items.jobcardNumber}
                                                                </a>
                                                            </td>
                                                            <td>
                                                                {
                                                                    JSON.parse(items.customerVoice).map((_items, _idx) => (
                                                                        <span key={_idx} className="badge bg-primary mx-1 mb-1">
                                                                            {_items}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    JSON.parse(items.initialObservation).map((_items, _idx) => (
                                                                        <span key={_idx} className="badge bg-primary mx-1 mb-1">
                                                                            {_items}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    JSON.parse(items.finalFinding).map((_items, _idx) => (
                                                                        <span key={_idx} className="badge bg-primary mx-1 mb-1">
                                                                            {_items}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    JSON.parse(items.actionTaken).map((_items, _idx) => (
                                                                        <span key={_idx} className="badge bg-primary mx-1 mb-1">
                                                                            {_items}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </td>
                                                            <td className="text-center">
                                                                <button className="btn">
                                                                    <i className="bi bi-file-earmark-arrow-down"></i> Front
                                                                </button>
                                                                <button className="btn">
                                                                    <i className="bi bi-file-earmark-arrow-down"></i> Back
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <button 
                                                                        className="btn text-primary" 
                                                                        title="Save" 
                                                                        onClick={()=>getDataForUpdate(items.jcid)}
                                                                    >
                                                                        <i class="bi bi-pencil-square"></i>
                                                                    </button>
                                                                    {/* <button className="btn text-danger" title="Delete">
                                                                        <i className="bi bi-trash"></i>
                                                                    </button> */}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        )
                        :
                        (
                            <div className="col-12">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-end">
                                            <button className="btn btn-sm btn-outline-danger me-1" onClick={closeForm}>
                                                Cancel
                                            </button>
                                            
                                            <button
                                                className="btn btn-sm btn-success ms-1"
                                                onClick={handleSubmit}
                                            >
                                                {
                                                    newJobCard ? "Save Job Card" : "Update Job Card"
                                                }
                                                
                                            </button>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="jobCardNumber"
                                                        className="form-label"
                                                    >
                                                        Job Card Number
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

                                            <div className="col-4">
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

                                            <div className="col-4">
                                                <div className="mb-3">
                                                    <label htmlFor="formFileFront" className="form-label">Upload Job Card Front</label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        id="formFileFront"
                                                        onChange={handleFiles("JCFront")}
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="formFile" className="form-label">Upload Job Card Back</label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        id="formFileBack"
                                                        onChange={handleFiles("JCBack")}
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
            <Toast ref={toast} />
        </MasterLayout>
    )
}

export default JobCardInfo;