import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app.js';
import {BrowserRouter} from 'react-router-dom';
import './app/styles/styles.scss';

ReactDOM.render(
    (
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ),
    document.getElementById('app')
);