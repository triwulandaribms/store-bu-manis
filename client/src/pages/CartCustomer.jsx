import NotLogin from "./NotLogin";
import { useContext, useEffect, useState } from "react";
import { AllContext } from "../App";
import CardCart from "../components/CardCart";
import NotCart from "./NotCart";
import { api } from "../utils";

export default function CartCustomer() {
  const { cart, codeVouchers } = useContext(AllContext);

  const [subTotal, setSubTotal] = useState(0);
  const [diskon, setDiskon] = useState(0);
  const [selectPayment, setSelectPayment] = useState("");
  const [address, setAddress] = useState("");
  const [checkCode, setCheckCode] = useState("");
  const [saleCustomer, setSaleCustomer] = useState({});

  const bankDetails = [
    {
      id: 1,
      name: "Bank Transfer - BCA",
    },
    {
      id: 2,
      name: "Bank Transfer - BRI",
    },
    {
      id: 3,
      name: "Bank Transfer - BNI",
    },
    {
      id: 4,
      name: "Bank Transfer - BSI",
    },
  ];

  useEffect(() => {
    if (Array.isArray(cart)) {
      const sum = cart.reduce(
        (acc, curr) =>
          acc + parseInt(curr.price) * parseInt(curr.total_product),
        0
      );
      setSubTotal(sum);
    }
  }, [cart, diskon]);

  const handlePayment = (e) => {
    setSelectPayment(e.target.value);
  };

  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  function handleIsReceiptOpen() {
    setIsReceiptOpen(!isReceiptOpen);
  }

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
    setSaleCustomer({
      id_customer: localStorage.getItem("id"),
      sales: cart,
      sub_total: subTotal,
      discount: diskon,
      total_sale: subTotal - diskon,
      type_of_payment: selectPayment,
      address: `${address}.`,
    });
  }, [address, cart, diskon, selectPayment, subTotal]);

  if (localStorage.getItem("id")) {
    return (
      <div className="flex flex-col gap-5 py-5 bg-warm-gray font-poppins text-teal">
        <h1 className="text-center font-extrabold text-teal tracking-widest text-2xl">
          KERANJANG
        </h1>
        {cart.length > 0 ? (
          <div className="flex flex-col gap-4 py-5 px-5">
            <div className="w-full p-3  flex flex-col gap-3">
              <div className="flex flex-row items-center">
                <h1 className="w-3/5 text-center text-base font-extrabold tracking-wider">
                  PRODUK
                </h1>
                <h1 className="w-1/5 text-center text-base font-extrabold tracking-wider">
                  JUMLAH PRODUK
                </h1>
                <h1 className="w-1/5 text-center text-base font-extrabold tracking-wider">
                  SUBTOTAL
                </h1>
              </div>
              <div className="flex flex-col">
                {cart.map((c) => (
                  <CardCart
                    key={c.id}
                    id_cart={c.id}
                    id_product={c.id_product}
                    name={c.name}
                    image={c.image}
                    total_product={c.total_product}
                    price={c.price}
                  />
                ))}
              </div>
            </div>
            <form className="w-full border h-fit border-teal bg-teal px-4 py-2 text-white">
              <div className="flex flex-row items-center justify-between py-4 border-b-[1px] border-white">
                <h1 className="text-base font-extrabold tracking-wider">
                  SUBTOTAL
                </h1>
                <h1 className="text-base font-extrabold tracking-wider">
                  Rp{subTotal.toLocaleString("id-ID")}
                </h1>
              </div>
              <div className=" flex w-full justify-between gap-5">
                <div className="w-1/2 py-4 border-b-[1px] border-white">
                  <form className="flex flex-row gap-2">
                    <input
                      type="text"
                      placeholder="MASUKAN KODE VOUCHER"
                      value={checkCode}
                      onChange={(e) => {
                        setCheckCode(e.target.value);
                      }}
                      className="w-full p-1 border text-black border-gray-300 rounded focus:outline-none placeholder:text-gray-500 placeholder:font-bold placeholder:tracking-wider"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const codeDiscount = codeVouchers.find(
                          (c) => c.code === checkCode
                        );
                        if (codeDiscount) {
                          alert(
                            `SELAMAT ANDA MENDAPATKAN POTONGAN BELANJA SEBESAR ${codeDiscount.discount}%`
                          );
                          localStorage.setItem("id_code", codeDiscount.id);
                          setDiskon(
                            (subTotal * parseInt(codeDiscount.discount)) / 100
                          );
                          setCheckCode("");
                        } else {
                          alert("KODE YANG DIMASUKAN TIDAK COCOK");
                        }
                      }}
                      className="bg-white rounded text-teal font-semibold px-2 tracking-wider"
                    >
                      SUBMIT
                    </button>
                  </form>
                </div>
                <div className="w-1/2 flex flex-row items-center  justify-between py-4 border-b-[1px] border-white">
                  <h1 className="text-base font-extrabold tracking-wider">
                    DISKON
                  </h1>
                  <h1 className="text-base font-extrabold tracking-wider">
                    Rp{diskon.toLocaleString("id-ID")}
                  </h1>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between py-4 border-b-[1px] border-white">
                <h1 className="text-base font-extrabold tracking-wider">
                  TOTAL
                </h1>
                <h1 className="text-base font-extrabold tracking-wider">
                  Rp{(subTotal - diskon).toLocaleString("id-ID")}
                </h1>
              </div>
              <div className="flex flex-col justify-between py-2 border-b-[1px] border-white">
                <h1 className="text-base font-extrabold tracking-wider">
                  METODE PEMBAYARAN
                </h1>
                <div className="">
                  {bankDetails.map((b) => (
                    <label key={b.id} className="flex items-center gap-2">
                      <input
                        required
                        type="radio"
                        name="Metode Transfer"
                        value={b.name}
                        onChange={handlePayment}
                      />
                      {b.name}
                    </label>
                  ))}
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="COD"
                      name="Metode Transfer"
                      onChange={handlePayment}
                    />
                    COD
                  </label>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between py-4 border-b-[1px] border-white">
                <textarea
                  placeholder="MASUKAN ALAMAT PENGIRIMAN"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows={5}
                  className="w-full p-1 border text-black border-gray-300 rounded focus:outline-none placeholder:text-gray-500 placeholder:font-bold placeholder:tracking-wider"
                ></textarea>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (address != "" && handlePayment != "") {
                    setIsReceiptOpen(!isReceiptOpen);
                  }
                }}
                className="w-full flex justify-center py-4 mb-2 bg-white outline outline-white text-teal cursor-pointer hover:bg-teal hover:text-white"
              >
                <h1 className="text-base font-extrabold tracking-wider">
                  CHECKOUT
                </h1>
              </button>
            </form>
          </div>
        ) : (
          <NotCart />
        )}
        {isReceiptOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-teal text-white w-full max-w-4xl h-5/6 p-6 rounded-lg shadow-lg overflow-y-auto relative">
              <button
                className="absolute text-xl top-4 right-4  font-bold"
                onClick={handleIsReceiptOpen}
              >
                &#x2715;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center">
                STRUK PEMBELIAN
              </h2>
              <table className="my-3 font-medium">
                <tr>
                  <td>NAMA CUSTOMER</td>
                  <td> : {localStorage.getItem("name").toLocaleUpperCase()}</td>
                </tr>
                <tr>
                  <td>ALAMAT</td>
                  <td>: {address.toLocaleUpperCase()}</td>
                </tr>
                <tr>
                  <td>WAKTU</td>
                  <td>: {currentDate}</td>
                </tr>
              </table>
              <div className=" p-3  flex flex-col gap-3 border-b-2 border-white">
                <div className="flex flex-row items-center border-y-2 border-white py-2">
                  <h1 className="w-3/6 text-base font-extrabold tracking-wider">
                    PRODUK
                  </h1>
                  <h1 className="w-2/6 text-center text-base font-extrabold tracking-wider">
                    JUMLAH PRODUK
                  </h1>
                  <h1 className="w-1/6 text-base font-extrabold tracking-wider">
                    SUBTOTAL
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  {cart.map((c) => (
                    <div key={c.id} className="flex">
                      <p className="w-3/6 text-base font-medium tracking-wider">
                        {c.name}
                      </p>
                      <p className="w-2/6 text-center text-base font-medium tracking-wider">
                        {c.total_product}
                      </p>
                      <p className="w-1/6 text-base font-medium tracking-wider">
                        Rp {parseInt(c.price).toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex mt-4">
                <div className="ml-auto w-full flex flex-col gap-3">
                  <div className="w-1/3 flex justify-between py-1 ml-auto border-b-2 border-teal">
                    <p className="text-base font-extrabold tracking-wider">
                      SUBTOTAL
                    </p>
                    <p className="text-base font-medium tracking-wider">
                      Rp{subTotal.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="w-1/3 flex justify-between py-1 ml-auto border-b-2 border-teal">
                    <p className="text-base font-extrabold tracking-wider">
                      DISKON
                    </p>
                    <p className="text-base font-medium tracking-wider">
                      Rp. {diskon == 0 ? "-" : diskon.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="w-1/3 flex justify-between py-1 ml-auto border-b-2 border-teal">
                    <p className="text-base font-extrabold tracking-wider">
                      TOTAL
                    </p>
                    <p className="text-base font-medium tracking-wider">
                      Rp{(subTotal - diskon).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
              {selectPayment === "COD" ? (
                <div className="mt-5">
                  <h2 className="text-xl font-bold mb-4">
                    Informasi Pembayaran
                  </h2>
                  <p className="mt-4">
                    Jika barang sampai harap membayar sesuai dengan pesanan yang
                    ada
                  </p>
                  <p className="mt-4">Sekian dan Terima Kasih</p>
                </div>
              ) : (
                <div className="mt-5">
                  <h2 className="text-xl font-bold mb-4">
                    Informasi Pembayaran
                  </h2>
                  <ul className="list-disc pl-6">
                    <li>
                      <span className="font-bold">Nama Bank:</span> BCA
                    </li>
                    <li>
                      <span className="font-bold">Nomor Rekening:</span>
                      1234567890
                    </li>
                    <li>
                      <span className="font-bold">Atas Nama:</span> Bu Manis
                    </li>
                  </ul>
                  <p className="mt-4">
                    Segera transfer ke nomor rekening di atas, dan setelah
                    transfer selesai, silakan kirimkan bukti transfer ke nomor
                    WhatsApp 08xxxxxx.
                  </p>
                  <p className="mt-4">
                    Jika bukti transfer sudah diterima, pesanan akan segera
                    diproses.
                  </p>
                </div>
              )}
              <div className="flex">
                <div className="ml-auto flex gap-5">
                  <button
                    className="bg-white font-bold text-teal outline rounded-lg  hover:bg-transparent hover:text-white py-2 px-10 hover:outline-2 hover:outline-white"
                    onClick={() => {
                      setIsReceiptOpen(!isReceiptOpen);
                    }}
                  >
                    BATAL
                  </button>
                  <button
                    className="bg-white font-bold text-teal outline rounded-lg hover:bg-transparent hover:text-white py-2 px-10 hover:outline-2 hover:outline-white"
                    onClick={(e) => {
                      e.preventDefault();
                      if (selectPayment == "" || address == "") {
                        alert(
                          "METODE PEMBAYARAN DAN ALAMAT PENGIRIMAN JANGAN SAMPAI KOSONG"
                        );
                      } else {
                        setSaleCustomer({
                          id_customer: localStorage.getItem("id"),
                          sales: cart,
                          sub_total: subTotal,
                          discount: diskon,
                          total_sale: subTotal - diskon,
                          type_of_payment: selectPayment,
                          address: `${address}.`,
                        });
                        api.post("/sale/add", saleCustomer).then((res) => {
                          alert(res.msg);
                        });
                        if (saleCustomer.discount) {
                          api.delete(
                            `/code/delete/${localStorage.getItem("id_code")}`
                          );
                        }
                        window.location.href = "/profile";
                        saleCustomer({});
                        setIsReceiptOpen(!isReceiptOpen);
                      }
                    }}
                  >
                    PESAN
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <NotLogin />;
  }
}
