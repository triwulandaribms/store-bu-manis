import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="sticky top-0 py-6 px-5 font-poppins flex justify-between items-center bg-[#5F9EA0] text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-widest">{`HALO SELAMAT DATANG ${localStorage
          .getItem("name")
          .toLocaleUpperCase()}`}</h1>
      </div>
      <div className="">
        <Link to="/admin/profile" className="flex items-center gap-3">
          <p className="font-bold tracking-wider">Profil Akun</p>
          <FiUser className="text-2xl font-bold" />
        </Link>
      </div>
    </nav>
  );
}
