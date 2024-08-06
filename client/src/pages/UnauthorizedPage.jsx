import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4 text-brown-dark">Akses Ditolak</h1>
      <p className="text-lg text-brown-dark font-medium mb-8">
        Anda tidak memiliki izin untuk mengakses halaman ini.
      </p>
      <Link to="/" className="text-brown-dark hover:underline">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
