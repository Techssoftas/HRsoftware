import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createCertificate, updateCertificate } from "../../Redux/Maintanance/certificateSlice";
import AppAlert from "../AppAlert";
import CommonDatePicker from "../date-picker/common-date-picker";
import CommonSelect from "../../components/select/common-select";

const AddCertificate = ({ editData, setEditData }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [date, setDate] = useState(null);
  const [file, setFile] = useState(null);
  const [appAlert, setAppAlert] = useState({
    type: "",
    message: "",
    show: false
  });

  // Load edit data when available
  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setDate(editData.date ? new Date(editData.date) : null);
      // File is not pre-filled for security reasons; user must re-upload if needed
      setFile(null);
    } else {
      setName("");
      setDate(null);
      setFile(null);
    }
  }, [editData]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const formatDate = (date) => {
    if (!date) return null;
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }
    return date;
  };

  const handleSubmit = async () => {
    if (!name) {
      setAppAlert({
        type: "danger",
        message: "Please enter certificate name",
        show: true
      });
      return;
    }
    if (!date) {
      setAppAlert({
        type: "danger",
        message: "Please select a date",
        show: true
      });
      return;
    }

    // Create FormData payload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("date", formatDate(date));
    formData.append("is_active", true);
    if (file) {
      formData.append("file", file); // field name expected by backend
    }

    try {
      if (editData) {
        // Update existing certificate
        await dispatch(
          updateCertificate({
            id: editData.id,
            data: formData
          })
        ).unwrap();

        setAppAlert({
          type: "success",
          message: "Certificate updated successfully",
          show: true
        });
      } else {
        // Create new certificate
        await dispatch(createCertificate(formData)).unwrap();

        setAppAlert({
          type: "success",
          message: "Certificate created successfully",
          show: true
        });
      }

      // Reset form and close modal
      setName("");
      setDate("");
      setFile(null);
      document.getElementById("closeCertificateModal")?.click();
      setEditData(null);
    } catch (err) {
      setAppAlert({
        type: "danger",
        message: err?.detail || err?.message || err?.error || JSON.stringify(err) || "Error saving certificate",
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

      <div className="modal fade" id="certificate-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4>{editData ? "Edit Certificate" : "Add Certificate"}</h4>
              <button
                id="closeCertificateModal"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              {/* Name */}
              <label className="form-label">Certificate Name</label>
              <input
                type="text"
                className="form-control mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter certificate name"
              />

              {/* Date */}
              <label className="form-label">Issue Date</label>
              <div className="input-groupicon calender-input">
                <i className="feather icon-calendar info-img" />
                <CommonDatePicker
                  value={date}
                  onChange={setDate}
                  className="w-100"
                />
              </div>

              {/* File Upload */}
              <label className="form-label">Certificate File (Image)</label>
              <input
                type="file"
                className="form-control mb-3"
                accept=". image/*"
                onChange={handleFileChange}
              />
              {editData && editData.file && (
                <div className="mb-2">
                  <small>Current file: <a href={editData.file} target="_blank" rel="noreferrer">View</a></small>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-cancel me-2"
                data-bs-dismiss="modal"
              >
                Cancel
                
              </button>
              <button
                type="button"
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

export default AddCertificate;