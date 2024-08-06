import { SlBag } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function NotCart() {
  return (
    <div className="flex flex-col items-center py-4 gap-5">
      <div className="relative">
        <div className="absolute -right-4 -top-2 text-white px-3 py-1 bg-teal rounded-full text-5xl">
          0
        </div>
        <SlBag className="text-9xl text-teal" />
      </div>
      <h1 className="text-2xl font-semibold text-teal">
        Keranjang masih kosong !!!
      </h1>
      <Link
        to="/shop"
        className="bg-teal font-bold text-white outline outline-teal hover:bg-transparent hover:text-teal py-3 px-7 hover:outline-1 hover:outline-teal"
      >
        Kembali Belanja
      </Link>
    </div>
  );
}
