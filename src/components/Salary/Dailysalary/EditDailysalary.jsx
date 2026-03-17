import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDailySalaryEntry,
  getDailySalaryById,          // <-- make sure this thunk exists in your slice
} from "../../../Redux/Salary/dailysalarySlice";
import { getEmployeeByEmployeeId } from "../../../Redux/Employe/employeeSlice";
import { getShiftByValue, getShifts } from "../../../Redux/Master/shiftSlice";
import { getEmployees } from "../../../Redux/Employe/employeeSlice";
import AppAlert from "../../AppAlert";
import { all_routes } from "../../../routes/all_routes";
import RefreshIcon from "../../../components/tooltip-content/refresh";
import CommonDatePicker from "../../../components/date-picker/common-date-picker";
import CommonSelect from "../../../components/select/common-select";

const EditDailysalary = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const route = all_routes;

  // Redux state
  const { dailySalaryById, loading: salaryLoading } = useSelector(
    (state) => state.dailySalary
  );
  const { employeeByEmployeeId } = useSelector((state) => state.employees);
  const { employees } = useSelector((state) => state.employees);
  const { shiftByValue, shifts } = useSelector((state) => state.shifts);

  // Local state – exactly like Add page
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [date, setDate] = useState(null);
  const [selectedOT, setSelectedOT] = useState(null);
  const [totalHours, setTotalHours] = useState("");
  const [totalHoursDecimal, setTotalHoursDecimal] = useState(0);
  const [totalDaySalary, setTotalDaySalary] = useState(0);

  const [formData, setFormData] = useState({
    employee_name: "",
    designation_name: "",
    employee_id: "",          // employee ID string (for display)
    salary_type: "",
    base_salary: 0,
    standard_hours: "",
  });

  const [appAlert, setAppAlert] = useState({
    type: "",
    message: "",
    show: false,
  });

  const isMonthly = formData.salary_type?.toLowerCase() === "monthly";

  // Helper functions (same as Add)
  const getDaysInMonth = (dateObj) => {
    return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();
  };

  const formatDateForPayload = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Calculate total hours and salary (same as Add)
  const calculateTotal = useCallback(() => {
    const baseSalary = parseFloat(formData.base_salary) || 0;

    if (isMonthly) {
      if (date) {
        const daysInMonth = getDaysInMonth(date);
        const calculatedDaily = baseSalary / daysInMonth;
        setTotalDaySalary(calculatedDaily);
      } else {
        setTotalDaySalary(0);
      }
      setTotalHoursDecimal(0);
      setTotalHours("N/A");
    } else {
      const shiftHours = parseFloat(formData.standard_hours) || 0;
      const otHours = parseFloat(selectedOT) || 0;
      const totalDecimal = shiftHours + otHours;
      setTotalHoursDecimal(totalDecimal);

      const hours = Math.floor(totalDecimal);
      const minutes = Math.round((totalDecimal - hours) * 60);
      setTotalHours(`${hours}.${minutes.toString().padStart(2, "0")}`);
      setTotalDaySalary(totalDecimal * baseSalary);
    }
  }, [formData.standard_hours, formData.base_salary, isMonthly, selectedOT, date]);

  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  // Fetch shifts and employees on mount (for dropdowns)
  useEffect(() => {
    dispatch(getShifts({ page: 1, rows: 100 }));
    dispatch(getEmployees({ page: 1, rows: 100 }));
  }, [dispatch]);

  // Fetch the daily salary entry by ID
  useEffect(() => {
    if (id) {
      dispatch(getDailySalaryById(id))
        .unwrap()
        .then((entry) => {
          // Populate local state from the fetched entry
          setSelectedEmployeeId(entry.employee);
          setSelectedShift(entry.shift_value);
          setSelectedOT(entry.ot_hours);
          setDate(new Date(entry.date));
          setTotalHours(entry.total_hours);
          setTotalDaySalary(parseFloat(entry.amount_earned));

          // Set basic employee display info
          setFormData((prev) => ({
            ...prev,
            employee_name: entry.employee_name,
            employee_id: entry.employee_id_display,
          }));

          // Fetch employee details to get base salary, salary type, designation
          if (entry.employee) {
            dispatch(getEmployeeByEmployeeId(entry.employee));
          }

          // If shift exists, fetch its details to populate standard_hours
          if (entry.shift_value) {
            dispatch(getShiftByValue(entry.shift_value));
          }
        })
        .catch((error) => {
          setAppAlert({
            type: "danger",
            message: error?.message || "Failed to load salary entry",
            show: true,
          });
        });
    }
  }, [id, dispatch]);

  // Update formData when employee details are fetched
  useEffect(() => {
    if (employeeByEmployeeId?.results?.length > 0) {
      const emp = employeeByEmployeeId.results[0];
      setFormData((prev) => ({
        ...prev,
        designation_name: emp.designation_name,
        salary_type: emp.salary_type,
        base_salary: emp.base_salary,
      }));
    }
  }, [employeeByEmployeeId]);

  // Update standard_hours when shift changes (including initial fetch)
  useEffect(() => {
    if (shiftByValue?.results?.length > 0) {
      const shift = shiftByValue.results[0];
      setFormData((prev) => ({
        ...prev,
        standard_hours: shift.standard_hours,
      }));
    }
  }, [shiftByValue]);

  // Options for selects (same as Add)
  const shiftOptions =
    shifts?.results?.map((item) => ({
      label: item.shift_value,
      value: item.shift_value,
    })) || [];

  const otOptions = [
    { label: "30 Minutes", value: "0.5" },
    { label: "1 Hour", value: "1" },
    { label: "1.30 Minutes", value: "1.5" },
    { label: "2 Hour", value: "2" },
    { label: "2.30 Minutes", value: "2.5" },
    { label: "3 Hour", value: "3" },
    { label: "3.30 Minutes", value: "3.5" },
  ];

  // Handle form submission with validations (same as Add)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Employee
    if (!selectedEmployeeId) {
      setAppAlert({
        type: "danger",
        message: "Employee is required",
        show: true,
      });
      return;
    }

    // Date
    if (!date || isNaN(new Date(date).getTime())) {
      setAppAlert({
        type: "danger",
        message: "Date is required",
        show: true,
      });
      return;
    }

    // Shift (only Daily)
    if (!isMonthly && !selectedShift) {
      setAppAlert({
        type: "danger",
        message: "Shift is required",
        show: true,
      });
      return;
    }

    // Total Hours (only Daily)
    if (!isMonthly && (!totalHoursDecimal || totalHoursDecimal <= 0)) {
      setAppAlert({
        type: "danger",
        message: "Total hours is required",
        show: true,
      });
      return;
    }

    // Total Day Salary
    if (!totalDaySalary || totalDaySalary <= 0) {
      setAppAlert({
        type: "danger",
        message: "Total day salary is required",
        show: true,
      });
      return;
    }

    // Prepare payload – only updatable fields (employee and date stay the same)
    const payload = {
      shift_value: isMonthly ? 0 : parseFloat(selectedShift) || 0,
      ot_hours: isMonthly ? 0 : parseFloat(selectedOT) || 0,
      worked_hours: isMonthly ? 0 : parseFloat(formData.standard_hours) || 0,
      total_hours: isMonthly ? 0 : totalHoursDecimal,
      amount_earned: totalDaySalary.toFixed(2),
    };

    dispatch(updateDailySalaryEntry({ id, data: payload }))
      .unwrap()
      .then(() => {
        setAppAlert({
          type: "success",
          message: "Daily Salary Updated Successfully!",
          show: true,
        });
        setTimeout(() => {
          navigate("/salary/daily/list");
        }, 1500);
      })
      .catch((error) => {
        let errorMessage = "Error updating salary";
        if (error?.non_field_errors?.length > 0) {
          errorMessage = `Salary already exists for ${formData.employee_name} on ${formatDateForPayload(date)}`;
        }
        setAppAlert({
          type: "danger",
          message: errorMessage,
          show: true,
        });
      });
  };

  // Show loading state while fetching
  if (salaryLoading && !dailySalaryById) {
    return (
      <div className="page-wrapper">
        <div className="content d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {appAlert.show && (
        <AppAlert
          type={appAlert.type}
          message={appAlert.message}
          onClose={() => setAppAlert({ ...appAlert, show: false })}
        />
      )}
      <div className="page-wrapper" id="employee-modal">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Edit Daily Salary</h4>
                <h6>Update Daily Salary Entry</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
            </ul>
            <div className="page-btn">
              <Link to={route.dailysalarysist} className="btn btn-secondary">
                <i className="feather icon-arrow-left me-2" />
                Back to List
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="accordions-items-seperate" id="accordionExample">
              {/* Employee Information Accordion */}
              <div className="accordion-item border mb-4">
                <h2 className="accordion-header" id="headingOne">
                  <div
                    className="accordion-button bg-white"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                  >
                    <h5 className="d-inline-flex align-items-center">
                      <i className="ti ti-users text-primary me-2" />
                      <span>Employee Information</span>
                    </h5>
                  </div>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Employee ID</label>
                          {/* Read‑only input instead of select */}
                          <input
                            type="text"
                            className="form-control"
                            value={formData.employee_id}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Employee Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.employee_name}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Designation</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.designation_name}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Salary Type</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.salary_type}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Base Salary ({isMonthly ? "Per Month" : "Per Hour"})
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.base_salary}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Day Salary Information Accordion */}
              <div className="accordion-item border mb-4">
                <div className="accordion-header" id="headingThree">
                  <div
                    className="accordion-button bg-white"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                  >
                    <h5 className="d-inline-flex align-items-center">
                      <i className="feather icon-map-pin text-primary me-2" />
                      <span>Day Salary Information</span>
                    </h5>
                  </div>
                </div>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Date</label>
                          <div className="input-groupicon calender-input">
                            <i className="feather icon-calendar info-img" />
                            <CommonDatePicker
                              value={date}
                              onChange={(val) => setDate(new Date(val))}
                              className="w-100"
                              disabled // Date cannot be changed
                            />
                          </div>
                        </div>
                      </div>

                      {!isMonthly && (
                        <>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Shift</label>
                              <CommonSelect
                                className="w-100"
                                options={shiftOptions}
                                value={selectedShift}
                                onChange={(e) => {
                                  setSelectedShift(e.value);
                                  dispatch(getShiftByValue(e.value));
                                }}
                                placeholder="Select Shift"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Shift Hours</label>
                              <input
                                type="text"
                                className="form-control"
                                value={formData.standard_hours}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">OT</label>
                              <CommonSelect
                                className="w-100"
                                options={otOptions}
                                value={selectedOT}
                                onChange={(e) => setSelectedOT(e.value)}
                                placeholder="Select OT"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Total Hours</label>
                              <input
                                type="text"
                                className="form-control"
                                value={totalHours}
                                readOnly
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Total Day Salary</label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}
                            value={totalDaySalary.toFixed(2)}
                            readOnly
                          />
                          {isMonthly && date && (
                            <small className="text-primary">
                              Based on {getDaysInMonth(date)} days in selected month.
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-end mb-3">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate("/salary/daily/list")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Day Salary
              </button>
            </div>
          </form>
        </div>

        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0">2014 - 2025 © DreamsPOS. All Right Reserved</p>
          <p>
            Designed &amp; Developed by{" "}
            <Link to="#" className="text-primary">
              Dreams
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditDailysalary;