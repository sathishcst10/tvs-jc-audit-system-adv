import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown";
import exportFromJSON from "export-from-json";
import aggregateMasterService from "../../services/aggregate-master.service";
import dealerMasterService from "../../services/dealer-master.service";
import jobCardInfoService from "../../services/job-card-info.service";
import modelMasterService from "../../services/model-master.service";

const ExportData = () =>{
    const [initialItems, setInitial] = useState({
        pageNumber: 1,
        pageSize: 10,
        sortOrderBy: "",
        sortOrderColumn: "",
        filters: ""
      });
    const [getFilter, setFilter] = useState({
        "jobcardNumber" : "",
        "dealerId" : "",
        "modelId" : "",
        "GapAggregateId" : "",
        "serviceTypeId" : "",
        "StatusId" : "",
        "startDate" : "",
        "endDate" : ""
    });
    const [modelLists, setModelLists] = useState([]);
    const [ServiceTypes, setServiceTypes] = useState([]);
    const [teleCallers, setTeleCallers] = useState([]);
    const [dealers, setDealers] = useState([]);
    const [aggregates, setAggregates] = useState([]);
    const [customerFeedbackStatus, setCustomerFeedbackStatus] = useState([]);
    const { 
        pageNumber, 
        pageSize, 
        sortOrderBy, 
        sortOrderColumn, 
        filters
      } = initialItems;
    const { 
        jobcardNumber, 
        dealerId, 
        modelId, 
        GapAggregateId, 
        serviceTypeId, 
        StatusId, 
        startDate,
        endDate 
    } = getFilter;


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
    const getDealerLists = ()=>{
        dealerMasterService.getDealerForDropdown(true).then(
            (response)=>{
                console.log("exx", response);
                setDealers(response.data.data.data);
               
            }
        ).catch(
            (err)=>{
                console.log(err)
            }
        )
    }
    const getExportData = ()=>{

    }

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        setFilter({
            ...getFilter,
            [name] : value
        });
        
    }
    const filterData = () => {
        setInitial({
            ...initialItems,
            "filters": {
                "jobcardNumber" : jobcardNumber,
                "dealerId" : dealerId,
                "modelId" : modelId,
                "GapAggregateId" : GapAggregateId,
                "serviceTypeId" : serviceTypeId,
                "StatusId" : StatusId,
                "startDate" : startDate,
                "endDate" : endDate
            }
            
        });

        jobCardInfoService.getAllDataForExport({
            pageNumber, 
            pageSize, 
            sortOrderBy, 
            sortOrderColumn, 
            filters : {
                "jobcardNumber" : jobcardNumber,
                "dealerId" : dealerId,
                "modelId" : modelId,
                "GapAggregateId" : GapAggregateId,
                "serviceTypeId" : serviceTypeId,
                "StatusId" : StatusId,
                "startDate" : startDate,
                "endDate" : endDate
            }
        }).then(
            (response)=>{

                console.log("res=>",response.data.data.data);
                const data = response.data.data.data
                const fileName =  'Report';
                const exportType = exportFromJSON.types.csv;
                console.log(data);
                exportFromJSON({
                    data,
                    fileName,
                    exportType
                });
            }
        ).catch((err)=>{console.log(err)})
        console.log("1",getFilter);
        console.log("2", initialItems)
    //getAllDealersList();
        // setTimeout(() => {
        //     setInitial({
        //         ...initialItems,
        //         "filters": ""
        //     });
        //     setFilter("");
        // }, 5000);
        //console.log(getaggre);
    }
    useEffect(()=>{
        getAllAggregates();
        getAllModels();
        getAllServiceTypes();
        getCustomerFeedBackStatus();
        getDealerLists();
    },[])
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="mb-2 col-6">
                    <label for="pickJobcardNumber" class="form-label">Jobcard Number</label>
                    <input 
                        class="form-control" 
                        id="pickJobcardNumber" 
                        name="jobcardNumber" 
                        value={jobcardNumber} 
                        onChange={handleChange("jobcardNumber")}
                    />
                    
                </div>
                <div className="mb-2 col-6">
                    <label for="selectDealer" class="form-label">Dealer Details</label>
                    <select 
                        class="form-select" 
                        id="selectDealer" 
                        name="dealerId" 
                        value={dealerId} 
                        onChange={handleChange("dealerId")}
                    >
                        <option value="">--Select--</option> 
                        {
                            dealers.map((items, idx)=>(
                                <option value={items.id} key={idx}>{items.text}</option>
                            ))
                        }                   
                    </select>
                </div>
                <div className="mb-2 col-6">
                    <label for="selectModel" class="form-label">Models</label>
                    <select 
                        class="form-select" 
                        id="selectModel" 
                        name="modelId" 
                        value={modelId} 
                        onChange={handleChange("modelId")}
                    >
                        <option value="">--Select--</option>     
                        {
                            modelLists.map((items, idx)=>(
                                <option value={items.id} key={idx}>{items.text}</option>
                            ))
                        }                  
                    </select>
                </div>
                <div className="mb-2 col-6">
                    <label for="selectAggregate" class="form-label">Gap Aggregate</label>
                    <select 
                        class="form-select" 
                        id="selectAggregate" 
                        name="GapAggregateId" 
                        value={GapAggregateId} 
                        onChange={handleChange("GapAggregateId")}
                    >
                        <option value="">--Select--</option>    
                        {
                            aggregates.map((items, idx)=>(
                                <option value={items.id} key={idx}>{items.text}</option>
                            ))
                        }                    
                    </select>
                </div>
                <div className="mb-2 col-6">
                    <label for="selectServiceType" class="form-label">Service Type</label>
                    <select 
                        class="form-select" 
                        id="selectServiceType" 
                        name="serviceTypeId" 
                        value={serviceTypeId} 
                        onChange={handleChange("serviceTypeId")}
                    >
                        <option value="">--Select--</option>   
                        {
                            ServiceTypes.map((items, idx)=>(
                                <option value={items.id} key={idx}>{items.text}</option>
                            ))
                        }                     
                    </select>
                </div>
                <div className="mb-2 col-6">
                    <label for="selectStatus" class="form-label">Status</label>
                    <select 
                        class="form-select" 
                        id="selectStatus" 
                        name="StatusId" 
                        value={StatusId} 
                        onChange={handleChange("StatusId")}
                    >
                        <option value="">--Select--</option>       
                        {
                            customerFeedbackStatus.map((items, idx)=>(
                                <option value={items.id} key={idx}>{items.text}</option>
                            ))
                        }                 
                    </select>
                </div>
                <div className="mb-2 col-6">
                    <label for="pickStartDate" class="form-label">Start Date</label>               
                    <input
                        class="form-control" 
                    id="basic" 
                    name="startDate" 
                    value={startDate} 
                    onChange={handleChange("startDate")}
                    placeholder="DD/MM/YYYY"
                    />
                    
                </div>
                <div className="mb-2 col-6">
                    <label for="pickEndDate" class="form-label">Start Date</label>
                    <input 
                        class="form-control" 
                        id="pickEndDate" 
                        name="endDate" 
                        value={endDate} 
                        onChange={handleChange("endDate")}
                        placeholder="DD/MM/YYYY"
                    />                 
                </div>
                <div className="mb-2 col-12 text-center">
                    <button className="btn btn-sm btn-secondary me-1" data-bs-dismiss="modal" aria-label="Close">Close</button>
                    <button className="btn btn-sm btn-primary ms-1" onClick={filterData}>Export Data</button>
                </div>
            </div>
           

            
        </div>
    )
}

export {ExportData};