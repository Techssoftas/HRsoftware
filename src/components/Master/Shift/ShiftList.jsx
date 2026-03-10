import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getShifts } from "../../../Redux/Master/shiftSlice";

import PrimeDataTable from "../../data-table";
import TableTopHead from "../../table-top-head";
import SearchFromApi from "../../data-table/search";
import DeleteModal from "../../delete-modal";
import Add from "./AddShift";   // Add/Edit Modal

const List = () => {
  const dispatch = useDispatch();

  // SELECTOR – assuming your slice might have loading (optional)
  const { shifts, loading = false } = useSelector((state) => state.shifts);

  const [editData, setEditData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // PAGINATION
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // LOAD COLORS ON MOUNT
  useEffect(() => {
  dispatch(getShifts({ page: currentPage, rows }));
}, [dispatch, currentPage, rows]);

  // COLUMNS
  const columns = [
    {
  header: "S.No",
  body: (_row, { rowIndex }) => (currentPage - 1) * rows + rowIndex + 1,
},
    {
      header: "shift",
      field: "shift_value",
    },
    {
      header: "shift hours",
      field: "standard_hours",
    },
    
    {
      header: "Actions",
      body: (row) => (
        <div className="d-flex">
          {/* EDIT */}
          <button
            className="me-2 p-2 border rounded"
            data-bs-toggle="modal"
            data-bs-target="#shift-modal"
            onClick={() => setEditData(row)}
          >
            <i className="feather icon-edit"></i>
          </button>

          {/* DELETE */}
          <button
            className="p-2 border rounded"
            data-bs-toggle="modal"
            data-bs-target="#delete-modal"
            onClick={() => setSelectedId(row.id)}
          >
            <i className="feather icon-trash-2"></i>
          </button>
        </div>
      ),
    },
  ];

  // Safe data access
  const data = shifts?.results || [];
  const totalRecords = shifts?.count || 0;

  return (
    <>
      <div className="page-wrapper">
        <div className="content">

          {/* PAGE HEADER */}
          <div className="page-header">
            <div className="page-title">
              <h4>Shifts</h4>
              <h6>Manage Shift Master</h6>
            </div>

            <TableTopHead />

            <div className="page-btn">
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#shift-modal"
                onClick={() => setEditData(null)}
              >
                <i className="ti ti-circle-plus me-1"></i>
                Create Shift
              </button>
            </div>
          </div>

          {/* TABLE CARD */}
          <div className="card table-list-card">
            <div className="card-header">
              <SearchFromApi />
            </div>

            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading shifts...</p>
                </div>
              ) : data.length === 0 ? (
                <div className="text-center py-5">
                  <i
                    className="feather icon-package text-muted"
                    style={{ fontSize: "48px" }}
                  />
                  <h5 className="mt-3">No shift Found</h5>
                  <p className="text-muted">
                    Create your first shift to get started
                  </p>
                  <button
                    className="btn btn-primary mt-2"
                    data-bs-toggle="modal"
                    data-bs-target="#shift-modal"
                    onClick={() => setEditData(null)}
                  >
                    <i className="ti ti-circle-plus me-1"></i>
                    Create First Shift
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <PrimeDataTable
                    column={columns}
                    data={data}
                    rows={rows}
                    setRows={setRows}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalRecords={totalRecords}
                  />
                </div>
              )}
            </div>
          </div>

          {/* ADD/EDIT MODAL */}
          <Add editData={editData} setEditData={setEditData} />
        </div>
      </div>

      {/* DELETE MODAL */}
      <DeleteModal selectedId={selectedId} type="shifts" />
    </>
  );
};

export default List;