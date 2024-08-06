import { Link } from "react-router-dom";

export default function ErrorPageACust() {
  return (
    <div className="h-screen flex flex-col justify-center items-center font-KumbhSans">
      <h1 className="text-4xl font-extrabold text-teal mb-4">404 Not Found</h1>
      <p className="text-teal font-bold mb-8">
        Maaf, halaman yang Anda cari tidak ditemukan.
      </p>
      <Link
        to="/"
        className="bg-teal border text-white border-teal hover:bg-white hover:text-teal font-bold py-2 px-4 rounded"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
