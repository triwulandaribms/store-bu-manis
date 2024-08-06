/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { AllContext } from "../App";
import { PiHandsPrayingBold } from "react-icons/pi";
import { api } from "../utils";
import CardProduct from "../components/CardProduct";
import Loading from "../components/Loading";

import { FaPlus, FaMinus } from "react-icons/fa6";

export default function DetailProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useContext(AllContext);
  const product = products.find((p) => p.id == parseInt(id));
  const [cartProduct, setCartProduct] = useState({});

  const productsLike = products
    .filter((p) => p.id !== localStorage.getItem("id_product"))
    .slice(0, 4);

  useEffect(() => {
    setCartProduct({
      id_customer: localStorage.getItem("id"),
      id_product: localStorage.getItem("id_product"),
      total_product: 1,
    });
  }, []);

  console.log(product);

  if (product?.id) {
    return (
      <div className="bg-warm-gray font-poppins text-teal py-6">
        <div className="flex justify-center py-5">
          <h1 className="text-4xl font-bold tracking-wider">DETAIL PRODUK</h1>
        </div>
        <div className="mx-32 flex flex-row rounded-lg bg-teal text-white">
          <div className="w-96 rounded-lg">
            <img src={`/${product.image}`} alt="" className="rounded-s-lg" />
          </div>
          <div>
            <div className="my-10 mx-8 flex flex-col gap-5">
              <h1 className="text-4xl font-bold">{product.name}</h1>
              <h1 className="font-semibold text-2xl">
                Rp{parseInt(product.price).toLocaleString("id-ID")} {""}/Kg
              </h1>
              <p className="font-light text-xl">{product.description}</p>
            </div>
            {product?.stock > 0 ? (
              <div className="mt-16 mx-8 gap-5 flex items-center justify-between">
                <div className="flex gap-5 items-center">
                  <button className="py-3 px-3 bg-white rounded-full text-teal text-xl font-bold">
                    <FaMinus
                      onClick={() => {
                        if (cartProduct.total_product > 1) {
                          setCartProduct({
                            ...cartProduct,
                            total_product:
                              parseInt(cartProduct.total_product) - 1,
                          });
                        }
                      }}
                    />
                  </button>
                  <p className="text-2xl">{cartProduct.total_product}</p>
                  <button className="py-3 px-3 bg-white rounded-3xl text-teal text-xl font-bold">
                    <FaPlus
                      onClick={() => {
                        if (cartProduct.total_product < product.stock) {
                          setCartProduct({
                            ...cartProduct,
                            total_product:
                              parseInt(cartProduct.total_product) + 1,
                          });
                        }
                      }}
                    />
                  </button>
                </div>
                <button
                  onClick={() => {
                    if (localStorage.getItem("id")) {
                      api.post("/cart/add", cartProduct).then((res) => {
                        alert(res.msg);
                        window.location.href = "/cart";
                      });
                    } else {
                      alert("Anda harus login dahulu");
                      navigate("/login");
                    }
                  }}
                  className="w-full py-2 px-11 bg-white rounded-3xl text-teal text-xl font-bold tracking-wider"
                >
                  MASUKAN KERANJANG
                </button>
              </div>
            ) : (
              <div className="my-1 mx-8 flex flex-row items-center gap-3">
                <h1 className="text-center text-2xl font-bold">
                  MOHON MAAF STOK LAGI KOSONG
                </h1>
                <PiHandsPrayingBold className="text-2xl" />
              </div>
            )}
          </div>
        </div>
        <div className="w-full py-7">
          <h1 className="text-center text-2xl font-bold tracking-wider">
            ANDA JUGA MUNGKIN MENYUKAI
          </h1>
          <div className="grid grid-cols-4 gap-5 px-5 py-5">
            {productsLike?.map((p) => (
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
      </div>
    );
  } else {
    <Loading />;
  }
}
