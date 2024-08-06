/* eslint-disable react/prop-types */
import { FaRegTrashAlt } from "react-icons/fa";
import { api } from "../utils";
export default function CashierCheckoutProduct({ id, name, price }) {
  return (
    <div className="flex justify-between py-1 px-2">
      <div className="flex items-center gap-3 w-full">
        <FaRegTrashAlt
          className="cursor-pointer"
          onClick={() => {
            api.delete(`/cashier/delete/${id}`).then(() => {
              window.location.reload();
            });
          }}
        />
        <p className="text-sm">{name}</p>
      </div>
      <div className="w-full">
        <p className="text-sm text-center">
          Rp{parseInt(price).toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
