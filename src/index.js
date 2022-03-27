import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'sweetalert2/dist/sweetalert2.css'
import Popper from '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import App from './App';
import store from './app/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './index.css';
import axios from 'axios';

axios.interceptors.request.use(
  (req)=>{
    console.log("Req-From-Interceptor", req);
    return req;
  },
  (err)=>{
    console.error("Req-Error-from-Iterceptor");
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (res)=>{    
    return res
  },
  (err)=>{
    console.error("Res-Error-Interceptor", err);
    return Promise.reject(err);
  }
)



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
