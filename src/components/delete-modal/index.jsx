import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AppAlert from "../AppAlert";

import { deleteShift } from "../../Redux/Master/shiftSlice";

// import { deleteParty } from "../../Redux/Master/partySlice";
// import { deleteOrder } from "../../Redux/Master/OrderSlice";
// import { deleteStyle } from "../../Redux/Master/StyleSlice";
// import { deleteSize } from "../../Redux/Master/SizeSlice";
// import { deleteOrderGroup } from "../../Redux/Master/OdergrpSlice";
// import { deleteSizeGroup } from "../../Redux/Master/SizegrpSlice";
// import { deleteYarnType } from "../../Redux/Master/YarntypeSlice";
// import { deleteCount } from "../../Redux/Master/CountSlice";
// import { deleteDia } from "../../Redux/Master/DiaSlice";
// import { deleteClothDes } from "../../Redux/Master/ClothDesSclice";
// import { deleteColor } from "../../Redux/Master/ColorsSlice";
// import { deleteFabricProcess } from "../../Redux/Master/FabricProcessSlice";
// import { deleteGstTax } from "../../Redux/Master/GstTaxSlice";
// import { deleteProcessMaster } from "../../Redux/Master/ProcessMasterSlice";
// import { deleteYarnPurchase } from "../../Redux/Yarn/YarnPurchaseSlice";
// import { deleteOngoingProcess } from "../../Redux/Yarn/OngoingSlice";
// import { deleteWindingProcess } from "../../Redux/Yarn/Outward/WindingSlice";
// import { deleteWindingInwardProcess } from "../../Redux/Yarn/Inward/WindingSlice"
// import { deleteYarnDyeingProcess } from "../../Redux/Yarn/Outward/YarnDyeingOutwardSlice";
// import { deleteTwistingProcess } from "../../Redux/Yarn/Outward/TwistingOutwardSlice";
// import { deleteYarnProcessReturnItem } from "../../Redux/Yarn/Return/YarnProcessReturnSlice";
// import { deleteReturnTwistingProcess } from "../../Redux/Yarn/Return/ReturntwistingSlice";
// import { deleteKnittingProcess } from "../../Redux/Yarn/Outward/knittingOutwardSlice";
// import { deleteCollarKnittingProcess } from "../../Redux/Yarn/Outward/CollarKnittingOutwardSlice";
// import { deleteReturnCollarKnittingProcess } from "../../Redux/Yarn/Return/ReturnCollarKnittingSlice";
// import { deleteReturnKnittingProcess } from "../../Redux/Yarn/Return/ReturnKnittingSlice";
// import { deleteFabricDyeingInwardProcess } from "../../Redux/Fabrics/Inward/FabricDyeingInwardSlice";
// import { getGarmentsPrintingOutwardProcesses } from "../../Redux/Garments/Outward/GarmentsPrintingOutwardSlice";

// import { deleteFabricDyeingOutwardProcess } from "../../Redux/Fabrics/Outward/FabricDyeingOutwardSlice";
// import { deleteFabricWashingOutwardProcess } from "../../Redux/Fabrics/Outward/FabricWashingOutwardSlice";
// import { deleteFabricWashingInwardProcess } from "../../Redux/Fabrics/Inward/FabricWashingInwardSlice";
// import { deleteFabricCompactingInwardProcess } from "../../Redux/Fabrics/Inward/FabricCompactingInwardSlice";
// import { deleteGarmentsCuttingOutward } from "../../Redux/Garments/Outward/GarmentsCuttingOutwardSlice";

// import { deleteFabricCompactingReturnProcess } from "../../Redux/Fabrics/Return/FabricCompactingReturnSlice";

// import { deleteFabricCompactingOutwardProcess } from "../../Redux/Fabrics/Outward/FabricCompactingOutwardSlice";
// // import { deleteFabricCompactingInwardProcess } from "../../Redux/Fabrics/Inward/FabricCompactingInwardSlice";
// import {
//   deletePrintingOutwardProcess,
//   deletePrintingOutwardItem,
// } from "../../Redux/Fabrics/Outward/FabricPrintingoutwardSlice";

// import { deleteFabricPO } from "../../Redux/Fabrics/PoSlice";
// import { deleteYarnPO } from "../../Redux/Yarn/PoSlice";

// import { deleteFabricPurchase } from "../../Redux/Fabrics/PurchaseSlice";
// import { deleteFabricPayment } from "../../Redux/Accounts/FabricPurchaseBillsSlice";
// import { deleteFabricOngoing } from "../../Redux/Fabrics/OngoingSlice";
// import { deleteFabricWashingReturnProcess } from "../../Redux/Fabrics/Return/FabricWashingReturnSlice";
// import { deleteFabricPrintingInwardProcess } from "../../Redux/Fabrics/Inward/FabricPrintingInwardSlice";
// // ADD THIS IMPORT
// import { deleteFabricDyeingReturnProcess } from "../../Redux/Fabrics/Return/fabricDyeingReturnSlice";

// import { deleteGarmentsCuttingInwardProcess } from "../../Redux/Garments/Inward/GarmentsCuttingInwardSlice";

// import { deleteFabricPrintingReturnProcess } from "../../Redux/Fabrics/Return/FabricPrintingReturnSlice";

// import { deleteGarmentsPO } from "../../Redux/Garments/GarmentPoSlice";

// import { deleteGarmentPurchase } from "../../Redux/Garments/GarmentPurchaseSlice";
// import {
//   deleteGarmentsPrintingOutwardProcessItem,
//   deleteOutwardCuttingProgram,
// } from "../../Redux/Garments/Outward/GarmentsPrintingOutwardSlice";
// import { deleteGarmentsSingerOutwardProcessItem } from "../../Redux/Garments/Outward/GarmentsSingerOutwardSlice";
// import { deleteGarmentsOverlockOutwardProcessItem } from "../../Redux/Garments/Outward/GarmentsOverlockOutwardSlice";

// import {
//   deleteGarmentsPrintingInwardProcessItem,
//   deleteInwardCuttingProgram,
//   getGarmentsPrintingInwardProcesses,
// } from "../../Redux/Garments/Inward/GarmentsPrintingInwardSlice";
// import { deleteGarmentsCheckingInwardProcessItem } from "../../Redux/Garments/Inward/GarmentsCheckingInwardSlice";
// import { deleteYarnPayment } from "../../Redux/Accounts/YarnPurchaseBillsSlice";
// import { deleteAccessoryPayment } from "../../Redux/Accounts/AccessoryPurchaseBillsSlice";

// import { deleteAccessoryPO } from "../../Redux/Accessories/accessoryPoSlice";


// import { deleteColor as acccolordelte } from "../../Redux/Accessories/itemSlice";

// import { deleteAccessoryPurchase } from "../../Redux/Accessories/accessoryPurchaseSlice";
// import { deleteProductionReturn } from "../../Redux/Accessories/ProductionReturnSlice";

// //Maintenance
// import { deleteEBBill } from "../../Redux/Maintenance/EBMaintenanceSlice";
// import { deleteFuelBill } from "../../Redux/Maintenance/FuelMaintenanceSlice";
// import { deleteGeneralBill } from "../../Redux/Maintenance/GeneralMaintenanceSlice";
// import { deleteMachineBill } from "../../Redux/Maintenance/MachineMaintenanceSlice";
// import { deleteMaintenanceCategory } from "../../Redux/Maintenance/CategorySlice";
// import { deleteMachine } from "../../Redux/Maintenance/MachineSlice";

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

    // if (type === "party") deleteAction = deleteParty(selectedId);
    // else if (type === "order") deleteAction = deleteOrder(selectedId);
    // else if (type === "style") deleteAction = deleteStyle(selectedId);
    // else if (type === "size") deleteAction = deleteSize(selectedId);
    // else if (type === "ordergroup") deleteAction = deleteOrderGroup(selectedId);
    // else if (type === "sizegroup") deleteAction = deleteSizeGroup(selectedId);
    // else if (type === "yarntype") deleteAction = deleteYarnType(selectedId);
    // else if (type === "counts") deleteAction = deleteCount(selectedId);
    // else if (type === "dia") deleteAction = deleteDia(selectedId);
    // else if (type === "clothdes") deleteAction = deleteClothDes(selectedId);
    // else if (type === "colors") deleteAction = deleteColor(selectedId);
    // else if (type === "fabricProcess")
    //   deleteAction = deleteFabricProcess(selectedId);
    // else if (type === "gstTax") deleteAction = deleteGstTax(selectedId);
    // else if (type === "ProcessMaster")
    //   deleteAction = deleteProcessMaster(selectedId);
    // else if (type === "yarnPurchase")
    //   deleteAction = deleteYarnPurchase(selectedId);
    // else if (type === "yarnPayment")
    //   deleteAction = deleteYarnPayment(selectedId);
    // else if (type === "ongoingProcess")
    //   deleteAction = deleteOngoingProcess(selectedId);
    // else if (type === "YarnPurchase-item")
    //   deleteAction = deleteYarnPurchase(selectedId);
    // else if (type === "Winding-item")
    //   deleteAction = deleteWindingProcess(selectedId);
    // else if (type === "Winding-inward-item")
    //   deleteAction = deleteWindingInwardProcess(selectedId);
    // else if (type === "YarnDyeing-item")
    //   deleteAction = deleteYarnDyeingProcess(selectedId);
    // else if (type === "fabricOutwardDyeing-item")
    //   deleteAction = deleteFabricDyeingOutwardProcess(selectedId);
    // else if (type === "Twisting-item")
    //   deleteAction = deleteTwistingProcess(selectedId);
    // else if (type === "YarnProcessReturn-item")
    //   deleteAction = deleteYarnProcessReturnItem(selectedId);
    // else if (type === "TwistingReturnItem")
    //   deleteAction = deleteReturnTwistingProcess(selectedId);
    // else if (
    //   type === "Knitting Outward" ||
    //   type === "knitting" ||
    //   type === "Knitting-item"
    // )
    //   deleteAction = deleteKnittingProcess(selectedId);
    // else if (
    //   type === "Knitting Outward" ||
    //   type === "knitting" ||
    //   type === "Knitting-item"
    // )
    //   deleteAction = deleteKnittingProcess(selectedId);
    // else if (
    //   type === "Return-Collar-Knitting-item" ||
    //   type === "returnCollarKnitting" ||
    //   type === "Return Collar Knitting"
    // ) {
    //   deleteAction = deleteReturnCollarKnittingProcess(selectedId);
    // } else if (
    //   type === "Return-Knitting-item" ||
    //   type === "returnKnitting" ||
    //   type === "Return Knitting"
    // ) {
    //   deleteAction = deleteReturnKnittingProcess(selectedId);
    // } else if (
    //   type === "Collar-Knitting-item" ||
    //   type === "collarKnitting" ||
    //   type === "Collar Knitting"
    // ) {
    //   deleteAction = deleteCollarKnittingProcess(selectedId);
    // } else if (type === "TwistingReturnItem")
    //   deleteAction = deleteReturnTwistingProcess(selectedId);
    // else if (type === "fabricPo") deleteAction = deleteFabricPO(selectedId);
    // else if (type === "yarnPo") deleteAction = deleteYarnPO(selectedId);
    // else if (type === "fabricPurchase")
    //   deleteAction = deleteFabricPurchase(selectedId);
    // else if (type === "fabricongoing")
    //   deleteAction = deleteFabricOngoing(selectedId);
    // else if (type === "fabricOutwardWashing-item")
    //   deleteAction = deleteFabricWashingOutwardProcess(selectedId);
    // else if (type === "fabricInwardWashing-item")
    //   deleteAction = deleteFabricWashingInwardProcess(selectedId);
    // else if (type === "fabricInwardDyeing-item")
    //   deleteAction = deleteFabricDyeingInwardProcess(selectedId);
    // else if (type === "returnwashingitem")
    //   deleteAction = deleteFabricWashingReturnProcess(selectedId);
    // else if (type === "fabricInwardCompacting-item")
    //   deleteAction = deleteFabricCompactingInwardProcess(selectedId);
    // else if (type === "fabricInwardPrinting-item")
    //   deleteAction = deleteFabricPrintingInwardProcess(selectedId);
    // else if (type === "fabricInwardWashing-item")
    //   deleteAction = deleteFabricWashingInwardProcess(selectedId);
    // else if (type === "fabricOutwardCompacting-item")
    //   deleteAction = deleteFabricCompactingOutwardProcess(selectedId);
    // else if (type === "Cuttinginwardgarments")
    //   deleteAction = deleteGarmentsCuttingInwardProcess(selectedId);
    // else if (type === "retundyeingitem") {
    //   deleteAction = deleteFabricDyeingReturnProcess(selectedId);
    // } else if (type === "returncompactingitem") {
    //   deleteAction = deleteFabricCompactingReturnProcess(selectedId);
    // } else if (type === "printing-outward-item")
    //   deleteAction = deletePrintingOutwardItem(selectedId);
    // else if (type === "returnprintingitem")
    //   deleteAction = deleteFabricPrintingReturnProcess(selectedId);
    // else if (type === "GarmentPo-items")
    //   deleteAction = deleteGarmentsPO(selectedId);
    // else if (type === "GarmentPurchaseitem")
    //   deleteAction = deleteGarmentPurchase(selectedId);
    // else if (type === "GarmentsOutwardOverlock-item")
    //   deleteAction = deleteGarmentsOverlockOutwardProcessItem(selectedId);
    // // selectedId = { deleteType, id }
    // else if (type === "TwistingReturnItem")
    //   deleteAction = deleteReturnTwistingProcess(selectedId);
    // else if (type === "fabricPo") deleteAction = deleteFabricPO(selectedId);
    // else if (type === "yarnPo") deleteAction = deleteYarnPO(selectedId);
    // else if (type === "fabricPurchase")
    //   deleteAction = deleteFabricPurchase(selectedId);
    // else if (type == "fabricPayment")
    //   deleteAction = deleteFabricPayment(selectedId);
    // else if (type == "accessoryPayment")
    //   deleteAction = deleteAccessoryPayment(selectedId);
    // else if (type === "fabricongoing")
    //   deleteAction = deleteFabricOngoing(selectedId);
    // else if (type === "fabricOutwardWashing-item")
    //   deleteAction = deleteFabricWashingOutwardProcess(selectedId);
    // else if (type === "fabricInwardWashing-item")
    //   deleteAction = deleteFabricWashingInwardProcess(selectedId);
    // else if (type === "fabricInwardDyeing-item")
    //   deleteAction = deleteFabricDyeingInwardProcess(selectedId);
    // else if (type === "returnwashingitem")
    //   deleteAction = deleteFabricWashingReturnProcess(selectedId);
    // else if (type === "fabricInwardCompacting-item")
    //   deleteAction = deleteFabricCompactingInwardProcess(selectedId);
    // else if (type === "fabricInwardPrinting-item")
    //   deleteAction = deleteFabricPrintingInwardProcess(selectedId);
    // else if (type === "fabricInwardWashing-item")
    //   deleteAction = deleteFabricWashingInwardProcess(selectedId);
    // else if (type === "fabricOutwardCompacting-item")
    //   deleteAction = deleteFabricCompactingOutwardProcess(selectedId);
    // else if (type === "retundyeingitem") {
    //   deleteAction = deleteFabricDyeingReturnProcess(selectedId);
    // } else if (type === "returncompactingitem") {
    //   deleteAction = deleteFabricCompactingReturnProcess(selectedId);
    // } else if (type === "printing-outward-item")
    //   deleteAction = deletePrintingOutwardItem(selectedId);
    // else if (type === "returnprintingitem")
    //   deleteAction = deleteFabricPrintingReturnProcess(selectedId);
    // else if (type === "GarmentPo-items")
    //   deleteAction = deleteGarmentsPO(selectedId);
    // else if (type === "GarmentPurchaseitem")
    //   deleteAction = deleteGarmentPurchase(selectedId);
    // else if (type === "GarmentsOutwardOverlock-item")
    //   deleteAction = deleteGarmentsOverlockOutwardProcessItem(selectedId);
    // //outward -gametns
    // else if (type === "GarmentsOutwardCutting-item")
    //   deleteAction = deleteGarmentsCuttingOutward(selectedId);
    // else if (type === "GarmentsOutwardPrinting-item") {
    //   // selectedId = { deleteType, id }

    //   if (selectedId.deleteType === "PURCHASE") {
    //     deleteAction = deleteGarmentsPrintingOutwardProcessItem(selectedId.id);
    //   } else if (selectedId.deleteType === "CUTTING") {
    //     deleteAction = deleteOutwardCuttingProgram(selectedId.id);
    //   }
    // } else if (type === "GarmentsoutwardEmberoidery-item")
    //   deleteAction = deleteOutwardCuttingProgram(selectedId.id);
    // else if (type === "GarmentsoutwardSinger-item")
    //   deleteAction = deleteOutwardCuttingProgram(selectedId.id);
    // else if (type === "GarmentsoutwardOverlock-item")
    //   deleteAction = deleteOutwardCuttingProgram(selectedId.id);
    // else if (type === "GarmentsoutwardKajoj-item")
    //   deleteAction = deleteOutwardCuttingProgram(selectedId.id);
    // else if (type === "GarmentsoutwardChecking-item")
    //   deleteAction = deleteOutwardCuttingProgram(selectedId.id);
    // else if (type === "GarmentsoutwardIroning-item")
    //   deleteAction = deleteOutwardCuttingProgram(selectedId.id);
    // else if (type === "Garmentsoutwardpacking-item")
    //   deleteAction = deleteOutwardCuttingProgram(selectedId.id);
    // //inward-garments
    // else if (type === "GarmentsinwardPrinting-item") {
    //   // selectedId = { deleteType, id }

    //   if (selectedId.deleteType === "PURCHASE") {
    //     deleteAction = deleteGarmentsPrintingInwardProcessItem(selectedId.id);
    //   } else if (selectedId.deleteType === "CUTTING") {
    //     deleteAction = deleteInwardCuttingProgram(selectedId.id);
    //   }
    // } else if (type === "GarmentsinwardChecking-item")
    //   deleteAction = deleteInwardCuttingProgram(selectedId);
    // else if (type === "GarmentsInwardEmberoidery-item")
    //   deleteAction = deleteInwardCuttingProgram(selectedId.id);
    // else if (type === "GarmentsInwardsinger-item")
    //   deleteAction = deleteInwardCuttingProgram(selectedId.id);
    // else if (type === "GarmentsInwardOverLock-item")
    //   deleteAction = deleteInwardCuttingProgram(selectedId.id);
    // else if (type === "GarmentsInwardKajoj-item")
    //   deleteAction = deleteInwardCuttingProgram(selectedId.id);
    // else if (type === "GarmentsinwardChecking-item")
    //   deleteAction = deleteInwardCuttingProgram(selectedId.id);
    // else if (type === "GarmentsInwardIroning-item")
    //   deleteAction = deleteInwardCuttingProgram(selectedId.id);
    // else if (type === "GarmentsInwardpacking-item")
    //   deleteAction = deleteInwardCuttingProgram(selectedId.id);
    // //ACCESSORIES
    // else if (type === "Acc-item") deleteAction = acccolordelte(selectedId);
    // //ACCESSORIES
    // else if (type === "AccessoryPo-items")
    //   deleteAction = deleteAccessoryPO(selectedId);
    // else if (type === "AccessoryProductionReturn")
    //   deleteAction = deleteProductionReturn(selectedId);
    // else if (type === "accpurchase")
    //   deleteAction = deleteAccessoryPurchase(selectedId);
    // //Maintenance
    // else if (type === "ebbills") deleteAction = deleteEBBill(selectedId);
    // else if (type === "fuelbills") deleteAction = deleteFuelBill(selectedId);
    // else if (type === "generalbills")
    //   deleteAction = deleteGeneralBill(selectedId);
    // else if (type === "serviceCategory")
    //   deleteAction = deleteMaintenanceCategory(selectedId);
    // else if (type === "machine")
    //   deleteAction = deleteMachine(selectedId);
    // else if (type === "machinebills")
    //   deleteAction = deleteMachineBill(selectedId);
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
