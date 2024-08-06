/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { ImWhatsapp } from "react-icons/im";
import { FiFacebook, FiYoutube } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import { LuMapPin } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="py-12 px-4 font-poppins bg-gray-300 text-black">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Bantuan</h2>
          <ul>
            <li className="mb-2">FAQ</li>
            <li className="mb-2">Kebijakan Privasi</li>
            <li className="mb-2">Syarat dan Ketentuan</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Informasi</h2>
          <ul>
            <li className="mb-2">Tentang Kami</li>
            <li className="mb-2">Karir</li>
            <li className="mb-2">Blog</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Hubungi Kami</h2>
          <div className="flex items-center mb-2">
            <ImWhatsapp className="mr-2" />
            <span>08123456789</span>
          </div>
          <div className="flex items-center mb-2">
            <AiOutlineMail className="mr-2" />
            <span>info@example.com</span>
          </div>
          <div className="flex items-center">
            <LuMapPin className="mr-2" />
            <span>Jalan Contoh No. 123, Kota Contoh</span>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Ikuti Kami</h2>
          <div className="flex space-x-4">
            <Link to="/profile" className=" hover:text-gray-400 ">
              <FaInstagram className="text-xl" />
            </Link>
            <Link to="/wishlist" className=" hover:text-gray-400">
              <FiYoutube className="text-xl" />
            </Link>
            <Link to="/cart" className=" hover:text-gray-400">
              <FiFacebook className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
