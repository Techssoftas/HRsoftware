import React, { Children, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { logoutUser } from "../../Redux/authSlice";
import {
  arabicFlag,
  avatar_02,
  avatar_03,
  avatar_13,
  avatar_17,
  avator1,
  englishFlag,
  logoPng,
  logoSmallPng,
  logoWhitePng,
  inFlag,
  TILogo,
} from "../../utils/imagepath";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = Cookies.get("user_id");
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const username = user?.username || "Guest";

  const [toggle, setToggle] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [flagImage] = useState(inFlag);
  const [activeMenu, setActiveMenu] = useState("");

  const [thirdHeader, setThirdHeader] = useState(null);
  const [selectedSecond, setSelectedSecond] = useState(null);

  const changeLanguage = (lng) => {
    console.log("Changing language to:", lng);
    // Add your language change logic here
  };

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/", { state: { loggedOut: true } });
    });
  };

  const handleMenuClick = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu("");
      setThirdHeader(null);
      setSelectedSecond(null);
    } else {
      setActiveMenu(menu);
      setThirdHeader(null);
      setSelectedSecond(null);
    }
  };

  const handleSecondHeaderClick = (item) => {
    if (item.children && item.children.length > 0) {
      setThirdHeader(item.children);
      setSelectedSecond(item.name);
    } else {
      setThirdHeader(null); // ✅ ADD THIS
      setSelectedSecond(null); // ✅ ADD THIS
      handleMenuItemClick(item.path, false);
    }
  };

  // Function to handle menu item click and redirect
  const handleMenuItemClick = (path, hasChildren = false) => {
    if (path && !hasChildren) {
      navigate(path);
    }
  };

  // Function to handle child menu item click - UPDATED
  const handleChildItemClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  // Function to handle grandchild menu item click
  const handleGrandchildItemClick = (path) => {
    if (path) navigate(path);
  };

  useEffect(() => {
    const handleMouseover = (e) => {
      e.stopPropagation();
      const body = document.body;
      const toggleBtn = document.getElementById("toggle_btn");

      if (
        body.classList.contains("mini-sidebar") &&
        toggleBtn &&
        isElementVisible(toggleBtn)
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("mouseover", handleMouseover);
    return () => {
      document.removeEventListener("mouseover", handleMouseover);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!document.fullscreenElement ||
        !!document.mozFullScreenElement ||
        !!document.webkitFullscreenElement ||
        !!document.msFullscreenElement,
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange,
      );
    };
  }, []);

  // Auto-open correct submenu on page refresh
  useEffect(() => {
    const currentPath = location.pathname.replace(/\/$/, "");

    const menuKey = Object.keys(subMenuData).find((menu) =>
      subMenuData[menu].some((item) => {
        const itemPath = item.path?.replace(/\/$/, "");

        // check parent
        if (itemPath && currentPath.startsWith(itemPath)) return true;

        // check child
        if (item.children) {
          return item.children.some((child) => {
            const childPath = child.path?.replace(/\/$/, "");

            if (childPath && currentPath.startsWith(childPath)) return true;

            // check grandchild
            if (child.children) {
              return child.children.some((grandChild) => {
                const grandChildPath = grandChild.path?.replace(/\/$/, "");
                return grandChildPath && currentPath.startsWith(grandChildPath);
              });
            }

            return false;
          });
        }

        return false;
      }),
    );

    if (menuKey) {
      setActiveMenu(menuKey);
    }
  }, [location.pathname]);

  const handleSidebar = () => {
    document.body.classList.toggle("mini-sidebar");
    setToggle((current) => !current);
  };

  const sidebarOverlay = () => {
    document.querySelector(".main-wrapper")?.classList?.toggle("slide-nav");
    document.querySelector(".sidebar-overlay")?.classList?.toggle("opened");
    document.querySelector("html")?.classList?.toggle("menu-opened");
  };

  useEffect(() => {
    document.querySelector(".main-wrapper")?.classList.remove("slide-nav");
    document.querySelector(".sidebar-overlay")?.classList.remove("opened");
    document.querySelector("html")?.classList.remove("menu-opened");
  }, [location.pathname]);

  const pathname = location.pathname;

  const exclusionArray = ["/dream-pos/index-three", "/dream-pos/index-one"];

  if (exclusionArray.indexOf(window.location.pathname) >= 0) {
    return null;
  }

  const toggleFullscreen = (elem) => {
    const doc = document;
    elem = elem || document.documentElement;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
  };

  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };

  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };

  const isElementVisible = (element) => {
    return element.offsetWidth > 0 || element.offsetHeight > 0;
  };

  const headerIconStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
  };

  // Helper function to filter YarnDyeing submenus based on level
  const getFilteredChildren = (children, isFirstLevel = false) => {
    if (!children) return [];

    return children.map((child) => {
      // If we're in the first level (Yarn Store -> YarnDyeing), filter out Add/Edit
      if (isFirstLevel && child.name === "YarnDyeing" && child.children) {
        return {
          ...child,
          children: child.children.filter(
            (grandChild) =>
              !grandChild.name.includes("AddYarnDyeing") &&
              !grandChild.name.includes("EditYarnDyeing"),
          ),
        };
      }

      // For deeper levels, return all children
      if (child.children) {
        return {
          ...child,
          children: getFilteredChildren(child.children, false),
        };
      }

      return child;
    });
  };

  // Submenu data (copied from your HorizontalSidebar)
  const subMenuData = {
    master: [
      {
        name: "Designation",
        path: "/master/designation/list",
        icon: <i className="ti ti-id-badge fs-16 me-2"></i>,
      },
      {
        name: "Shift",
        path: "/master/shift/list",
        icon: <i className="ti ti-users-group fs-16 me-2"></i>,
      },
    ],
    
    salary: [
      {
        name: "Daily Salary",
        path: "/salary/daily/list",
        icon: <i className="ti ti-chart-bar fs-16 me-2"></i>,
      },
      {
        name: "Monthly Salary",
        path: "/salary/monthly/list",
        icon: <i className="ti ti-shopping-bag fs-16 me-2"></i>,
      },
      {
        name: "Advance",
        path: "/salary/advance/list",
        icon: <i className="ti ti-package fs-16 me-2"></i>,
      },
      {
        name: "Paid Salary",
        path: "/salary/paid",
        icon: <i className="ti ti-package fs-16 me-2"></i>,
      },
      
    ],
   
    
    
  };

  // Menu items component for the header with chevron icons
  const MenuItems = () => (
    <>
      <li className="nav-item">
        <Link
          to="/dashboard"
          onClick={() => setActiveMenu("general")}
          className="nav-link"
          style={{
            color: activeMenu === "general" ? "orange" : "white",
            fontWeight: activeMenu === "general" ? "bold" : "normal",
            fontSize: "13px",
            display: "flex",
            backgroundColor: activeMenu === "general" ? "#ffffff1a" : "",
            padding: "5px 0px",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <i className="ti ti-chart-bar fs-16 me-1"></i>
          <span>GENERAL</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="#"
          className="nav-link"
          onClick={() => handleMenuClick("master")}
          style={{
            color: activeMenu === "master" ? "orange" : "white",
            fontWeight: activeMenu === "master" ? "bold" : "normal",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            backgroundColor: activeMenu === "master" ? "#ffffff1a" : "",
            padding: "5px 0px",
            gap: "4px",
          }}
        >
          <i className="ti ti-layout-grid fs-16 me-1"></i>
          <span>MASTER</span>
          <i
            className={`ti ti-chevron-${activeMenu === "master" ? "down" : "up"} fs-12`}
          ></i>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/employee/list"
          className="nav-link"
          onClick={() => handleMenuClick("yarn")}
          style={{
            color: activeMenu === "yarn" ? "orange" : "white",
            fontWeight: activeMenu === "yarn" ? "bold" : "normal",
            fontSize: "13px",
            display: "flex",
            backgroundColor: activeMenu === "yarn" ? "#ffffff1a" : "",
            padding: "5px 0px",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <i className="ti ti-users-group fs-16 me-1"></i>
          <span>EMPLOYE DETAILES</span>
          <i
            className={`ti ti-chevron-${activeMenu === "yarn" ? "down" : "up"} fs-12`}
          ></i>
        </Link>
      </li>

      <li className="nav-item">
  <Link
    to="#"
    className="nav-link"
    onClick={() => handleMenuClick("salary")}
    style={{
      color: activeMenu === "salary" ? "orange" : "white",
      fontWeight: activeMenu === "salary" ? "bold" : "normal",
      fontSize: "13px",
      display: "flex",
      backgroundColor: activeMenu === "salary" ? "#ffffff1a" : "",
      padding: "5px 0px",
      alignItems: "center",
      gap: "4px",
    }}
  >
    <i className="ti ti-layout-grid fs-16 me-1"></i>
    <span>SALARY</span>
    <i
      className={`ti ti-chevron-${activeMenu === "salary" ? "down" : "up"} fs-12`}
    ></i>
  </Link>
</li>


      <li className="nav-item">
        <Link
          to="#"
          className="nav-link"
          onClick={() => handleMenuClick("maintenance")}
          style={{
            color: activeMenu === "maintenance" ? "orange" : "white",
            fontWeight: activeMenu === "maintenance" ? "bold" : "normal",
            fontSize: "13px",
            display: "flex",
            backgroundColor: activeMenu === "maintenance" ? "#ffffff1a" : "",
            padding: "5px 0px",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <i className="ti ti-circle-plus fs-16 me-1"></i>
          <span>MAINTENANCE</span>
          <i
            className={`ti ti-chevron-${activeMenu === "maintenance" ? "down" : "up"} fs-12`}
          ></i>
        </Link>
      </li>

      
    </>
  );

  // Helper function to check if a path is active
  // Helper function to check if a path is active
  const isPathActive = (path) => {
    if (!path) return false;

    // Exact match
    if (location.pathname === path) return true;

    // Check if current path starts with the menu path (for nested routes)
    // For example: /party/add should match /party
    if (path !== "/" && location.pathname.startsWith(path + "/")) return true;

    return false;
  };

  return (
    <div
      className="header"
      style={{
        background: "linear-gradient(180deg, #4B749F 0%, #243748 100%)",
        position: "fixed",        // Add this
        top: 0,                   // Add this
        left: 0,                  // Add this
        right: 0,                 // Add this
        zIndex: 1000,             // Add this
      }}
    >
      {/* Logo */}
      <div className="main-header ">
        <div
          className={`header-left ${toggle ? "" : "active"}`}
          onMouseLeave={expandMenu}
          onMouseOver={expandMenuOpen}
          style={{
            paddingLeft: "25px",
            backgroundColor: "#ffffff1a",
            width: "10%",
            paddingRight: "0px",
          }}
        >
          <Link to="/" className="logo logo-normal ">
            <img src={TILogo} alt="img" style={{ height: "50px" }} />
            {/* <h3 style={{paddingTop:"30px",color:"#FE9F43 ",fontFamily:"sans-serif"}}>TEXAI<h6 style={{fontSize:"10PX",paddingLeft:"20PX",color:"WHITE"}}> VER 1.0</h6></h3> */}
          </Link>
          <Link to="/" className="logo logo-white">
            <img src={logoWhitePng} alt="img" />
          </Link>
          <Link to="/" className="logo-small">
            <img src={logoSmallPng} alt="img" />
          </Link>
          <Link
            id="toggle_btn"
            to="#"
            style={{
              display:
                pathname.includes("tasks") || pathname.includes("pos")
                  ? "none"
                  : pathname.includes("compose")
                    ? "none"
                    : "",
            }}
            onClick={handleSidebar}
          >
            <i className="feather icon-chevrons-left feather-16" />
          </Link>
        </div>
        {/* /Logo */}

        <Link
          id="mobile_btn"
          className="mobile_btn"
          to="#"
          onClick={sidebarOverlay}
        >
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </Link>

        {/* Header Menu - Your menu items inserted here */}
        <ul
          className="nav user-menu"
          style={{
            paddingRight: "90px",
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            overflow: "visible",
          }}
        >
          {/* Your Menu Items */}
          <MenuItems />

          {/* Flag */}
          <li className="nav-item dropdown has-arrow flag-nav nav-item-box">
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              role="button"
              style={headerIconStyle}
            >
              <img src={flagImage} alt="img" height={16} />
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <Link
                to="#"
                className="dropdown-item active"
                onClick={() => changeLanguage("en")}
              >
                <img src={englishFlag} alt="img" height={16} />
                English
              </Link>
              <Link
                to="#"
                className="dropdown-item"
                onClick={() => changeLanguage("fr")}
              >
                <img src={arabicFlag} alt="img" height={16} /> Arabic
              </Link>
            </div>
          </li>
          {/* /Flag */}

          <li className="nav-item nav-item-box">
            <Link
              to="#"
              onClick={() => toggleFullscreen()}
              style={headerIconStyle}
            >
              <i className="ti ti-maximize"></i>
            </Link>
          </li>

          <li className="nav-item nav-item-box">
            <Link to="/email" style={headerIconStyle}>
              <i className="ti ti-mail"></i>
              <span className="badge rounded-pill">1</span>
            </Link>
          </li>

          {/* Notifications */}
          <li className="nav-item dropdown nav-item-box">
            <Link
              to="#"
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
              style={headerIconStyle}
            >
              <i className="ti ti-bell"></i>
            </Link>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <h5 className="notification-title">Notifications</h5>
                <Link to="#" className="clear-noti">
                  Mark all as read
                </Link>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <Link to="#">
                      <div className="media d-flex">
                        <span className="avatar flex-shrink-0">
                          <img alt="Img" src={avatar_13} />
                        </span>
                        <div className="flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">James Kirwin</span>{" "}
                            confirmed his order. Order No: #78901.Estimated
                            delivery: 2 days
                          </p>
                          <p className="noti-time">4 mins ago</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="#">
                      <div className="media d-flex">
                        <span className="avatar flex-shrink-0">
                          <img alt="Img" src={avatar_03} />
                        </span>
                        <div className="flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">Leo Kelly</span>{" "}
                            cancelled his order scheduled for 17 Jan 2025
                          </p>
                          <p className="noti-time">10 mins ago</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="#" className="recent-msg">
                      <div className="media d-flex">
                        <span className="avatar flex-shrink-0">
                          <img alt="Img" src={avatar_17} />
                        </span>
                        <div className="flex-grow-1">
                          <p className="noti-details">
                            Payment of $50 received for Order #67890 from{" "}
                            <span className="noti-title">Antonio Engle</span>
                          </p>
                          <p className="noti-time">05 mins ago</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="#" className="recent-msg">
                      <div className="media d-flex">
                        <span className="avatar flex-shrink-0">
                          <img alt="Img" src={avatar_02} />
                        </span>
                        <div className="flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">Andrea</span> confirmed
                            his order. Order No: #73401.Estimated delivery: 3
                            days
                          </p>
                          <p className="noti-time">4 mins ago</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer d-flex align-items-center gap-3">
                <Link to="#" className="btn btn-secondary btn-md w-100">
                  Cancel
                </Link>
                <Link to="#" className="btn btn-primary btn-md w-100">
                  View all
                </Link>
              </div>
            </div>
          </li>
          {/* /Notifications */}

          <li className="nav-item nav-item-box">
            <Link to="/general-settings" style={headerIconStyle}>
              <i className="feather icon-settings"></i>
            </Link>
          </li>

          <li className="nav-item dropdown has-arrow main-drop profile-nav">
            <Link to="#" className="nav-link userset" data-bs-toggle="dropdown">
              <span className="user-info p-0">
                <span className="user-letter">
                  <img src={avator1} alt="Img" className="img-fluid" />
                </span>
              </span>
            </Link>
            <div className="dropdown-menu menu-drop-user">
              <div className="profileset d-flex align-items-center">
                <span className="user-img me-2">
                  <img src={avator1} alt="Img" />
                </span>
                <div>
                  <h6 className="fw-medium">{username}</h6>
                  <p>Admin</p>
                </div>
              </div>
              <Link className="dropdown-item" to={`/concern/view/${userId}`}>
                <i className="ti ti-user-circle me-2" />
                MyProfile
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="ti ti-file-text me-2" />
                Reports
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="ti ti-settings-2 me-2" />
                Settings
              </Link>
              <hr className="my-2" />
              <Link
                className="dropdown-item logout pb-0"
                onClick={handleLogout}
              >
                <i className="ti ti-logout me-2" />
                Logout
              </Link>
            </div>
          </li>
        </ul>
        {/* /Header Menu */}

        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <Link
            to="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to={`/concern/view/${userId}`}>
              <i className="ti ti-user-circle me-2" />
              MyProfile
            </Link>
            <Link className="dropdown-item" to="#">
              Settings
            </Link>
            <Link className="dropdown-item" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>

      {/* Submenu Dropdown - appears below active menu */}
      {activeMenu && subMenuData[activeMenu] && (
        <div
          style={{
            width: "100%",
            background: "linear-gradient(180deg, #4B749F 0%, #092c4c 100%)",
            borderTop: "1px solid #dee2e6",
            padding: "3px 10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2px",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            {subMenuData[activeMenu].map((item, index) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive =
                isPathActive(item.path, item.matchPaths) ||
                (item.children &&
                  item.children.some(
                    (child) =>
                      isPathActive(child.path) ||
                      (child.children &&
                        child.children.some((grandChild) =>
                          isPathActive(grandChild.path),
                        )),
                  ));

              return (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    padding: "6px 12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: isActive ? "orange" : "white",
                    background: isActive
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                    borderRadius: "4px",
                  }}
                >
                  {hasChildren ? (
                    <div
                      onClick={() => handleSecondHeaderClick(item)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        cursor: "pointer",
                      }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        textDecoration: "none",
                        color: isPathActive(item.path, item.matchPaths)
                          ? "orange"
                          : "white",
                        fontWeight: isPathActive(item.path, item.matchPaths)
                          ? "700"
                          : "400",
                      }}
                      onClick={() => {
                        setThirdHeader(null); // ✅ ADD THIS
                        setSelectedSecond(null);
                        handleMenuItemClick(item.path, false);
                      }}
                    >
                      <span
                        style={{
                          color: isPathActive(item.path, item.matchPaths)
                            ? "orange"
                            : "white",
                        }}
                      >
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* THIRD HEADER */}
      {/* THIRD HEADER */}
      {thirdHeader && thirdHeader.length > 0 && (
        <div
          style={{
            width: "100%",
            background: "linear-gradient(180deg, #4B749F 0%, #092c4c 100%)",
            borderTop: "1px solid #dee2e6",
            padding: "3px 3px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2px",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            {thirdHeader.map((child, i) => {
              const isActive =
                isPathActive(child.path) ||
                (child.children &&
                  child.children.some((grandChild) =>
                    isPathActive(grandChild.path),
                  ));

              return (
                <div
                  key={i}
                  style={{
                    padding: "6px 12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: isActive ? "orange" : "white",
                    background: isActive
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                    borderRadius: "4px",
                  }}
                >
                  {child.children ? (
                    <div
                      onClick={() => setThirdHeader(child.children)}

                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span>{child.icon}</span>
                      <span>{child.name}</span>
                    </div>
                  ) : (
                    <Link
                      to={child.path}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        textDecoration: "none",
                        color: isActive ? "orange" : "white",
                        fontWeight: isActive ? "700" : "400",
                      }}
                      onClick={() => handleChildItemClick(child.path)}
                    >
                      <span>{child.icon}</span>
                      <span>{child.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
