import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createEmployee, updateEmployee } from "../../Redux/Employe/employeeSlice";
import AppAlert from "../AppAlert"
import { all_routes } from "../../routes/all_routes";
import RefreshIcon from "../../components/tooltip-content/refresh";

import CommonDatePicker from "../../components/date-picker/common-date-picker";
import CommonSelect from "../../components/select/common-select";
import { Editor } from "primereact/editor";
import { useRef } from "react";

const AddEmployee = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
  const route = all_routes;
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [employeename, setEmployeeName] = useState(null)
  const [selectedGender, setSelectedGender] = useState(null);
  
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(
    null
  );
  const [selectedDesignation, setSelectedDesignation] = useState(
    null
  );
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(
    null
  );
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  

 

  const gender = [
 { value: "MALE", label: "Male" },
 { value: "FEMALE", label: "Female" },
 { value: "OTHER", label: "Other" }
];

  const departments = [
  { value: "Choose", label: "Choose" },
  { value: "UI/UX", label: "UI/UX" },
  { value: "Support", label: "Support" },
  { value: "HR", label: "HR" },
  { value: "Engineering", label: "Engineering" }];

  const designation = [
  { value: "Choose", label: "Choose" },
  { value: "Designer", label: "Designer" },
  { value: "Developer", label: "Developer" },
  { value: "Tester", label: "Tester" }];

  const bloodgroup = [
  { value: "Select", label: "Select" },
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "AB+", label: "AB+" },
  { value: "AB+", label: "AB-" }];

  const country = [
  { value: "Choose", label: "Choose" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "USA", label: "USA" }];

  const state = [
  { value: "Choose", label: "Choose" },
  { value: "California", label: "California" },
  { value: "Paris", label: "Paris" }];

  const city = [
  { value: "Choose", label: "Choose" },
  { value: "Los Angeles", label: "Los Angeles" },
  { value: "New Jersey", label: "New Jersey" }];


  const [formData, setFormData] = useState({
  employee_name: "",
  employee_id: "",
  contact_number: "",
  gender: "",
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
  ifsc: "",
  photo: null,
  aadhaar_pdf: null,
  pan_pdf: null,
  passbook_pdf: null
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

const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData();

  const payload = {
    employee_name: formData.employee_name,
    employee_id: formData.employee_id,
    contact_number: formData.contact_number,
    gender: formData.gender,

    date_of_birth: formatDate(date1),
    date_of_joining: formatDate(date2),

    designation: selectedDesignation,
    blood_group: selectedBloodGroup,

    education_qualification: formData.education,
    experience: formData.experience,

    address: formData.address,
    state: selectedState,
    district: selectedCity,

    emergency_contact_number: formData.emergency_contact,
    emergency_relation: formData.relation,

    bank_name: formData.bank_name,
    account_number: formData.account_number,
    ifsc_code: formData.ifsc
  };

  Object.keys(payload).forEach((key) => {
    if (payload[key]) {
      data.append(key, payload[key]);
    }
  });

  if (formData.photo) data.append("photo", formData.photo);
  if (formData.aadhaar_pdf) data.append("aadhaar_pdf", formData.aadhaar_pdf);
  if (formData.pan_pdf) data.append("pan_pdf", formData.pan_pdf);
  if (formData.passbook_pdf) data.append("passbook_pdf", formData.passbook_pdf);

  dispatch(createEmployee(data))
    .unwrap()
    .then(() => navigate("/employee/list"));
};


  return (
    <div>
      <div className="page-wrapper" id="employee-modal">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Add Employee</h4>
                <h6>Create new Employee</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
              {/* <CollapesIcon /> */}
            </ul>
            <div className="page-btn">
              <Link to={route.employeelist} className="btn btn-secondary">
                <i className="feather icon-arrow-left me-2" />
                Back to List
              </Link>
            </div>
          </div>
          {/* /product list */}
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
                        <label className="form-label">
                              Employee Image
                              <span className="text-danger ms-1">*</span>
                            </label>
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
</div>
                      <div className="row">
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
                             onChange={handleChange} />
                          </div>
                        </div>


                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Emp ID
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                            type="text"
                            name="employee_id"
                            className="form-control"
                            onChange={handleChange}
                            />
                          </div>
                        </div>
                        
                        
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Contact Number
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                            type="text"
                            name="contact_number"
                            className="form-control"
                            onChange={handleChange}
                            />
                          </div>
                        </div>
                        
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
                                className="w-100" />
                              
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Gender<span className="text-danger ms-1">*</span>
                            </label>
                            <CommonSelect
                              className="w-100"
                              options={gender}
                              value={selectedGender}
                              onChange={(e) => {
                              setSelectedGender(e.value);
                              setFormData((prev) => ({
                              ...prev,
                              gender: e.value
                              }));
                              }}
                              placeholder="Choose"
                              filter={false} />
                            
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Education
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                            type="text"
                            name="education"
                            className="form-control"
                            onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Experiance
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                            type="text"
                            name="experiance"
                            className="form-control"
                            onChange={handleChange}
                            />
                          </div>
                        </div>
                       
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
                                className="w-100" />
                              
                            </div>
                          </div>
                        </div>
                        
                        
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Designation
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <CommonSelect
                              className="w-100"
                              options={designation}
                              value={selectedDesignation}
                              onChange={(e) => setSelectedDesignation(e.value)}
                              placeholder="Choose"
                              filter={false} />
                            
                          </div>
                        </div>
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
                              placeholder="Choose"
                              filter={false} />
                            
                          </div>
                        </div>
                      </div>
                      {/* Editor */}
                      <div className="col-lg-12">
                        <div className="input-blocks summer-description-box transfer mb-3">
                          <label>About</label>
                          <div id="summernote">
                            <Editor
                              value={text}
                              onTextChange={(e) => setText(e.htmlValue)}
                              style={{ height: "200px" }} />
                            
                          </div>
                          <p className="mt-1">Maximum 60 Characters</p>
                        </div>
                      </div>
                      {/* /Editor */}
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
                        <span>Address Information</span>
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
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Country</label>
                            <CommonSelect
                              className="w-100"
                              options={country}
                              value={selectedCountry}
                              onChange={(e) => setSelectedCountry(e.value)}
                              placeholder="Choose"
                              filter={false} />
                            
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">State</label>
                            <CommonSelect
                              className="w-100"
                              options={state}
                              value={selectedState}
                              onChange={(e) => setSelectedState(e.value)}
                              placeholder="Choose"
                              filter={false} />
                            
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">City</label>
                            <CommonSelect
                              className="w-100"
                              options={city}
                              value={selectedCity}
                              onChange={(e) => setSelectedCity(e.value)}
                              placeholder="Choose"
                              filter={false} />
                            
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item border mb-4">
                <div className="accordion-header" id="heading4">
                  <div
                    className="accordion-button bg-white"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-controls="collapseFour">
                    
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
                  data-bs-parent="#accordionExample">
                  
                  <div className="accordion-body border-top">
                    <div className="other-info">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Emergency Contact Number 1
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Relation</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item border mb-4">
                <div className="accordion-header" id="heading5">
                  <div
                    className="accordion-button bg-white"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-controls="collapseFive">
                    
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
                  data-bs-parent="#accordionExample">
                  
                  <div className="accordion-body border-top">
                    <div className="other-info">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Bank Name</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Account Number</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">IFSC</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                        <label className="form-label">Aadhaar Card</label>
                        <input
                        type="file"
                        name="aadhaar_pdf"
                        className="form-control"
                        accept=".pdf,image/*"
                        onChange={handleFileChange}
                        />
                        </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                        <label className="form-label">PAN Card</label>
                        <input
                        type="file"
                        name="pan_pdf"
                        className="form-control"
                        accept=".pdf,image/*"
                        onChange={handleFileChange}
                        />
                        </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                        <label className="form-label">Bank Passbook</label>
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
            {/* /product list */}
            <div className="text-end mb-3">
              <button type="button" className="btn btn-secondary me-2">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Employee
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
    </div>);

};

export default AddEmployee;