import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AppAlert from "../AppAlert";

import { deleteShift } from "../../Redux/Master/shiftSlice";
import { deleteDesignation } from "../../Redux/Master/designationSlice";
import { deleteEmployee } from "../../Redux/Employe/employeeSlice";
import { deleteDailySalaryEntry } from "../../Redux/Salary/dailysalarySlice";
import { deleteAdvanceSalary } from "../../Redux/Salary/advancesalarySlice";
import { deleteCertificate } from "../../Redux/Maintanance/certificateSlice";
const DeleteModal = ({ selectedId, type, confirmDelete }) => {
  const dispatch = useDispatch();

  const [appAlert, setAppAlert] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const handleDelete = () => {
    if (confirmDelete) {
      confirmDelete();
      return;
    }

    if (!selectedId) return;

    let deleteAction;

    if (type === "shifts") deleteAction = deleteShift(selectedId);
    else if (type === "designations") deleteAction = deleteDesignation(selectedId)
    else if (type === "employees") deleteAction = deleteEmployee(selectedId)
    else if (type === "dailySalaryEntries") deleteAction = deleteDailySalaryEntry(selectedId)
    else if (type === "advanceSalaries") deleteAction = deleteAdvanceSalary(selectedId)
    else if (type === "certificates") deleteAction = deleteCertificate(selectedId)
    dispatch(deleteAction)
      .unwrap()
      .then(() => {
        setAppAlert({
          show: true,
          type: "success",
          message: "Deleted Successfully",
        });

        // 🔥 AUTO REFRESH LIST
      })

      .catch(() => {
        setAppAlert({
          show: true,
          type: "danger",
          message: "Delete Failed! Please Try Again",
        });
      });
  };

  return (
    <>
      {appAlert.show && (
        <AppAlert
          type={appAlert.type}
          message={appAlert.message}
          autoClose={3000}
          onClose={() => setAppAlert({ ...appAlert, show: false })}
        />
      )}

      <div className="modal fade" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>

                <h4 className="mb-0 delete-account-font">
                  Are you sure you want to delete this?
                </h4>

                <div className="modal-footer-btn mt-3 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary fs-13 fw-medium p-2 px-3"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      document.activeElement.blur();
                      handleDelete();
                    }}
                  >
                    Yes Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
