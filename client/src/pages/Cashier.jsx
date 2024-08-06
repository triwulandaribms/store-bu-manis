/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "./Admin";
import CashierCardProduct from "../components/CashierCardProduct";
import CashierCheckoutProduct from "../components/CashierCheckoutProduct";
import { FaCheckCircle } from "react-icons/fa";
import { api } from "../utils";

export default function Cashier() {
  const { products, cashier } = useContext(AdminContext);
  const [popUp, setPopUp] = useState(false);
  const [saleCustomer, setSaleCustomer] = useState({});
  const calculateSubTotal = () =>
    cashier.reduce((acc, curr) => acc + parseInt(curr.sub_total), 0);

  useEffect(() => {
    setSaleCustomer({
      id_customer: 1,
      sales: cashier,
      sub_total: calculateSubTotal(),
      discount: 0,
      total_sale: calculateSubTotal(),
      type_of_payment: "KASIR",
      address: "-",
    });
  }, [cashier]);

  return (
    <div className="bg-warm-gray flex text-teal">
      <div className="w-2/3">
        <div className="grid grid-cols-3 gap-5 px-4 py-4">
          {products
            ?.filter((p) => p.stock >= 1)
            .map((p) => (
              <CashierCardProduct
                key={p.id}
                id={p.id}
                name={p.name}
                image={p.image}
                price={p.price}
              />
            ))}
        </div>
      </div>
      <div className="w-1/3 m-5 border-2 border-teal flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center px-2 py-3">
            <h1 className="text-xl font-extrabold tracking-widest">Checkout</h1>
          </div>
          <div className="flex flex-row items-center justify-around bg-gray-300 py-1 px-3">
            <p className=" text-center text-base font-bold tracking-wider">
              Produk
            </p>
            <p className=" text-center text-base font-bold tracking-wider">
              Harga Produk
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {cashier?.map((c) => (
              <CashierCheckoutProduct
                key={c.id}
                id={c.id}
                name={c.name}
                price={c.price}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between px-6">
            <p className="font-bold text-xl">Total</p>
            <p className="font-bold text-xl">
              Rp{parseInt(calculateSubTotal()).toLocaleString("id-ID")}
            </p>
          </div>
          <div className="flex justify-between px-5 mb-5 gap-3">
            <button
              onClick={() => {
                api.delete("/cashier/delete-all").then(() => {
                  window.location.reload();
                });
              }}
              className="cursor-pointer bg-red-600 font-bold text-white w-full rounded-md py-2"
            >
              Batal Pesan
            </button>
            <button
              onClick={() => {
                setPopUp(!popUp);
              }}
              className="cursor-pointer bg-teal font-bold text-white w-full rounded-md py-2"
            >
              Bayar
            </button>
          </div>
        </div>
      </div>
      {popUp && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white z-10 w-1/4 flex flex-col items-center py-4 px-4 justify-between h-52 rounded-lg">
            <FaCheckCircle className="text-teal w-16 h-16" />
            <h1>Pesanan telah berhasil diselesaikan</h1>
            <button
              onClick={() => {
                setSaleCustomer({
                  id_customer: 1,
                  sales: cashier,
                  sub_total: calculateSubTotal(),
                  discount: 0,
                  total_sale: calculateSubTotal(),
                  type_of_payment: "KASIR",
                  address: "-",
                });
                api
                  .post("/sale/add", saleCustomer)
                  .then((res) => alert(res.msg));
                api.delete("/cashier/delete-all");
                setSaleCustomer({});
                setPopUp(!popUp);
                window.location.reload();
              }}
              className="bg-teal text-white py-2 w-full rounded-md"
            >
              Oke
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
