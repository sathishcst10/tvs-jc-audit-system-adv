import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import Swal from "sweetalert2";
import aggregateMasterService from "../../services/aggregate-master.service";
import MasterLayout from "../_layout/_masterLayout";
import { Loading } from "react-loading-ui";

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
    filters: "",
  });
  const [values, setValues] = useState({
    error: "",
    loading: false,
    update: false,
  });

  const { pageNumber, pageSize, sortOrderBy, sortOrderColumn, filters } =
    getAggregateReq;
  const { aggregateName, aggregateID, isActive } = aggregate;
  const { error, loading, update } = values;

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
        console.log(response.data.data.data);
        setAllAggregates(response.data.data.data);
      })
      .catch((error) => {console.log(error); Loading();});
  };

  const deleteAggregate = (argID) => {
    //e.preventDefault();

    Swal.fire({
        title : 'Are you sure',
        text : 'You won\'t be able to revert this!',
        icon : 'warning',
        showCancelButton : true,
        confirmButtonColor : "#3085d6",
        cancelButtonColor : "#d33",
        confirmButtonText : "Yes, delete aggregate!"
      }).then((result)=>{
        if(result.isConfirmed){
            aggregateMasterService.deleteAggregate(argID).then(
            (response)=>{
              console.log(response);            
              Swal.fire('Deleted!','Aggregate has been deleted.', 'success');
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
          aggregateID : argID,
          aggregateName: response.data.data.aggregateName,
        });
      })
      .catch((err) => {console.log(err); Loading()});
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
        .catch((err) => {console.log(err); Loading()});
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
        }).catch((err)=>{console.log(err); Loading()});
    }
  };

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
                      <a className="dropdown-item disabled" href="#">
                        Change to Inactive
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
              <div className="">
                <AggregateTable />
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
