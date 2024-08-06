import express from "express";
import {
  addAccountUser,
  deleteAccountUser,
  getAllUser,
  getCurrentUser,
  loginAccountAdmin,
  loginAccountCustomer,
  logoutAccount,
  registerAccount,
  updateAccountUser,
} from "../controllers/auth-controller.js";

const router = express.Router();

router.get("/my-account", getCurrentUser);
router.post("/register", registerAccount);
router.post("/login-customer", loginAccountCustomer);
router.post("/login-admin", loginAccountAdmin);
router.get("/logout", logoutAccount);
router.get("/get-all-user", getAllUser);
router.put("/update-user/:id", updateAccountUser);
router.post("/add-account-user", addAccountUser);
router.delete("/delete-user/:id", deleteAccountUser);

export default router;
