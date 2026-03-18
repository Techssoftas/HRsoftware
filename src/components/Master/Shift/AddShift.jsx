import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createShift, updateShift } from "../../../Redux/Master/shiftSlice";
import AppAlert from "../../AppAlert.jsx";

const Add = ({ editData, setEditData }) => {

  const dispatch = useDispatch();

  const [shiftValue, setShiftValue] = useState("");
  const [standardHours, setStandardHours] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [appAlert, setAppAlert] = useState({
    type: "",
    message: "",
    show: false
  });

  // LOAD EDIT DATA
  useEffect(() => {
    if (editData) {
      setShiftValue(editData.shift_value || "");
      setStandardHours(editData.standard_hours || "");
      setIsActive(editData.is_active);
    } else {
      setShiftValue("");
      setStandardHours("");
      setIsActive(true);
    }
  }, [editData]);

  const handleSubmit = async () => {


    if (!shiftValue) {
      setAppAlert({
        type: "danger",
        message: "Enter Shift Value",
        show: true
      });
      return;
    }

    const hoursValue = parseInt(standardHours);

if (!standardHours || isNaN(hoursValue)) {
  setAppAlert({
    type: "danger",
    message: "Standard hours must be a valid number",
    show: true
  });
  return;
}

// ❌ Zero or negative not allowed
if (hoursValue <= 0) {
  setAppAlert({
    type: "danger",
    message: "Standard hours must be greater than 0",
    show: true
  });
  return;
}

    const payload = {
      shift_value: shiftValue,
      standard_hours: standardHours,
      is_active: isActive
    };

    try {

      if (editData) {

        await dispatch(
          updateShift({
            id: editData.id,
            data: payload
          })
        ).unwrap();

        setAppAlert({
          type: "success",
          message: "Shift updated successfully",
          show: true
        });

      }
      
      
      else {

        await dispatch(createShift(payload)).unwrap();

        setAppAlert({
          type: "success",
          message: "Shift created successfully",
          show: true
        });

      }

      // RESET FORM
  setShiftValue("");
  setStandardHours("");
  setIsActive(true);


      document.getElementById("closeShiftModal")?.click();
      setEditData(null);

    } 
   catch (err) {

  let errorMessage = "Error saving shift";

  // ✅ Shift duplicate error
  if (err?.shift_value?.length) {
    errorMessage = err.shift_value[0];
  } 
  else if (err?.response?.data?.shift_value?.length) {
    errorMessage = err.response.data.shift_value[0];
  }

  // ✅ Standard hours error
  else if (err?.standard_hours?.length) {
    errorMessage = err.standard_hours[0];
  } 
  else if (err?.response?.data?.standard_hours?.length) {
    errorMessage = err.response.data.standard_hours[0];
  }

  setAppAlert({
    type: "danger",
    message: errorMessage,
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

      <div className="modal fade" id="shift-modal">

        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">

            <div className="modal-header border-0">
              <h4>{editData ? "Edit Shift" : "Create Shift"}</h4>

              <button
                id="closeShiftModal"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">

              <label className="form-label">Shift Value</label>
              <input
                type="text"
                className="form-control mb-3"
                value={shiftValue}
                onChange={(e) => setShiftValue(e.target.value)}
                placeholder="Example: 0.5 / 1.0 / 1.5"
              />

              <label className="form-label">Standard Hours</label>
              <input
                type="number"
                className="form-control mb-3"
                value={standardHours}
                onChange={(e) => setStandardHours(e.target.value)}
                placeholder="Example: 8"
              />

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

export default Add;