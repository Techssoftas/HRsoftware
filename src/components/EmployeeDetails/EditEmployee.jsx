import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee, getEmployeeById } from "../../Redux/Employe/employeeSlice";
import { getDesignations } from "../../Redux/Master/designationSlice";
import AppAlert from "../AppAlert";
import { all_routes } from "../../routes/all_routes";
import RefreshIcon from "../../components/tooltip-content/refresh";
import { useParams } from "react-router-dom";
import CommonDatePicker from "../../components/date-picker/common-date-picker";
import CommonSelect from "../../components/select/common-select";
import { Editor } from "primereact/editor";
import { useRef } from "react";

import stateCity from "../../Data/stateCity.json";

const EditEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const route = all_routes;

  // Date states
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  // Select states
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);

  // Editor state
  const [text, setText] = useState("");

  // File / image
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Redux
  const { singleEmployee } = useSelector((state) => state.employees);
  const { designations } = useSelector((state) => state.designations);
  const designationOptions =
    designations?.results?.map((item) => ({
      label: item.name,
      value: item.id
    })) || [];

  // Form data
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_id: "",
    contact_number: "",
    gender: "",
    education: "",
    experience: "",
    about: "",
    address: "",
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    bank_branch: "",
    aadhaar_number: "",
    pan_number: "",
    pf_account_number: "",
    esi_account_number: "",
    esi_amount: "",
    pf_amount: "",
    has_esi_pf: "",
    emergency_contact_number: "",
    emergency_relation: "",
    emergency_relation_name: "",
    photo: null,
    aadhaar_pdf: null,
    pan_pdf: null,
    passbook_pdf: null,
    appointment_order: null
  });

  // Validation errors and alerts
  const [errors, setErrors] = useState({});
  const [appAlert, setAppAlert] = useState({
    type: "",
    message: "",
    show: false
  });

  // Static options
  const gender = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" }
  ];

  const bloodgroup = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" }
  ];

  const states = Object.keys(stateCity).map((state) => ({
    label: state,
    value: state
  }));

  // Phone regex (same as AddEmployee)
  const phoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
  const aadhaarRegex = /^\d{4}\s\d{4}\s\d{4}$/;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

  // ------------------------------------------------------------
  // 1. Load employee data and populate all states
  // ------------------------------------------------------------
  useEffect(() => {
    dispatch(getEmployeeById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleEmployee) {
      // Fill formData
      setFormData({
        employee_name: singleEmployee.employee_name || "",
        employee_id: singleEmployee.employee_id || "",
        contact_number: singleEmployee.contact_number || "",
        gender: singleEmployee.gender || "",
        education: singleEmployee.education_qualification || "",
        experience: singleEmployee.experience || "",
        about: singleEmployee.about || "",
        address: singleEmployee.address || "",
        bank_name: singleEmployee.bank_name || "",
        account_number: singleEmployee.account_number || "",
        ifsc_code: singleEmployee.ifsc_code || "",
        bank_branch: singleEmployee.bank_branch || "",
        aadhaar_number: singleEmployee.aadhaar_number || "",
        pan_number: singleEmployee.pan_number || "",
        pf_account_number: singleEmployee.pf_account_number || "",
        esi_account_number: singleEmployee.esi_account_number || "",
        esi_amount: singleEmployee.esi_amount || "",
        pf_amount: singleEmployee.pf_amount || "",
        has_esi_pf: singleEmployee.has_esi_pf ? "true" : "false",
        emergency_contact_number: singleEmployee.emergency_contact_number || "",
        emergency_relation: singleEmployee.emergency_relation || "",
        emergency_relation_name: singleEmployee.emergency_relation_name || "",
        photo: null, // will be replaced by file if user uploads new
        aadhaar_pdf: null,
        pan_pdf: null,
        passbook_pdf: null,
        appointment_order: null
      });

      // Editor text
      setText(singleEmployee.about || "");

      // Image preview
      if (singleEmployee.photo) {
        setPreviewImage(singleEmployee.photo);
      } else {
        setPreviewImage(null);
      }

      // Dates
      if (singleEmployee.date_of_birth) {
        setDate1(new Date(singleEmployee.date_of_birth + "T00:00:00"));
      }
      if (singleEmployee.date_of_joining) {
        setDate2(new Date(singleEmployee.date_of_joining + "T00:00:00"));
      }

      // Selects
      setSelectedGender(singleEmployee.gender);
      setSelectedDesignation(singleEmployee.designation);
      setSelectedBloodGroup(singleEmployee.blood_group);
      setSelectedState(singleEmployee.state);
      setSelectedCity(singleEmployee.district);

      // City options based on state
      if (singleEmployee.state) {
        const cities = stateCity[singleEmployee.state] || [];
        const cityList = cities.map((city) => ({
          label: city,
          value: city
        }));
        setCityOptions(cityList);
      }
    }
  }, [singleEmployee]);

  // ------------------------------------------------------------
  // 2. Load designations
  // ------------------------------------------------------------
  useEffect(() => {
    dispatch(getDesignations({ page: 1, rows: 50 }));
  }, [dispatch]);

  // ------------------------------------------------------------
  // 3. Handlers with validation & formatting (copied from AddEmployee)
  // ------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto uppercase for PAN and IFSC
    const formattedValue =
      name === "pan_number" || name === "ifsc_code"
        ? value.toUpperCase()
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue
    }));

    let errorMsg = "";

    if (name === "contact_number") {
      if (!value) {
        errorMsg = "Contact number is required";
      } else if (!phoneRegex.test(value)) {
        errorMsg = "Enter valid mobile number";
      }
    }

    if (name === "emergency_contact_number") {
      if (!value) {
        errorMsg = "Emergency contact number is required";
      } else if (!phoneRegex.test(value)) {
        errorMsg = "Enter valid emergency number";
      }
    }

    if (name === "aadhaar_number") {
      if (value && !aadhaarRegex.test(value)) {
        errorMsg = "Aadhaar must be 12 digits";
      }
    }

    if (name === "pan_number") {
      if (formattedValue && !panRegex.test(formattedValue)) {
        errorMsg = "Enter valid PAN (ABCDE1234F)";
      }
    }

    if (name === "ifsc_code") {
      if (value && !ifscRegex.test(value)) {
        errorMsg = "Enter valid IFSC (SBIN0001234)";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg
    }));
  };

  const handleStateChange = (e) => {
    const state = e.value;
    setSelectedState(state);
    const cities = stateCity[state] || [];
    const cityList = cities.map((city) => ({ label: city, value: city }));
    setCityOptions(cityList);
    setSelectedCity(null); // reset city when state changes
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 200 * 1024; // 200 KB
    if (file.size > maxSize) {
      setAppAlert({
        type: "danger",
        message: "Profile image must be less than 200 KB",
        show: true
      });
      e.target.value = "";
      return;
    }

    setPreviewImage(URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      photo: file
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setAppAlert({
        type: "danger",
        message: "File size must be less than 2 MB",
        show: true
      });
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: file
    }));
  };

  // ------------------------------------------------------------
  // 4. Aadhaar formatting (specific handler for input)
  // ------------------------------------------------------------
  const handleAadhaarChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // keep only digits
    value = value.substring(0, 12);
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();

    setFormData((prev) => ({
      ...prev,
      aadhaar_number: formatted
    }));

    // Validate
    if (formatted && !aadhaarRegex.test(formatted)) {
      setErrors((prev) => ({
        ...prev,
        aadhaar_number: "Aadhaar must be 12 digits"
      }));
    } else {
      setErrors((prev) => ({ ...prev, aadhaar_number: "" }));
    }
  };

  // ------------------------------------------------------------
  // 5. Form validation (same as AddEmployee)
  // ------------------------------------------------------------
  const validateForm = () => {
    let newErrors = {};

    if (!formData.contact_number) {
      newErrors.contact_number = "Contact Number is required";
    } else if (!phoneRegex.test(formData.contact_number)) {
      newErrors.contact_number = "Enter valid 10 digit mobile number";
    }

    if (!date1) {
      newErrors.date_of_birth = "Date of Birth is required";
    }

    if (!date2) {
      newErrors.joining_date = "Joining Date is required";
    }

    if (!formData.emergency_contact_number) {
      newErrors.emergency_contact_number = "Emergency Contact Number is required";
    } else if (!phoneRegex.test(formData.emergency_contact_number)) {
      newErrors.emergency_contact_number = "Enter valid emergency contact number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------------------------------------------------
  // 6. Submit handler
  // ------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    // Required field checks (step‑by‑step alerts)
    if (!formData.employee_name) {
      setAppAlert({
        type: "danger",
        message: "Employee Name is required",
        show: true
      });
      return;
    }

    if (!formData.contact_number) {
      setAppAlert({
        type: "danger",
        message: "Contact Number is required",
        show: true
      });
      return;
    }

    if (!selectedDesignation) {
      setAppAlert({
        type: "danger",
        message: "Designation is required",
        show: true
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    // Build FormData payload
    const data = new FormData();

    const payload = {
      employee_name: formData.employee_name,
      employee_id: formData.employee_id,
      contact_number: formData.contact_number,
      gender: formData.gender,
      about: text.replace(/<[^>]+>/g, ""), // strip HTML
      date_of_birth: date1 ? date1.toISOString().split("T")[0] : null,
      date_of_joining: date2 ? date2.toISOString().split("T")[0] : null,
      designation: selectedDesignation,
      blood_group: selectedBloodGroup,
      education_qualification: formData.education,
      experience: formData.experience,
      address: formData.address,
      country: "India",
      state: selectedState,
      district: selectedCity,
      emergency_contact_number: formData.emergency_contact_number,
      emergency_relation: formData.emergency_relation,
      emergency_relation_name: formData.emergency_relation_name,
      bank_name: formData.bank_name,
      account_number: formData.account_number,
      ifsc_code: formData.ifsc_code,
      bank_branch: formData.bank_branch,
      aadhaar_number: formData.aadhaar_number,
      pan_number: formData.pan_number,
      has_esi_pf: formData.has_esi_pf === "true",
      pf_account_number: formData.pf_account_number,
      esi_account_number: formData.esi_account_number,
      esi_amount: formData.esi_amount,
      pf_amount: formData.pf_amount
    };

    // Append non‑null values
    Object.keys(payload).forEach((key) => {
      if (payload[key] !== null && payload[key] !== undefined) {
        data.append(key, payload[key]);
      }
    });

    // Append files if changed
    if (formData.photo) data.append("photo", formData.photo);
    if (formData.aadhaar_pdf) data.append("aadhaar_pdf", formData.aadhaar_pdf);
    if (formData.pan_pdf) data.append("pan_pdf", formData.pan_pdf);
    if (formData.passbook_pdf) data.append("passbook_pdf", formData.passbook_pdf);
    if (formData.appointment_order) data.append("appointment_order", formData.appointment_order);

    dispatch(updateEmployee({ id, data }))
      .unwrap()
      .then(() => {
        setAppAlert({
          type: "success",
          message: "Employee updated successfully",
          show: true
        });
        setTimeout(() => {
          navigate(route.employeelist);
        }, 1500);
      })
      .catch(() => {
        setAppAlert({
          type: "danger",
          message: "Error updating employee",
          show: true
        });
      });
  };

  // ------------------------------------------------------------
  // 7. Render UI (identical structure to AddEmployee)
  // ------------------------------------------------------------
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
                <h4>Update Employee</h4>
                <h6>Update Employee Details</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
            </ul>
            <div className="page-btn">
              <Link to={route.employeelist} className="btn btn-secondary">
                <i className="feather icon-arrow-left me-2" />
                Back to List
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="accordions-items-seperate" id="accordionExample">
              {/* ----- Employee Information ----- */}
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
                      <label className="form-label">
                        Employee Image
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <small className="text-muted d-block">Max size: 200 KB</small>
                      <div className="profile-pic-upload">
                        <div className="profile-pic" onClick={handleImageClick}>
                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="preview"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "6px"
                              }}
                              onError={() => console.log("Image failed to load")}
                            />
                          ) : (
                            <span>
                              <i className="feather icon-plus-circle plus-down-add" />
                              Profile Photo
                            </span>
                          )}
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <div className="input-blocks mb-0">
                          <div className="image-upload mb-0">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                            <div className="image-uploads">
                              <h4>Change Image</h4>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* Employee Name */}
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Employee Name
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              name="employee_name"
                              value={formData.employee_name}
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        {/* Contact Number */}
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Contact Number
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              name="contact_number"
                              value={formData.contact_number}
                              className="form-control"
                              onChange={handleChange}
                            />
                            {errors.contact_number && (
                              <small className="text-danger">{errors.contact_number}</small>
                            )}
                          </div>
                        </div>

                        {/* Date of Birth */}
                        <div className="col-lg-4 col-md-6">
                          <div className="input-blocks">
                            <label className="form-label">
                              Date of Birth
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <div className="input-groupicon calender-input">
                              <i className="feather icon-calendar info-img" />
                              <CommonDatePicker
                                value={date1}
                                onChange={setDate1}
                                className="w-100"
                              />
                              {errors.date_of_birth && (
                                <small className="text-danger">{errors.date_of_birth}</small>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Gender */}
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Gender
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <CommonSelect
                              className="w-100"
                              options={gender}
                              value={selectedGender}
                              onChange={(e) => {
                                setSelectedGender(e.value);
                                setFormData((prev) => ({ ...prev, gender: e.value }));
                              }}
                              placeholder="Select Gender"
                              filter={false}
                            />
                          </div>
                        </div>

                        {/* Education */}
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Education
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              name="education"
                              value={formData.education}
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        {/* Experience */}
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Experience
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              name="experience"
                              value={formData.experience}
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        {/* Joining Date */}
                        <div className="col-lg-4 col-md-6">
                          <div className="input-blocks">
                            <label>
                              Joining Date
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <div className="input-groupicon calender-input">
                              <i className="feather icon-calendar info-img" />
                              <CommonDatePicker
                                value={date2}
                                onChange={setDate2}
                                className="w-100"
                              />
                              {errors.joining_date && (
                                <small className="text-danger">{errors.joining_date}</small>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Designation */}
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Designation
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <CommonSelect
                              className="w-100"
                              options={designationOptions}
                              value={selectedDesignation}
                              onChange={(e) => setSelectedDesignation(e.value)}
                              placeholder="Select Designation"
                              filter={true}
                            />
                          </div>
                        </div>

                        {/* Blood Group */}
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Blood Group
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <CommonSelect
                              className="w-100"
                              options={bloodgroup}
                              value={selectedBloodGroup}
                              onChange={(e) => setSelectedBloodGroup(e.value)}
                              placeholder="Select Blood Group"
                              filter={false}
                            />
                          </div>
                        </div>

                        {/* Aadhaar Number (text) */}
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Aadhaar Number</label>
                            <input
                              type="text"
                              name="aadhaar_number"
                              className="form-control"
                              placeholder="XXXX XXXX XXXX"
                              maxLength="14"
                              value={formData.aadhaar_number}
                              onChange={handleAadhaarChange}
                            />
                            {errors.aadhaar_number && (
                              <small className="text-danger">{errors.aadhaar_number}</small>
                            )}
                          </div>
                        </div>

                        {/* PAN Number */}
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Pan Number</label>
                            <input
                              type="text"
                              name="pan_number"
                              placeholder="ABCDE1234F"
                              value={formData.pan_number}
                              className="form-control"
                              onChange={handleChange}
                            />
                            {errors.pan_number && (
                              <small className="text-danger">{errors.pan_number}</small>
                            )}
                          </div>
                        </div>

                        {/* Aadhaar Card file */}
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Aadhaar Card</label>
                            <small className="text-muted"> Max file size: 2 MB</small>
                            <input
                              type="file"
                              name="aadhaar_pdf"
                              className="form-control"
                              accept=".pdf,image/*"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>

                        {/* PAN Card file */}
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">PAN Card</label>
                            <small className="text-muted"> Max file size: 2 MB</small>
                            <input
                              type="file"
                              name="pan_pdf"
                              className="form-control"
                              accept=".pdf,image/*"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>

                        {/* Appointment order */}
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Appointment order</label>
                            <small className="text-muted"> Max file size: 2 MB</small>
                            <input
                              type="file"
                              name="appointment_order"
                              className="form-control"
                              accept=".pdf,image/*"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* About Editor */}
                      <div className="col-lg-12">
                        <div className="input-blocks summer-description-box transfer mb-3">
                          <label>About</label>
                          <div id="summernote">
                            <Editor
                              value={text}
                              onTextChange={(e) => setText(e.htmlValue)}
                              style={{ height: "200px" }}
                            />
                          </div>
                          <p className="mt-1">Maximum 60 Characters</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ----- Address Information ----- */}
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
                        <span>Address Information</span>
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
                            <label className="form-label">Address</label>
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Country</label>
                            <input
                              type="text"
                              className="form-control"
                              value="India"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">State</label>
                            <CommonSelect
                              className="w-100"
                              options={states}
                              value={selectedState}
                              onChange={handleStateChange}
                              placeholder="Select State"
                              filter={false}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">City</label>
                            <CommonSelect
                              className="w-100"
                              options={cityOptions}
                              value={selectedCity}
                              onChange={(e) => setSelectedCity(e.value)}
                              placeholder="Select City"
                              filter={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ----- Emergency Information ----- */}
              <div className="accordion-item border mb-4">
                <div className="accordion-header" id="heading4">
                  <div
                    className="accordion-button bg-white"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-controls="collapseFour"
                  >
                    <div className="d-flex align-items-center justify-content-between flex-fill">
                      <h5 className="d-inline-flex align-items-center">
                        <i className="feather icon-info feather-edit text-primary me-2" />
                        <span>Emergency Information</span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading4"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body border-top">
                    <div className="other-info">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Emergency Contact Number</label>
                            <input
                              type="text"
                              name="emergency_contact_number"
                              value={formData.emergency_contact_number}
                              className={`form-control ${errors.emergency_contact_number ? "is-invalid" : ""}`}
                              onChange={handleChange}
                            />
                            {errors.emergency_contact_number && (
                              <small className="text-danger">{errors.emergency_contact_number}</small>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Relation</label>
                            <input
                              type="text"
                              name="emergency_relation"
                              value={formData.emergency_relation}
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              name="emergency_relation_name"
                              value={formData.emergency_relation_name}
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ----- ESI & PF Information ----- */}
              <div className="accordion-item border mb-4">
                <div className="accordion-header" id="headingPF">
                  <div
                    className="accordion-button bg-white"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsePF"
                    aria-controls="collapsePF"
                  >
                    <div className="d-flex align-items-center justify-content-between flex-fill">
                      <h5 className="d-inline-flex align-items-center">
                        <i className="feather icon-info feather-edit text-primary me-2" />
                        <span>ESI & PF Information</span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  id="collapsePF"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingPF"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body border-top">
                    <div className="other-info">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">ESI / PF Available</label>
                            <div className="form-control d-flex align-items-center gap-4">
                              <div className="form-check mb-0">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="has_esi_pf"
                                  value="true"
                                  checked={formData.has_esi_pf === "true"}
                                  onChange={handleChange}
                                />
                                <label className="form-check-label ms-1">Yes</label>
                              </div>
                              <div className="form-check mb-0">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="has_esi_pf"
                                  value="false"
                                  checked={formData.has_esi_pf === "false"}
                                  onChange={handleChange}
                                />
                                <label className="form-check-label ms-1">No</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {formData.has_esi_pf === "true" && (
                          <>
                            <div className="col-lg-4 col-md-6">
                              <label className="form-label">PF Number</label>
                              <input
                                type="text"
                                name="pf_account_number"
                                value={formData.pf_account_number}
                                className="form-control"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <label className="form-label">ESI Number</label>
                              <input
                                type="text"
                                name="esi_account_number"
                                value={formData.esi_account_number}
                                className="form-control"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="mb-3">
                                <label className="form-label">ESI Amount</label>
                                <input
                                  type="number"
                                  name="esi_amount"
                                  value={formData.esi_amount}
                                  className="form-control"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="mb-3">
                                <label className="form-label">PF Amount</label>
                                <input
                                  type="number"
                                  name="pf_amount"
                                  value={formData.pf_amount}
                                  className="form-control"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ----- Bank Information ----- */}
              <div className="accordion-item border mb-4">
                <div className="accordion-header" id="heading5">
                  <div
                    className="accordion-button bg-white"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-controls="collapseFive"
                  >
                    <div className="d-flex align-items-center justify-content-between flex-fill">
                      <h5 className="d-inline-flex align-items-center">
                        <i className="ti ti-building-bank feather-edit text-primary me-2" />
                        <span>Bank Information</span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading5"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body border-top">
                    <div className="other-info">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Bank Name</label>
                            <input
                              type="text"
                              name="bank_name"
                              value={formData.bank_name}
                              onChange={handleChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Account Number</label>
                            <input
                              type="text"
                              name="account_number"
                              value={formData.account_number}
                              onChange={handleChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">IFSC</label>
                            <input
                              type="text"
                              name="ifsc_code"
                              value={formData.ifsc_code}
                              onChange={handleChange}
                              className="form-control"
                            />
                            {errors.ifsc_code && (
                              <small className="text-danger">{errors.ifsc_code}</small>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Branch</label>
                            <input
                              type="text"
                              name="bank_branch"
                              value={formData.bank_branch}
                              onChange={handleChange}
                              className="form-control"
                            />
                          </div>
                        </div>

                        {/* Bank Passbook file */}
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Bank Passbook</label>
                            <small className="text-muted"> Max file size: 2 MB</small>
                            <input
                              type="file"
                              name="passbook_pdf"
                              className="form-control"
                              accept=".pdf,image/*"
                              onChange={handleFileChange}
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
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate(route.employeelist)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Employee
              </button>
            </div>
          </form>
        </div>

        {/* Footer (same as AddEmployee) */}
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

export default EditEmployee;