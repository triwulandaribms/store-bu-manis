import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import ProductRoute from "./routes/product-route.js";
import AuthRoute from "./routes/auth-route.js";
import CartRoute from "./routes/cart-route.js";
import CodeVoucherRoute from "./routes/code-voucher-route.js";
import SaleRoute from "./routes/sale-route.js";
import CustomerRoute from "./routes/customer-route.js";
import CashierRoute from "./routes/cashier-route.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const router = express.Router();
app.use("/api", router);

router.use("/product", ProductRoute);
router.use("/auth", AuthRoute);
router.use("/cart", CartRoute);
router.use("/code", CodeVoucherRoute);
router.use("/sale", SaleRoute);
router.use("/customer", CustomerRoute);
router.use("/cashier", CashierRoute);

app.listen(process.env.API_PORT, () =>
  console.log("Server berhasil dijalankan.")
);
