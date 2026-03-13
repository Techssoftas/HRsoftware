import { PlusCircle } from "react-feather";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PrimeDataTable from "../../data-table/index.jsx";
import { all_routes } from "../../../routes/all_routes.jsx";
import TooltipIcons from "../../tooltip-content/tooltipIcons.jsx";
import RefreshIcon from "../../tooltip-content/refresh.jsx";
import { getMonthlySalaryEntries } from "../../../Redux/Salary/monthlysalarySlice.js";
import DeleteModal from "../../delete-modal";
const MonthlySalaryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { monthlySalaryEntries, loading } = useSelector((state) => state.monthlySalary);   
  const dataSource = [...(monthlySalaryEntries?.results || [])].sort(
  (a, b) => b.id - a.id
);

  // PAGINATION
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  // LOAD COLORS ON MOUNT
  useEffect(() => {
  dispatch(getMonthlySalaryEntries({ page: currentPage, rows }));
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
  header: "Date",
  field: "date"
},

{
  header: "Total Days",
  field: "total_days"
},

{
  header: "Total Shifts Worked",
  field: "total_shifts_worked"
},

{
  header: "Total Hours Worked",
  field: "total_hours_worked"
},

{
  header: "Gross Salary",
  field: "gross_salary"
},

{
  header: "Advance Deducted",
  field: "advance_deducted"
},

{
  header: "Net Payable",
  field: "net_payable"
},

{
  header: "Is Paid",
  body: (row) => row.is_paid ? "Paid" : "Not Paid"
},

{
  header: "ESI Amount",
  field: "esi_amount"
},

{
  header: "PF Amount",
  field: "pf_amount"
},
{
  header: "Action",
  body: (row) => (
    <Link
      to={`/salary/monthly/edit/${row.id}`}
      className="btn btn-sm btn-primary"
    >
      Update
    </Link>
  ),
}
];


const data = monthlySalaryEntries?.results || [];
  const totalRecords = monthlySalaryEntries?.count || 0;

  return (
    <>
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Monthly Salary</h4>
              <h6>Manage your Monthly Salary Entries</h6>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <div className="d-flex me-2 pe-2 border-end">
                <Link
                  to={all_routes.monthlysalarylist}
                  className="btn-list active  bg-primary me-2">
                  
                  <i data-feather="list" className="feather-list text-white" />
                </Link>
                <Link to={all_routes.employeegrid} className="btn-grid me-2">
                  <i data-feather="grid" className="feather-grid " />
                </Link>
              </div>
            </li>
            <TooltipIcons />
            <RefreshIcon />
            {/* <CollapesIcon /> */}
          </ul>
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
            <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
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
            </div>
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
    </>
  );

};

export default MonthlySalaryList;