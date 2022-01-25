import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/tvs-logo.png";
//import "bootstrap";

import { Toast } from "primereact/toast";

import { logout } from '../../actions/auth';
import { clearMessage } from '../../actions/message'

import { history } from '../../helpers/history';
import eventBus from "../../common/eventBus";
import userService from "../../services/user.service";
//accloseimport { Modal } from "bootstrap";


const MasterLayout = ({ title = "", desc = "", pageMap = [], children }) => {
  const toast = useRef(null);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathName = useLocation().pathname;

  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const { oldPassword, newPassword, confirmPassword } = changePassword;
  // useEffect(()=>{
  //   history.listen((location)=>{
  //     dispatch(clearMessage())
  //   });


  // }, [dispatch]);

  const logOut = useCallback(() => {
    //debugger
    //e.preventDefault();
    dispatch(logout());
  }, [dispatch]); 
  var myModal = document.getElementById('exampleModal')
  const handleChange = (name) => (event) => {
      const value = event.target.value;
      setChangePassword({
        ...changePassword,
        [name] : value
      })    
  }

  const changeUserPassword = ()=>{
    if(newPassword === confirmPassword){
      userService.changeUserPassword({oldPassword, newPassword}).then(
        (response)=>{
          if(response.data.success){
            toast.current.show(
              {
                  severity: 'success',
                  summary: 'Success Message',
                  detail: response.data.message,
                  life: 3000
              }
            );
            //myModal.hide();
            //logOut();
          }else{
            toast.current.show(
              {
                  severity: 'error',
                  summary: 'Error Message',
                  detail: response.data.message,
                  life: 3000
              }
            );
          }

          console.log(response);
        }
      ).catch((err)=>{console.log(err)});
    }else{

      toast.current.show(
        {
            severity: 'error',
            summary: 'Error Message',
            detail: "New password and confirm password not matched.",
            life: 3000
        }
    );
      console.log("Password not matched.")

    }
  }

  useEffect(() => {
    console.log(currentUser);
    eventBus.on("logout", () => {
      logOut();
    })
  }, [currentUser, logOut])

  const _userName = currentUser.data.user.firstName;

  document.body.classList.remove("bg-Login");
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md navbar-light py-0 fixed-top bg-white shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="TVS" className="app-logo m-0" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${pathName === '/dashboard' ? 'active' : ''}`}
                    aria-current="page"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${pathName === '/jobCardInformation' ? 'active' : ''}`}
                    to="/jobCardInformation">
                    Job Card
                  </Link>
                </li>

                <li className="nav-item dropdown d-none">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Reports
                  </Link>
                  <ul className="dropdown-menu border-0 shadow-sm" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/Dashboard">
                        Complaint Report
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Gap Report - SA
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Gap Report - SA
                      </Link>
                    </li>
                  </ul>
                </li>

                {
                  currentUser.data.roles.roleName !== 'Audit Team' && currentUser.data.roles.roleName !== 'Dealers' &&
                  (
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Masters
                      </Link>
                      <ul className="dropdown-menu border-0 shadow-sm" aria-labelledby="navbarDropdown">
                        {currentUser.data.roles.roleName === 'Admin' || currentUser.data.roles.roleName === 'Super Admin' &&
                          (
                            <>
                              <li>
                                <Link className="dropdown-item" to="/masters/userMaster">
                                  User Master
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item" to="/masters/dealerMaster">
                                  Dealer Master
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item" to="/masters/modelMaster">
                                  Model Master
                                </Link>
                              </li>

                              <li>
                                <Link className="dropdown-item" to="/masters/aggregateMaster">
                                  VPS Reason Master
                                </Link>
                              </li>
                            </>
                          )
                        }

                        {
                          currentUser.data.roles.roleName === 'Telecallers' &&
                          (
                            <li>
                              <Link className="dropdown-item" to="/masters/aggregateMaster">
                                VPS Reason Master
                              </Link>
                            </li>
                          )


                        }
                        {
                          currentUser.data.roles.roleName === 'Data Operator' &&
                          (
                            <li>
                              <Link className="dropdown-item" to="/masters/modelMaster">
                                Model Master
                              </Link>
                            </li>
                          )
                        }
                      </ul>
                    </li>
                  )
                }
              </ul>

              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle userInfo"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <small>Welcome!</small>
                    {_userName}
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-menu-end border-0 shadow-sm"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item disabled" to="#">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item disabled" to="#">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/" onClick={logOut}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="container-fluid g-1">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {
              pageMap.map((items, idx) => (
                idx != pageMap.length - 1 ?
                  <li key={idx} className="breadcrumb-item"><a href="#">{items}</a></li>
                  :
                  <li key={idx} className="breadcrumb-item active">{items}</li>
              ))
            }

          </ol>
        </nav>
        {children}

      </main>



      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Change Password</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Old Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={oldPassword} 
                  name="oldPassword" 
                  onChange={handleChange("oldPassword")} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={newPassword} 
                  name="newPassword" 
                  onChange={handleChange("newPassword")}   
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={confirmPassword} 
                  name="confirmPassword" 
                  onChange={handleChange("confirmPassword")} 
                />
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-sm btn-primary" onClick={changeUserPassword}>Change Password</button>
            </div>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </>
  );
};

export default MasterLayout;