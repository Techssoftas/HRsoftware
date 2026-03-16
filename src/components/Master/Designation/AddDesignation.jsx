import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createDesignation, updateDesignation } from "../../../Redux/Master/designationSlice";
import AppAlert from "../../AppAlert";

const DesignationAdd = ({ editData, setEditData }) => {

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [salaryType, setSalaryType] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [appAlert, setAppAlert] = useState({
    type: "",
    message: "",
    show: false
  });

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
        message: "Error saving designation",
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
                onChange={(e) => setName(e.target.value)}
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
              <input
                type="number"
                className="form-control mb-3"
                value={baseSalary}
                onChange={(e) => setBaseSalary(e.target.value)}
                placeholder="Enter salary"
              />

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