import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import BlogC from './Component/BlogC';
import Home from './Component/Home';
import BlogList from './Component/BlogList';

import './App.css';

function App() {


  return (
  
    <div>
        <Router>
        <Routes>   
             <Route path='/' element={<Home />} />
          <Route path='/create' element={<BlogC />} />
            <Route path='/bloglist' element={<BlogList />} />
          </Routes>
      </Router>
     
     
      </div>
  );
}

export default App;
