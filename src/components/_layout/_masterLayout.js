import { Link } from "react-router-dom";
import logo from "../../assets/tvs-logo.png";



const masterLayout = ({ title = "", desc = "", children }) => {
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
                    <Link className="nav-link active" aria-current="page" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
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
                        <Link className="dropdown-item" to="/Dashboard">
                          User Master
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          Dealer Master
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
                      Admin
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
                        <Link className="dropdown-item" to="/">
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
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">Masters</a></li>
                <li className="breadcrumb-item active" aria-current="page">Dealer Master</li>
            </ol>
        </nav>
            {children}
          
        </main>
        
      </>
    );
  };
  
  export default masterLayout;