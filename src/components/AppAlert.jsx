import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AppAlert = ({
  type = "success",          // success | warning | danger
  autoClose = true,
  visible = true,
    message = "",
  onClose
}) => {

  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (autoClose && show) {
      const t = setTimeout(() => {
        setShow(false);
        onClose && onClose();
      }, typeof autoClose === "number" ? autoClose : 3000);

      return () => clearTimeout(t);
    }
  }, [autoClose, show, onClose]);

  const handleClose = () => {
    setShow(false);
    onClose && onClose();
  };

  if (!show) return null;

const variants = {
  success: {
    cls: "alert alert-solid-success border border-success mb-0 p-3",
    icon: "feather-check-circle",
    title: "Success Alert",
    msg: "Success alert to show to success message",
    buttons: (
      <Link to="#" className="text-fixed-white fw-semibold me-2">
        close
      </Link>
    )
  },
  warning: {
    cls: "alert alert-solid-warning border border-warning mb-0 p-3",
    icon: "feather-alert-triangle",
    title: "Warning Alert",
    msg: "Warning alert to show to warning message",
    buttons: (
      <>
        <Link to="#" className="text-fixed-white fw-semibold me-2 op-7">
          skip
        </Link>
        <Link to="#" className="text-fixed-white fw-semibold">
          open
        </Link>
      </>
    )
  },
  danger: {
    cls: "alert alert-solid-danger border border-danger mb-0 p-3",
    icon: "feather-alert-octagon",
    title: "Danger Alert",
    msg: "Danger alert to show to danger message",
    buttons: (
      <>
        <Link to="#" className="text-fixed-white fw-semibold me-2 op-7">
          close
        </Link>
        <Link to="#" className="text-fixed-white fw-semibold">
          continue
        </Link>
      </>
    )
  }
};

const data = variants[type] ?? variants.success;


  return (
    <div
      style={{
        position: "fixed",
        top: "100px",
        right: "20px",
        zIndex: 9999,
        width: "340px"
      }}
    >
      <div className="card border-0">
        <div className={data.cls}>
          <div className="d-flex align-items-start">
            <div className="me-2">
              <i className={`${data.icon} flex-shrink-0`} />
            </div>

            <div className="text-fixed-white w-100">
              <div className="fw-semibold d-flex justify-content-between">
                {data.title}

                <button
                  type="button"
                  className="btn-close p-0"
                  aria-label="Close"
                  onClick={handleClose}
                >
                  <i className="fas fa-xmark" />
                </button>
              </div>

              <div className="fs-12 op-8 mb-1"> {message || data.msg}</div>

              <div className="fs-12">{data.buttons}</div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default AppAlert;
