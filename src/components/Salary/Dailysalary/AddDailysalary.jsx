import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDailySalaryEntry } from "../../../Redux/Salary/dailysalarySlice";
import { getEmployeeByEmployeeId } from "../../../Redux/Employe/employeeSlice";
import { getShiftByValue, getShifts } from "../../../Redux/Master/shiftSlice";
import { getEmployees } from "../../../Redux/Employe/employeeSlice";
import { all_routes } from "../../../routes/all_routes";
import RefreshIcon from "../../../components/tooltip-content/refresh";
import CommonDatePicker from "../../../components/date-picker/common-date-picker";
import CommonSelect from "../../../components/select/common-select";

const AddDailysalary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const route = all_routes;

  // Redux state
  const { employeeByEmployeeId } = useSelector((state) => state.employees);
  const { employees } = useSelector((state) => state.employees);
  const { shiftByValue } = useSelector((state) => state.shifts);
  const { shifts } = useSelector((state) => state.shifts);

  // Local state for form inputs
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_id: "",
    designation_name: "",
    salary_type: "",
    base_salary: "",
    standard_hours: "",
  });

  // Dropdown selections
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedOT, setSelectedOT] = useState(null);
  const [date, setDate] = useState(new Date());

  // Calculated fields
  const [totalHoursDecimal, setTotalHoursDecimal] = useState(0);
  const [totalHoursDisplay, setTotalHoursDisplay] = useState("");
  const [totalDaySalary, setTotalDaySalary] = useState(0);

  // Options for selects
  const employeeOptions =
    employees?.results?.map((emp) => ({
      label: emp.employee_id,
      value: emp.employee_id,
    })) || [];

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

  // Handle text input changes (if any editable fields are added later)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Format date for API
  const formatDate = (date) => {
    if (!date) return null;
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }
    return date;
  };

  // Calculate total hours and salary whenever shift hours, OT, or base salary change
  const calculateTotal = useCallback(() => {
    const shiftHours = parseFloat(formData.standard_hours) || 0;
    const otHours = parseFloat(selectedOT) || 0;
    const totalDecimal = shiftHours + otHours;
    setTotalHoursDecimal(totalDecimal);

    // Format as "hours.minutes" (e.g., 8.30 for 8h30m)
    const hours = Math.floor(totalDecimal);
    const minutes = Math.round((totalDecimal - hours) * 60);
    const formatted = `${hours}.${minutes.toString().padStart(2, "0")}`;
    setTotalHoursDisplay(formatted);

    const baseSalary = parseFloat(formData.base_salary) || 0;
    const salary = totalDecimal * baseSalary;
    setTotalDaySalary(salary);
  }, [formData.standard_hours, formData.base_salary, selectedOT]);

  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  // Fetch employees and shifts on mount
  useEffect(() => {
    dispatch(getEmployees({ page: 1, rows: 100 }));
    dispatch(getShifts({ page: 1, rows: 100 }));
  }, [dispatch]);

  // Populate employee details when employee is selected
  useEffect(() => {
    if (employeeByEmployeeId?.results?.length > 0) {
      const emp = employeeByEmployeeId.results[0];
      setFormData((prev) => ({
        ...prev,
        employee_name: emp.employee_name,
        employee_id: emp.employee_id,
        designation_name: emp.designation_name,
        salary_type: emp.salary_type,
        base_salary: emp.base_salary,
      }));
    }
  }, [employeeByEmployeeId]);

  // Populate shift hours when shift is selected
  useEffect(() => {
    if (shiftByValue?.results?.length > 0) {
      const shift = shiftByValue.results[0];
      setFormData((prev) => ({
        ...prev,
        standard_hours: shift.standard_hours,
      }));
    }
  }, [shiftByValue]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    // Prepare payload – include all fields expected by the backend
    const payload = {
      employee: selectedEmployee,
      date: formatDate(date),
      employee_name: formData.employee_name,
      employee_id: formData.employee_id,
      designation: formData.designation_name, // adjust if backend uses 'designation' field
      base_salary: formData.base_salary,
      shift: selectedShift,
      ot: selectedOT,
      total_hours: totalHoursDecimal,
      total_salary: totalDaySalary,
    };

    // Append only defined values
    Object.keys(payload).forEach((key) => {
      if (payload[key] !== undefined && payload[key] !== null) {
        data.append(key, payload[key]);
      }
    });

    dispatch(createDailySalaryEntry(data))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/salary/daily/list");
        }, 1500);
      })
      .catch((err) => {
        // Handle error (optional)
        console.error("Failed to create daily salary:", err);
      });
  };

  return (
    <div>
      <div className="page-wrapper" id="employee-modal">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Add Daily Salary</h4>
                <h6>Create new Daily Salary Entry</h6>
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
            {/* Employee Information Accordion */}
            <div className="accordions-items-seperate" id="accordionExample">
              <div className="accordion-item border mb-4">
                <h2 className="accordion-header" id="headingOne">
                  <div
                    className="accordion-button bg-white"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-controls="collapseOne"
                  >
                    <div className="d-flex align-items-center justify-content-between flex-fill">
                      <h5 className="d-inline-flex align-items-center">
                        <i className="ti ti-users text-primary me-2" />
                        <span>Employee Information</span>
                      </h5>
                    </div>
                  </div>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body border-top">
                    <div className="new-employee-field">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Employee ID <span className="text-danger">*</span>
                            </label>
                            <CommonSelect
                              className="w-100"
                              options={employeeOptions}
                              value={selectedEmployee}
                              onChange={(e) => {
                                setSelectedEmployee(e.value);
                                dispatch(getEmployeeByEmployeeId(e.value));
                              }}
                              placeholder="Select Employee ID"
                              filter={true}
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
                              Base Salary (per hour)
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
              </div>

              {/* Day Salary Information Accordion */}
              <div className="accordion-item border mb-4">
                <div className="accordion-header" id="headingThree">
                  <div
                    className="accordion-button bg-white"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-controls="collapseThree"
                  >
                    <div className="d-flex align-items-center justify-content-between flex-fill">
                      <h5 className="d-inline-flex align-items-center">
                        <i className="feather icon-map-pin feather-edit text-primary me-2" />
                        <span>Day Salary Information</span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body border-top">
                    <div className="other-info">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Date</label>
                            <div className="input-groupicon calender-input">
                              <i className="feather icon-calendar info-img" />
                              <CommonDatePicker
                                value={date}
                                onChange={setDate}
                                className="w-100"
                              />
                            </div>
                          </div>
                        </div>

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
                              placeholder="Choose Shift"
                              filter={false}
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
                              placeholder="Choose OT"
                              filter={false}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Total Hours</label>
                            <input
                              type="text"
                              className="form-control"
                              value={totalHoursDisplay}
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Total Day Salary
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={totalDaySalary.toFixed(2)}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="text-end mb-3">
              <button type="button" className="btn btn-secondary me-2">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Day Salary
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
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

export default AddDailysalary;