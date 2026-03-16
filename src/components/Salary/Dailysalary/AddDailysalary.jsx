import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDailySalaryEntry } from "../../../Redux/Salary/dailysalarySlice";
import { getDesignations } from "../../../Redux/Master/designationSlice";
import { getEmployeeByEmployeeId } from "../../../Redux/Employe/employeeSlice";
import { getShiftByValue, getShifts } from "../../../Redux/Master/shiftSlice";
import AppAlert from "../../AppAlert";
import { all_routes } from "../../../routes/all_routes";
import RefreshIcon from "../../../components/tooltip-content/refresh";
import { getEmployees } from "../../../Redux/Employe/employeeSlice";
import CommonDatePicker from "../../../components/date-picker/common-date-picker";
import CommonSelect from "../../../components/select/common-select";

const AddDailysalary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const route = all_routes;

  // Redux State
  const { employeeByEmployeeId, employees } = useSelector((state) => state.employees);
  const { shiftByValue, shifts } = useSelector((state) => state.shifts);

  // Local State
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [date, setDate] = useState(new Date()); // Defaults to Present Day
  const [selectedOT, setSelectedOT] = useState(null);
  const [totalHours, setTotalHours] = useState("");
  const [totalHoursDecimal, setTotalHoursDecimal] = useState(0);
  const [totalDaySalary, setTotalDaySalary] = useState(0);

  const [formData, setFormData] = useState({
    employee_name: "",
    designation_name: "",
    employee_id: "",
    salary_type: "", 
    base_salary: 0,
    standard_hours: "",
  });

  const isMonthly = formData.salary_type?.toLowerCase() === "monthly";

  const getDaysInMonth = (dateObj) => {
    return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();
  };

  // Helper to format date as YYYY-MM-DD without timezone shifting
  const formatDateForPayload = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const calculateTotal = useCallback(() => {
    const baseSalary = parseFloat(formData.base_salary) || 0;

    if (isMonthly) {
      const daysInMonth = getDaysInMonth(date);
      const calculatedDaily = baseSalary / daysInMonth;
      setTotalDaySalary(calculatedDaily);
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

  useEffect(() => {
    dispatch(getEmployees({ page: 1, rows: 100 }));
    dispatch(getShifts({ page: 1, rows: 100 }));
  }, [dispatch]);

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
      setSelectedEmployeeId(emp.id);
    }
  }, [employeeByEmployeeId]);

  useEffect(() => {
    if (shiftByValue?.results?.length > 0) {
      const shift = shiftByValue.results[0];
      setFormData((prev) => ({
        ...prev,
        standard_hours: shift.standard_hours,
      }));
    }
  }, [shiftByValue]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // This captures the 'date' state regardless of whether it was changed or is still the default present day
    const payload = {
      employee: selectedEmployeeId,
      date: formatDateForPayload(date), 
      worked_hours: isMonthly ? 0 : parseFloat(formData.standard_hours) || 0,
      shift_value: isMonthly ? 0 : parseFloat(formData.standard_hours) || 0,
      ot_hours: isMonthly ? 0 : parseFloat(selectedOT) || 0,
      total_hours: totalHoursDecimal,
      amount_earned: totalDaySalary.toFixed(2),
    };

    dispatch(createDailySalaryEntry(payload))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/salary/daily/list");
        }, 1500);
      });
  };

  const employeeOptions = employees?.results?.map((emp) => ({
    label: emp.employee_id,
    value: emp.employee_id
  })) || [];

  const shiftOptions = shifts?.results?.map((item) => ({
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
    { label: "3.30 Minutes", value: "3.5" }
  ];

  return (
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
          <div className="accordions-items-seperate" id="accordionExample">
            <div className="accordion-item border mb-4">
              <h2 className="accordion-header" id="headingOne">
                <div className="accordion-button bg-white" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                  <h5 className="d-inline-flex align-items-center">
                    <i className="ti ti-users text-primary me-2" />
                    <span>Employee Information</span>
                  </h5>
                </div>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body border-top">
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Employee ID <span className="text-danger">*</span></label>
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
                        <input type="text" className="form-control" value={formData.employee_name} readOnly />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Salary Type</label>
                        <input type="text" className="form-control" value={formData.salary_type} readOnly />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Base Salary ({isMonthly ? "Per Month" : "Per Hour"})</label>
                        <input type="text" className="form-control" value={formData.base_salary} readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion-item border mb-4">
              <div className="accordion-header" id="headingThree">
                <div className="accordion-button bg-white" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                  <h5 className="d-inline-flex align-items-center">
                    <i className="feather icon-map-pin text-primary me-2" />
                    <span>Day Salary Information</span>
                  </h5>
                </div>
              </div>
              <div id="collapseThree" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
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
                              placeholder="Choose Shift"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Shift Hours</label>
                            <input type="text" className="form-control" value={formData.standard_hours} readOnly />
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
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Total Hours</label>
                            <input type="text" className="form-control" value={totalHours} readOnly />
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
                        {isMonthly && (
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
              <button type="button" className="btn btn-secondary me-2" onClick={() => navigate("/salary/daily/list")}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Day Salary
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
  );
};

export default AddDailysalary;