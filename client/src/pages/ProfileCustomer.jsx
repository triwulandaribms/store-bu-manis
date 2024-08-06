import { useContext } from "react";
import Loading from "../components/Loading";
import { api } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { AllContext } from "../App";

export default function ProfileCustomer() {
  const { sales, codeVouchers } = useContext(AllContext);

  const navigate = useNavigate();

  if (localStorage.getItem("id")) {
    return (
      <div className="py-6 px-7 font-poppins bg-warm-gray text-teal">
        <h2 className="text-2xl font-bold mb-4">Data Akun</h2>
        <div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Kode Konsumen</label>
            <input
              type="text"
              value={localStorage.getItem("customer_code")}
              disabled
              className="w-full border-2 border-teal px-2 py-2 font-semibold tracking-widest"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Nama</label>
            <input
              type="text"
              value={localStorage.getItem("name")}
              disabled
              className="w-full border-2 border-teal px-2 py-2 font-semibold tracking-widest"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Password</label>
            <input
              type="text"
              value="******"
              disabled
              className="w-full border-2 border-teal px-2 py-2 font-semibold tracking-widest"
            />
          </div>
        </div>
        <div className="mt-8">
          {codeVouchers?.length > 0 ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Daftar Kode Vocuher</h2>
              <table className="w-1/2">
                <thead className="flex flex-col gap-3 border-y-[1px] border-teal">
                  <tr className="py-2 px-4 grid grid-cols-3">
                    <td>No</td>
                    <td className="text-center">Kode Voucher</td>
                    <td className="text-center">Total Diskon</td>
                  </tr>
                </thead>
                <tbody className="flex flex-col gap-3">
                  {codeVouchers?.map((c, index) => (
                    <tr key={c.id} className="py-2 px-4 grid grid-cols-3">
                      <td>{index + 1}</td>
                      <td className="text-center">{c.code}</td>
                      <td className="text-center">{`${c.discount} %`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Daftar Pesanan</h2>
          {sales?.length > 0 ? (
            <div className="flex flex-col gap-4">
              <table className="w-full">
                <thead className="flex flex-col gap-3 border-y-[1px] border-teal">
                  <tr className="py-2 px-4 grid grid-cols-5">
                    <td>Gambar</td>
                    <td>Kode Voucher</td>
                    <td>Total Diskon</td>
                    <td>Total Diskon</td>
                    <td>Total Diskon</td>
                  </tr>
                </thead>
                <tbody className="flex flex-col gap-3">
                  {sales?.map((s) => (
                    <tr key={s.id} className="py-2 px-4 grid grid-cols-5">
                      <td>
                        <img src={s.image} alt="" className="w-10" />
                      </td>
                      <td>{s.name}</td>
                      <td>
                        Rp
                        {(
                          parseInt(s.price) * parseInt(s.total_product)
                        ).toLocaleString("id-ID")}
                      </td>
                      <td className="px-10">{s.total_product}</td>
                      <td>{s.type_of_payment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center py-5 gap-5">
              <h1 className="text-center font-bold text-xl">
                Tidak ada pesanan yang sedang sudah selesai.
              </h1>
              <Link
                to="/shop"
                className="bg-teal w-1/4 text-center text-white hover:bg-transparent hover:text-teal hover:outline font-bold tracking-wide py-3 px-7"
              >
                Kembali Belanja
              </Link>
            </div>
          )}
        </div>
        <div className="w-full flex mt-5 justify-end gap-3">
          <button
            onClick={() => {
              if (confirm("Apakah yakin anda akan logout ?")) {
                api.get("/auth/logout").then(() => {
                  localStorage.clear();
                  window.location.href = "/login";
                });
              }
            }}
            className="w-1/3 bg-teal font-bold tracking-wide text-white py-3 hover:bg-transparent hover:outline hover:outline-teal hover:text-teal"
          >
            Keluar Akun
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Loading />;
        {setTimeout(() => {
          navigate("/login");
        }, 500)}
      </div>
    );
  }
}
