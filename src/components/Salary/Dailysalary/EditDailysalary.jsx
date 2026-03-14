import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateDailySalaryEntry, filterDailySalaryEntries } from "../../../Redux/Salary/dailysalarySlice";
import { getEmployeeByEmployeeId } from "../../../Redux/Employe/employeeSlice";
import { getShiftByValue, getShifts } from "../../../Redux/Master/shiftSlice";
import { getEmployees } from "../../../Redux/Employe/employeeSlice";
import { all_routes } from "../../../routes/all_routes";
import RefreshIcon from "../../../components/tooltip-content/refresh";
import CommonDatePicker from "../../../components/date-picker/common-date-picker";
import CommonSelect from "../../../components/select/common-select";

const EditDailysalary = () => {
  const { id } = useParams(); // daily salary entry ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const route = all_routes;

  // Redux state
  const { dailySalaryEntries } = useSelector((state) => state.dailySalary);
  const { employeeByEmployeeId } = useSelector((state) => state.employees);
  const { employees } = useSelector((state) => state.employees);
  const { shiftByValue } = useSelector((state) => state.shifts);
  const { shifts } = useSelector((state) => state.shifts);

  // Local state for form data
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_id_display: "",
    designation_name: "",
    base_salary: "",
    worked_hours: "",          // shift hours (readOnly)
    date: null,
  });

  // Dropdown selections
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedOT, setSelectedOT] = useState(null);
  const [date, setDate] = useState(null);

  // Calculated fields
  const [totalHoursDecimal, setTotalHoursDecimal] = useState(0);
  const [totalHoursDisplay, setTotalHoursDisplay] = useState("");
  const [totalDaySalary, setTotalDaySalary] = useState(0);

  // Options for selects
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

  // Helper: format date for API
  const formatDate = (date) => {
    if (!date) return null;
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }
    return date;
  };

  // Calculate total hours and salary
  const calculateTotal = useCallback(() => {
    const shiftHours = parseFloat(formData.worked_hours) || 0;
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
  }, [formData.worked_hours, formData.base_salary, selectedOT]);

  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  // Fetch shifts and employees on mount
  useEffect(() => {
    dispatch(getShifts({ page: 1, rows: 100 }));
    dispatch(getEmployees({ page: 1, rows: 100 }));
  }, [dispatch]);

  // Find the existing daily salary entry from Redux or fetch it
  useEffect(() => {
    const entry = dailySalaryEntries?.results?.find((item) => item.id === Number(id));
    if (entry) {
      // Populate form with existing data
      setFormData((prev) => ({
        ...prev,
        employee_name: entry.employee_name,
        employee_id_display: entry.employee_id_display,
        worked_hours: entry.worked_hours,   // shift hours
        base_salary: "",                     // will be fetched from employee
        date: new Date(entry.date),
      }));
      setSelectedShift(entry.shift_value);
      setSelectedOT(entry.ot_hours);
      setDate(new Date(entry.date));
      setTotalHoursDisplay(entry.total_hours);
      setTotalDaySalary(parseFloat(entry.amount_earned));

      // Fetch employee details to get base salary
      if (entry.employee) {
        dispatch(getEmployeeByEmployeeId(entry.employee));
      }
    } else {
      // Fetch the specific entry using filter (if not in list)
      dispatch(filterDailySalaryEntries({ id }))
        .unwrap()
        .then((res) => {
          if (res.results?.length > 0) {
            const fetched = res.results[0];
            setFormData((prev) => ({
              ...prev,
              employee_name: fetched.employee_name,
              employee_id_display: fetched.employee_id_display,
              worked_hours: fetched.worked_hours,
              base_salary: "",
              date: new Date(fetched.date),
            }));
            setSelectedShift(fetched.shift_value);
            setSelectedOT(fetched.ot_hours);
            setDate(new Date(fetched.date));
            setTotalHoursDisplay(fetched.total_hours);
            setTotalDaySalary(parseFloat(fetched.amount_earned));

            if (fetched.employee) {
              dispatch(getEmployeeByEmployeeId(fetched.employee));
            }
          }
        })
        .catch((err) => console.error("Failed to fetch daily salary entry", err));
    }
  }, [id, dailySalaryEntries, dispatch]);

  // Update base salary when employee details are fetched
  useEffect(() => {
    if (employeeByEmployeeId?.results?.length > 0) {
      const emp = employeeByEmployeeId.results[0];
      setFormData((prev) => ({
        ...prev,
        base_salary: emp.base_salary,
        designation_name: emp.designation_name,
      }));
    }
  }, [employeeByEmployeeId]);

  // Update worked_hours when shift changes
  useEffect(() => {
    if (shiftByValue?.results?.length > 0) {
      const shift = shiftByValue.results[0];
      setFormData((prev) => ({
        ...prev,
        worked_hours: shift.standard_hours,
      }));
    }
  }, [shiftByValue]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare payload exactly as required
    const payload = {
      shift_value: selectedShift,
      ot_hours: selectedOT,
      worked_hours: formData.worked_hours,          // from shift
      total_hours: totalHoursDecimal.toFixed(2),    // send with 2 decimals
      amount_earned: totalDaySalary.toFixed(2),
    };

    dispatch(updateDailySalaryEntry({ id, data: payload }))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/salary/daily/list");
        }, 1500);
      })
      .catch((err) => {
        console.error("Update failed:", err);
        // Optionally show error message to user
      });
  };

  return (
    <div>
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
                            <label className="form-label">Employee ID</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.employee_id_display}
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
                            <label className="form-label">Base Salary (per hour)</label>
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
                                disabled // make readOnly
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
                              value={formData.worked_hours}
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
                            <label className="form-label">Total Day Salary</label>
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
              <button type="button" className="btn btn-secondary me-2" onClick={() => navigate("/salary/daily/list")}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Day Salary
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

export default EditDailysalary;