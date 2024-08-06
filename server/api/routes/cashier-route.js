import express from "express";
import {
  addCashierProduct,
  deleteAllProductCashier,
  deleteProductCashier,
  getAllProductCashier,
} from "../controllers/cashier-controller.js";

const router = express.Router();

router.get("/get-all", getAllProductCashier);
router.post("/add", addCashierProduct);
router.delete("/delete/:id", deleteProductCashier);
router.delete("/delete-all", deleteAllProductCashier);

export default router;
