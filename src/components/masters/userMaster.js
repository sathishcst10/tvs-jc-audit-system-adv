import { useEffect, useState, useRef} from "react";
import { Toast } from "primereact/toast";
import { Loading } from "react-loading-ui";
import Swal from "sweetalert2";
import userService from "../../services/user.service";
import MasterLayout from "../_layout/_masterLayout";
import dealerMasterService from "../../services/dealer-master.service";
import TablePagination from '@mui/material/TablePagination';

export const UserMaster = () => {
  const toast =  useRef(null);
  const settings = {
    title: "",
    text: "",
    progress: false,
    progressedClose: false,
    theme: "dark",
  }
  const [userRoles, setUserRoles] = useState([]);
  const [getFilter, setFilter] = useState('');
  const [dealers, setDealers] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [userValues, setUserValues] = useState({
    pageNumber: 1,
    pageSize: 10,
    sortOrderBy: "",
    sortOrderColumn: "",
    filters: "",
  });
  const [values, setValues]=useState({
    error : "",
    loading : false,
    update : false
  })
  const [users, setUsers] = useState({
    userId: 0,
    userName: "",
    firstName: "",
    lastName: "",
    isResetPassword: true,
    email: "",
    roleId: 0,
    dealerID: 0,
    phoneNo: "",
    isActive: true,
  });
const {error, loading, update} = values;
  const {
    userId,
    userName,
    firstName,
    lastName,
    isResetPassword,
    email,
    roleId,
    dealerID,
    phoneNo,
    isActive
  } = users;

  const { pageNumber, pageSize, sortOrderBy, sortOrderColumn, filters } =
    userValues;

  const getUserRoles = () => {
    userService
      .getUserRoles()
      .then((response) => {
        setUserRoles(response.data.data.data);
      })
      .catch((error) => console.log(error));
  };
  const getDealerInfo = () => {
    dealerMasterService
      .getDealerForDropdown(
       true
      )
      .then((response) => {
        console.log(response);
        setDealers(response.data.data.data);
      })
      .catch((error) => console.log(error));
  };
  const getAllUsers = () => {
    Loading(settings);
    userService
      .getAllUsersByPaging({
        pageNumber,
        pageSize,
        sortOrderBy,
        sortOrderColumn,
        filters,
      })
      .then((response) => {
        setTotalCount(response.data.data.totalCount);
        setUserDetails(response.data.data.data);        
        Loading();
      })
      .catch((error) =>{console.log(error); Loading();});
  };
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    Loading(settings);
    setPage(newPage + 1);
   
    userService
    .getAllUsersByPaging({
      pageNumber : newPage + 1,
      pageSize,
      sortOrderBy,
      sortOrderColumn,
      filters,
    })
    .then((response) => {
      setTotalCount(response.data.data.totalCount);
      setUserDetails(response.data.data.data);
      Loading();
    })
    .catch((error) =>{console.log(error); Loading();});
    
  };

  const handleChangeRowsPerPage = (event) => {
    Loading(settings);
    userService
    .getAllUsersByPaging({
      pageNumber,
      pageSize : parseInt(event.target.value, 10),
      sortOrderBy,
      sortOrderColumn,
      filters,
    })
    .then((response) => {
      setTotalCount(response.data.data.totalCount);
      setUserDetails(response.data.data.data);
      Loading();
    })
    .catch((error) =>{console.log(error); Loading();});
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);

  };
  const getUserById = (argID) =>{
    Loading(settings);
    userService.getUserById(argID).then(
      (response)=>{        
        console.log("user", response);
        Loading();
        setUsers({
          ...users,
          userId : argID,
          userName : response.data.data.userName,
          firstName : response.data.data.firstName,
          lastName : response.data.data.lastName,          
          email : response.data.data.email,
          roleId : response.data.data.roleId,
          dealerID : response.data.data.dealerID,
          phoneNo : response.data.data.phoneNo 
        })
      }
    ).catch((err)=>{console.log(err); Loading()})
  }

  const updateUser = (argID)=>{
    
    setValues({...values, update : true});
    getUserById(argID);
    
  }
  const deleteUser = (argID)=>{
    Swal.fire({
      title : 'Are you sure',
      text : 'You won\'t be able to revert this!',
      icon : 'warning',
      showCancelButton : true,
      confirmButtonColor : "#3085d6",
      cancelButtonColor : "#d33",
      confirmButtonText : "Yes, delete user!"
    }).then((result)=>{
      if(result.isConfirmed){
        userService.deleteUser(argID).then(
          (response)=>{
            console.log(response);            
            Swal.fire('Deleted!','User has been deleted.', 'success');
            getAllUsers();
          }
        )
        
      }
    })
  }
  const clearForm = () =>{
    setUsers({
      ...users, 
      userName: "",
      firstName: "",
      lastName: "",
      isResetPassword: true,
      email: "",
      roleId: 0,
      dealerID: 0,
      phoneNo: ""
    });

    setValues({...values, update:false});
  }
  const handleSubmit = (event) =>{
    event.preventDefault();
    Loading(settings);
    if(!update){
      userService.createUser({
        userId,
        userName,
        firstName,
        lastName,
        isResetPassword,
        email,
        roleId,
        dealerID,
        phoneNo,
        isActive
      }).then((response)=>{
          if(response.data.success){
            console.log("Created", response);
            toast.current.show(
              {
                severity:'success', 
                summary: 'Success Message', 
                detail:response.data.message, 
                life: 3000
              }
            );
            getAllUsers();
            clearForm()
            Loading();
          }else{
            toast.current.show(
              {
                severity:'warn', 
                summary: 'Warning Message', 
                detail: response.data.message, 
                life: 3000
              }
            );
            getAllUsers();
            clearForm()
            Loading();
          }
        
      })
    }else{
      userService.updateUser({
        userId,
        userName,
        firstName,
        lastName,
        isResetPassword,
        email,
        roleId,
        dealerID,
        phoneNo,
        isActive
      }).
      then((response)=>{
        console.log("updated", response);
        toast.current.show(
          {
            severity:'success', 
            summary: 'Success Message', 
            detail:'Model updated successfully', 
            life: 3000
          }
      );
        getAllUsers();
        clearForm();
        Loading();
      }).catch((err)=>{console.log(err); Loading()})
    }
  }

  const ChangeStatus = (argID) =>{
    Loading(settings);
    userService.getUserById(argID).then(
      (response)=>{                
        
        userService.updateUser({
          userId : argID,
          userName : response.data.data.userName,
          firstName : response.data.data.firstName,
          lastName : response.data.data.lastName,          
          email : response.data.data.email,
          roleId : response.data.data.roleId,
          dealerID : response.data.data.dealerID,
          phoneNo : response.data.data.phoneNo, 
          isActive : response.data.data.isActive ? false : true,
          isResetPassword : response.data.data.isResetPassword
        }).
        then((response)=>{
          Loading();
          console.log("updated", response);
          if(response.data.success){
            toast.current.show(
              {
                severity:'success', 
                summary: 'Success Message', 
                detail:'User status changed', 
                life: 3000
              }
            );
            getAllUsers();
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

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    //formData = new FormData()

    //formData.set(name, value);
    setUsers({ ...users, [name]: value });
    //console.log(dealer);
  };

  const closeForm = ()=>{
    setUsers({
      ...users,
      userName : "",
      firstName : "",
      lastName : "",
      email : "",
      phoneNo : "",
      dealerID : 0,
      roleId : 0

    })
  }


  const handleFilter = (name) => (event) => {
    const value = event.target.value;
    setFilter(value);
    setUserValues({
        ...userValues,
        "filters": {
            "username": value
        }
    });
}
const filterData = () => {
  getAllUsers();
    setTimeout(() => {
        setUserValues({
            ...userValues,
            "filters": ""
        });
        setFilter("");
    }, 5000);
    //console.log(getaggre);
}

  useEffect(() => {
    getUserRoles();
    getDealerInfo();
    getAllUsers();
  }, []);

  const UserTable = () => {
    return (
      <table className="table table-hover table-custom">
        <thead className="table-dark">
          <tr>
            <th>Username</th>
            <th>Fullname</th>

            <th>Email</th>
            <th>phone</th>

            <th>Dealer Details</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((items, idx) => (
            <tr key={idx} data-id={items.userId}>
              <td>{items.userName}</td>
              <td>
                {items.firstName} {items.lastName}
              </td>
              <td>{items.email}</td>
              <td>{items.phoneNo}</td>
              <td>
                {items.dealerName}
                <p className="secondary-text mb-0">{items.dealerLocation}</p>
              </td>
              <td>{items.role}</td>
              <td>
                {items.isActive ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-danger">Inactive</span>
                )}
              </td>

              <td className="text-center">
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
                      <a className="dropdown-item" href="#" onClick={()=>updateUser(items.userId)}>
                        Edit User
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={()=>{deleteUser(items.userId)}}>
                        Delete User
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={()=>{ChangeStatus(items.userId)}}>
                        {
                          items.isActive ? 'Change to Inactive' : 'Change to Active'
                        }                        
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item disabled" href="#" disabled="disabled">
                        Reset Password
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
    <MasterLayout pageMap={["Home", "Masters", "User Master"]}>
      <div className="row g-1">
        <div className="col-9">
          <div className="card h-100">
            <div className="card-body p-1">
              <div className="d-flex justify-content-end mb-1">
                  <div className="input-group me-0 searchBox" >
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Username search..."
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
                <UserTable />

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
                  <label htmlFor="userName" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"            
                    placeholder=""
                    name="userName"
                    value={userName}            
                    onChange={handleChange("userName")}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="firstName" className="form-label">
                    Firstname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"            
                    placeholder=""
                    name="firstName"
                    value={firstName}
                    onChange={handleChange("firstName")}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="lastName" className="form-label">
                    Lastname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    name="lastName"
                    value={lastName}
                    onChange={handleChange("lastName")}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder=""
                    name="email"
                    value={email}
                    onChange={handleChange("email")}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder=""
                    name="phoneNo"
                    value={phoneNo}
                    onChange={handleChange("phoneNo")}
                    required
                  />
                </div>
               
                <div className="mb-2">
                  <label htmlFor="userRole" className="form-label">
                    Role
                  </label>
                  <select 
                    className="form-select" 
                    id="userRole" 
                    name="roleId"
                    value={roleId}
                    required
                    onChange={handleChange("roleId")}>
                    <option value={-1}>--Select User Role--</option>
                    {userRoles.map((items, idx) => (
                      <option key={idx} value={items.id}>
                        {items.text}
                      </option>
                    ))}
                  </select>
                </div>
                {
                  roleId == 3 &&
                
                  <div className="mb-2">
                    <label htmlFor="dealerName" className="form-label">
                      Dealer Name
                    </label>
                    <select 
                      className="form-select" 
                      id="dealerName" 
                      name="dealerID"
                      value={dealerID}
                      required
                      onChange={handleChange("dealerID")}
                    >
                      <option value={-1}>--Select Dealer--</option>
                      { dealers.map((items, idx) => (
                          <option key={idx} value={items.id}>
                            {items.text}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                }
                
                <div className="mb-2 text-center">
                  <button 
                    className="btn btn-sm btn-outline-danger me-1" 
                    type="button"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>
                  {
                    update ? (                      
                        <button className="btn btn-sm btn-success ms-1" type="submit">
                          Update User
                        </button>                      
                    ):(
                      <button className="btn btn-sm btn-success ms-1" type="submit">
                        Create User
                      </button>
                    )
                  }
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
