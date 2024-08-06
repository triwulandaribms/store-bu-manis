/* eslint-disable react/no-unescaped-entities */
export default function AboutUs() {
    return (
      <div className="flex flex-col gap-5 py-5 text-teal font-medium bg-warm-gray font-poppins">
        <h1 className="text-center mt-5 font-bold tracking-widest text-3xl">
          TENTANG KAMI
        </h1>
        <div className="flex gap-10 px-7 py-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold tracking-wide">Overview</h1>
            <p className="text-lg leading-loose">
              Usaha Keripik Bu Manis adalah perusahaan yang didirikan atas
              semangat untuk menghadirkan rasa yang nikmat dan berkualitas dalam
              setiap gigitan keripik. Sejak awal berdiri pada tahun 2010, kami
              telah berkomitmen untuk memberikan pengalaman makan yang istimewa
              kepada pelanggan kami.
            </p>
            <p className="text-lg leading-loose">
              Setiap keripik yang kami hasilkan tidak hanya dibuat dengan cinta,
              tetapi juga dengan standar kualitas yang tinggi. Kami hanya
              menggunakan bahan-bahan terbaik yang dipilih dengan cermat untuk
              menciptakan cita rasa yang autentik dan memanjakan lidah Anda.
            </p>
          </div>
          <img src="/Aside About Us.jpg" alt="Gambar" className="w-4/12" />
        </div>
        <div className="flex gap-10 px-7 py-10">
          <img src="/Aside About Us 2.jpg" alt="Gambar" className="w-4/12" />
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold tracking-wide">
              Komitmen pada Kepuasan Pelanggan
            </h1>
            <p className="text-lg leading-loose">
              Kepuasan pelanggan adalah prioritas utama kami. Kami selalu
              mendengarkan masukan dan umpan balik dari pelanggan untuk terus
              meningkatkan kualitas produk dan layanan kami. Dengan sikap yang
              proaktif dan responsif, kami berusaha untuk memenuhi dan bahkan
              melebihi harapan pelanggan kami.
            </p>
            <p className="text-lg leading-loose">
              Terima kasih telah memilih Keripik Bu Manis sebagai teman setia Anda
              dalam menikmati camilan yang lezat dan memuaskan. Kami berharap
              dapat terus memberikan pengalaman makan yang tak terlupakan bagi
              Anda dan keluarga.
            </p>
          </div>
        </div>
      </div>
    );
  }
  