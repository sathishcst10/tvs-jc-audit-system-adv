import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

// import 'primeflex/primeflex.css';
import { Toast } from "primereact/toast";
import { Paginator } from 'primereact/paginator';
import Swal from "sweetalert2";

import MasterLayout from "../_layout/_masterLayout";

import dealerMasterService from "../../services/dealer-master.service";


import loadingIcon from "../../assets/icons8-dots-loading.gif";

// import { Toast } from "bootstrap";

export const DealerMaster = () => {
  const toast =  useRef(null);
  const dealerItems = [{}];
  const [stateDetails, setStates] = useState([]);
  const [dealerDetails, setDetails] = useState([]);
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(3);
  const [initialItems, setInitial] = useState({
    pageNumber: 1,
    pageSize: 10,
    sortOrderBy: "",
    sortOrderColumn: "",
    filters: "",
    totalCount : ""
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
    phone: ""
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
    filters,
    totalCount 
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
  } = dealer;

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    //formData = new FormData()

    //formData.set(name, value);
    setDealer({ ...dealer, [name]: value });
    //console.log(dealer);
  };

  const handleSubmit = (event) => {
    event.preventDefault();   
    if(!update){
      // for new entry
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
          toast.current.show(
            {
              severity:'success', 
              summary: 'Success Message', 
              detail:'Dealer saved Successfully', 
              life: 3000
            }
          );
          getAllDealersList();
          clearForm();

        })
        .catch((error)=>console.log(error));
      
      }else{
        // for update dealer
        dealerMasterService.updateDealer({
          isActive,
          dealerID,
          dealerName,
          dealerCode,
          dealerLocation,
          mailID,
          phone,
          stateID,
          address,
        }).then((response)=>{
          toast.current.show(
            {
              severity:'success', 
              summary: 'Success Message', 
              detail:'Dealer updated successfully', 
              life: 3000
            }
          );
          
          getAllDealersList();
        })
      }
        
      
    
  };

  const getStatesList = () => {
    dealerMasterService.getStates().then((response) => {
      setStates(response.data.data.data);
    });
  };

  const getAllDealersList = () => {
    // setInitial({
    //   ...initialItems,
    //   pageNumber : 1,
    //   pageSize : 4
    // })

    dealerMasterService
      .getAllDealersByPaging({
        pageNumber,
        pageSize,
        sortOrderBy,
        sortOrderColumn,
        filters,
      })
      .then((response) => {
        console.log(response.data.data.totalCount);
        setDetails(response.data.data.data);
        setInitial({
          ...initialItems,
          totalCount : response.data.data.totalCount
        })
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
            dealerID : dealerID,
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

    Swal.fire({
      title : 'Are you sure',
      text : 'You won\'t be able to revert this!',
      icon : 'warning',
      showCancelButton : true,
      confirmButtonColor : "#3085d6",
      cancelButtonColor : "#d33",
      confirmButtonText : "Yes, delete dealer!"
    }).then((result)=>{
      if(result.isConfirmed){
        dealerMasterService.deleteDealerById(dealerId).then(
          (response)=>{
            console.log(response);
            // toast.current.show(
            //   {
            //     severity:'info', 
            //     summary: 'Info Message', 
            //     detail:'Dealer deleted successfully.', 
            //     life: 3000
            //   }
            // )
            Swal.fire('Deleted!','Dealer details has been deleted.', 'success');
            getAllDealersList();
          }
        )
        
      }
    })
    
   
  }
  
  const onBasicPageChange = (event) => {
    // debugger;
    setBasicFirst(event.first);
    setBasicRows(event.rows);

    setInitial({
      ...initialItems,
      pageNumber : pageNumber + event.page
    });

    getAllDealersList();
}
  useEffect(() => {
    getStatesList();
    getAllDealersList();
  }, []);

  return (
    <MasterLayout pageMap={['Home', 'Masters','Dealer Master']}>
      <div className="row g-1">
        <div className="col-9">
          <div className="card h-100">
            <div className="card-body p-1">
              <div className="table-responsive">
                <table className="table table-hover table-custom">
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


              <Paginator 
                first={basicFirst} 
                rows={basicRows} 
                totalRecords={totalCount}
                onPageChange={onBasicPageChange}
                className="justify-content-end"
              >
              </Paginator>
 
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card h-100">
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
                    onClick={clearForm}
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


    <Toast ref={toast} />
    </MasterLayout>
  );
};
