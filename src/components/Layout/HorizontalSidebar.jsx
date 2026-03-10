import { icon, Path } from "leaflet";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const HorizontalSidebar = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();
  const [hoverMenu, setHoverMenu] = useState("");


  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
  };
  // Auto-open correct submenu on page refresh
React.useEffect(() => {
  const menuKey = Object.keys(subMenuData).find(menu =>
    subMenuData[menu].some(item =>
      item.path === location.pathname ||
      item.children?.some(child => child.path === location.pathname)
    )
  );

  if (menuKey) {
    setActiveMenu(menuKey);
  }
}, [location.pathname]);


  // Submenu data
  const subMenuData = {
// master: [
//   {
//     name: "PARTY",
//     path: "/party",
//     icon: <i className="ti ti-users-group fs-16 me-2"></i>
//   },
 
//   {
//     name: "ORDER NO",
//     path: "/OrdernoList",
//     icon: <i className="ti ti-file-description fs-16 me-2"></i>
//   },
//   {
//     name: "STYLE NO",
//     path: "/stylenoList",
//     icon: <i className="ti ti-shirt fs-16 me-2"></i>
//   },
//   {
//     name: "ORDER GROUP",
//     path: "/ordergroup/List",
//     icon: <i className="ti ti-category fs-16 me-2"></i>
//   },
//   {
//     name: "SIZE MASTER",
//     path: "/sizemaster",
//     icon: <i className="ti ti-arrows-resize fs-16 me-2"></i>
//   },
//   {
//     name: "SIZE GROUP",
//     path: "/sizegroup/List",
//     icon: <i className="ti ti-category fs-16 me-2"></i>
//   },
// {
//   name: "MASTER MODIFY",
//   path: "/master-modify",
//   icon: <i className="ti ti-edit fs-16 me-2"></i>,
// },

//   {
//     name: "YARN TYPE",
//     path: "/yarntype",
//     icon: <i className="ti ti-package fs-16 me-2"></i>
//   },
//   {
//     name: "COUNTS",
//     path: "/counts",
//     icon: <i className="ti ti-sum fs-16 me-2"></i>
//   },
//   {
//     name: "DIA",
//     path: "/dia/list",
//     icon: <i className="ti ti-circles fs-16 me-2"></i>
//   },
//   {
//     name: "CLOTH DESCRIPTION",
//     path: "/clothdes",
//     icon: <i className="ti ti-file-text fs-16 me-2"></i>
//   },
//   {
//     name: "DYE COLOUR",
//     path: "/colors/list",
//     icon: <i className="ti ti-color-swatch fs-16 me-2"></i>
//   },
//   {
//     name: "FABRIC PROCESS",
//     path: "/fabprocess/list",
//     icon: <i className="ti ti-recycle fs-16 me-2"></i>
//   },
//   {
//     name: "GST TAX CREATION",
//     path: "/gstcreation",
//     icon: <i className="ti ti-receipt fs-16 me-2"></i>
//   },
//   {
//     name: "Process Master",
//     path: "/processMaster",
//     icon: <i className="ti ti-hierarchy-3 fs-16 me-2"></i>
//   }
// ],


// yarn: [
//   {
//     name: "PO Yarn",
//     path: "/yarn",
//     icon: <i className="ti ti-shopping-cart fs-16 me-2"></i>,
//   },
//  {
//     name: "Yarn Store",
//     path: "/yarn-purchase",
//     icon: <i className="ti ti-package fs-16 me-2"></i>,
//      children: [
//        {
//     name: "Yarn Purchase",
//     path: "/yarn-purchase",
//     icon: <i className="ti ti-package fs-16 me-2"></i>,
//   },  {
//     name: "Ongoing Process",
//     path: "/ongoing-process",
//     icon: <i className="ti ti-package fs-16 me-2"></i>,
//   },
//     {
//       name: "YarnDyeing",
//       path: "/process-inward/yarn-dyeing",
//       icon: <i className="ti ti-droplet fs-16 me-2"></i>,
//       children: [
//         {
//           name: "YarnDyeing",
//           path: "/process-inward/yarn-dyeing",
//           icon: <i className="ti ti-circle-dot fs-16 me-2"></i>,
//         },
//         {
//           name: "AddYarnDyeing",
//           path: "/process-inward/yarn-dyeing/add",
//           icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//         },
//         {
//           name: "EditYarnDyeing",
//           path: "/process-inward/yarn-dyeing/edit",
//           icon: <i className="ti ti-edit fs-16 me-2"></i>,
//         },
//       ],
//     },

//     {
//       name: "Winding",
//       path: "/process-inward/winding",
//       icon: <i className="ti ti-repeat fs-16 me-2"></i>,
//       children: [
//         {
//           name: "Winding",
//           path: "/process-inward/winding",
//           icon: <i className="ti ti-circle-dot fs-16 me-2"></i>,
//         },
//         {
//           name: "AddWindingIn",
//           path: "/process-inward/winding/add",
//           icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//         },
//         {
//           name: "EditWindingIn",
//           path: "/process-inward/winding/edit",
//           icon: <i className="ti ti-edit fs-16 me-2"></i>,
//         },
//       ],
//     },


// {
//   name: "Twisting",
//   path: "/process-inward/twisting",
//   icon: <i className="ti ti-arrows-exchange-2 fs-16 me-2"></i>,
//   children: [
//     {
//       name: "Twisting",
//       path: "/process-inward/twisting",
//       icon: <i className="ti ti-circle-dot fs-16 me-2"></i>
//     },
//     {
//       name: "AddTwistingIn",
//       path: "/process-inward/twisting/add",
//       icon: <i className="ti ti-file-text fs-16 me-2"></i>
//     },
//     {
//       name: "EditTwistingIn",
//       path: "/process-inward/twisting/edit",
//       icon: <i className="ti ti-edit fs-16 me-2"></i>
//     }
//   ]
// },

//                  {
//       name: "Knitting",
//       path: "/process-inward/knitting",
//      icon: <i className="ti ti-needle fs-16 me-2"></i>,
//       children: [
//         {
//           name: "Knitting",
//           path: "/process-inward/knitting",
//           icon: <i className="ti ti-circle-dot fs-16 me-2"></i>,
//         },
//         {
//           name: "AddKnitting",
//           path: "/process-inward/knitting/add",
//           icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//         },
//         {
//           name: "EditKnitting",
//           path: "/process-inward/knitting/edit",
//           icon: <i className="ti ti-edit fs-16 me-2"></i>,
//         },
//       ],
//     },    {
//       name: "CollarKnitting",
//       path: "/process-inward/collar-knitting",
//       icon: <i className="ti ti-shirt fs-16 me-2"></i>
// ,
//       children: [
//         {
//           name: "CollarKnitting",
//           path: "/process-inward/collar-knitting",
//           icon: <i className="ti ti-circle-dot fs-16 me-2"></i>,
//         },
//         {
//           name: "AddCollarKnitting",
//           path: "/process-inward/collar-knitting/add",
//           icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//         },
//         {
//           name: "EditCollarKnitting",
//           path: "/process-inward/collar-knitting/edit",
//           icon: <i className="ti ti-edit fs-16 me-2"></i>,
//         },
//       ],
//     },    

//   ],
//   },
 
//   // ---------- PROCESS OUTWARD ----------
//   {
//     name: "Process Outward",
//     path: "/process-outward",
//     icon: <i className="ti ti-truck fs-16 me-2"></i>,
//     children: [
// {
//   name: "YarnDyeing",
//   path: "/process-outward/yarn-dyeing",
//   icon: <i className="ti ti-droplet fs-16 me-2"></i>,
//   children: [
//     {
//       name: "YarnDyeing",
//       path: "/process-outward/yarn-dyeing",
//       icon: <i className="ti ti-circle-dot fs-16 me-2"></i>
//     },
//     {
//       name: "AddYarnDyeing",
//       path: "/process-outward/yarn-dyeing/add",
//       icon: <i className="ti ti-file-text fs-16 me-2"></i>
//     },
//     {
//       name: "EditYarnDyeing",
//       path: "/process-outward/yarn-dyeing/edit",
//       icon: <i className="ti ti-edit fs-16 me-2"></i>
//     }
//   ]
// },

// {
//   name: "Winding",
//   path: "/process-outward/winding",
//   icon: <i className="ti ti-repeat fs-16 me-2"></i>,
//   children: [
//     {
//       name: "Winding",
//       path: "/process-outward/winding",
//       icon: <i className="ti ti-circle-dot fs-16 me-2"></i>
//     },
//     {
//       name: "AddWinding",
//       path: "/process-outward/winding/add",
//       icon: <i className="ti ti-file-text fs-16 me-2"></i>
//     },
//     {
//       name: "EditWinding",
//       path: "/process-outward/winding/edit",
//       icon: <i className="ti ti-edit fs-16 me-2"></i>
//     }
//   ]
// },


// {
//   name: "Twisting",
//   path: "/process-outward/twisting",
//   icon: <i className="ti ti-arrows-exchange-2 fs-16 me-2"></i>,
//   children: [
//     {
//       name: "Twisting",
//       path: "/process-outward/twisting",
//       icon: <i className="ti ti-circle-dot fs-16 me-2"></i>
//     },
//     {
//       name: "AddTwisting",
//       path: "/process-outward/twisting/add",
//       icon: <i className="ti ti-file-text fs-16 me-2"></i>
//     },
//     {
//       name: "EditTwisting",
//       path: "/process-outward/twisting/edit",
//       icon: <i className="ti ti-edit fs-16 me-2"></i>
//     }
//   ]
// },


// {
//   name: "Knitting",
//   path: "/process-outward/knitting",
//   icon: <i className="ti ti-hexagon fs-16 me-2"></i>,
//   children: [
//     {
//       name: "Knitting",
//       path: "/process-outward/knitting",
//       icon: <i className="ti ti-circle-dot fs-16 me-2"></i>
//     },
//     {
//       name: "AddKnitting",
//       path: "/process-outward/knitting/add",
//       icon: <i className="ti ti-file-text fs-16 me-2"></i>
//     },
//     {
//       name: "EditKnitting",
//       path: "/process-outward/knitting/edit",
//       icon: <i className="ti ti-edit fs-16 me-2"></i>
//     }
//   ]
// },


// {
//   name: "CollarKnitting",
//   path: "/process-outward/collar-knitting",
//   icon: <i className="ti ti-shirt fs-16 me-2"></i>,
//   children: [
//     {
//       name: "CollarKnitting",
//       path: "/process-outward/collar-knitting",
//       icon: <i className="ti ti-circle-dot fs-16 me-2"></i>
//     },
//     {
//       name: "AddCollarKnitting",
//       path: "/process-outward/collar-knitting/add",
//       icon: <i className="ti ti-file-text fs-16 me-2"></i>
//     },
//     {
//       name: "EditCollarKnitting",
//       path: "/process-outward/collar-knitting/edit",
//       icon: <i className="ti ti-edit fs-16 me-2"></i>
//     }
//   ]
// }

//     ],
//   },





// // ---------- PROCESS RETURN ----------
// {
//   name: "Process Return",
//   path: "/process-return",
//   icon: <i className="ti ti-refresh fs-16 me-2"></i>,
//   children: [
//     {
//       name: "Yarn Dyeing",
//       path: "/process-return/yarn-dyeing",
//       icon: <i className="ti ti-droplet fs-16 me-2"></i>,
//       children: [
//         {
//           name: "Yarn Dyeing Return",
//           path: "/process-return/yarn-dyeing",
//           icon: <i className="ti ti-circle-dot fs-16 me-2"></i>,
//         },
//         {
//           name: "Add Yarn Dyeing Return",
//           path: "/process-return/yarn-dyeing/add",
//           icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//         },
//         {
//           name: "Edit Yarn Dyeing Return",
//           path: "/process-return/yarn-dyeing/edit",
//           icon: <i className="ti ti-edit fs-16 me-2"></i>,
//         },
//       ],
//     },

//     {
//       name: "Winding ",
//       path: "/process-return/winding",
//       icon: <i className="ti ti-repeat fs-16 me-2"></i>,
//       children: [
//         {
//           name: "Winding Return",
//           path: "/process-return/winding",
//           icon: <i className="ti ti-circle-dot fs-16 me-2"></i>,
//         },
//         {
//           name: "Add Winding Return",
//           path: "/process-return/winding/add",
//           icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//         },
//         {
//           name: "Edit Winding Return",
//           path: "/process-return/winding/edit",
//           icon: <i className="ti ti-edit fs-16 me-2"></i>,
//         },
//       ],
//     },

//     {
//       name: "Twisting ",
//       path: "/process-return/twisting",
//       icon: <i className="ti ti-arrows-exchange-2 fs-16 me-2"></i>,
//       children: [
//         {
//           name: "Twisting Return",
//           path: "/process-return/twisting",
//           icon: <i className="ti ti-circle-dot fs-16 me-2"></i>,
//         },
//         {
//           name: "Add Twisting Return",
//           path: "/process-return/twisting/add",
//           icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//         },
//         {
//           name: "Edit Twisting Return",
//           path: "/process-return/twisting/edit",
//           icon: <i className="ti ti-edit fs-16 me-2"></i>,
//         },
//       ],
//     },

//     {
//       name: "Knitting ",
//       path: "/process-return/knitting",
//       icon: <i className="ti ti-hexagon fs-16 me-2"></i>,
//       children: [
//         {
//           name: "Knitting Return",
//           path: "/process-return/knitting",
//           icon: <i className="ti ti-circle-dot fs-16 me-2"></i>,
//         },
//         {
//           name: "Add Knitting Return",
//           path: "/process-return/knitting/add",
//           icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//         },
//         {
//           name: "Edit Knitting Return",
//           path: "/process-return/knitting/edit",
//           icon: <i className="ti ti-edit fs-16 me-2"></i>,
//         },
//       ],
//     },

//     {
//       name: "Collar Knitting",
//       path: "/process-return/collar-knitting",
//       icon: <i className="ti ti-shirt fs-16 me-2"></i>,
//       children: [
//         {
//           name: "Collar Knitting Return",
//           path: "/process-return/collar-knitting",
//           icon: <i className="ti ti-circle-dot fs-16 me-2"></i>,
//         },
//         {
//           name: "Add Collar Knitting Return",
//           path: "/process-return/collar-knitting/add",
//           icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//         },
//         {
//           name: "Edit Collar Knitting Return",
//           path: "/process-return/collar-knitting/edit",
//           icon: <i className="ti ti-edit fs-16 me-2"></i>,
//         },
//       ],
//     },
//   ],
// },


//   {
//     name: "Stock Transfer",
//     path: "stock-transfer",
//     icon: <i className="ti ti-arrows-exchange fs-16 me-2"></i>,
//   },

// // ---------- YARN SALES ----------
// {
//   name: "Yarn Sales",
//   path: "",
//   icon: <i className="ti ti-currency-rupee fs-16 me-2"></i>,
//   children: [
//     {
//       name: "GST DC Bill",
//       path: "/gst-dc-bill",
//       icon: <i className="ti ti-file-invoice fs-16 me-2"></i>,
//     },
//     {
//       name: "Cash DC Bill",
//       path: "/cash-dc-bill",
//       icon: <i className="ti ti-file-invoice fs-16 me-2"></i>,
//     },
//     {
//       name: "Yarn DC",
//       path: "/yarn-dc",
//       icon: <i className="ti ti-file-plus fs-16 me-2"></i>,
//     },
//     {
//       name: "GST Bill From DC",
//       path: "/gst-bill-from-dc",
//       icon: <i className="ti ti-file-dollar fs-16 me-2"></i>,
//     },
//     {
//       name: "Cash Bill From DC",
//       path: "/cash-bill-from-dc",
//       icon: <i className="ti ti-cash fs-16 me-2"></i>,
//     },
//     {
//       name: "Yarn Sales Return",
//       path: "/yarn-sales-return",
//       icon: <i className="ti ti-arrow-back-up fs-16 me-2"></i>,
//     },
//   ],
// },

//   {
//     name: "Add / Deduct",
//     path: "/add-deduct",
//     icon: <i className="ti ti-adjustments fs-16 me-2"></i>,
//   },
// {
//   name: "Party Debit Stock",
//   path: "/party-debit-stock",
//   icon: <i className="ti ti-user-minus fs-16 me-2"></i>,
//   children: [
//     {
//       name: "Collar Knitting",
//       path: "/party-debit-stock/collar-knitting",
//       icon: <i className="ti ti-shirt fs-16 me-2"></i>,
//       children: [
//         {
//           name: "Collar Knitting",
//           path: "/party-debit-stock/collar-knitting",
//           icon: <i className="ti ti-circle-dot fs-16 me-2"></i>,
//         },
//         {
//           name: "Add Collar Knitting",
//           path: "/party-debit-stock/collar-knitting/add",
//           icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//         },
//         {
//           name: "Edit Collar Knitting",
//           path: "/party-debit-stock/collar-knitting/edit",
//           icon: <i className="ti ti-edit fs-16 me-2"></i>,
//         },
//       ],
//     },

//     {
//       name: "Winding",
//       path: "/party-debit-stock/winding",
//       icon: <i className="ti ti-repeat fs-16 me-2"></i>,
//       children: [
//         {
//           name: "Winding",
//           path: "/party-debit-stock/winding",
//           icon: <i className="ti ti-circle-dot fs-16 me-2"></i>,
//         },
//         {
//           name: "Add Winding",
//           path: "/party-debit-stock/winding/add",
//           icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//         },
//         {
//           name: "Edit Winding",
//           path: "/party-debit-stock/winding/edit",
//           icon: <i className="ti ti-edit fs-16 me-2"></i>,
//         },
//       ],
//     },

//     {
//       name: "Knitting",
//       path: "/party-debit-stock/knitting",
//       icon: <i className="ti ti-hexagon fs-16 me-2"></i>,
//       children: [
//         {
//           name: "Knitting",
//           path: "/party-debit-stock/knitting",
//           icon: <i className="ti ti-circle-dot fs-16 me-2"></i>,
//         },
//         {
//           name: "Add Knitting",
//           path: "/party-debit-stock/knitting/add",
//           icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//         },
//         {
//           name: "Edit Knitting",
//           path: "/party-debit-stock/knitting/edit",
//           icon: <i className="ti ti-edit fs-16 me-2"></i>,
//         },
//       ],
//     },

//     {
//       name: "Yarn Dyeing",
//       path: "/party-debit-stock/yarn-dyeing",
//       icon: <i className="ti ti-droplet fs-16 me-2"></i>,
//       children: [
//         {
//           name: "Yarn Dyeing",
//           path: "/party-debit-stock/yarn-dyeing",
//           icon: <i className="ti ti-circle-dot fs-16 me-2"></i>,
//         },
//         {
//           name: "Add Yarn Dyeing",
//           path: "/party-debit-stock/yarn-dyeing/add",
//           icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//         },
//         {
//           name: "Edit Yarn Dyeing",
//           path: "/party-debit-stock/yarn-dyeing/edit",
//           icon: <i className="ti ti-edit fs-16 me-2"></i>,
//         },
//       ],
//     },

//     {
//       name: "Yarn Twisting",
//       path: "/party-debit-stock/yarn-twisting",
//       icon: <i className="ti ti-arrows-exchange-2 fs-16 me-2"></i>,
//       children: [
//         {
//           name: "Yarn Twisting",
//           path: "/party-debit-stock/yarn-twisting",
//           icon: <i className="ti ti-circle-dot fs-16 me-2"></i>,
//         },
//         {
//           name: "Add Yarn Twisting",
//           path: "/party-debit-stock/yarn-twisting/add",
//           icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//         },
//         {
//           name: "Edit Yarn Twisting",
//           path: "/party-debit-stock/yarn-twisting/edit",
//           icon: <i className="ti ti-edit fs-16 me-2"></i>,
//         },
//       ],
//     },
//   ],
// },

//   {
//     name: "Inhouse Debit Stock",
//     path: "/inhouse-debit-stock",
//     icon: <i className="ti ti-home-minus fs-16 me-2"></i>,
//   },
// {
//   name: "Status View",
//   path: "/status-view",
//   icon: <i className="ti ti-eye fs-16 me-2"></i>,
// },
// // {
// //   name: "Add Status",
// //   path: "/status-view/add",
// //   icon: <i className="ti ti-circle-plus fs-16 me-2"></i>,
// // },
// // {
// //   name: "Edit Status",
// //   path: "/status-view/edit/",
// //   icon: <i className="ti ti-edit fs-16 me-2"></i>,
// // },


//   // ---------- STOCK REPORTS ----------
// {
//   name: "Stock Reports",
//   path: "",
//   icon: <i className="ti ti-report fs-16 me-2"></i>,
//   children: [
//     { 
//       name: "Inhouse Yarn Stock", 
//       path: "/stock-reports/inhouse-yarn-stock", 
//       icon: <i className="ti ti-home fs-16 me-2"></i> 
//     },
//     { 
//       name: "Party Yarn Stock", 
//       path: "/stock-reports/party-yarn-stock", 
//       icon: <i className="ti ti-users fs-16 me-2"></i> 
//     },
//   ],
// }

// ],




//     fabrics: [
//       {
//         name: "PO Fabric",
//         path: "/pofabric",
//         icon: <i className="ti ti-shopping-bag fs-16 me-2"></i>,
//       },
//       {
//         name: "Fabric Purchase",
//         path: "/purchaselist",
//         icon: <i className="ti ti-package fs-16 me-2"></i>,
//       },
//         {
//         name: "Fabric Ongoing",
//         path: "/fabric/ongoinglist",
//         icon: <i className="ti ti-package fs-16 me-2"></i>,
//       },
//       // {
//       //   name: "Fabric Purchase Return",
//       //   path: "/returnlist",
//       //   icon: <i className="ti ti-arrow-back-up fs-16 me-2"></i>,
//       // },
//       {
//         name: "Process Outward",
//         path: "",
//         icon: <i className="ti ti-truck fs-16 me-2"></i>,
//         children: [
//           {
//             name: "Dyeing",
//             path: "/fabric/process-outward/fabric-dyeing",
//             icon: <i className="ti ti-droplet fs-16 me-2"></i>,
//           },
//          {
//             name: "Washing",
//             path: "/outwashinglist",
//             icon: <i className="ti ti-droplet fs-16 me-2"></i>,
//           },
//           {
//             name: "Compacting",
//             path: "/outcompactinglist",
//             icon: <i className="ti ti-arrows-join fs-16 me-2"></i>,
//           },
         
//           // {
//           //   name: "Heatsetting",
//           //   path: "/outheatsettinglist",
//           //   icon: <i className="ti ti-temperature fs-16 me-2"></i>,
//           // },
//           // {
//           //   name: "Relax Dryer",
//           //   path: "/outrelaxdryerlist",
//           //   icon: <i className="ti ti-wind fs-16 me-2"></i>,
//           // },
          
//           {
//             name: "Printing",
//             path: "/outprintinglist",
//             icon: <i className="ti ti-palette fs-16 me-2"></i>,
//           },
//           // {
//           //   name: "Compacting",
//           //   path: "/outcompacting2list",
//           //   icon: <i className="ti ti-arrows-join fs-16 me-2"></i>,
//           // },
//           // {
//           //   name: "Tumble Dryer",
//           //   path: "/outtumbledryerlist",
//           //   icon: <i className="ti ti-temperature fs-16 me-2"></i>,
//           // },
//           // {
//           //   name: "Stentering",
//           //   path: "/outstenteringlist",
//           //   icon: <i className="ti ti-wind fs-16 me-2"></i>,
//           // },
//           // {
//           //   name: "Common Process",
//           //   path: "/outcommonprocesslist",
//           //   icon: <i className="ti ti-circuit-board fs-16 me-2"></i>,
//           // },
          
//         ],
//       },
//       {
//         name: "Process Inward",
//         path: "",
//         icon: <i className="ti ti-truck-return fs-16 me-2"></i>,
//         children: [
         
//           {
//             name: "Dyeing",
//             path: "/fabric/process-inward/fabric-dyeing",
//             icon: <i className="ti ti-droplet fs-16 me-2"></i>,
//           },
//           {
//             name: "compacting",
//             path: "/inward/compacting",
//             icon: <i className="ti ti-arrows-join fs-16 me-2"></i>,
//           },
          
//           {
//             name: "Washing",
//             path: "/inward/washing",
//             icon: <i className="ti ti-droplet fs-16 me-2"></i>,
//           },
//           {
//             name: "Printing",
//             path: "/inprintinglist",
//             icon: <i className="ti ti-palette fs-16 me-2"></i>,
//           },
         

//         ],
//       },
//       {
//         name: "Process Return",
//         path: "",
//         icon: <i className="ti ti-refresh fs-16 me-2"></i>,
//         children: [
//           {
//             name: "Dyeing",
//             path: "/return/dyeing",
//             icon: <i className="ti ti-droplet fs-16 me-2"></i>,
//           },
//          {
//   name: "Compacting",
//   path: "/return/compacting", // ✅ CORRECT - with slash
//   icon: <i className="ti ti-arrows-join fs-16 me-2"></i>,
// },
        
//           {
//             name: "Washing",
//             path: "/return/washing",
//             icon: <i className="ti ti-droplet fs-16 me-2"></i>,
//           },
//           {
//   name: "Printing",
//   path: "/return/fabric/printing",  // Unique path
//   icon: <i className="ti ti-palette fs-16 me-2"></i>,
// },
        
//         ],
//       },
//       {
//         name: "Stock Transfer",
//         path: "/fabStocklist",
//         icon: <i className="ti ti-refresh fs-16 me-2"></i>,
//       },
//       {
//         name: "Fabric Sales",
//         path: "",
//         icon: <i className="ti ti-refresh fs-16 me-2"></i>,
//         children: [
//           {
//             name: "GST dc Bill",
//             path: "/fabgstdcBilllist",
//             icon: <i className="ti ti-file-description fs-16 me-2"></i>,
//           },
//           {
//             name: "Cash dc Bill",
//             path:"/fabcashdcBilllist",
//             icon: <i className="ti ti-file-description fs-16 me-2"></i>,
//           },
//           {name:'Fabric DC',
//             path:'/fabFabricDClist',
//             icon:<i className="ti ti-file-description fs-16 me-2"></i>,
//           },
//           {name:'GST Bill dc',
//             path:'/fabgstbillDClist',
//             icon:<i className="ti ti-file-description fs-16 me-2"></i>,
//           },
//           {name:'Cash Bill dc',
//             path:'/fabcashbillDClist',
//             icon:<i className="ti ti-file-description fs-16 me-2"></i>,
//           },
//           {name:'Fabric Sales Return',
//             path:'/fabFabricSalesReturnlist',
//             icon:<i className="ti ti-file-description fs-16 me-2"></i>,
//           }
//         ],
//       },
//       {
//         name: "Add or Deduct",
//         path: "/fabAddorDeductlist",
//         icon: <i className="ti ti-refresh fs-16 me-2"></i>,
//       },
//       {
//         name: "Party Debit Stock",
//         path: "/fabPartyDebitStocklist ",
//         icon: <i className="ti ti-refresh fs-16 me-2"></i>,
//       },
//       {
//         name: "inhouse Debit Stock",
//         path: "/fabInhouseDebitStocklist",
//         icon: <i className="ti ti-refresh fs-16 me-2"></i>,
//       },
//     ],

//     garments: [
//   { 
//     name: "Po",
//     path: "/garments/po",
//     icon: <i className="ti ti-file-description fs-16 me-2"></i> 
//   },
// {
//   name: "Purchase",
//   path: "/garments/purchase",
//   icon: <i className="ti ti-shopping-cart fs-16 me-2"></i>
// },


// {
//   name: "Party Opening Stock",
//   path: "/party-opening-stock",
//   icon: <i className="ti ti-database fs-16 me-2"></i>
// },



//   { 
//     name: "Outward",
//     icon: <i className="ti ti-arrow-up-circle fs-16 me-2"></i> ,
//     children: [
//        {
//             name: "Cutting",
//             path: "/garments/OutCuttingList",
//             icon: <i className="ti ti-scissors fs-16 me-2"></i>,
//           },
         
//           {
//             name: "Printing",
//             path: "/goutprintinglist",
//             icon: <i className="ti ti-droplet fs-16 me-2"></i>,
//           },
          
//           {
//             name: "Embroidery",
//             path: "/goutembroiderylist",
//             icon: <i className="ti ti-wind fs-16 me-2"></i>,
//           },
//           {
//             name: "Stitching",
//             path: "/goutstitchinglist",
//             icon: <i className="ti ti-arrows-join fs-16 me-2"></i>,

            
//           },
//            {
//             name: "Singer",
//             path: "/goutsingerlist",
//             icon: <i className="ti ti-arrows-join fs-16 me-2"></i>,
//           },
//           {
//             name: "Overlock",
//             path: "/goutoverlocklist",
//             icon: <i className="ti ti-temperature fs-16 me-2"></i>,
//           },

//            {
//             name: "Kajoj",
//             path: "/goutkajojlist",
//             icon: <i className="ti ti-droplet fs-16 me-2"></i>,
//           },
//           {
//             name: "Checking",
//             path: "/goutcheckinglist",
//             icon: <i className="ti ti-palette fs-16 me-2"></i>,
//           },
//             {
//             name: "Ironing",
//             path: "/goutironinglist",
//             icon: <i className="ti ti-scissors fs-16 me-2"></i>,
//           },
//           {
//             name: "Packing",
//             path: "/goutpackinglist",
//             icon: <i className="ti ti-temperature fs-16 me-2"></i>,
//           },
//            {
//             name: "Despatch",
//             path: "/goutdespatch",
//             icon: <i className="ti ti-scissors fs-16 me-2"></i>,
//           },

//           // {
//           //   name: "Stitching to Packing",
//           //   path: "/goutstitchingpackinglist",
//           //   icon: <i className="ti ti-wind fs-16 me-2"></i>,
//           // },
         
         
//           // {
//           //   name: "Fabric Process",
//           //   path: "/goutfabricprocesslist",
//           //   icon: <i className="ti ti-scissors fs-16 me-2"></i>,
//           // },
//           // {
//           //   name: "Compacting",
//           //   path: "/goutcompactinglist",
//           //   icon: <i className="ti ti-scissors fs-16 me-2"></i>,
//           // },
        
//           // {
//           //   name: "Batch Label Elastic Join",
//           //   path: "/goutbatchlabelelasticjoinlist",
//           //   icon: <i className="ti ti-scissors fs-16 me-2"></i>,
//           // },
         
//         ],
//   },

//   // ---------- INWARD ----------
// {
//   name: "Inward",
//   path: "",
//   icon: <i className="ti ti-arrow-down-circle fs-16 me-2"></i>,
//   children: [
//     {
//       name: "Cutting",
//       path: "garments/inward/cutting",
//       icon: <i className="ti ti-scissors fs-16 me-2"></i>,
//     },
//     {
//       name: "Printing",
//       path: "/inward/printing",
//       icon: <i className="ti ti-printer fs-16 me-2"></i>,
//     },
//        {
//       name: "Embroidery",
//       path: "/inward/embroidery",
//       icon: <i className="ti ti-needle-thread fs-16 me-2"></i>,
//     },
//     {
//       name: "Stitching",
//       path: "/inward/stitching",
//       icon: <i className="ti ti-needle fs-16 me-2"></i>,
      
//     },

//      {
//       name: "Singer",
//       path: "/inward/singer",
//       icon: <i className="ti ti-user fs-16 me-2"></i>,
//     },
//     {
//       name: "Overlock",
//       path: "/inward/overlock",
//       icon: <i className="ti ti-lock fs-16 me-2"></i>,
//     },
//       {
//       name: "Kajoj",
//       path: "/inward/kajoj",
//       icon: <i className="ti ti-needle fs-16 me-2"></i>,
//     },
//     {
//       name: "Checking",
//       path: "/inward/checking",
//       icon: <i className="ti ti-check fs-16 me-2"></i>,
//     },
//      {
//       name: "Ironing",
//       path: "/inward/ironing",
//       icon: <i className="ti ti-shirt fs-16 me-2"></i>,
//     },
 
//     {
//       name: "Packing",
//       path: "/inward/packing",
//       icon: <i className="ti ti-package fs-16 me-2"></i>,
//     },
//     // {
//     //   name: "Stitching to Packing",
//     //   path: "/inward/stitching-to-packing",
//     //   icon: <i className="ti ti-arrow-big-down-lines fs-16 me-2"></i>,
//     // },
  
   
//     // {
//     //   name: "Fabric Process",
//     //   path: "/inward/fabric-process",
//     //   icon: <i className="ti ti-folders fs-16 me-2"></i>,
//     // },
//     // {
//     //   name: "Compacting",
//     //   path: "/inward/compacting",
//     //   icon: <i className="ti ti-layout fs-16 me-2"></i>,
//     // },
   
//     // {
//     //   name: "Batch Label Elastic Join",
//     //   path: "/inward/batch-label-elastic-join",
//     //   icon: <i className="ti ti-link fs-16 me-2"></i>,
//     // },
//   ],
// },
// {
//   name: "Return",
//   path: "",
//   icon: <i className="ti ti-arrow-back-up fs-16 me-2"></i>,
//   children: [
//     {
//       name: "Printing",
//       path: "/return/printing",
//       icon: <i className="ti ti-printer fs-16 me-2"></i>,
//     },
//     {
//       name: "Stitching",
//       path: "/return/stitching",
//       icon: <i className="ti ti-needle fs-16 me-2"></i>,
//     },
//     {
//       name: "Packing",
//       path: "/return/packing",
//       icon: <i className="ti ti-package fs-16 me-2"></i>,
//     },
//     {
//       name: "Despatch",
//       path: "/return/despatch",
//       icon: <i className="ti ti-truck fs-16 me-2"></i>,
//     },
//     {
//       name: "Stitching to Packing",
//       path: "/return/stitching-to-packing",
//       icon: <i className="ti ti-arrow-big-down-lines fs-16 me-2"></i>,
//     },
//     {
//       name: "Kajoj",
//       path: "/return/kajoj",
//       icon: <i className="ti ti-needle fs-16 me-2"></i>,
//     },
//     {
//       name: "Checking",
//       path: "/return/checking",
//       icon: <i className="ti ti-check fs-16 me-2"></i>,
//     },
//     {
//       name: "Singer",
//       path: "/return/singer",
//       icon: <i className="ti ti-user fs-16 me-2"></i>,
//     },
//     {
//       name: "Overlock",
//       path: "/return/overlock",
//       icon: <i className="ti ti-lock fs-16 me-2"></i>,
//     },
//     {
//       name: "Embroidery",
//       path: "/return/embroidery",
//       icon: <i className="ti ti-needle-thread fs-16 me-2"></i>,
//     },
//     {
//       name: "Fabric Process",
//       path: "/return/fabric-process",
//       icon: <i className="ti ti-folders fs-16 me-2"></i>,
//     },
//     {
//       name: "Compacting",
//       path: "/return/compacting",
//       icon: <i className="ti ti-layout fs-16 me-2"></i>,
//     },
//     {
//       name: "Ironing",
//       path: "/return/ironing",
//       icon: <i className="ti ti-shirt fs-16 me-2"></i>,
//     },
//     {
//       name: "Batch Label Elastic Join",
//       path: "/return/batch-label-elastic-join",
//       icon: <i className="ti ti-link fs-16 me-2"></i>,
//     },
//   ],
// },

//   { 
//     name: "Garment DC",
//     path: "/garmentdc",
//     icon: <i className="ti ti-truck-delivery fs-16 me-2"></i> 
//   },
//   { 
//     name: "Garment Sales",
    
//     icon: <i className="ti ti-currency-rupee fs-16 me-2"></i>,
//     children: [
         
//           {
//             name: "GST-DCCumSales",
//             path: "/ingstdccumsales",
//             icon: <i className="ti ti-droplet fs-16 me-2"></i>,
//           },
//           {
//             name: "Cash-DCCumSales",
//             path: "/incashdccumsales",
//             icon: <i className="ti ti-arrows-join fs-16 me-2"></i>,
//           },
//           {
//             name: "GSTBill-FromDc",
//             path: "/ingstbillfromdc",
//             icon: <i className="ti ti-temperature fs-16 me-2"></i>,
//           },
//            {
//             name: "CashBill-FromDc",
//             path: "/incashbillfromdc",
//             icon: <i className="ti ti-scissors fs-16 me-2"></i>,
//           },

//           {
//             name: "GSTDirect-Sales",
//             path: "/ingstdirectsales",
//             icon: <i className="ti ti-wind fs-16 me-2"></i>,
//           },
//           {
//             name: "CashDirect-Sales",
//             path: "/incashdirectsales",
//             icon: <i className="ti ti-droplet fs-16 me-2"></i>,
//           },
          
//         ],
//   },
//   { 
//     name: "Stock Transfer",
//     path:"/garstocktransfer",
//     icon: <i className="ti ti-arrows-transfer-up fs-16 me-2"></i> 
//   },
//   { 
//     name: "Add Or Deduct",
//     path: "/garaddordeduct",
//     icon: <i className="ti ti-adjustments fs-16 me-2"></i> 
//   },
//   { 
//     name: "DC Close",
//     icon: <i className="ti ti-lock-check fs-16 me-2"></i> 
//   },
// ]
// ,

//     accessories: [
//       { name: "Item Master", 
//         path: "/accitemmaster",
//         icon: <i className="ti ti-tag fs-16 me-2"></i>  
//        },

//       { name: "PO", 
//         path: "/accpo",
//         icon: <i className="ti ti-tag fs-16 me-2"></i>  
//        },
      
//        { name: "Purchase", 
//         path: "/accpurchase",
//         icon: <i className="ti ti-tag fs-16 me-2"></i> },

//        { name: "Outward", 
//         path: "/accoutward",
//         icon: <i className="ti ti-tag fs-16 me-2"></i> },

//       { name: "Inward", 
//         path: "/accinward",
//         icon: <i className="ti ti-tag fs-16 me-2"></i> },

//       { name: "Return", 
//         path: "/accreturn",
//         icon: <i className="ti ti-tag fs-16 me-2"></i> },

//       { name: "Production Issue", 
//         path: "/accproductionissue",
//         icon: <i className="ti ti-tag fs-16 me-2"></i> },

//       { name: "Production Return", 
//         path: "/accproductionreturn",
//         icon: <i className="ti ti-tag fs-16 me-2"></i> },
      
//        { name: "Stock Transfer", 
//         path: "/accstocktransfer",
//         icon: <i className="ti ti-tag fs-16 me-2"></i> },

//        { name: "Add or Deduct", 
//         path: "/accaddordeduct",
//         icon: <i className="ti ti-tag fs-16 me-2"></i> },

//       { name: "Status View", 
//         path: "/accstatusview",
//         icon: <i className="ti ti-tag fs-16 me-2"></i> },

//       { name: "Stock Report", 
//         path: "/accstockreport",
//         icon: <i className="ti ti-tag fs-16 me-2"></i> },
//     ],

// general: [
//   {
//     name: "General",
//     path: "/general",
//     icon: <i className="ti ti-chart-bar fs-16 me-2"></i>
//   }
// ],




// accounts: [
//   {
//     name: "Party",
//     path: "/accounts/party",
//     icon: <i className="ti ti-user fs-16 me-2"></i>,
//   },
//   {
//     name: "Supplier",
//     path: "/accounts/supplier",
//     icon: <i className="ti ti-building fs-16 me-2"></i>,
//   },
//   {
//     name: "GST Bills Inward",
//     path: "/accounts/gst-bills-inward",
//     icon: <i className="ti ti-file-invoice fs-16 me-2"></i>,
//   },
//   {
//     name: "Cash Bills Inward",
//     path: "/accounts/cash-bills-inward",
//     icon: <i className="ti ti-cash fs-16 me-2"></i>,
//   },
//   {
//     name: "Yarn Purchase Bills",
//     path: "/accounts/yarn-purchase-bills",
//     icon: <i className="ti ti-file-text fs-16 me-2"></i>,
//   },
//   {
//     name: "Fabric Purchase Bills",
//     path: "/accounts/fabric-purchase-bills",
//     icon: <i className="ti ti-file-description fs-16 me-2"></i>,
//   },
//   {
//     name: "Accessory Purchase Bills",
//     path: "/accounts/accessory-purchase-bills",
//     icon: <i className="ti ti-clipboard fs-16 me-2"></i>,
//   },
//   {
//     name: "Yarn Process Bills",
//     path: "/accounts/yarn-process-bills",
//     icon: <i className="ti ti-recycle fs-16 me-2"></i>,
//   },
//   {
//     name: "Fabric Process Bills",
//     path: "/accounts/fabric-process-bills",
//     icon: <i className="ti ti-folders fs-16 me-2"></i>,
//   },
//   {
//     name: "Garment Process Bills",
//     path: "/accounts/garment-process-bills",
//     icon: <i className="ti ti-shirt fs-16 me-2"></i>,
//   },
//   {
//     name: "GST Files",
//     path: "/accounts/gst-files",
//     icon: <i className="ti ti-file-certificate fs-16 me-2"></i>,
//   },
//   {
//     name: "Tally Import",
//     path: "/accounts/tally-import",
//     icon: <i className="ti ti-database-import fs-16 me-2"></i>,
//   },
//   {
//     name: "Status View",
//     path: "/accounts/status-view",
//     icon: <i className="ti ti-eye fs-16 me-2"></i>,
//   },
//   {
//     name: "Collections",
//     path: "/accounts/collections",
//     icon: <i className="ti ti-coin fs-16 me-2"></i>,
//   },
//   {
//     name: "Payments",
//     path: "/accounts/payments",
//     icon: <i className="ti ti-credit-card fs-16 me-2"></i>,
//   },
//   {
//     name: "Party Balance",
//     path: "/accounts/party-balance",
//     icon: <i className="ti ti-scale fs-16 me-2"></i>,
//   },
//   {
//     name: "Supplier Balance",
//     path: "/accounts/supplier-balance",
//     icon: <i className="ti ti-file-dollar fs-16 me-2"></i>,
//   },
// ],


//     misstock: [
//       { name: "Misstock1", icon: <i className="ti ti-package fs-16 me-2"></i> },
//       { name: "Misstock2", icon: <i className="ti ti-box fs-16 me-2"></i> },
//     ],

//     maintenance: [
//       {
//         name: "Maintenance1",
//         icon: <i className="ti ti-settings fs-16 me-2"></i>,
//       },
//       {
//         name: "Maintenance2",
//         icon: <i className="ti ti-tools fs-16 me-2"></i>,
//       },
//     ],
  };

  const MenuItems = ({ onClick }) => (
    <>
      {/* <li className="submenu">
        <a
          href="javascript:void(0);"
          onClick={() => onClick("master")}
          style={{ color: activeMenu === "master" ? "orange" : "inherit" }}
        >
          <i className="ti ti-layout-grid fs-16 me-2"></i>
          <span>MASTER</span>
          <span
            className="menu-arrow"
            style={{
              display: "inline-block",
              transition: "transform 0.3s ease",
              transform:
                activeMenu === "master" ? "rotate(0deg)" : "rotate(180deg)",
            }}
          ></span>
        </a>
      </li> */}

      {/* <li className="submenu">
        <a
          href="javascript:void(0);"
          onClick={() => onClick("yarn")}
          style={{ color: activeMenu === "yarn" ? "orange" : "inherit" }}
        >
          <i className="ti ti-brand-unity fs-16 me-2"></i>
          <span> YARN </span>
          <span
            className="menu-arrow"
            style={{
              display: "inline-block",
              transition: "transform 0.3s ease",
              transform:
                activeMenu === "yarn" ? "rotate(0deg)" : "rotate(180deg)",
            }}
          ></span>
        </a>
      </li> */}

      {/* <li className="submenu">
        <a
          href="javascript:void(0);"
          onClick={() => onClick("fabrics")}
          style={{ color: activeMenu === "fabrics" ? "orange" : "inherit" }}
        >
          <i className="ti ti-layout-grid fs-16 me-2"></i>
          <span>FABRICS</span>
          <span
            className="menu-arrow"
            style={{
              display: "inline-block",
              transition: "transform 0.3s ease",
              transform:
                activeMenu === "fabrics" ? "rotate(0deg)" : "rotate(180deg)",
            }}
          ></span>
        </a>
      </li> */}
{/* 
      <li className="submenu">
        <a
          href="javascript:void(0);"
          onClick={() => onClick("garments")}
          style={{ color: activeMenu === "garments" ? "orange" : "inherit" }}
        >
          <i className="ti ti-users-group fs-16 me-2"></i>
          <span>GARMENTS</span>
          <span
            className="menu-arrow"
            style={{
              display: "inline-block",
              transition: "transform 0.3s ease",
              transform:
                activeMenu === "garments" ? "rotate(0deg)" : "rotate(180deg)",
            }}
          ></span>
        </a>
      </li> */}
{/* 
      <li className="submenu">
        <a
          href="javascript:void(0);"
          onClick={() => onClick("accessories")}
          style={{ color: activeMenu === "accessories" ? "orange" : "inherit" }}
        >
          <i className="ti ti-page-break fs-16 me-2"></i>
          <span>ACCESSORIES</span>
          <span
            className="menu-arrow"
            style={{
              display: "inline-block",
              transition: "transform 0.3s ease",
              transform:
                activeMenu === "accessories"
                  ? "rotate(0deg)"
                  : "rotate(180deg)",
            }}
          ></span>
        </a>
      </li> */}

      {/* <li className="submenu">
        <a
          href="javascript:void(0);"
          onClick={() => onClick("general")}
          style={{ color: activeMenu === "general" ? "orange" : "inherit" }}
        >
          <i className="ti ti-chart-bar fs-16 me-2"></i>
          <span>GENERAL</span>
          <span
            className="menu-arrow"
            style={{
              display: "inline-block",
              transition: "transform 0.3s ease",
              transform:
                activeMenu === "general" ? "rotate(0deg)" : "rotate(180deg)",
            }}
          ></span>
        </a>
      </li> */}

      {/* <li className="submenu">
        <a
          href="javascript:void(0);"
          onClick={() => onClick("accounts")}
          style={{ color: activeMenu === "accounts" ? "orange" : "inherit" }}
        >
          <i className="ti ti-settings fs-16 me-2"></i>
          <span>ACCOUNTS</span>
          <span
            className="menu-arrow"
            style={{
              display: "inline-block",
              transition: "transform 0.3s ease",
              transform:
                activeMenu === "accounts" ? "rotate(0deg)" : "rotate(180deg)",
            }}
          ></span>
        </a>
      </li> */}

      {/* <li className="submenu">
        <a
          href="javascript:void(0);"
          onClick={() => onClick("misstock")}
          style={{ color: activeMenu === "misstock" ? "orange" : "inherit" }}
        >
          <i className="ti ti-circle-plus fs-16 me-2"></i>
          <span>MISSTOCK</span>
          <span
            className="menu-arrow"
            style={{
              display: "inline-block",
              transition: "transform 0.3s ease",
              transform:
                activeMenu === "misstock" ? "rotate(0deg)" : "rotate(180deg)",
            }}
          ></span>
        </a>
      </li> */}

      {/* <li className="submenu">
        <a
          href="javascript:void(0);"
          onClick={() => onClick("maintenance")}
          style={{ color: activeMenu === "maintenance" ? "orange" : "inherit" }}
        >
          <i className="ti ti-circle-plus fs-16 me-2"></i>
          <span>MAINTAINENCE</span>
          <span
            className="menu-arrow"
            style={{
              display: "inline-block",
              transition: "transform 0.3s ease",
              transform:
                activeMenu === "maintenance"
                  ? "rotate(0deg)"
                  : "rotate(180deg)",
            }}
          ></span>
        </a>
      </li> */}
    </>
  );

//   return (
//     <>
//       <div
//         className="sidebar sidebar-horizontal"
//         id="horizontal-menu"
//         style={{ position: "relative" ,
//   background: "linear-gradient(180deg, #4B749F 0%, #092c4c 100%)",color:'white'
// }}
//       >
//         <div id="sidebar-menu-3" className="sidebar-menu">
//           <div className="main-menu">
//             {/* Main horizontal menu - stays in original position */}
//             <ul
//               className="nav-menu"
//               style={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 justifyContent: "center",
//               }}
//             >
//               <MenuItems onClick={handleMenuClick} />
//             </ul>
//           </div>
//         </div>

//         {/* Submenu bar - centered below main menu */}
//         {activeMenu && (
//           <div
//             style={{
//               position: "absolute",
//               top: "100%",
//               left: 0,
//               right: 0,
//               backgroundColor: "white",
//               borderTop: "1px solid #dee2e6",
//               padding: "10px",
//               zIndex: 1000,
//               boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: "8px",

//                 maxWidth: "100%",
//               }}
//             >
//              {subMenuData[activeMenu]?.map((item, index) => {

//   const isActiveSubmenu =
//     location.pathname === item.path ||
//     item.children?.some(child => child.path === location.pathname);

//   return (
//     <div
//       key={index}
//       onMouseEnter={() => setHoverMenu(index)}
//       onMouseLeave={() => {
//         if (!isActiveSubmenu) setHoverMenu(null);
//       }}
//       // style={{
//       //   position: "relative",
//       //   padding: "6px 12px",
//       //   cursor: "pointer",
//       //   display: "flex",
//       //   alignItems: "center",
//       //   color: isActiveSubmenu ? "orange" : "black",
//       //   fontWeight: isActiveSubmenu ? 700 : 600,
//       // }}
//     >
//       {/* {item.children ? (
//         <>
//           {item.icon}
//           <span>{item.name}</span>
//           <i className="ti ti-chevron-down ms-1"></i>
//         </>
//       ) : (
//         <Link
//           to={item.path}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "6px",
//             textDecoration: "none",
//             color: location.pathname === item.path ? "orange" : "black",
//             fontWeight: location.pathname === item.path ? "700" : "400",
//           }}
//         >
//           <span
//             style={{
//               color: location.pathname === item.path ? "orange" : "black",
//             }}
//           >
//             {item.icon}
//           </span>
//           <span>{item.name}</span>
//         </Link>
//       )} */}

//       {/* {item.children && hoverMenu === index && (
//         <div
//           style={{
//             position: "absolute",
//             top: "100%",
//             left: 0,
//             background: "#fff",
//             border: "1px solid #ddd",
//             padding: "8px",
//             zIndex: 9000,
//           }}
//         >
//           {item.children.map((child, idx) => (
//             <Link
//               key={idx}
//               to={child.path}
//               style={{
//                 padding: "5px 10px",
//                 textDecoration: "none",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//                 color:
//                   location.pathname === child.path ? "orange" : "black",
//                 fontWeight:
//                   location.pathname === child.path ? "700" : "400",
//               }}
//             >
//               <span
//                 style={{
//                   color:
//                     location.pathname === child.path ? "orange" : "black",
//                 }}
//               >
//                 {child.icon}
//               </span>
//               <span>{child.name}</span>
//             </Link>
//           ))}
//         </div>
//       )} */}
//     </div>
//   );
// })}


//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
};

export default HorizontalSidebar;
