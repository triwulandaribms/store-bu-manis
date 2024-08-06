import { useContext } from "react";
import { AdminContext } from "./Admin";
import { FaFileInvoiceDollar, FaBoxes } from "react-icons/fa";
import { FaUsersGear, FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function DashboardAdmin() {
  const { products, user, customer, salesReport, bestProducts, bestCustomers } =
    useContext(AdminContext);
  return (
    <div className="flex-1 bg-warm-gray text-teal">
      <div className="py-6 px-5">
        <div
          className={`grid gap-4 ${
            localStorage.getItem("role") == "Super Admin"
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          {localStorage.getItem("role") == "Super Admin" ? (
            <>
              <Link
                to="/admin/customer-user"
                className="flex flex-col items-center gap-2 bg-teal p-4 rounded-lg shadow-xl cursor-pointer text-white"
              >
                <FaUsersGear className="text-7xl" />
                <p className="text-4xl font-bold">{user?.length}</p>
                <h3 className="text-2xl font-bold">Admin</h3>
              </Link>
              <Link
                to="/admin/sales-report"
                className="flex flex-col items-center gap-2 bg-teal p-4 rounded-lg shadow-xl cursor-pointer text-white"
              >
                <FaFileInvoiceDollar className="text-7xl" />
                <p className="text-4xl font-bold">{salesReport?.length}</p>
                <h3 className="text-2xl font-bold">Penjualan</h3>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/admin/product"
                className="flex flex-col items-center gap-2 bg-teal p-4 rounded-lg shadow-xl cursor-pointer text-white "
              >
                <FaBoxes className="text-7xl" />
                <p className="text-4xl font-bold">{products?.length}</p>
                <h3 className="text-2xl font-bold">Produk</h3>
              </Link>
              <Link
                to="/admin/customer-user"
                className="flex flex-col items-center gap-2 bg-teal p-4 rounded-lg shadow-xl cursor-pointer text-white"
              >
                <FaUsers className="text-7xl" />
                <p className="text-4xl font-bold">{customer?.length}</p>
                <h3 className="text-2xl font-bold">Konsumen</h3>
              </Link>
              <Link
                to="/admin/sales-report"
                className="flex flex-col items-center gap-2 bg-teal p-4 rounded-lg shadow-xl cursor-pointer text-white"
              >
                <FaFileInvoiceDollar className="text-7xl" />
                <p className="text-4xl font-bold">{salesReport?.length}</p>
                <h3 className="text-2xl font-bold">Penjualan</h3>
              </Link>
            </>
          )}
        </div>
        <div className="grid grid-cols-2 gap-10 px-4 py-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold tracking-wider">
              Produk Terlaris
            </h2>
            <table className="w-full border-b-[1px] border-teal">
              <thead className="flex flex-col gap-3 border-y-[1px] border-teal font-bold">
                <tr className="py-2 px-4 grid grid-cols-9">
                  <td className="col-span-1 text-center">No</td>
                  <td className="col-span-4 text-center">Nama Produk</td>
                  <td className="col-span-4 text-center">Total Terjual</td>
                </tr>
              </thead>
              <tbody className="flex flex-col gap-3">
                {bestProducts?.map((b, index) => (
                  <tr key={b.id} className="py-2 px-4 grid grid-cols-9">
                    <td className="col-span-1 text-center">{index + 1}</td>
                    <td className="col-span-4 text-center">{b.name}</td>
                    <td className="col-span-4 text-center">{b.total_sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold tracking-wider">
              Pembeli Paling Royal
            </h2>
            <table className="w-full border-b-[1px] border-teal">
              <thead className="flex flex-col gap-3 border-y-[1px] border-teal font-bold">
                <tr className="py-2 px-4 grid grid-cols-9">
                  <td className="col-span-1 text-center">No</td>
                  <td className="col-span-4 text-center">Nama Konsumen</td>
                  <td className="col-span-4 text-center">Total Pembelian</td>
                </tr>
              </thead>
              <tbody className="flex flex-col gap-3">
                {bestCustomers?.map((b, index) => (
                  <tr key={b.id} className="py-2 px-4 grid grid-cols-9">
                    <td className="col-span-1 text-center">{index + 1}</td>
                    <td className="col-span-4 text-center">{b.name}</td>
                    <td className="col-span-4 text-center">{b.total_sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
