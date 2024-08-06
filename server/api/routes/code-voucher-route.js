import express from "express";
import { verifyToken } from "../middleware/auth-middleware.js";
import {
  deleteCodeVoucher,
  getCodeVoucher,
} from "../controllers/code-voucher.js";

const router = express.Router();

router.get("/get/:id", getCodeVoucher); // Router untuk mendapatkan kode voucher by id customer
router.delete("/delete/:id", deleteCodeVoucher); // Router untuk menghapus data kode voucher berdasarkan id

export default router;
