import { PlusCircle } from "react-feather";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PrimeDataTable from "../../data-table";
import { all_routes } from "../../../routes/all_routes.jsx";
import TooltipIcons from "../../../components/tooltip-content/tooltipIcons.jsx";
import RefreshIcon from "../../../components/tooltip-content/refresh.jsx";
import {getAdvanceSalaries} from "../../../Redux/Salary/advancesalarySlice"
import DeleteModal from "../../delete-modal";
import EditAdvancesalary from "./EditAdvancesalary.jsx";
const AdvanceSalaryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { advanceSalaries, loading } = useSelector((state) => state.advanceSalary);
  const dataSource = [...(advanceSalaries?.results || [])].sort(
    (a, b) => b.id - a.id
  );
  

  const [editData, setEditData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // PAGINATION
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // LOAD COLORS ON MOUNT
  useEffect(() => {
  dispatch(getAdvanceSalaries({ page: currentPage, rows }));
}, [dispatch, currentPage, rows]);


const columns = [
  {
    header: "S.No",
    body: (_row, { rowIndex }) =>
      (currentPage - 1) * rows + rowIndex + 1
  },

  {
    header: "Employee ID",
    field: "employee_id_display"
  },

  {
    header: "Employee Name",
    field: "employee_name"
  },

  {
    header: "Amount",
    field: "amount"
  },

  {
    header: "Date Given",
    field: "date_given"
  },
{
  header: "Actions",
  body: (row) => (
    <div className="d-flex">
      <button
        className="me-2 p-2 border rounded"
        onClick={() => navigate(`/salary/advance/edit/${row.id}`)}
      >
        <i className="feather icon-edit"></i>
      </button>

      <button
        className="p-2 border rounded"
        data-bs-toggle="modal"
        data-bs-target="#delete-modal"
        onClick={() => setSelectedId(row.id)}
      >
        <i className="feather icon-trash-2"></i>
      </button>
    </div>
  )
}
];


const data = advanceSalaries?.results || [];
  const totalRecords = advanceSalaries?.count || 0;
console.log(dataSource)
  return (
    <>
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Advance Salary</h4>
              <h6>Manage your Advance Salary Entries</h6>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <div className="d-flex me-2 pe-2 border-end">
                <Link
                  to={all_routes.advancesalarylist}
                  className="btn-list active  bg-primary me-2">
                  
                  <i data-feather="list" className="feather-list text-white" />
                </Link>
                <Link to={all_routes.employeegrid} className="btn-grid me-2">
                  <i data-feather="grid" className="feather-grid " />
                </Link>
              </div>
            </li>
            <TooltipIcons />
            </ul>
            <div className="d-flex align-items-center gap-3">
              <ul className="table-top-head mb-0">
            <RefreshIcon />
            {/* <CollapesIcon /> */}
          </ul>
          
          <Link to={all_routes.advancesalaryadd} className="btn btn-primary">
  <i className="ti ti-circle-plus me-1"></i>
  Add Advance Salary
</Link>
</div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-purple border-0">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 text-white">Total Employee</p>
                  <h4 className="text-white">1007</h4>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-purple-900">
                    <i className="ti ti-users-group" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-teal border-0">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 text-white">Active</p>
                  <h4 className="text-white">1007</h4>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-teal-900">
                    <i className="ti ti-user-star" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-secondary border-0">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 text-white">Inactive</p>
                  <h4 className="text-white">1007</h4>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-secondary-900">
                    <i className="ti ti-user-exclamation" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-info border-0">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 text-white">New Joiners</p>
                  <h4 className="text-white">67</h4>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-info-900">
                    <i className="ti ti-user-check" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /product list */}
        <div className="card table-list-card employee-table">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 ">
            <div className="search-set"></div>
            {/* <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
              <div className="dropdown me-2">
                <Link
                  to="#"
                  className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                  data-bs-toggle="dropdown">
                  
                  Select Employees
                </Link>
                <ul className="dropdown-menu  dropdown-menu-end p-3">
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      Anthony Lewis
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      Brian Villalobos
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      Harvey Smith
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      Stephan Peralt
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown me-2">
                <Link
                  to="#"
                  className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                  data-bs-toggle="dropdown">
                  
                  Designation
                </Link>
                <ul className="dropdown-menu  dropdown-menu-end p-3">
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      System Admin
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      Designer
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      Tech Lead
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      Database administrator
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown me-2">
                <Link
                  to="#"
                  className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                  data-bs-toggle="dropdown">
                  
                  Select Status
                </Link>
                <ul className="dropdown-menu  dropdown-menu-end p-3">
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      Active
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      Inactive
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      New Joiners
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown">
                <Link
                  to="#"
                  className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                  data-bs-toggle="dropdown">
                  
                  Sort By : Last 7 Days
                </Link>
                <ul className="dropdown-menu  dropdown-menu-end p-3">
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      Recently Added
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      Ascending
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      Desending
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      Last Month
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item rounded-1">
                      Last 7 Days
                    </Link>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
          <div className="card-body pb-0">
            <div className="custom-datatable-filter table-responsive">
             <PrimeDataTable
  column={columns}
  data={dataSource}
  rows={rows}
  setRows={setRows}
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  totalRecords={totalRecords}
/>
            </div>
          </div>
        </div>

        {/* /product list */}
      </div>
      
       
    </div>
    <DeleteModal selectedId={selectedId} type="advanceSalaries" />
    </>
    );

};

export default AdvanceSalaryList;