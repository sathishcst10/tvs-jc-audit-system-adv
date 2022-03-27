import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";

import { useSelector } from "react-redux";
import TablePagination from '@mui/material/TablePagination';
import { Loading } from "react-loading-ui";

import jobCardInfoService from "../../services/job-card-info.service";
import MasterLayout from "../_layout/_masterLayout";
import { APP_DOWNLOAD_URL } from "../../BackendAccess";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import { ExportData } from "../exportData";



const JobCardDealers = () => {
    const toast = useRef(null);
    const settings = {
        title: "",
        text: "",
        progress: false,
        progressedClose: false,
        theme: "dark",
    };
    const { user: currentUser } = useSelector((state) => state.auth);
    const [jobCard, setJobCard] = useState({
        newJobCard: false,
        updateJobCard: false,
        closeJobCard: false
    });
    const [totalCount, setTotalCount] = useState(0);
    const [getTagDesc, setTagDesc] = useState([]);
    const [getInitialObs, setInitialObs] = useState([]);
    const [getFinalFindings, setFinalFindings] = useState([]);
    const [getActionTaken, setActionTaken] = useState([]);
   
    const [getFilter, setFilter] = useState('');
    const { newJobCard, updateJobCard, closeJobCard } = jobCard;
    //const [settings, SetDefault] = useState()
    
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
    const { backType, backFileName } = selectedDoc;
    
    const [getJobCardDetails, setJobCardDetails] = useState({
        "pageNumber": 1,
        "pageSize": 10,
        "sortOrderBy": "DESC",
        "sortOrderColumn": "JCID",
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
        Loading({
            title: "",
            text: "",
            progress: false,
            progressedClose: false,
            theme: "dark",
        });
        jobCardInfoService.getJobCardById(argID).then(
            (response)=>{
                //debugger;
                setJobCard({
                    ...jobCard,
                    updateJobCard : true
                });
                // getDocumentDetailsById({
                //     jcBack : response.data.data.jcBack,
                //     jcFront : response.data.data.jcFront,
                // });
                getDocumentDetailFront(response.data.data.jcFront);
                console.log("Selet---",selectedDocument);
                getDocumentDetailBack(response.data.data.jcBack);
                console.log("Selet---",selectedDocument);
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
                setTagDesc(JSON.parse(response.data.data.customerVoice));
                setInitialObs(JSON.parse(response.data.data.initialObservation));
                setFinalFindings(JSON.parse(response.data.data.finalFinding));
                setActionTaken(JSON.parse(response.data.data.actionTaken))
                console.log(response);
                Loading();
            }
        ).catch((err)=>{console.log(err); Loading();});
    }
    const imageBuilder = (query) => APP_DOWNLOAD_URL +query;
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
    
    


    const getDocumentDetailFront  = (argID ) =>{
        jobCardInfoService.getDocumnetByID(argID).then(
            (response)=>{
                if(response.data.success){
                    console.log('***789**',response);   
                    setSelectedDocument({
                        ...selectedDocument,
                        frontFileName : response.data.data.fileName,
                        frontType : response.data.data.documentType
                    })                 
                }else{
                    setSelectedDocument({
                        ...selectedDocument,
                        frontFileName : "",
                        frontType : ""
                    }) 
                }
            }
        ).catch((err)=>{
            console.log(err)           
        });       
    }
    const getDocumentDetailBack  = (argID) =>{
        jobCardInfoService.getDocumnetByID(argID).then(
            (response)=>{
                if(response.data.success){
                    console.log(response);     
                    setSelectedDoc({
                        ...selectedDoc,
                        backFileName : response.data.data.fileName,
                        backType : response.data.data.documentType
                    })                 
                }else{
                    setSelectedDoc({
                        ...selectedDoc,
                        backFileName : "",
                        backType : ""
                    })  
                }
            }
        ).catch((err)=>{
            console.log(err)           
        });       
    }
useEffect(()=>{

},[fileUpload])
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
        Loading(settings)
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
                    })
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

                
            }
        ).catch((err) => {console.log(err); Loading()})
    }
    const uploadBack = () => {
        Loading(settings)
        jobCardInfoService.uploadJobCard(formData_back).then(
            (response) => {
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
                    Loading();
                    toast.current.show(
                        {
                            severity: 'error',
                            summary: 'Error Message',
                            detail: response.data.message,
                            life: 3000
                        }
                    );
                }
               
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
        setSelectedDocument({
            frontFileName: "",
            frontType : "",
        });
        setSelectedDoc({
            backFileName : "",
            backType : ""
        });
        setFileUpload({
            ...fileUpload,
            jcback : 0,
            jcfront : 0
        });
        setTagDesc([]);
        setInitialObs([]);
        setFinalFindings([]);
        setActionTaken([]);
    }
    const handleSubmit = () => {
        //debugger
        Loading({
            title: "",
            text: "",
            progress: false,
            progressedClose: false,
            theme: "dark",
        });
       if(!updateJobCard) { 
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
        ).catch((err)=>{
            console.log(err);
            Loading();
        })
    }
        


    }

    const getJobCardForDealer = () => {
        Loading(settings);
        jobCardInfoService.getJobCardDetailForDealer({
            pageNumber : page,
            pageSize : rowsPerPage, 
            sortOrderBy, 
            sortOrderColumn, 
            filters
        }).then(
            (response) => {
                console.log(response);
                setTotalCount(response.data.data.totalCount);
                setShowJobCardDetails(response.data.data.data);
                Loading();
            }
        ).catch((err) =>{ console.log(err); Loading();});
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
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      Loading(settings);
      setPage(newPage + 1);
     
      jobCardInfoService.getJobCardDetailForDealer({
        pageNumber : newPage + 1,
        pageSize: rowsPerPage,
        sortOrderBy,
        sortOrderColumn,
        filters,
      })
      .then((response) => {
        setTotalCount(response.data.data.totalCount);
        setShowJobCardDetails(response.data.data.data);
        Loading();
      })
      .catch((error) =>{console.log(error); Loading();});
      
    };
  
    const handleChangeRowsPerPage = (event) => {
      Loading(settings);
      jobCardInfoService.getJobCardDetailForDealer({
        pageNumber,
        pageSize : parseInt(event.target.value, 10),
        sortOrderBy,
        sortOrderColumn,
        filters,
      })
      .then((response) => {
        setTotalCount(response.data.data.totalCount);
        setShowJobCardDetails(response.data.data.data);
        Loading();
      })
      .catch((error) =>{console.log(error); Loading();});
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
  
    };
    useEffect(() => {
        getJobCardForDealer();
    }, [])

    return (
        <>
            <div className="row g-1">
                {
                    !newJobCard && !updateJobCard ?
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
                                            <button 
                                                className="btn btn-sm btn-primary me-1" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#staticBackdrop"
                                            >
                                                Export Data
                                            </button>
                                            <button
                                                className="btn btn-sm btn-primary ms-1"
                                                onClick={createJobCard}
                                            >
                                                Create Job card
                                            </button>
                                        </div>
                                        <div className="table-responsive">
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
                                                                        // JSON.parse(items.customerVoice).map((_items, _idx) => (
                                                                        //     <span key={_idx} className="badge bg-primary mx-1 mb-1">
                                                                        //         {_items}
                                                                        //     </span>
                                                                        // ))

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
                                                                        // JSON.parse(items.initialObservation).map((_items, _idx) => (
                                                                        //     <span key={_idx} className="badge bg-primary mx-1 mb-1">
                                                                        //         {_items}
                                                                        //     </span>
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
                                                                        // JSON.parse(items.finalFinding).map((_items, _idx) => (
                                                                        //     <span key={_idx} className="badge bg-primary mx-1 mb-1">
                                                                        //         {_items}
                                                                        //     </span>
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
                                                                        // JSON.parse(items.actionTaken).map((_items, _idx) => (
                                                                        //     <span key={_idx} className="badge bg-primary mx-1 mb-1">
                                                                        //         {_items}
                                                                        //     </span>
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
                                                                <td className="text-center">
                                                                    <button 
                                                                        className="btn" 
                                                                        onClick={()=>downloadDocs({
                                                                            "documentId": items.jcFront,
                                                                            "documentType": "JCFront",
                                                                            "id" : items.jcNumber
                                                                        })}
                                                                    >
                                                                        <i className="bi bi-file-earmark-arrow-down"></i> File 1
                                                                    </button>
                                                                    {
                                                                    items.jcBack !==0 ? (
                                                                            <button 
                                                                            className="btn" 
                                                                            onClick={()=>downloadDocs({
                                                                                "documentId": items.jcBack,
                                                                                "documentType": "JCBack",
                                                                                "id" : items.jcNumber
                                                                            })}
                                                                            >
                                                                                <i className="bi bi-file-earmark-arrow-down"></i> File 2
                                                                            </button>
                                                                        ):(
                                                                            <></>
                                                                        )
                                                                    }
                                                                
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex">
                                                                        <button 
                                                                            className="btn text-primary" 
                                                                            title="Save" 
                                                                            onClick={()=>getDataForUpdate(items.jcid)}
                                                                        >
                                                                            <i className="bi bi-pencil-square"></i>
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
                                            <div className="col-md-4">
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

                                            <div className="col-md-4">
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

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="formFileFront" className="form-label">
                                                        Attachment 1<sup>*</sup>
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
                                                <div className="mb-2">
                                                    <label htmlFor="formFile" className="form-label">
                                                        Attachment 2 <small>(Optional)</small>
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
                                                </div>
                                                {
                                                    updateJobCard &&
                                                    <p className="text-danger">Note : If select any image it will be overwrite existing image/file.</p>
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
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

export default JobCardDealers;