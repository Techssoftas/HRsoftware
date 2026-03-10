import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Layout/Header.jsx'
import Dashboard from './components/Dashboard.jsx'
import Layout from './components/Layout/Layout.jsx'
import Signin from './components/Auth/signin.jsx';
import List from './components/Master/Shift/ShiftList.jsx'
import Add from './components/Master/Shift/AddShift.jsx'
import DesignationList from "./components/Master/Designation/Designation.jsx";
import DesignationAdd from './components/Master/Designation/AddDesignation.jsx';
import EmployeesList from './components/EmployeeDetails/EmployeList.jsx';
import AddEmployee from './components/EmployeeDetails/AddEmployee.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/dashboard' element={< Dashboard />} />
          {/* master */}
          <Route path="/master/shift/list" element={<List/>}/>
          <Route path="/master/shift/add" element={<Add/>}/>
          <Route path='/master/designation/list' element={<DesignationList/>}/>
          <Route path='/master/designation/add' element={<DesignationAdd/>}/>
          {/* employe details */}
          <Route path='/employee/list' element={<EmployeesList/>}/>
          <Route path='/employee/add' element={<AddEmployee/>}/>
          {/* salary */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
