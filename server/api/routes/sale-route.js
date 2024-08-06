import express from "express";
import {
  addSalesCustomer,
  getBestCustomer,
  getBestProduct,
  getSaleByIdCustomer,
  getSalesReport,
} from "../controllers/sale-controller.js";

const router = express.Router();

router.get("/get-sales-report", getSalesReport);
router.get("/get-best-product", getBestProduct);
router.get("/get-best-customer", getBestCustomer);
router.post("/add", addSalesCustomer);
router.get("/get/:id", getSaleByIdCustomer);

export default router;
