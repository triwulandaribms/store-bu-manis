import { Link } from "react-router-dom";

export default function NotLogin() {
  return (
    <div className="py-40 flex flex-col items-center justify-center bg-warm-gray font-poppins">
      <h1 className="text-4xl font-extrabold text-teal mb-8">Oops!</h1>
      <p className="text-lg text-teal font-medium mb-4">
        Anda belum login. Silakan login terlebih dahulu untuk melanjutkan.
      </p>
      <Link
        to="/login"
        className="bg-teal border rounded-md border-teal hover:text-teal hover:bg-transparent hover:outline text-white font-bold py-2 px-6"
      >
        Login Sekarang
      </Link>
    </div>
  );
}
