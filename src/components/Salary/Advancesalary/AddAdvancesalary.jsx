import React, { useEffect, useState, useCallback } from "react"; // added useCallback
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { createAdvanceSalary } from "../../../Redux/Salary/advancesalarySlice";
import { getDesignations } from "../../../Redux/Master/designationSlice";
import { getEmployeeByEmployeeId } from "../../../Redux/Employe/employeeSlice";
import { getShiftByValue, getShifts } from "../../../Redux/Master/shiftSlice";
import AppAlert from "../../AppAlert"
import { all_routes } from "../../../routes/all_routes";
import RefreshIcon from "../../../components/tooltip-content/refresh";
import { getEmployees } from "../../../Redux/Employe/employeeSlice";
import CommonDatePicker from "../../../components/date-picker/common-date-picker";
import CommonSelect from "../../../components/select/common-select";
import { Editor } from "primereact/editor";
import { useRef } from "react";

const AddAdvancesalary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const route = all_routes;
  const { designations, loading } = useSelector((state) => state.designations);
  const { employeeByEmployeeId } = useSelector((state) => state.employees);
  const { shiftByValue } = useSelector((state) => state.shifts);
  const { employees } = useSelector((state) => state.employees);
  const { shifts } = useSelector((state) => state.shifts);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedOT, setSelectedOT] = useState(null);
  const [totalHours, setTotalHours] = useState(""); // display format (e.g., "8.30")

  // NEW STATE: numeric total hours and calculated salary
  const [totalHoursDecimal, setTotalHoursDecimal] = useState(0);
  const [totalDaySalary, setTotalDaySalary] = useState(0);

  const [appAlert, setAppAlert] = useState({
  show: false,
  type: "",
  message: ""
});

  const employeeOptions =
    employees?.results?.map((emp) => ({
      label: emp.employee_id,
      value: emp.employee_id
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
    { label: "3.30 Minutes", value: "3.5" }
  ];

  const [formData, setFormData] = useState({
    employee_name: "",
    designation_name: "",
    employee_id: "",
    amount: "",
    standard_hours: "", 
    contact_number: "",
    dob: null,
    joining_date: null,
    designation: "",
    blood_group: "",
    education: "",
    experience: "",
    about: "",
    address: "",
    country: "",
    state: "",
    city: "",
    emergency_contact: "",
    relation: "",
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    bank_branch:"",
    photo: null,
    aadhaar_pdf: null,
    pan_pdf: null,
    passbook_pdf: null,
    has_esi_pf: "",
    pf_account_number: "",
    esi_account_number: "",
    aadhaar_number: "",
    pan_number: "",
    pf_amount: "",
    esi_amount:"",
    appointment_order: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }; 

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        photo: file
      }));
    }
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const formatDate = (date) => {
    if (!date) return null;
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }
    return date;
  };

  // NEW: function to recalc total hours and salary
  const calculateTotal = useCallback(() => {
    const shiftHours = parseFloat(formData.standard_hours) || 0;
    const otHours = parseFloat(selectedOT) || 0;
    const totalDecimal = shiftHours + otHours;
    setTotalHoursDecimal(totalDecimal);

    // Format for display: hours.minutes (e.g., 8.30 for 8h30m)
    const hours = Math.floor(totalDecimal);
    const minutes = Math.round((totalDecimal - hours) * 60);
    const formatted = `${hours}.${minutes.toString().padStart(2, "0")}`;
    setTotalHours(formatted);

    const baseSalary = parseFloat(formData.base_salary) || 0;
    const salary = totalDecimal * baseSalary;
    setTotalDaySalary(salary);
  }, [formData.standard_hours, formData.base_salary, selectedOT]);

  // Recalculate whenever shift hours, OT, or base salary change
  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  const handleSubmit = (e) => {
  e.preventDefault();

  const payload = {
    employee: selectedEmployeeId,
    date_given: formatDate(date),
    amount: parseFloat(formData.amount) || 0,
  };

  dispatch(createAdvanceSalary(payload))
    .unwrap()
    .then(() => {
      // Success: show success alert and navigate
      setAppAlert({
        show: true,
        type: "success",
        message: "Advance salary added successfully!",
      });
      setTimeout(() => {
        navigate(route.advancesalarylist);
      }, 1500);
    })
    .catch((error) => {
      // Check if backend returned the duplicate date error
      if (
        error?.detail?.length > 0 &&
        error.detail[0].includes("An advance for this employee on this date already exists")
      ) {
        setAppAlert({
          show: true,
          type: "danger",
          message: error.detail[0],
        });
      } else {
        // Generic error
        setAppAlert({
          show: true,
          type: "danger",
          message: "Something went wrong. Please try again.",
        });
      }
    });
};

  useEffect(() => {
    dispatch(getEmployees({ page: 1, rows: 100 }));
  }, [dispatch]);

  useEffect(() => {
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
                <h4>Add Advance Salary</h4>
                <h6>Create new Advance Salary Entry</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
            </ul>
            <div className="page-btn">
              <Link to={route.advancesalarylist} className="btn btn-secondary">
                <i className="feather icon-arrow-left me-2" />
                Back to List
              </Link>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="accordions-items-seperate" id="accordionExample">
              <div className="accordion-item border mb-4">
                <h2 className="accordion-header" id="headingOne">
                  <div
                    className="accordion-button bg-white"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-controls="collapseOne">
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
                  data-bs-parent="#accordionExample">
                  <div className="accordion-body border-top">
                    <div className="new-employee-field">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Employee ID
                              <span className="text-danger ms-1">*</span>
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
                            <label className="form-label">
                              Employee Name
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              name="employee_name"
                              className="form-control"
                              value={formData.employee_name}
                              readOnly
                            />
                          </div>
                        </div>
                       
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Designation
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              name="designation_name"
                              className="form-control"
                              value={formData.designation_name}
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Salary Type
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              name="salary_type"
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
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              name="base_salary"
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
              <div className="accordion-item border mb-4">
                <div className="accordion-header" id="headingThree">
                  <div
                    className="accordion-button bg-white"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-controls="collapseThree">
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
                  data-bs-parent="#accordionExample">
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
                            <label className="form-label">
                              Advance Amount
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                            type="text"
                            name="amount"
                            className="form-control"
                            value={formData.amount}
                            onChange={handleChange}
                            />
                          </div>
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
  onClick={() => navigate(route.advancesalarylist)}
>
  Cancel
</button>
              <button type="submit" className="btn btn-primary">
                Add Advance
              </button>
            </div>
          </form>
        </div>
        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0">2014 - 2025 © DreamsPOS. All Right Reserved</p>
          <p>
            Designed &amp; Developed by{" "}
            <Link to="#;" className="text-primary">
              Dreams
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddAdvancesalary;