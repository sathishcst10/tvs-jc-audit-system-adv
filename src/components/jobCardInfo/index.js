import { useEffect, useState } from "react";
import jobCardInfoService from "../../services/job-card-info.service";
import MasterLayout from "../_layout/_masterLayout";


const JobCardInfo = () => {
    const [jobCard, setJobCard] = useState({
        newJobCard: false,
        updateJobCard: false,
        closeJobCard: false
    });
    const [getTagDesc, setTagDesc] = useState([]);
    const [getInitialObs, setInitialObs] = useState([]);
    const [getFinalFindings, setFinalFindings] = useState([]);
    const [getActionTaken, setActionTaken] = useState([]);
    const { newJobCard, updateJobCard, closeJobCard } = jobCard;

    const [jobcardDocument, setJobCardDocument] = useState({
        "DocumentId" : 0,
        "DocumentType" : "",
        "FileName":"",
        "FilePath" : "",
        "ContentType" : "",
        "DocumentDate" : "",
        "DocumentFile" : "",
        "IsActive" : true,
        "CreatedDate" : "",
        "CreatedBy" : "",
        "ModifiedDate" : "",
        "ModifiedBy" : "",
        "IsDeleted" : false
    });

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
        
    }= jobcardDocument


    const createJobCard = () => {
        setJobCard({
            newJobCard: true
        });
    }

    const addTags = (event, items) => {
        if (event.target.value !== "") {
            if (items === "CustomerVoice") {
                setTagDesc([...getTagDesc, event.target.value]);
                //props.selectedTags([...tags, event.target.value]);
                event.target.value = "";
            }
            else if (items === "InitialObs") {
                setInitialObs([...getInitialObs, event.target.value]);
                //props.selectedTags([...tags, event.target.value]);
                event.target.value = "";
            }
            else if (items === "FinalFindings") {
                setFinalFindings([...getFinalFindings, event.target.value]);
                //props.selectedTags([...tags, event.target.value]);
                event.target.value = "";
            }
            else if (items === "ActionTaken") {
                setActionTaken([...getActionTaken, event.target.value]);
                //props.selectedTags([...tags, event.target.value]);
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

    const handleFiles = event =>{
        debugger

        setJobCardDocument({
            ...jobcardDocument,
            "DocumentFile" : event.target.files[0],
            "DocumentType" : "JCFront"
        });
        const formData = new FormData();
        formData.append("DocumentFile" , event.target.files[0],);
        formData.append("DocumentType" , "JCFront");

        console.log(event);

        jobCardInfoService.uploadJobCard(formData).then(
            (res)=>{
                console.log(res);
            }
        ).catch((err)=>console.log(err))
    }

    return (
        <MasterLayout pageMap={['Home', 'Job Card Information']}>
            <div className="row g-1">
                {
                    !newJobCard ?
                        (
                            <div className="col-12">
                                <div className="card shadow-sm">
                                    <div className="card-body p-1">
                                        <div className="d-flex justify-content-end mb-1">
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={createJobCard}
                                            >
                                                Create Job card
                                            </button>
                                        </div>
                                        <table className="table table-custom">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>ID No</th>
                                                    <th>Job Card Number</th>
                                                    <th>Description</th>
                                                    <th>Initial Observation</th>
                                                    <th>Final Findings</th>
                                                    <th>Action Taken</th>
                                                    <th>Attachments</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <span className="badge bg-dark p-2">
                                                            A10000
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control" />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control" />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Optional"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Optional"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Optional"
                                                        />
                                                    </td>
                                                    <td className="text-center">
                                                        <button className="btn text-dark">
                                                            <i className="bi bi-paperclip"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <button className="btn text-primary" title="Save">
                                                                <i className="bi bi-save2-fill"></i>
                                                            </button>
                                                            <button className="btn text-danger" title="Delete">
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
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
                                            <button className="btn btn-sm btn-outline-danger me-1">
                                                Cancel
                                            </button>
                                            <button className="btn btn-sm btn-success ms-1">
                                                Save Job Card
                                            </button>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="jobCardNo"
                                                        className="form-label"
                                                    >
                                                        Job Card Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="jobCardNo"
                                                        placeholder="Job Card Number"
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
                                                <div class="mb-3">
                                                    <label htmlFor="formFileFront" className="form-label">Upload Job Card Front</label>
                                                    <input 
                                                        class="form-control" 
                                                        type="file" 
                                                        id="formFileFront" 
                                                        onChange={handleFiles}    
                                                    />                                                    
                                                </div>
                                                <div class="mb-2">
                                                    <label htmlFor="formFile" className="form-label">Upload Job Card Back</label>
                                                    <input className="form-control" type="file" id="formFileBack" />
                                                </div>
                                                <div className="mb-3 text-end">
                                                    <button className="btn btn-sm btn-success mt-1 ms-auto">Upload files</button>
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

export default JobCardInfo;