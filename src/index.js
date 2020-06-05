import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from "./redux/reduxStore";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './App';
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(
    <MainApp />, document.getElementById('root'));

serviceWorker.unregister();
