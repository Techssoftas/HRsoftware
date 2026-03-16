import { Link } from 'react-router-dom';
import RefreshIcon from '../tooltip-content/refresh';
import { getCertificates } from "../../Redux/Maintanance/certificateSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { all_routes } from "../../routes/all_routes.jsx";
import DeleteModal from '../delete-modal';
import AddCertificate from './AddCertificate'; // import the modal component

const Maintanancelist = () => {
  const dispatch = useDispatch();
  const { certificates } = useSelector((state) => state.certificates);

  // For delete
  const [selectedId, setSelectedId] = useState(null);

  // For edit modal
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(getCertificates());
  }, [dispatch]);

  const getDaysToGo = (date) => {
  const renewalDate = new Date(date);
  const today = new Date();

  // remove time to avoid timezone issues
  renewalDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = renewalDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4 className="fw-bold">Certificates</h4>
                <h6>Manage your certificates</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
            </ul>
          </div>

          <div className="wishlist-products p-4 bg-white">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="mb-3">Certificates</h4>
              <div className="d-flex align-items-center mb-3">
                <div className="input-icon-start pos-search position-relative me-2">
                  <span className="input-icon-addon">
                    <i className="ti ti-search" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Certificate"
                  />
                </div>
                {/* Add button opens modal with editData = null */}
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#certificate-modal"
                  onClick={() => setEditData(null)}
                >
                  <i className="ti ti-circle-plus me-1"></i>
                  Add Certificate
                </button>
              </div>
            </div>

            <div className="tabs_container">
              <div className="tab_content active" data-tab="all">
                <div className="row">
                  {[...certificates]
  ?.sort((a, b) => b.id - a.id)
  .map((item) => (
                    <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 mb-4" key={item.id}>
                      <div className="product-info default-cover card position-relative h-100 shadow-sm border-0">
                        {/* Action buttons (Edit & Delete) at top right */}
                        <div
                          style={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            zIndex: 20,
                            display: "flex",
                            gap: "5px"
                          }}
                        >
                          {/* Edit button */}
                          <button
                            className="btn btn-sm btn-light"
                            data-bs-toggle="modal"
                            data-bs-target="#certificate-modal"
                            onClick={() => setEditData(item)}
                            style={{
                              backgroundColor: "#FFF",
                              border: "1px solid #f0f0f0",
                              borderRadius: "6px",
                              color: "#007bff",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              width: "30px",
                              height: "30px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <i className="feather icon-edit" style={{ fontSize: "14px" }}></i>
                          </button>

                          {/* Delete button */}
                          <button
                            onClick={() => setSelectedId(item.id)}
                            data-bs-toggle="modal"
                            data-bs-target="#delete-modal"
                            style={{
                              backgroundColor: "#FFF",
                              border: "1px solid #f0f0f0",
                              borderRadius: "6px",
                              color: "#EA5455",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              width: "30px",
                              height: "30px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <i className="feather icon-trash-2" style={{ fontSize: "14px" }}></i>
                          </button>
                        </div>

                        {/* Image/PDF preview */}
                        <div className="img-bg" style={{ padding: "10px" }}>
                          <div style={{ borderRadius: "8px", overflow: "hidden" }}>
                            {item.file?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                              <img
                                src={item.file}
                                alt="certificate"
                                style={{
                                  height: "200px",
                                  width: "100%",
                                  objectFit: "cover",
                                  display: "block"
                                }}
                              />
                            ) : (
                              <iframe
                                src={item.file}
                                title="pdf"
                                width="100%"
                                height="200"
                                style={{ border: "none", display: "block" }}
                              />
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-3 pt-0">
                          <h6 className="product-name mb-1 fw-bold text-truncate" style={{ fontSize: "15px" }}>
                            {item.name}
                          </h6>
                          <div className="mb-2">
                            <small className="text-muted">Issued : {item.date}</small>
                          </div>
                          <hr />
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            {(() => {
                              const days = getDaysToGo(item.date);
                              let color = "#28C76F";
                              if (days <= 7) color = "#EA5455";
                              else if (days <= 30) color = "#FF9F43";
                              return (
                                <span style={{ color, fontWeight: "600", fontSize: "13px" }}>
                                  {days > 0 ? `${days} days to go` : "Expired"}
                                </span>
                              );
                            })()}
                            <a
                              href={item.file}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-primary btn-sm px-3"
                              style={{ borderRadius: "4px", fontSize: "12px" }}
                            >
                              View
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal selectedId={selectedId} type="certificates" />

      {/* Add/Edit Certificate Modal */}
      <AddCertificate editData={editData} setEditData={setEditData} />
    </div>
  );
};

export default Maintanancelist;