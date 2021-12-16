import { Link, Redirect, Navigate, useNavigate} from 'react-router-dom';
import logo from '../../assets/tvs-logo.png';
import './signin.css';

export const SignIn = ()=>{
    //adding class for Login screen only
    document.body.classList.add("bg-Login");

    const _navigateTo = useNavigate();

    const onSubmit = () =>{
        _navigateTo("/dealerMaster");
    }














    return(
        <>
      <main className="form-signin">
        <form className="login-form" onSubmit={onSubmit}>
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
            <button
              className="btn btn-sm btn-primary"
              type="submit"                            
            >
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
    )
}