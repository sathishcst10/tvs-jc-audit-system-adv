import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import Swal from "sweetalert2";
import aggregateMasterService from "../../services/aggregate-master.service";
import MasterLayout from "../_layout/_masterLayout";
import { Loading } from "react-loading-ui";

import TablePagination from '@mui/material/TablePagination';


export const AggregateMaster = () => {
  const toast = useRef(null);
  const settings = {
    title: "",
    text: "",
    progress: false,
    progressedClose: false,
    theme: "dark",
  }
  const [allAggregates, setAllAggregates] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [aggregate, setAggregate] = useState({
    isActive: true,
    aggregateID: 0,
    aggregateName: "",
  });
  const [getAggregateReq, setAggregateReq] = useState({
    pageNumber: 1,
    pageSize: 10,
    sortOrderBy: "",
    sortOrderColumn: "",
    filters: ""
   
  });
  const [values, setValues] = useState({
    error: "",
    loading: false,
    update: false,
  });

  const { pageNumber, pageSize, sortOrderBy, sortOrderColumn, filters, } = getAggregateReq;
  const { aggregateName, aggregateID, isActive } = aggregate;
  const { error, loading, update } = values;
  const [getFilter, setFilter] = useState('');
  const getAllAggregatesByPaging = () => {
    Loading(settings);
    aggregateMasterService
      .getAggregateAllPaging({
        pageNumber,
        pageSize,
        sortOrderBy,
        sortOrderColumn,
        filters,
      })
      .then((response) => {
        Loading();
        console.log(response.data.data.totalCount);
        setTotalCount(response.data.data.totalCount);
        setAllAggregates(response.data.data.data);
      })
      .catch((error) => { console.log(error); Loading(); });
  };

  const deleteAggregate = (argID) => {
    //e.preventDefault();

    Swal.fire({
      title: 'Are you sure',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete aggregate!"
    }).then((result) => {
      if (result.isConfirmed) {
        aggregateMasterService.deleteAggregate(argID).then(
          (response) => {
            console.log(response);
            Swal.fire('Deleted!', 'Aggregate has been deleted.', 'success');
            getAllAggregatesByPaging();
          }
        )

      }
    })
  };

  const getAggregateById = (argID) => {
    Loading(settings);
    setValues({ ...values, update: true });
    aggregateMasterService
      .getAggregateById(argID)
      .then((response) => {
        Loading();
        console.log("Get", response.data.data.aggregateName);
        setAggregate({
          ...aggregate,
          aggregateID: argID,
          aggregateName: response.data.data.aggregateName,
        });
      })
      .catch((err) => { console.log(err); Loading() });
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;

    setAggregate({ ...aggregate, [name]: value });
  };

  const clearForm = () => {
    setValues({ ...values, update: false });
    setAggregate({ ...aggregate, aggregateName: "" });
  };

  const handleSubmit = (event) => {
    Loading(settings);
    event.preventDefault();
    if (!update) {
      aggregateMasterService
        .createAggregate({ isActive, aggregateID, aggregateName })
        .then((response) => {
          Loading()
          console.log("Created ", response);
          toast.current.show({
            severity: "success",
            summary: "Success Message",
            detail: "Aggregate saved Successfully",
            life: 3000,
          });
          getAllAggregatesByPaging();
          clearForm();
        })
        .catch((err) => { console.log(err); Loading() });
    } else {
      aggregateMasterService
        .updateAggregate({ isActive, aggregateID, aggregateName })
        .then((response) => {
          Loading();
          console.log("Updated", response);
          toast.current.show({
            severity: "success",
            summary: "Success Message",
            detail: "Aggregate updated successfully",
            life: 3000,
          });
          getAllAggregatesByPaging();
          clearForm();
        }).catch((err) => { console.log(err); Loading() });
    }
  };

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    Loading(settings);
    setPage(newPage + 1);
   
    aggregateMasterService
      .getAggregateAllPaging({
        pageNumber : newPage + 1,
        pageSize,
        sortOrderBy,
        sortOrderColumn,
        filters,
      })
      .then((response) => {
        Loading();
        //console.log(response.data.data.totalCount);
        setTotalCount(response.data.data.totalCount);
        setAllAggregates(response.data.data.data);
      })
      .catch((error) => { console.log(error); Loading(); });
    
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    Loading(settings)
    aggregateMasterService
    .getAggregateAllPaging({
      pageNumber ,
      pageSize : parseInt(event.target.value, 10),
      sortOrderBy,
      sortOrderColumn,
      filters,
    })
    .then((response) => {
      Loading();
      //console.log(response.data.data.totalCount);
      setTotalCount(response.data.data.totalCount);
      setAllAggregates(response.data.data.data);
    })
    .catch((error) => { console.log(error); Loading(); });
  };

  const ChangeStatus = (argID) =>{
    Loading(settings);
    aggregateMasterService.getAggregateById(argID).then(
      (response)=>{                
        
        aggregateMasterService
        .updateAggregate({ 
          
          aggregateID : response.data.data.aggregateID, 
          aggregateName : response.data.data.aggregateName,          
          isActive : response.data.data.isActive ? false : true,          
        }).
        then((response)=>{
          Loading();
          console.log("updated", response);
          if(response.data.success){
            toast.current.show(
              {
                severity:'success', 
                summary: 'Success Message', 
                detail:'Aggregate status changed', 
                life: 3000
              }
            );
            getAllAggregatesByPaging();
            clearForm();          
          }else{
            toast.current.show(
              {
                severity:'warn', 
                summary: 'Warning Message', 
                detail:response.data.message, 
                life: 3000
              }
            );
          }
        }).catch((err)=>{console.log(err); Loading()})       
      }
    ).catch((err)=>{console.log(err); Loading()})

    //Loading(settings)
    
  }

  const handleFilter = (name) => (event) => {
    const value = event.target.value;
    setFilter(value);
    setAggregateReq({
        ...getAggregateReq,
        "filters": {
            "aggregateName": value
        }
    });
}
const filterData = () => {
    getAllAggregatesByPaging();
    setTimeout(() => {
        setAggregateReq({
            ...getAggregateReq,
            "filters": ""
        });
        setFilter("");
    }, 5000);
    //console.log(getaggre);
}
  useEffect(() => {
    getAllAggregatesByPaging();
  }, []);


  const AggregateTable = () => {
    return (
      <table className="table table-custom">
        <thead className="table-dark">
          <tr>
            <th>Aggregate ID</th>
            <th>Aggregate Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allAggregates.map((items, idx) => (
            <tr key={idx} data-id={items.aggregateID}>
              <td>{items.aggregateID}</td>
              <td>{items.aggregateName}</td>
              <td>
                {items.isActive ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-danger">Inactive</span>
                )}
              </td>
              <td>
                <div className="dropdown">
                  <button
                    className="btn text-muted"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul
                    className="dropdown-menu border-0 shadow-lg"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => getAggregateById(items.aggregateID)}
                      >
                        Edit Aggregate
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => deleteAggregate(items.aggregateID)}
                      >
                        Delete Aggregate
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={()=>{ ChangeStatus(items.aggregateID)}}>
                        {
                          items.isActive ? "Change to Inactive" : "Change to Active"
                        }
                        
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    );
  };

  return (
    <MasterLayout pageMap={["Home", "Masters", "Aggregate Master"]}>
      <div className="row g-1">
        <div className="col-9">
          <div className="card h-100">
            <div className="card-body p-1">
              <div className="d-flex justify-content-end mb-1">
                <div className="input-group me-0 searchBox" >
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
                      onClick={filterData}
                  >
                      <i className="bi bi-search"></i>
                  </button>
                </div>
              </div>
              <div className="">
                <AggregateTable />
                {/* <AggregateTableWithPagination/> */}
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
        <div className="col-3">
          <div className="card h-100">
            <div className="card-body p-2">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="aggregateName" className="form-label">
                    Aggregate Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="aggregateName"
                    placeholder=""
                    name="aggregateName"
                    value={aggregateName}
                    onChange={handleChange("aggregateName")}
                  />
                </div>
                <div className="mt-2 text-center">
                  <button
                    className="btn btn-sm btn-outline-danger me-1"
                    type="button"
                    onClick={clearForm}
                  >
                    Cancel
                  </button>
                  {update ? (
                    <button
                      className="btn btn-sm btn-success ms-1"
                      type="submit"
                    >
                      Update Aggregate
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-success ms-1"
                      type="submit"
                    >
                      Add Aggregate
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Toast ref={toast} />
    </MasterLayout>
  );
};
