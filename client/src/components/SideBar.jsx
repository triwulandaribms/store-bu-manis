import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { LuBoxes } from "react-icons/lu";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { FaCashRegister } from "react-icons/fa";

export default function SideBar() {
  return (
    <div className="font-poppins flex flex-col gap-7  h-screen w-40 py-4 px-4 bg-teal text-white">
      <div className=" text-center">
        <h1 className="text-xl font-bold tracking-widest">KRIPIK</h1>
        <h1 className="text-xl font-bold tracking-widest">BU MANIS</h1>
      </div>
      {localStorage.getItem("role") === "Super Admin" ? (
        <div className="flex flex-col justify-around h-full">
          <Link className="text-center flex flex-col gap-1 hover:cursor-pointer">
            <MdOutlineDashboard className="m-auto text-3xl" />
            <h1 className="text-base font-medium">Beranda</h1>
          </Link>
          <Link
            to="/admin/customer-user"
            className="text-center flex flex-col gap-1 hover:cursor-pointer"
          >
            <FiUsers className="m-auto text-3xl" />
            <h1 className="text-base font-medium">Pengguna</h1>
          </Link>
          <Link
            to="/admin/sales-report"
            className="text-center flex flex-col gap-1 hover:cursor-pointer"
          >
            <TiShoppingCart className="m-auto text-3xl" />
            <h1 className="text-base font-medium">Penjualan</h1>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <Link className="text-center flex flex-col gap-1 hover:cursor-pointer">
            <MdOutlineDashboard className="m-auto text-3xl" />
            <h1 className="text-base font-medium">Beranda</h1>
          </Link>
          <Link
            to="/admin/customer-user"
            className="text-center flex flex-col gap-1 hover:cursor-pointer"
          >
            <FiUsers className="m-auto text-3xl" />
            <h1 className="text-base font-medium">Customer</h1>
          </Link>
          <Link
            to="/admin/product"
            className="text-center flex flex-col gap-1 hover:cursor-pointer"
          >
            <LuBoxes className="m-auto text-3xl" />
            <h1 className="text-base font-medium">Produk</h1>
          </Link>
          <Link
            to="/admin/sales-report"
            className="text-center flex flex-col gap-1 hover:cursor-pointer"
          >
            <TiShoppingCart className="m-auto text-3xl" />
            <h1 className="text-base font-medium">Penjualan</h1>
          </Link>
          <Link
            to="/admin/cashier"
            className="text-center flex flex-col gap-1 hover:cursor-pointer"
          >
            <FaCashRegister className="m-auto text-3xl" />
            <h1 className="text-base font-medium">Kasir</h1>
          </Link>
        </div>
      )}
    </div>
  );
}
