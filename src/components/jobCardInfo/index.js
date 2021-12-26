import { useEffect, useState } from "react";
import MasterLayout from "../_layout/_masterLayout";


const JobCardInfo = () =>{
    const [jobCard, setJobCard] = useState({
        newJobCard : false,
        updateJobCard : false,
        closeJobCard : false
    });
    const {newJobCard, updateJobCard, closeJobCard} = jobCard;

    return(
        <MasterLayout pageMap={['Home','Job Card Information']}>
            <div className="row g-1">
            {
                !newJobCard ? 
                ( 
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-body p-1">
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
                                                <input type="text" className="form-control"/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control"/>
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