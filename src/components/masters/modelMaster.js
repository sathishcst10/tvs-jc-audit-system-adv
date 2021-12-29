import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Loading } from "react-loading-ui";
import Swal from "sweetalert2";
import modelMasterService from "../../services/model-master.service";
import MasterLayout from "../_layout/_masterLayout";


export const ModelMaster = () => {
  const toast = useRef(null);
  const settings = {
    title: "",
    text: "",
    progress: false,
    progressedClose: false,
    theme: "dark",
  }
  const [allModels, setAllModels] = useState([]);
  const [getModelReq, setModelReq] = useState({
    pageNumber: 1,
    pageSize: 10,
    sortOrderBy: "",
    sortOrderColumn: "",
    filters: "",
  });
  const [model, setModel] = useState({
    isActive: true,
    modelID: 0,
    modelName: "",
  });
  const [values, setValues] = useState({
    error: "",
    loading: false,
    update: false,
  });
  const { pageNumber, pageSize, sortOrderBy, sortOrderColumn, filters } =
    getModelReq;
  const { modelName, modelID, isActive } = model;
  const { error, loading, update } = values;

  const handleChange = (name) => (event) => {
    const value = event.target.value;
   
    setModel({ ...model, [name]: value });
   
  };
  const getAllModelsByPaging = () => {
    Loading(settings);
    modelMasterService
      .getModelAllPaging({
        pageNumber,
        pageSize,
        sortOrderBy,
        sortOrderColumn,
        filters,
      })
      .then((response) => {
        //console.log(response.data.data.data);
        setAllModels(response.data.data.data);
        Loading()
      })
      .catch((error) => {console.log(error); Loading();});
  };

  const deleteModel = (argID) => {
    //e.preventDefault();
    Swal.fire({
        title : 'Are you sure',
        text : 'You won\'t be able to revert this!',
        icon : 'warning',
        showCancelButton : true,
        confirmButtonColor : "#3085d6",
        cancelButtonColor : "#d33",
        confirmButtonText : "Yes, delete Model!"
      }).then((result)=>{
        if(result.isConfirmed){
          modelMasterService.deleteModel(argID).then(
            (response)=>{
              console.log(response);            
              Swal.fire('Deleted!','Model has been deleted.', 'success');
              getAllModelsByPaging();
            }
          )
          
        }
      })
  };

  const getModelById = (argID) => {
    Loading(settings);
    setValues({ ...values, update: true });
    modelMasterService
      .getModelById(argID)
      .then((response) => {
        Loading();
        console.log("Get", response.data.data.modelName);
        setModel({ ...model, modelID : argID, modelName: response.data.data.modelName });
      })
      .catch((err) =>{ console.log(err); Loading()});
  };

  const clearForm = () => {
    setValues({ ...values, update: false });
    setModel({ ...model, modelName: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Loading(settings)
    if (!update) {
      modelMasterService
        .createModel({ isActive, modelID, modelName })
        .then((response) => {
          Loading();
          toast.current.show({
            severity: "success",
            summary: "Success Message",
            detail: "Model saved Successfully",
            life: 3000,
          });
          getAllModelsByPaging();
          clearForm();
          
        })
        .catch((err) => {console.log(err); Loading()});
    } else {
      modelMasterService
        .updateModel({ isActive, modelID, modelName })
        .then((response) => {
          console.log("Updated ", response);
          Loading();
          toast.current.show({
            severity: "success",
            summary: "Success Message",
            detail: "Model updated Successfully",
            life: 3000,
          });
          getAllModelsByPaging();
          clearForm();
        })
        .catch((err) => {console.log(err); Loading();});
    }
  };

  useEffect(() => {
    getAllModelsByPaging();
  }, []);

  const ModelTable = () => {
    return (
      <table className="table table-custom">
        <thead className="table-dark">
          <tr>
            <th>Model ID</th>
            <th>Model Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allModels.map((items, idx) => (
            <tr key={idx} data-id={items.modelID}>
              <td>{items.modelID}</td>
              <td>{items.modelName}</td>
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
                        onClick={() => getModelById(items.modelID)}
                      >
                        Edit Model
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => deleteModel(items.modelID)}
                      >
                        Delete Model
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
    <MasterLayout pageMap={["Home", "Masters", "Model Master"]}>
      <div className="row g-1">
        <div className="col-9">
          <div className="card h-100">
            <div className="card-body p-1">
              <div className="">
                <ModelTable />
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card h-100">
            <div className="card-body p-2">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="ModelName" className="form-label">
                    Model Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ModelName"
                    autoFocus="autoFocus"
                    placeholder=""
                    name="modelName"
                    value={modelName}
                    onChange={handleChange("modelName")}
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
                      Update Model
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-success ms-1"
                      type="submit"
                    >
                      Add Model
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
