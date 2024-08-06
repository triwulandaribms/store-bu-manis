import { useContext } from "react";
import CardProduct from "../components/CardProduct";
import { AllContext } from "../App";
import { Link } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";

export default function Home() {
  const { products } = useContext(AllContext);

  const testimonials = [
    {
      id: 1,
      name: "Andi",
      location: "Jakarta",
      message:
        "Awalnya saya ragu coba keripik pisang, tapi setelah gigitan pertama, langsung jatuh cinta! Rasanya manis alami, gak terlalu over. Anak-anak saya juga suka banget. Keripik Bu Manis jadi camilan favorit di rumah.",
    },
    {
      id: 2,
      name: "Siti",
      location: "Bandung",
      message:
        "Saya penggemar berat keripik tempe pedas Bu Manis. Pedasnya pas, gak bikin sakit perut tapi tetap bikin nagih. Teman-teman di kantor juga banyak yang suka setelah saya bawa untuk dicoba. Top banget!",
    },
    {
      id: 3,
      name: "Rahmat",
      location: "Medan",
      message:
        "Sebagai penikmat camilan pedas, keripik tempe pedas Bu Manis sangat memuaskan. Kualitas produknya luar biasa dan rasanya tidak mengecewakan. Sering saya jadikan oleh-oleh untuk keluarga di kampung.",
    },
  ];

  const filteredProducts = products.slice(1, 5);

  return (
    <div className="flex flex-col gap-16 bg-warm-gray font-poppins">
      <div className="px-24 py-10 flex flex-row gap-11 bg-teal text-white">
        <div className="flex flex-col py-3 gap-7 w-3/5">
          <div>
            <p className="text-6xl font-extrabold tracking-widest font-caveat">
              Kripik Bu Manis
            </p>
          </div>
          <p className="text-base tracking-normal">
            Kripik Bu Manis adalah pilihan tepat untuk pecinta camilan gurih dan
            renyah. Kami menggunakan bahan-bahan alami berkualitas tinggi untuk
            memastikan setiap gigitan memberikan pengalaman rasa yang memuaskan.
            Dibuat dengan resep tradisional yang diwariskan secara
            turun-temurun, keripik kami menawarkan kombinasi sempurna antara
            rasa dan tekstur.
          </p>
          <Link to={"/shop"} className=" w-1/2">
            <button className="bg-white text-teal w-full py-3 font-bold tracking-wide rounded-md  hover:bg-transparent hover:text-white hover:outline hover:outline-white">
              Belanja Sekarang
            </button>
          </Link>
        </div>
        <div className="w-2/5">
          <img
            src="kripik singkong balado.jpg"
            alt=""
            className="w-full rounded-s-[40px]"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-3 m-auto">
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-teal font-extrabold text-3xl tracking-wider">
              BEST SELLER
            </h1>
            <p className="text-center text-teal font-semibold mb-6">
              Temukan produk-produk terbaik kami yang paling laris di pasaran.
              Dijamin enak dan berkualitas tinggi!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 px-5 py-2">
          {filteredProducts.map((p) => (
            <CardProduct
              key={p.id}
              id={p.id}
              name={p.name}
              image={p.image}
              price={p.price}
              description={p.description}
              stock={p.stock}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-3 m-auto">
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-teal font-extrabold text-3xl tracking-wider">
              TESTIMONI
            </h1>
            <p className="text-center text-teal font-semibold mb-6">
              Kepuasan pelanggan adalah prioritas utama kami
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 px-5 py-2 mb-16">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col rounded-lg items-center px-4 py-4 bg-teal text-white"
            >
              <div className="relative p-5 rounded-full -top-5 outline bg-white text-teal">
                <FaUserLarge size={25} />
              </div>
              <div className="flex flex-col items-center mb-5">
                <p className="text-base font-extrabold">{t.name}</p>
                <p className="text-sm">{t.location}</p>
              </div>
              <p className="text-center text-sm">{`" ${t.message} "`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
