import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, Navigate, useNavigate } from "react-router-dom";
import { login } from "../../actions/auth";
import authServices from "../../services/auth.services";
import logo from "../../assets/tvs-logo.png";
import "./signin.css";
import userService from "../../services/user.service";

export const SignIn = (props) => {
  const toast = useRef(null);
  //adding class for Login screen only
  document.body.classList.add("bg-Login");

  const _navigateTo = useNavigate();

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [fPass, setFPass] = useState({
    isSuccess : false,
    isFail : false,
    message : ""
  });

  const {isFail, isSuccess, message} = fPass;
  const { isLoggedIn } = useSelector((state) => state.auth);
  // const {message} = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const userName = e.target.value;
    setUsername(userName);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);
    dispatch(login(userName, password))
      .then((response) => {
        console.log(response)
        _navigateTo("/dashboard");
      })
      .catch((error) => {
          //console.log("h", error);
          toast.current.show(
            {
                severity: 'error',
                summary: 'Error Message',
                detail: "Check Username and Password",
                life: 3000
            }
          );
        setLoading(false);
      });
  };
  useEffect(() => {
    if (isLoggedIn) {
      return _navigateTo("/dashboard");
    }
  }, []);

  const handleChange = name =>event=>{
    const value = event.target.value;
    setEmail(value);
  }

  const forgotPassword = ()=>{
    userService.resetUserPassword({email}).then(
      (response)=>{        
        response.data.success ?
          setFPass({
            ...fPass,
            isSuccess : true,
            message : response.data.message
          })
        :
          setFPass({
            ...fPass,
            isFail : true,
            message : response.data.message
          })

        console.log(response)
      }
    ).catch((err)=>console.log(err))
  }

  const closeModal = ()=>{
    setEmail("");
    setFPass({
      ...fPass,
      isFail: false,
      isSuccess:false
    });
  }

  return (
    <>
      <main className="form-signin">
        <form className="login-form" onSubmit={handleLogin}>
          <h1 className="h3 mb-4 text-center">
            {/* <img src={avatar} alt="avatar" className="img-avatar"/> */}
            <img src={logo} alt="TVS Logo" className="app-logo" />
          </h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              autoComplete="off"
              value={userName}
              onChange={onChangeUsername}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control border-top-0"
              id="floatingPassword"
              placeholder="Password"
              className="form-control"
              type="password"
              value={password}
              onChange={onChangePassword}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3 d-flex flex-row justify-content-between align-items-center">
            <label className="text-muted default-font-size">
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
            <Link to="/" className="link-default" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Forgot Password?
            </Link>
          </div>
          <div className="d-grid gap-1 mb-4">
            <button className="btn btn-sm btn-primary" type="submit">
              Login
            </button>
          </div>
          <p className="mt-5 mb-0 text-muted text-center default-font-size d-none">
            Don't have a account?{" "}
            <Link to="/" className="link-default">
              Create
            </Link>
          </p>
        </form>
      </main>













      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Forgot Password</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label>E-Mail ID</label>
                <input 
                  className="form-control" 
                  name="email" 
                  id="email" 
                  value={email}
                  onChange={handleChange("email")} />
              </div>
              {
                isSuccess ? (
                  <div className="alert alert-success" role="alert">
                    {message} "Please check your mail inbox."
                  </div>
                ) :
                isFail ?(
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                )
                :
                (
                  <>

                  </>
                )

              }
              
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={forgotPassword}>Reset Password</button>
            </div>
          </div>
        </div>
      </div>


      <Toast ref={toast} />
    </>
  );
};
