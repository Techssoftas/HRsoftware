import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createDesignation, updateDesignation } from "../../../Redux/Master/designationSlice";
import AppAlert from "../../AppAlert";

const DesignationAdd = ({ editData, setEditData }) => {

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [salaryType, setSalaryType] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [displaySalary, setDisplaySalary] = useState("");
  const [isActive, setIsActive] = useState(true);
  
  const [appAlert, setAppAlert] = useState({
    type: "",
    message: "",
    show: false
  });

  const formatCurrency = (value) => {
  if (!value) return "";

  const number = parseFloat(value);
  if (isNaN(number)) return "";

  return number.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const resetForm = () => {
  setName("");
  setSalaryType("");
  setBaseSalary("");
  setDisplaySalary("");
  setIsActive(true);
  setEditData(null);
};

useEffect(() => {
  const modal = document.getElementById("designations-modal");

  const handleOpen = () => {
    if (!editData) {
      resetForm();
    }
  };

  modal?.addEventListener("show.bs.modal", handleOpen);

  return () => {
    modal?.removeEventListener("show.bs.modal", handleOpen);
  };
}, [editData]);


useEffect(() => {
  if (editData) {
    setBaseSalary(editData.base_salary || "");
    setDisplaySalary(formatCurrency(editData.base_salary));
  } else {
    setBaseSalary("");
    setDisplaySalary("");
  }
}, [editData]);

  // LOAD EDIT DATA
  useEffect(() => {

    if (editData) {
      setName(editData.name || "");
      setSalaryType(editData.salary_type || "");
      setBaseSalary(editData.base_salary || "");
      setIsActive(editData.is_active);
    } 
    
    else {
      setName("");
      setSalaryType("");
      setBaseSalary("");
      setIsActive(true);
    }

  }, [editData]);


  const handleSubmit = async () => {

    if (!name) {
      setAppAlert({
        type: "danger",
        message: "Enter designation name",
        show: true
      });
      return;
    }

    if (!salaryType) {
      setAppAlert({
        type: "danger",
        message: "Select salary type",
        show: true
      });
      return;
    }

    const salaryValue = parseFloat(baseSalary);

// ❌ Empty / Invalid (like +, -, *, abc)
if (!baseSalary || isNaN(salaryValue)) {
  setAppAlert({
    type: "danger",
    message: "Base salary must be a valid number",
    show: true
  });
  return;
}

// ❌ Zero or negative
if (salaryValue <= 0) {
  setAppAlert({
    type: "danger",
    message: "Base salary must be greater than 0",
    show: true
  });
  return;
}
if (!/^\d+(\.\d{1,2})?$/.test(baseSalary)) {
  setAppAlert({
    type: "danger",
    message: "Only 2 decimal values allowed",
    show: true
  });
  return;
}

    const payload = {
      name: name,
      salary_type: salaryType,
      base_salary: baseSalary,
      is_active: isActive
    };

    try {

      if (editData) {

        await dispatch(
          updateDesignation({
            id: editData.id,
            data: payload
          })
        ).unwrap();

        setAppAlert({
          type: "success",
          message: "Designation updated successfully",
          show: true
        });

      } 
      
      else {

        await dispatch(createDesignation(payload)).unwrap();

        setAppAlert({
          type: "success",
          message: "Designation created successfully",
          show: true
        });

      }

      // RESET
      setName("");
      setSalaryType("");
      setBaseSalary("");
      setIsActive(true);

      document.getElementById("closeDesignationModal")?.click();
      setEditData(null);

    } 
    
    catch (err) {

      setAppAlert({
        type: "danger",
        message: "Designation name already exist",
        show: true
      });

    }

  };

  return (

    <div>

      {appAlert.show && (
        <AppAlert
          type={appAlert.type}
          message={appAlert.message}
          onClose={() => setAppAlert({ ...appAlert, show: false })}
        />
      )}

      <div className="modal fade" id="designations-modal">

        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">

            <div className="modal-header border-0">
              <h4>{editData ? "Edit Designation" : "Create Designation"}</h4>

              <button
                id="closeDesignationModal"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">

              {/* NAME */}
              <label className="form-label">Designation Name</label>
              <input
                type="text"
                className="form-control mb-3"
                value={name}
                onChange={(e) => {
    const value = e.target.value;
    const capitalizedValue =
      value.charAt(0).toUpperCase() + value.slice(1);
    setName(capitalizedValue);
  }}
                placeholder="Enter designation name"
              />

              {/* SALARY TYPE */}
              <label className="form-label">Salary Type</label>
              <select
                className="form-control mb-3"
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="">Select Salary Type</option>
                <option value="DAILY">Daily</option>
                <option value="MONTHLY">Monthly</option>
              </select>

              {/* BASE SALARY */}
              <label className="form-label">Base Salary (Per Hour)</label>

<div className="input-group mb-3">
  

  <input
  type="text"
  className="form-control mb-3"
  value={displaySalary}
  onChange={(e) => {
    let value = e.target.value.replace(/,/g, "");

    if (/^\d*\.?\d*$/.test(value)) {
      setBaseSalary(value);
      setDisplaySalary(value);
    }
  }}
  onBlur={() => {
    if (baseSalary) {
      setDisplaySalary(formatCurrency(baseSalary));
    }
  }}
  placeholder="Enter per hour salary"
/>
</div>

              {/* ACTIVE */}
              <div className="form-check mb-3">

                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />

                <label className="form-check-label">
                  Active
                </label>

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-cancel me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                {editData ? "Update" : "Submit"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default DesignationAdd;