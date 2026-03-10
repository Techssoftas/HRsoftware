import { xls, pdf02 } from "../../utils/imagepath";
import { Link } from "react-router";
import { Tooltip } from "primereact/tooltip";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToggleHeader } from "../../core/redux/sidebarSlice";

const TableTopHead = () => {
  const dispatch = useDispatch();
  
  const handleToggleHeader = () => {
    dispatch(setToggleHeader(!toggleHeader));
  };
  return (
    <>
      <Tooltip target=".pr-tooltip" />
      <ul className="table-top-head">
        <li>
          <Link
            to="#"
            className="pr-tooltip"
            data-pr-tooltip="Pdf"
            data-pr-position="top">
            
            <img src={pdf02} alt="img" />
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="pr-tooltip"
            data-pr-tooltip="Excel"
            data-pr-position="top">
            
            <img src={xls} alt="img" />
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="pr-tooltip"
            data-pr-tooltip="Refresh"
            data-pr-position="top">
            
            <i className="ti ti-refresh" />
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="pr-tooltip"
            data-pr-tooltip="Collapse"
            data-pr-position="top"
            id="collapse-header"
            onClick={handleToggleHeader}>
            
            <i
              className={`ti  ${ "ti-chevron-down" }`} />
            
          </Link>
        </li>
      </ul>
    </>);

};

export default TableTopHead;