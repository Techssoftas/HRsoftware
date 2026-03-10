import React, { useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../../routes/all_routes";
import { appleLogo, facebookLogo, googleLogo, logoPng, logoWhitePng } from "../../../../utils/imagepath";


const Signin = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const route = all_routes;

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper">
        
      </div>
      {/* /Main Wrapper */}
    </>);

};

export default Signin;