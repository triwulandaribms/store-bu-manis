import { Link } from "react-router-dom";

export default function ErrorPageAdmin() {
  return (
    <div className="h-screen flex flex-col justify-center items-center font-KumbhSans">
      <h1 className="text-4xl font-bold text-black mb-4">404 Not Found</h1>
      <p className="text-gray-600 mb-8">
        Maaf, halaman yang Anda cari tidak ditemukan.
      </p>
      <Link
        to={localStorage.getItem("role") === "admin" ? "/admin" : "/"}
        className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
