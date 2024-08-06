/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AllContext } from "../App";
import CardProduct from "../components/CardProduct";
import { FiSearch } from "react-icons/fi";
import { TbSortDescending2, TbSortAscending2 } from "react-icons/tb";

export default function Shop() {
  const {
    products,
    keyword,
    setKeyword,
    sortPrice,
    setSortPrice,
    sortBy,
    setSortBy,
    category,
    // setCategory,
  } = useContext(AllContext);

  const filteredSortedProducts = products
    .sort((a, b) => {
      if (sortPrice === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter((product) => product.name.toLowerCase().includes(keyword));

  return (
    <div className="flex flex-col bg-warm-gray">
      <div className="mx-5 my-5 flex justify-evenly flex-row gap-8 py-4 px-3 bg-teal border-2 border-white  rounded-lg">
        <div className="flex items-center">
          <h1 className="text-xl tracking-widest font-bold text-white">
            FILTER PRODUK
          </h1>
        </div>
        <div className="flex items-center  px-2">
          <input
            type="text"
            placeholder="Cari nama produk"
            className="py-2 px-2 outline-none bg-transparent border-b-[1px] focus:text-white placeholder:text-white placeholder:font-semibold placeholder:tracking-wider"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <FiSearch className="text-white" />
        </div>
        <div
          className="flex flex-row gap-4 items-center rounded-md py-3 px-2 outline-none cursor-pointer"
          onClick={() => {
            sortPrice === "asc" ? setSortPrice("desc") : setSortPrice("asc");
          }}
        >
          <label htmlFor="" className="text-white font-semibold tracking-wider">
            Urutkan harga
          </label>
          {sortPrice === "asc" ? (
            <TbSortAscending2 className="text-2xl text-white " />
          ) : (
            <TbSortDescending2 className="text-2xl text-white" />
          )}
        </div>
      </div>

      {filteredSortedProducts.length > 0 ? (
        <div className="grid grid-cols-4 gap-5 px-5 py-5">
          {filteredSortedProducts?.map((p) => (
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
      ) : (
        <div className="w-full py-5 px-5 mb-3">
          <h1 className="text-2xl text-center font-bold tracking-wider">
            Tidak ada produk ditemukan
          </h1>
        </div>
      )}
    </div>
  );
}
