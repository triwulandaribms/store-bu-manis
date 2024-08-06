import express from "express";
import {
  addAccountCustomer,
  deleteAccountCustomer,
  getAllCustomer,
  updateAccountCustomer,
} from "../controllers/customer-controller.js";

const router = express.Router();

router.get("/get-all-customer", getAllCustomer);
router.post("/add-account-customer", addAccountCustomer);
router.put("/update-customer/:id", updateAccountCustomer);
router.delete("/delete-customer/:id", deleteAccountCustomer);

export default router;
