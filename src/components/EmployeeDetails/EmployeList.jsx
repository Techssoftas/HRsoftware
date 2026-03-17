import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import PrimeDataTable from "../data-table";
import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import RefreshIcon from "../../components/tooltip-content/refresh";
import { getEmployees } from "../../Redux/Employe/employeeSlice";
import { getDesignations } from "../../Redux/Master/designationSlice";
import DeleteModal from "../delete-modal";

// Import filter components
import SearchInputWithSuggestions from "../../components/data-table/SearchInputWithSuggestions";
import CommonDatePicker from "../../components/date-picker/common-date-picker";
import CommonSelect from "../../components/select/common-select";

const EmployeesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { employees, loading = false } = useSelector((state) => state.employees);
  const { designations } = useSelector((state) => state.designations);

  // Local state
  const [selectedId, setSelectedId] = useState(null);
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    employee_id: "",
    employee_name: "",
    designation_id: "",
    joining_date: "",
    district: "",
    contact_number: ""
  });

  // State for all distinct districts (for dropdown)
  const [allDistricts, setAllDistricts] = useState([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  // State for all distinct employee IDs (for dropdown)
  const [allEmployeeIds, setAllEmployeeIds] = useState([]);
  const [loadingEmployeeIds, setLoadingEmployeeIds] = useState(false);

  // State for all distinct employee names (for dropdown)
  const [allEmployeeNames, setAllEmployeeNames] = useState([]);
  const [loadingEmployeeNames, setLoadingEmployeeNames] = useState(false);

  // State for all distinct contact numbers (for dropdown)
  const [allContactNumbers, setAllContactNumbers] = useState([]);
  const [loadingContactNumbers, setLoadingContactNumbers] = useState(false);

  // Prepare data for table
  const dataSource = employees?.results || [];
  const totalRecords = employees?.count || 0;

  // Load designations for the dropdown
  useEffect(() => {
    dispatch(getDesignations({ page: 1, rows: 50 }));
  }, [dispatch]);

  // Load employees whenever filters, pagination, or rows change
  useEffect(() => {
    dispatch(
      getEmployees({
        page: currentPage,
        rows,
        filters
      })
    );
  }, [dispatch, currentPage, rows, filters]);

  // Fetch all districts once on component mount
  useEffect(() => {
    const fetchAllDistricts = async () => {
      setLoadingDistricts(true);
      try {
        // Fetch a large batch of employees (adjust rows as needed)
        const result = await dispatch(
          getEmployees({ page: 1, rows: 1000, filters: {} })
        ).unwrap();
        const districts = result.results
          .map((emp) => emp.district)
          .filter((d) => d && d.trim() !== "");
        const uniqueDistricts = [...new Set(districts)].sort((a, b) =>
          a.localeCompare(b)
        );
        setAllDistricts(uniqueDistricts);
      } catch (error) {
        console.error("Failed to fetch districts", error);
      } finally {
        setLoadingDistricts(false);
      }
    };
    fetchAllDistricts();
  }, [dispatch]);

  // Fetch all employee IDs once on component mount
  useEffect(() => {
    const fetchAllEmployeeIds = async () => {
      setLoadingEmployeeIds(true);
      try {
        // Fetch a large batch of employees (adjust rows as needed)
        const result = await dispatch(
          getEmployees({ page: 1, rows: 1000, filters: {} })
        ).unwrap();
        const employeeIds = result.results
          .map((emp) => emp.employee_id)
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
        // Fetch a large batch of employees (adjust rows as needed)
        const result = await dispatch(
          getEmployees({ page: 1, rows: 1000, filters: {} })
        ).unwrap();
        const employeeNames = result.results
          .map((emp) => emp.employee_name)
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

  // Fetch all contact numbers once on component mount
  useEffect(() => {
    const fetchAllContactNumbers = async () => {
      setLoadingContactNumbers(true);
      try {
        // Fetch a large batch of employees (adjust rows as needed)
        const result = await dispatch(
          getEmployees({ page: 1, rows: 1000, filters: {} })
        ).unwrap();
        const contactNumbers = result.results
          .map((emp) => emp.contact_number)
          .filter((num) => num && num.trim() !== "");
        const uniqueContactNumbers = [...new Set(contactNumbers)].sort((a, b) =>
          a.localeCompare(b)
        );
        setAllContactNumbers(uniqueContactNumbers);
      } catch (error) {
        console.error("Failed to fetch contact numbers", error);
      } finally {
        setLoadingContactNumbers(false);
      }
    };
    fetchAllContactNumbers();
  }, [dispatch]);

  // Handle filter changes from input components
  const handleFilterChange = useCallback((field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1); // reset to first page when filtering
  }, []);

  // Handle date picker change (format as YYYY-MM-DD)
  const handleDateChange = useCallback((date) => {
    const formattedDate = date ? date.toISOString().split("T")[0] : "";
    handleFilterChange("joining_date", formattedDate);
  }, [handleFilterChange]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      employee_id: "",
      employee_name: "",
      designation_id: "",
      joining_date: "",
      district: "",
      contact_number: ""
    });
    setCurrentPage(1);
  }, []);

  // Build options for designation dropdown, including "All" option
  const designationOptions = [
    { label: "All", value: "" },
    ...(designations?.results?.map((item) => ({
      label: item.name,
      value: String(item.id) // convert to string for consistency
    })) || [])
  ];

  // Build options for district dropdown from the static allDistricts list
  const districtOptions = useMemo(() => {
    return [
      { label: "All", value: "" },
      ...allDistricts.map((d) => ({ label: d, value: d }))
    ];
  }, [allDistricts]);

  // Build options for employee ID dropdown from the static allEmployeeIds list
  const employeeIdOptions = useMemo(() => {
    return [
      { label: "All", value: "" },
      ...allEmployeeIds.map((id) => ({ label: id, value: id }))
    ];
  }, [allEmployeeIds]);

  // Build options for employee name dropdown from the static allEmployeeNames list
  const employeeNameOptions = useMemo(() => {
    return [
      { label: "All", value: "" },
      ...allEmployeeNames.map((name) => ({ label: name, value: name }))
    ];
  }, [allEmployeeNames]);

  // Build options for contact number dropdown from the static allContactNumbers list
  const contactNumberOptions = useMemo(() => {
    return [
      { label: "All", value: "" },
      ...allContactNumbers.map((num) => ({ label: num, value: num }))
    ];
  }, [allContactNumbers]);

  // Table columns (unchanged)
  const columns = [
    {
      header: "S.No",
      body: (_row, { rowIndex }) => (currentPage - 1) * rows + rowIndex + 1
    },
    {
      header: "Employee ID",
      field: "employee_id"
    },
    {
      header: "Employee Name",
      field: "employee_name"
    },
    {
      header: "Designation",
      field: "designation_name"
    },
    {
      header: "Joining date",
      field: "joining_date"
    },
    {
      header: "District",
      field: "district"
    },
    {
      header: "Phone",
      field: "contact_number"
    },
    {
      header: "Actions",
      body: (row) => (
        <div className="d-flex">
          <button
            className="me-2 p-2 border rounded"
            onClick={() => navigate(`/employee/edit/${row.id}`)}
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

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Employees</h4>
                <h6>Manage your employees</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <div className="d-flex me-2 pe-2 border-end">
                  <Link
                    to="/employee/list"
                    className="btn-list active bg-primary me-2"
                  >
                    <i data-feather="list" className="feather-list text-white" />
                  </Link>
                  <Link to="/employee/grid" className="btn-grid me-2">
                    <i data-feather="grid" className="feather-grid" />
                  </Link>
                </div>
              </li>
              <TooltipIcons />
            </ul>
            <div className="d-flex align-items-center gap-3">
              <ul className="table-top-head mb-0">
                <RefreshIcon />
              </ul>
              <Link to="/employee/add" className="btn btn-primary">
                <i className="ti ti-circle-plus me-1"></i>
                Add Employee
              </Link>
            </div>
          </div>

          {/* Stat cards (unchanged) */}
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

          {/* Employee list card with filters */}
          <div className="card table-list-card employee-table">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              {/* Filter inputs row */}
              <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap gap-2">
                {/* Employee ID dropdown - now uses static allEmployeeIds */}
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

                {/* Employee Name dropdown - now uses static allEmployeeNames */}
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

                {/* Designation dropdown with "All" option */}
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

                {/* Joining date picker with calendar icon (same as Add Employee) */}
                <div style={{ width: "170px" }}>
                  <div className="input-groupicon calender-input">
                    <i className="feather icon-calendar info-img" />
                    <CommonDatePicker
                      value={filters.joining_date ? new Date(filters.joining_date) : null}
                      onChange={handleDateChange}
                      placeholder="Joining Date"
                      className="w-100"
                    />
                  </div>
                </div>

                {/* District dropdown - now uses static allDistricts */}
                <div style={{ width: "170px" }}>
                  <CommonSelect
                    className="w-100"
                    options={districtOptions}
                    value={filters.district}
                    onChange={(e) => handleFilterChange("district", e.value)}
                    placeholder={loadingDistricts ? "Loading..." : "District"}
                    filter={true}
                    disabled={loadingDistricts}
                  />
                </div>

                {/* Contact number dropdown - now uses static allContactNumbers */}
                <div style={{ width: "170px" }}>
                  <CommonSelect
                    className="w-100"
                    options={contactNumberOptions}
                    value={filters.contact_number}
                    onChange={(e) => handleFilterChange("contact_number", e.value)}
                    placeholder={loadingContactNumbers ? "Loading..." : "Contact"}
                    filter={true}
                    disabled={loadingContactNumbers}
                  />
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

      <DeleteModal selectedId={selectedId} type="employees" />
    </>
  );
};

export default EmployeesList;