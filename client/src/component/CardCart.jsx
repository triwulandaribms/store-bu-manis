/* eslint-disable react/prop-types */
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { api } from "../utils";

export default function CardCart({
  id_cart,
  id_product,
  name,
  image,
  total_product,
  price,
}) {
  return (
    <div className="flex flex-row items-center justify-between gap-5 py-2 border-b-[1px] border-black font-poppins">
      <IoCloseSharp
        className="text-2xl cursor-pointer"
        onClick={() => {
          api.delete(`/cart/delete/${id_cart}`).then(() => {
            window.location.reload();
          });
        }}
      />
      <div className="w-3/5 flex flex-row items-center gap-7 py-2">
        <img src={image} alt="" className="w-16" />
        <div className="flex flex-col gap-3">
          <h1 className="text-base font-extrabold tracking-wider">{name}</h1>
          <h1 className="text-sm  font-extrabold tracking-wider">
            {total_product} x Rp{parseInt(price).toLocaleString("id-ID")}
          </h1>
        </div>
      </div>
      <div className="w-1/5">
        <div className="flex flex-row items-center py-3 px-2 justify-between ">
          <FaMinus
            className="cursor-pointer"
            onClick={() => {
              if (total_product > 1) {
                api
                  .put(`/cart/update/${id_cart}`, {
                    id_customer: localStorage.getItem("id"),
                    id_product: id_product,
                    total_product: parseInt(total_product) - 1,
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }
            }}
          />
          <h1 className="font-extrabold">{total_product}</h1>
          <FaPlus
            className="cursor-pointer"
            onClick={() => {
              api
                .put(`/cart/update/${id_cart}`, {
                  id_customer: localStorage.getItem("id"),
                  id_product: id_product,
                  total_product: parseInt(total_product) + 1,
                })
                .then((res) => {
                  if (res.status === 404) {
                    alert(res.msg);
                  } else {
                    window.location.reload();
                  }
                });
            }}
          />
        </div>
      </div>
      <div className="w-1/5">
        <h1 className="text-base text-center font-extrabold tracking-wider">
          Rp
          {(parseInt(price) * parseInt(total_product)).toLocaleString("id-ID")}
        </h1>
      </div>
    </div>
  );
}
