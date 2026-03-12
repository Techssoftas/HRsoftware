import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { createEmployee, updateEmployee, getEmployeeById } from "../../Redux/Employe/employeeSlice";
import { getDesignations } from "../../Redux/Master/designationSlice";
import AppAlert from "../AppAlert"
import { all_routes } from "../../routes/all_routes";
import RefreshIcon from "../../components/tooltip-content/refresh";
import { useParams } from "react-router-dom";
import CommonDatePicker from "../../components/date-picker/common-date-picker";
import CommonSelect from "../../components/select/common-select";
import { Editor } from "primereact/editor";
import { useRef } from "react";

import stateCity from "../../Data/stateCity.json"

const EditEmployee = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const { id } = useParams();
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
  const { singleEmployee } = useSelector((state) => state.employees);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [esiPfAvailable, setEsiPfAvailable] = useState(null);
  const { designations, loading } = useSelector((state) => state.designations);
  const designationOptions =
  designations?.results?.map((item) => ({
    label: item.name,
    value: item.id
  })) || [];

  useEffect(() => {
  dispatch(getEmployeeById(id));
}, [dispatch, id]);

useEffect(() => {
  if (singleEmployee) {
    // Set form fields
    setFormData({
      ...formData,
      employee_name: singleEmployee.employee_name || "",
      employee_id: singleEmployee.employee_id || "",
      contact_number: singleEmployee.contact_number || "",
      gender: singleEmployee.gender || "",
      education: singleEmployee.education_qualification || "",
      about: singleEmployee.about || "",
      experience: singleEmployee.experience || "",
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
    });

    // Set photo preview
    if (singleEmployee.photo) {
      setPreviewImage(singleEmployee.photo);
    } else {
      setPreviewImage(null); // clear if no photo
    }

    // Set dates (convert string to Date)
    if (singleEmployee.date_of_birth) {
  setDate1(new Date(singleEmployee.date_of_birth + "T00:00:00"));
}

if (singleEmployee.date_of_joining) {
  setDate2(new Date(singleEmployee.date_of_joining + "T00:00:00"));
}

    // Set designation, blood group, state, city
    setSelectedDesignation(singleEmployee.designation);
    setSelectedBloodGroup(singleEmployee.blood_group);
    setSelectedState(singleEmployee.state);
    setSelectedCity(singleEmployee.district);

    // Populate city options based on the state
    if (singleEmployee.state) {
      const cities = stateCity[singleEmployee.state] || [];
      const cityList = cities.map((city) => ({
        label: city,
        value: city,
      }));
      setCityOptions(cityList);
    }
  }
}, [singleEmployee]);


  const gender = [
 { value: "MALE", label: "Male" },
 { value: "FEMALE", label: "Female" },
 { value: "OTHER", label: "Other" }
];




  const bloodgroup = [
  { value: "Select", label: "Select" },
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" }];



const states = Object.keys(stateCity).map((state) => ({
  label: state,
  value: state
}));
  



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
  emergency_contact_number: "",
  emergency_relation: "",
  emergency_relation_name:"",
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

const handleStateChange = (e) => {

  const state = e.value;

  setSelectedState(state);

  const cities = stateCity[state] || [];

  const cityList = cities.map((city) => ({
    label: city,
    value: city
  }));

  setCityOptions(cityList);

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

// Handle checkbox changes
  const handleCheckboxChange = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
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
  about: text.replace(/<[^>]+>/g, ""),

  date_of_birth: formatDate(date1),
  date_of_joining: formatDate(date2),

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

  Object.keys(payload).forEach((key) => {
    if (payload[key]) {
      data.append(key, payload[key]);
    }
  });

  if (formData.photo) data.append("photo", formData.photo);
  if (formData.aadhaar_pdf) data.append("aadhaar_pdf", formData.aadhaar_pdf);
  if (formData.pan_pdf) data.append("pan_pdf", formData.pan_pdf);
  if (formData.passbook_pdf) data.append("passbook_pdf", formData.passbook_pdf);
  if (formData.appointment_order) data.append("appointment_order", formData.appointment_order)

  
    dispatch(updateEmployee({ id, data }))
  .unwrap()
  .then(() => {

    setTimeout(() => {
      navigate("/employee/list");
    }, 1500);

  });
  };


useEffect(() => {
  dispatch(getDesignations({ page: 1, rows: 50 }));
}, [dispatch]);




  return (
    <div>
      <div className="page-wrapper" id="employee-modal">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Update Employee</h4>
                <h6>Update Employee Details </h6>
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
        onError={() => console.log("Image failed:", previewImage)}
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
                             onChange={handleChange} />
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
                            value={formData.contact_number}
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
                              value={formData.gender}
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
                            value={formData.education}
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
                            name="experience"
                            value={formData.experience}
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
  options={designationOptions}
  value={selectedDesignation}
  onChange={(e) => setSelectedDesignation(e.value)}
  placeholder="Choose"
  filter={true}
/>
                            
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
                              value={formData.about}
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
                              placeholder="Choose"
                              filter={false} />
                            
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
                              Emergency Contact Number 
                            </label>
                            <input 
                            type="text"
                            className="form-control"
                            value={formData.emergency_contact_number}
                            name="emergency_contact_number"
                            onChange={handleChange}
                             />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Relation</label>
                            <input type="text" name="emergency_relation" value={formData.emergency_relation} className="form-control" onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={formData.emergency_relation_name} name="emergency_relation_name" onChange={handleChange} />
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
                        <span>ESI & PF Information</span>
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
                            <label className="form-label">
                              ESI Amout
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                            type="text"
                            name="esi_amount"
                            value={formData.esi_amount}
                            className="form-control"
                            onChange={handleChange}
                            />
                          </div>
                        </div>


                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              PF Amount
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                            type="text"
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
                            <input type="text" name="bank_name" value={formData.bank_name} onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Account Number</label>
                            <input type="text" name="account_number" value={formData.account_number} onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">IFSC</label>
                            <input type="text" name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Branch</label>
                            <input type="text" name="bank_branch" value={formData.bank_branch} onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Aadhar Number</label>
                            <input type="text" name="aadhaar_number" value={formData.aadhaar_number} onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">pan Number</label>
                            <input type="text" name="pan_number" value={formData.pan_number} onChange={handleChange} className="form-control" />
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
                        <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                        <label className="form-label">Appointment order</label>
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
                Update Employee
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

export default EditEmployee;