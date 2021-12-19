import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MasterLayout from "../_layout/_masterLayout";
import dealerMasterService from "../../services/dealer-master.service";
import authServices from "../../services/auth.services";

import loadingIcon from "../../assets/icons8-dots-loading.gif";

// import { Toast } from "bootstrap";

export const DealerMaster = () => {
  const dealerItems = [{}];
  const [stateDetails, setStates] = useState([]);
  const [dealerDetails, setDetails] = useState([]);
  const [initialItems, setInitial] = useState({
    pageNumber: 1,
    pageSize: 10,
    sortOrderBy: "",
    sortOrderColumn: "",
    filters: "",
  });
  const [dealer, setDealer] = useState({
    isActive: true,
    dealerID: 0,
    stateID: 0,
    dealerName: "",
    dealerCode: "",
    dealerLocation: "",
    address: "",
    mailID: "",
    phone: "",
    formData: new FormData(),
  });
  const [values, setValues] = useState({
    error : "",
    loading : false,
    update : false
  });

  const {error, loading, update} = values;
  const { 
    pageNumber, 
    pageSize, 
    sortOrderBy, 
    sortOrderColumn, 
    filters 
  } = initialItems;
  const {
    isActive,
    dealerID,
    stateID,
    dealerCode,
    dealerLocation,
    dealerName,
    address,
    mailID,
    phone,
    formData,
  } = dealer;

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    //formData = new FormData()

    formData.set(name, value);
    setDealer({ ...dealer, [name]: value });
    //console.log(dealer);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formData.append("isActive", true);
    formData.append("dealerID", 0);
    
    dealerMasterService
      .addNewDealer({
        isActive,
        dealerID,
        dealerName,
        dealerCode,
        dealerLocation,
        mailID,
        phone,
        stateID,
        address,
      })
      .then((response) => {        
        getAllDealersList();
        clearForm();
      })
      .catch((error)=>console.log(error));

    console.log(formData);
  };

  const getStatesList = () => {
    dealerMasterService.getStates().then((response) => {
      setStates(response.data.data.data);
    });
  };

  const getAllDealersList = () => {
    dealerMasterService
      .getAllDealersByPaging({
        pageNumber,
        pageSize,
        sortOrderBy,
        sortOrderColumn,
        filters,
      })
      .then((response) => {
        console.log(response.data.data.data);
        setDetails(response.data.data.data);
      });
  };
  const clearForm=()=>{
    setDealer({
      stateID: 0,
      dealerName: "",
      dealerCode: "",
      dealerLocation: "",
      address: "",
      mailID: "",
      phone: "",
    })
  }

  const getDealerDetails = (dealerID) =>{
    //debugger;
    setValues({
      ...values,
      update : true
    })
    var toastLiveExample = document.getElementById('liveToast')
      dealerMasterService.getDealerById(dealerID).then(
        (response)=>{
          console.log(response.data.data);
          setDealer({
            ...dealer,
            stateID: response.data.data.stateID,
            dealerName: response.data.data.dealerName,
            dealerCode: response.data.data.dealerCode,
            dealerLocation: response.data.data.dealerLocation,
            address: response.data.data.address,
            mailID: response.data.data.mailID,
            phone: response.data.data.phone,
          });

          // var toast = new Toast(toastLiveExample, {autohide:true, delay: 2000})

          // toast.show()
        }
      )
  }
  const deleteDealer=(dealerId)=>{
    debugger
    dealerMasterService.deleteDealerById(dealerId).then(
      (response)=>{
        console.log(response);
        getAllDealersList();
      }
      )
  }

  useEffect(() => {
    getStatesList();
    getAllDealersList();
  }, []);

  return (
    <MasterLayout>
      <div className="row g-1">
        <div className="col-9">
          <div className="card h-100">
            <div className="card-body p-1">
              <div className="table-responsive">
                <table className="table table-striped table-hover table-custom">
                  <thead className="table-dark">
                    <tr>
                      <th>Dealer Name</th>
                      <th>Dealer Code</th>
                      <th>Dealer Location</th>
                      <th>E-Mail</th>
                      <th>Phone</th>
                      {/* <th>State</th> */}
                      <th>Address</th>
                      {/* <th>Status</th> */}
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dealerDetails.map((items, idx) => (
                      <tr key={idx} data-key={items.dealerID}>
                        <td>{items.dealerName}</td>
                        <td>{items.dealerCode}</td>
                        <td>{items.dealerLocation}</td>
                        <td>{items.mailID}</td>
                        <td>{items.phone}</td>
                        {/* <td>
                              
                            </td> */}
                        <td>
                          {items.address}
                          <br />
                          {items.stateName}
                        </td>
                        <td className="text-center">
                          <div className="actionItems">
                            <button 
                              className="btn p-1 text-primary" 
                              onClick={()=>{getDealerDetails(items.dealerID)}}
                            >
                              <i className="bi bi-pencil-square"></i>
                             
                            </button>
                            <button 
                              className="btn p-1 text-danger"
                              onClick={()=>{deleteDealer(items.dealerID)}}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <div className="card-body p-2">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="dealerName" className="form-label">
                    Dealer name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dealerName"
                    placeholder=""
                    name="dealerName"
                    value={dealerName}
                    onChange={handleChange("dealerName")}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="dealerCode" className="form-label">
                    Dealer code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dealerCode"
                    placeholder=""
                    name="dealerCode"
                    value={dealerCode}
                    onChange={handleChange("dealerCode")}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="DealerLocation" className="form-label">
                    Dealer location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="DealerLocation"
                    placeholder=""
                    name="dealerLocation"
                    value={dealerLocation}
                    onChange={handleChange("dealerLocation")}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="emailAddress" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="mailID"
                    value={mailID}
                    onChange={handleChange("mailID")}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    placeholder=""
                    name="phone"
                    value={phone}
                    onChange={handleChange("phone")}
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="stateSelect" className="form-label">
                    State
                  </label>
                  <select
                    className="form-select"
                    id="stateSelect"
                    name="stateID"
                    value={stateID}
                    onChange={handleChange("stateID")}
                  >
                    <option>--Select State--</option>
                    {stateDetails.map((items, idx) => (
                      <option key={idx} value={items.id}>
                        {items.text}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <label htmlFor="FullAddress" className="form-label">
                    Full address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullAddress"
                    placeholder=""
                    name="address"
                    value={address}
                    onChange={handleChange("address")}
                  />
                </div>

                <div className="text-center">
                  <button
                    className="btn btn-sm btn-outline-danger me-1"
                    type="button"
                  >
                    Cancel
                  </button>
                  {
                    update ? (                      
                        <button className="btn btn-sm btn-success ms-1" type="submit">
                          Update Dealer
                        </button>                      
                    ):(
                      <button className="btn btn-sm btn-success ms-1" type="submit">
                        Add Dealer
                      </button>
                    )
                  }
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {
        loading && (
          <div className="divLoading">
            <img src={loadingIcon} alt="Loading..."/>
          </div>
        )
      }

    <div className="position-fixed top-0 end-0 p-3 zIndex">
      <div id="liveToast" class="toast align-items-center text-white bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
    </MasterLayout>
  );
};
