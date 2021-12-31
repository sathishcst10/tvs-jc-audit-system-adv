import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/tvs-logo.png";


import {logout} from '../../actions/auth';
import { clearMessage } from '../../actions/message'

import {history} from '../../helpers/history';
import eventBus from "../../common/eventBus";


const MasterLayout = ({ title = "", desc = "", pageMap = [], children }) => {

  const {user : currentUser} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const pathName = useLocation().pathname;
  
  // useEffect(()=>{
  //   history.listen((location)=>{
  //     dispatch(clearMessage())
  //   });


  // }, [dispatch]);

  const logOut = useCallback(()=>{
    //debugger
    //e.preventDefault();
    dispatch(logout());
  }, [dispatch]);


  useEffect(()=>{    
    console.log(currentUser);
    eventBus.on("logout", ()=>{
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
                      className={`nav-link ${pathName === '/dashboard' ? 'active':''}`} 
                      aria-current="page" 
                      to="/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      className={`nav-link ${pathName === '/jobCardInformation' ? 'active':''}`} 
                      to="/jobCardInformation">
                      Job Card
                    </Link>
                  </li>                  
                  
                  <li className="nav-item dropdown">
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
                              Aggregate Master
                            </Link>
                          </li>                        
                    </ul>                    
                  </li>

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
                        <Link className="dropdown-item" to="#">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          Settings
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
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
                pageMap.map((items,idx)=>(
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
        
      </>
    );
  };
  
  export default MasterLayout;