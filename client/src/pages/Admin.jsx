import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { createContext, useEffect, useState } from "react";
import UnauthorizedPage from "./UnauthorizedPage.jsx";
import { api } from "../utils.js";

export const AdminContext = createContext();

export default function Admin() {
  const [products, setProducts] = useState();
  const [bestProducts, setBestProducts] = useState([]);
  const [bestCustomers, setBestCustomers] = useState([]);
  const [salesReport, setSalesReport] = useState([]);
  const [cashier, setCashier] = useState([]);
  const [user, setUser] = useState();
  const [customer, setCustomer] = useState();
  const [loading, setLoading] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const [popUp2, setPopUp2] = useState(false);
  const [editedProduct, setEditedProduct] = useState();
  const [editedUser, setEditedUser] = useState();
  const [editedCustomer, setEditedCustomer] = useState();

  useEffect(() => {
    setTimeout(() => {
      api.get("/product/get-all").then((res) => setProducts(res));
      api.get("/auth/get-all-user").then((res) => setUser(res));
      api.get("/customer/get-all-customer").then((res) => setCustomer(res));
      api.get("/sale/get-sales-report").then((res) => setSalesReport(res));
      api.get("/sale/get-best-product").then((res) => setBestProducts(res));
      api.get("/sale/get-best-customer").then((res) => setBestCustomers(res));
      api.get("/cashier/get-all").then((res) => setCashier(res));
      setLoading(false);
    }, 500);
  }, [products?.id]);

  if (
    localStorage.getItem("role") == "Super Admin" ||
    localStorage.getItem("role") == "Admin"
  ) {
    return (
      <AdminContext.Provider
        value={{
          products,
          setProducts,
          popUp,
          setPopUp,
          popUp2,
          setPopUp2,
          editedProduct,
          setEditedProduct,
          loading,
          setLoading,
          user,
          setUser,
          customer,
          setCustomer,
          editedUser,
          setEditedUser,
          editedCustomer,
          setEditedCustomer,
          salesReport,
          setSalesReport,
          bestProducts,
          setBestProducts,
          bestCustomers,
          setBestCustomers,
          cashier,
          setCashier,
        }}
      >
        <div className="flex h-screen overflow-hidden font-KumbhSans  bg-white text-black">
          {/* Sidebar */}
          <SideBar />
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Navbar */}
            <Navbar />
            {/* Main Content */}
            <Outlet />
            <Footer />
          </div>
        </div>
      </AdminContext.Provider>
    );
  } else {
    return <UnauthorizedPage />;
  }
}
