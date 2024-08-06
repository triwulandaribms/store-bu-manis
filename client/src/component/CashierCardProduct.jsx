/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect, useState, useContext } from "react";
import { api } from "../utils";
import { AdminContext } from "../pages/Admin";

/* eslint-disable react/prop-types */
export default function CashierCardProduct({ id, name, image, price }) {
  const [cashierProduct, setCashierProduct] = useState({});
  const { cashier } = useContext(AdminContext);

  useEffect(() => {
    setCashierProduct({
      id_product: id,
      total_product: 1,
      price: price,
    });
  }, [id, price]);

  const handleProductClick = async () => {
    try {
      const productResponse = await api.get(`/product/get/${id}`);
      const currentStock = productResponse[0].stock;

      const totalInCart = cashier
        .filter((item) => item.id_product === id)
        .reduce((acc, curr) => {
          return acc + parseInt(curr.total_product);
        }, 0);

      console.log(totalInCart);
      if (totalInCart + 1 > currentStock) {
        alert("Stock tidak mencukupi");
        return;
      }

      // console.log("tertambah");
      await api.post("/cashier/add", cashierProduct);
      window.location.reload();
    } catch (error) {
      console.error("Error checking stock or adding product to cashier", error);
      alert("Terjadi kesalahan saat menambahkan produk ke keranjang");
    }
  };

  return (
    <div
      onClick={handleProductClick}
      className="bg-teal text-white cursor-pointer flex flex-col justify-between font-poppins rounded-md"
    >
      <div className="rounded-md">
        <img src={`/${image}`} alt="" className="rounded-md" />
        <div className="p-1 items-center flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-base text-center font-bold">{name}</p>
            <p className="text-base font-extrabold text-center text-teal">
              Rp{parseInt(price).toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
