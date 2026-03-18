import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateMonthlySalaryEntry, getMonthlySalaryById } from "../../../Redux/Salary/monthlysalarySlice";
import AppAlert from "../../AppAlert";
import RefreshIcon from "../../tooltip-content/refresh";
import { all_routes } from "../../../routes/all_routes";
const EditMonthlySalary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const route = all_routes;
  const { id } = useParams();
  const { singleMonthlySalary, loading, error } = useSelector((state) => state.monthlySalary);

  const [isPaid, setIsPaid] = useState(false);
  const [netSalary, setNetSalary] = useState("");
  const [designationBaseSalary, setDesignationBaseSalary] = useState("");
  const [readOnlyGrossSalary, setReadOnlyGrossSalary] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [totalShiftsWorked, setTotalShiftsWorked] = useState("");
  const [totalHoursWorked, setTotalHoursWorked] = useState("");
  const [advanceDeducted, setAdvanceDeducted] = useState("");
  const [netPayable, setNetPayable] = useState("");
  const [esiAmount, setEsiAmount] = useState("");
  const [pfAmount, setPfAmount] = useState("");
  const [appAlert, setAppAlert] = useState({
    show: false,
    type: "",
    message: ""
  });

  useEffect(() => {
    if (id) {
      dispatch(getMonthlySalaryById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (singleMonthlySalary) {
      setIsPaid(singleMonthlySalary.is_paid || false);
      setNetSalary(singleMonthlySalary.net_payable || "");
      setDesignationBaseSalary(singleMonthlySalary.designation_base_salary || "");
      setReadOnlyGrossSalary(singleMonthlySalary.gross_salary || "");
      setEmployeeName(singleMonthlySalary.employee_name || "");
      setEmployeeId(singleMonthlySalary.employee_id_display || "");
      setDate(singleMonthlySalary.date || "");
      setTotalDays(singleMonthlySalary.total_days || "");
      setTotalShiftsWorked(singleMonthlySalary.total_shifts_worked || "");
      setTotalHoursWorked(singleMonthlySalary.total_hours_worked || "");
      setAdvanceDeducted(singleMonthlySalary.advance_deducted || "");
      setNetPayable(singleMonthlySalary.net_payable || "");
      setEsiAmount(singleMonthlySalary.esi_amount || "");
      setPfAmount(singleMonthlySalary.pf_amount || "");
    }
  }, [singleMonthlySalary]);

const handleSubmit = (e) => {
  e.preventDefault();

  // ✅ Convert values
  const gross = parseFloat(readOnlyGrossSalary) || 0;
  const advance = parseFloat(advanceDeducted) || 0;
  const enteredNet = parseFloat(netSalary) || 0;

  const expectedNet = gross - advance;

  // ❌ Validation
  if (enteredNet > expectedNet) {
    setAppAlert({
      show: true,
      type: "danger",
      message: `Net Salary cannot exceed ${expectedNet}`
    });
    return;
  }

  // ✅ Proceed if valid
  const data = {
    is_paid: isPaid,
    net_payable: enteredNet,
  };

  dispatch(updateMonthlySalaryEntry({ id, data }))
    .unwrap()
    .then(() => {
      setAppAlert({
        show: true,
        type: "success",
        message: "Monthly Salary Updated Successfully!"
      });

      setTimeout(() => {
        navigate(route.monthlysalarylist);
      }, 1500);
    })
    .catch(() => {
      setAppAlert({
        show: true,
        type: "danger",
        message: "Failed to update monthly salary"
      });
    });
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
    
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Edit Monthly Salary</h4>
                <h6>Update monthly salary details</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <RefreshIcon/>
              </ul>
              <div className="page-btn">
              
                 <Link to={route.monthlysalarylist} className="btn btn-secondary">
                                <i className="feather icon-arrow-left me-2" />
                                Back to List
                              </Link>
                              </div>
            
          </div>
          
                  <form onSubmit={handleSubmit}>
                    <div className="accordions-items-seperate" id="accordionExample">
                      {/* Employee Information Accordion */}
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
                              <div className="row">
                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label">Employee ID</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={employeeId}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label">Employee Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={employeeName}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label">Date</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={date}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Salary Summary Accordion */}
                      <div className="accordion-item border mb-4">
                        <h2 className="accordion-header" id="headingTwo">
                          <div
                            className="accordion-button bg-white"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-controls="collapseTwo"
                          >
                            <div className="d-flex align-items-center justify-content-between flex-fill">
                              <h5 className="d-inline-flex align-items-center">
                                <i className="ti ti-calculator text-primary me-2" />
                                <span>Salary Summary</span>
                              </h5>
                            </div>
                          </div>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body border-top">
                            <div className="new-employee-field">
                              <div className="row">
                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label">Total Days</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={totalDays}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label">Total Shifts Worked</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={totalShiftsWorked}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label">Total Hours Worked</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={totalHoursWorked}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label">Advance Deducted</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={advanceDeducted}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label">Gross Salary</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={readOnlyGrossSalary}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label">ESI Amount</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={esiAmount}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label">PF Amount</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={pfAmount}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Update Salary Details Accordion */}
                      <div className="accordion-item border mb-4">
                        <h2 className="accordion-header" id="headingThree">
                          <div
                            className="accordion-button bg-white"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-controls="collapseThree"
                          >
                            <div className="d-flex align-items-center justify-content-between flex-fill">
                              <h5 className="d-inline-flex align-items-center">
                                <i className="ti ti-edit text-primary me-2" />
                                <span>Update Salary Details</span>
                              </h5>
                            </div>
                          </div>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body border-top">
                            <div className="new-employee-field">
                              <div className="row">
                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label">Base Salary</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={designationBaseSalary}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label">Net Salary</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={netSalary}
                                      onChange={(e) => setNetSalary(e.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-3">
                                    <label className="form-label">Is Paid</label>
                                    <div className="form-check form-switch">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={isPaid}
                                        onChange={(e) => setIsPaid(e.target.checked)}
                                      />
                                      <label className="form-check-label">
                                        {isPaid ? "Paid" : "Not Paid"}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-end mb-3">
             <div className="text-end mb-3">
              <button
  type="button"
  className="btn btn-secondary me-2"
  onClick={() => navigate(route.monthlysalarylist)}
>
  Cancel
</button>
              <button type="submit" className="btn btn-primary">
                Update Monthly Salary
              </button>
            </div>
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

export default EditMonthlySalary;