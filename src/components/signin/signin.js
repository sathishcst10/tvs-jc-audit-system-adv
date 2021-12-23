import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, Navigate, useNavigate } from "react-router-dom";
import { login } from "../../actions/auth";
import authServices from "../../services/auth.services";
import logo from "../../assets/tvs-logo.png";
import "./signin.css";

export const SignIn = (props) => {
  //adding class for Login screen only
  document.body.classList.add("bg-Login");

  const _navigateTo = useNavigate();

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      .then(() => {
        //console.log(response)
        _navigateTo("/masters/dealerMaster");
       
        // setTimeout(() => {
        //   props.history.push("/masters/dealerMaster");
        //   window.location.reload();
        // }, 10000);
       
      })
      .catch((error) => {
        console.log("h", error);
        setLoading(false);
      });
  };
  useEffect(()=>{
    if (isLoggedIn) {
      return _navigateTo("/masters/dealerMaster");
    }
  },[]);
  

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
            <Link to="/" className="link-default">
              Forgot Password?
            </Link>
          </div>
          <div className="d-grid gap-1">
            <button className="btn btn-sm btn-primary" type="submit">
              Login
            </button>
          </div>
          <p className="mt-5 mb-0 text-muted text-center default-font-size">
            Don't have a account?{" "}
            <Link to="/" className="link-default">
              Create
            </Link>
          </p>
        </form>
      </main>
    </>
  );
};
