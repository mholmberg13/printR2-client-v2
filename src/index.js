import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import reportWebVitals from './reportWebVitals';
import DataProvider from './redux/store';
import ActivationEmail from './components/activationEmail';

const element = (
  <DataProvider>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route path="/user/activate/:activation_token" element={<ActivationEmail/>} />
      </Routes>
    </Router>
  </DataProvider>
);

const container = document.getElementById('root')
ReactDOM.render(element, container)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
