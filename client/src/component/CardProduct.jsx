/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export default function CardProduct({
    id,
    name,
    image,
    description,
    price,
    stock,
  }) {
    return (
      <div className="bg-teal flex flex-col justify-between font-poppins rounded-md">
        <div className="rounded-md">
          <img src={`/${image}`} alt="" className="rounded-md" />
          <div className="p-5 flex flex-col justify-between h-52">
            <div className="flex flex-col gap-1">
              <p className="text-xl text-white font-bold">{name}</p>
              <p className="text-base text-white font-bold">
                Rp{parseInt(price).toLocaleString("id-ID")}
              </p>
              <p className="text-xs font-medium text-white">{description}</p>
            </div>
            <div>
              <button
                className="py-3 px-5 bg-white rounded-lg w-full text-teal text-xs font-bold hover:text-white hover:bg-transparent hover:outline"
                onClick={() => {
                  localStorage.setItem("id_product", id);
                  window.location.href = `/product/${localStorage.getItem(
                    "id_product"
                  )}`;
                }}
              >
                PESAN SEKARANG
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  