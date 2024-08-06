import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { api } from "./utils.js";

export const AllContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [register, setRegister] = useState({});
  const [products, setProducts] = useState([]);
  const [codeVouchers, setCodeVouchers] = useState([]);
  const [sales, setSales] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [sortPrice, setSortPrice] = useState("asc");
  const [sortBy, setSortBy] = useState("price");

  useEffect(() => {
    api.get("/product/get-all").then((response) => setProducts(response));
    api
      .get(`/cart/get/${localStorage.getItem("id")}`)
      .then((response) => setCart(response));
    api
      .get(`/code/get/${localStorage.getItem("id")}`)
      .then((response) => setCodeVouchers(response));
    api
      .get(`/sale/get/${localStorage.getItem("id")}`)
      .then((response) => setSales(response));
  }, [user?.id]);

  return (
    <AllContext.Provider
      value={{
        products,
        setProducts,
        cart,
        setCart,
        register,
        setRegister,
        codeVouchers,
        setCodeVouchers,
        keyword,
        setKeyword,
        sortPrice,
        setSortPrice,
        sortBy,
        setSortBy,
        sales,
        setSales,
      }}
    >
      <Header />
      <Outlet context={[user, setUser]} />
      <Footer />
    </AllContext.Provider>
  );
}

export default App;
