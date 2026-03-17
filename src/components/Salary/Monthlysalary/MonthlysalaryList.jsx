import { PlusCircle } from "react-feather";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PrimeDataTable from "../../data-table/index.jsx";
import { all_routes } from "../../../routes/all_routes.jsx";
import TooltipIcons from "../../tooltip-content/tooltipIcons.jsx";
import RefreshIcon from "../../tooltip-content/refresh.jsx";
import { getMonthlySalaryEntries } from "../../../Redux/Salary/monthlysalarySlice.js";
import { getDesignations } from "../../../Redux/Master/designationSlice.js";
import DeleteModal from "../../delete-modal";
import CommonDatePicker from "../../../components/date-picker/common-date-picker.jsx";
import CommonSelect from "../../../components/select/common-select.jsx";

const MonthlySalaryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { monthlySalaryEntries, loading } = useSelector((state) => state.monthlySalary);
  const { designations } = useSelector((state) => state.designations);
  const dataSource = [...(monthlySalaryEntries?.results || [])].sort(
    (a, b) => b.id - a.id
  );

  // PAGINATION
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  // FILTERS
  const [filters, setFilters] = useState({
    is_paid: "",
    employee_id: "",
    employee_name: "",
    designation_id: "",
    date_from: "",
    date_to: ""
  });

  // State for all distinct employee IDs and names
  const [allEmployeeIds, setAllEmployeeIds] = useState([]);
  const [allEmployeeNames, setAllEmployeeNames] = useState([]);
  const [loadingEmployeeIds, setLoadingEmployeeIds] = useState(false);
  const [loadingEmployeeNames, setLoadingEmployeeNames] = useState(false);

  // Load designations on mount
  useEffect(() => {
    dispatch(getDesignations({ page: 1, rows: 50 }));
  }, [dispatch]);

  // Fetch all employee IDs once on component mount
  useEffect(() => {
    const fetchAllEmployeeIds = async () => {
      setLoadingEmployeeIds(true);
      try {
        const result = await dispatch(
          getMonthlySalaryEntries({ page: 1, rows: 1000, filters: {} })
        ).unwrap();
        const employeeIds = result.results
          .map((entry) => entry.employee_id_display)
          .filter((id) => id && id.trim() !== "");
        const uniqueEmployeeIds = [...new Set(employeeIds)].sort((a, b) =>
          a.localeCompare(b)
        );
        setAllEmployeeIds(uniqueEmployeeIds);
      } catch (error) {
        console.error("Failed to fetch employee IDs", error);
      } finally {
        setLoadingEmployeeIds(false);
      }
    };
    fetchAllEmployeeIds();
  }, [dispatch]);

  // Fetch all employee names once on component mount
  useEffect(() => {
    const fetchAllEmployeeNames = async () => {
      setLoadingEmployeeNames(true);
      try {
        const result = await dispatch(
          getMonthlySalaryEntries({ page: 1, rows: 1000, filters: {} })
        ).unwrap();
        const employeeNames = result.results
          .map((entry) => entry.employee_name)
          .filter((name) => name && name.trim() !== "");
        const uniqueEmployeeNames = [...new Set(employeeNames)].sort((a, b) =>
          a.localeCompare(b)
        );
        setAllEmployeeNames(uniqueEmployeeNames);
      } catch (error) {
        console.error("Failed to fetch employee names", error);
      } finally {
        setLoadingEmployeeNames(false);
      }
    };
    fetchAllEmployeeNames();
  }, [dispatch]);

  // LOAD DATA ON MOUNT AND WHEN FILTERS CHANGE
  useEffect(() => {
    dispatch(getMonthlySalaryEntries({ page: currentPage, rows, filters }));
  }, [dispatch, currentPage, rows, filters]);

  // Handle filter changes from input components
  const handleFilterChange = useCallback((field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1); // reset to first page when filtering
  }, []);

  // Handle date picker change (format as YYYY-MM-DD)
  const handleDateChange = useCallback((field, date) => {
    const formattedDate = date ? date.toISOString().split("T")[0] : "";
    handleFilterChange(field, formattedDate);
  }, [handleFilterChange]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      is_paid: "",
      employee_id: "",
      employee_name: "",
      designation_id: "",
      date_from: "",
      date_to: ""
    });
    setCurrentPage(1);
  }, []);

  // Build options for designation dropdown, including "All" option
  const designationOptions = [
    { label: "All", value: "" },
    ...(designations?.results?.map((item) => ({
      label: item.name,
      value: String(item.id)
    })) || [])
  ];

  // Build options for employee ID dropdown
  const employeeIdOptions = useMemo(() => {
    return [
      { label: "All", value: "" },
      ...allEmployeeIds.map((id) => ({ label: id, value: id }))
    ];
  }, [allEmployeeIds]);

  // Build options for employee name dropdown
  const employeeNameOptions = useMemo(() => {
    return [
      { label: "All", value: "" },
      ...allEmployeeNames.map((name) => ({ label: name, value: name }))
    ];
  }, [allEmployeeNames]);

  // Build options for is_paid dropdown
  const isPaidOptions = [
    { label: "All", value: "" },
    { label: "Paid", value: "true" },
    { label: "Not Paid", value: "false" }
  ];


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
  header: "Designation Name",
  field: "designation_name"
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
    <div className="d-flex justify-content-center align-items-center">
      <button
        className="p-2 border rounded "
        onClick={() => navigate(`/salary/monthly/edit/${row.id}`)}
      >
        <i className="feather icon-edit"></i>
      </button>
    </div>
  ),
}
];


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
        
        <div className="card table-list-card employee-table">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            {/* Filter inputs row */}
            <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap gap-2">
              {/* Is Paid dropdown */}
              <div style={{ width: "170px" }}>
                <CommonSelect
                  className="w-100"
                  options={isPaidOptions}
                  value={filters.is_paid}
                  onChange={(e) => handleFilterChange("is_paid", e.value)}
                  placeholder="Is Paid"
                  filter={true}
                />
              </div>

              {/* Employee ID dropdown */}
              <div style={{ width: "170px" }}>
                <CommonSelect
                  className="w-100"
                  options={employeeIdOptions}
                  value={filters.employee_id}
                  onChange={(e) => handleFilterChange("employee_id", e.value)}
                  placeholder={loadingEmployeeIds ? "Loading..." : "Employee ID"}
                  filter={true}
                  disabled={loadingEmployeeIds}
                />
              </div>

              {/* Employee Name dropdown */}
              <div style={{ width: "170px" }}>
                <CommonSelect
                  className="w-100"
                  options={employeeNameOptions}
                  value={filters.employee_name}
                  onChange={(e) => handleFilterChange("employee_name", e.value)}
                  placeholder={loadingEmployeeNames ? "Loading..." : "Employee Name"}
                  filter={true}
                  disabled={loadingEmployeeNames}
                />
              </div>

              {/* Designation dropdown */}
              <div style={{ width: "170px" }}>
                <CommonSelect
                  className="w-100"
                  options={designationOptions}
                  value={filters.designation_id}
                  onChange={(e) => handleFilterChange("designation_id", e.value)}
                  placeholder="Designation"
                  filter={true}
                />
              </div>

              {/* Date From picker */}
              <div style={{ width: "170px" }}>
                <div className="input-groupicon calender-input">
                  <i className="feather icon-calendar info-img" />
                  <CommonDatePicker
                    value={filters.date_from ? new Date(filters.date_from) : null}
                    onChange={(date) => handleDateChange("date_from", date)}
                    placeholder="Date From"
                    className="w-100"
                  />
                </div>
              </div>

              {/* Date To picker */}
              <div style={{ width: "170px" }}>
                <div className="input-groupicon calender-input">
                  <i className="feather icon-calendar info-img" />
                  <CommonDatePicker
                    value={filters.date_to ? new Date(filters.date_to) : null}
                    onChange={(date) => handleDateChange("date_to", date)}
                    placeholder="Date To"
                    className="w-100"
                  />
                </div>
              </div>

              {/* Clear filters button */}
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={clearFilters}
                title="Clear filters"
              >
                <i className="feather icon-x"></i>
              </button>
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
      </div>
    </div>
    <DeleteModal selectedId={selectedId} type="monthlySalaryEntries" />
    </>
  );
};

export default MonthlySalaryList;