import { useContext } from "react";
import { AdminContext } from "./Admin";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { api } from "../utils";

export default function ProductAdmin() {
  const { products, editedProduct, setEditedProduct, popUp, setPopUp } =
    useContext(AdminContext);

  return (
    <div className="p-5 min-h-64 bg-warm-gray text-teal">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Daftar Produk</h2>
        <div>
          <button
            onClick={() => {
              setEditedProduct({});
              setPopUp(!popUp);
            }}
            className="flex justify-between gap-2 items-center bg-teal hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
          >
            <MdOutlineAddBox /> Tambah Produk
          </button>
        </div>
      </div>
      <table className="w-full border-collapse border-2 border-teal">
        <thead>
          <tr>
            <th className="border-2 border-teal">No</th>
            <th className="border-2 border-teal ">Nama</th>
            <th className="border-2 border-teal ">Deskripsi</th>
            <th className="border-2 border-teal ">Harga</th>
            <th className="border-2 border-teal ">Stok</th>
            <th className="border-2 border-teal ">Gambar</th>
            <th className="border-2 border-teal ">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* Data rows */}
          {products?.map((p, index) => (
            <tr key={p.id}>
              <td className="border-2 border-teal px-4 py-2 text-center">
                {index + 1}
              </td>
              <td className="border-2 border-teal px-4 py-2 text-center">
                {p.name}
              </td>
              <td className="border-2 border-teal px-4 py-2 text-center">
                {p.description.slice(0, 25)}
                {p.description.length > 25 && "..."}
              </td>
              <td className="border-2 border-teal px-4 py-2 text-center">
                Rp{parseInt(p.price).toLocaleString("id-ID")}
              </td>
              <td className="border-2 border-teal px-4 py-2 text-center">
                {p.stock}
              </td>
              <td className="border-2 border-teal px-4 py-2 text-center">
                {p.image}
              </td>
              <td className="border border-teal px-4 py-2 flex justify-evenly">
                <button
                  onClick={() => {
                    setEditedProduct(p);
                    setPopUp(!popUp);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  <HiOutlinePencilAlt />
                </button>
                <button
                  onClick={() => {
                    if (
                      confirm(
                        `Apakah anda yakin ingin menghapus produk ${p.name}`
                      )
                    ) {
                      api.delete(`/product/delete/${p.id}`).catch((e) => {
                        console.log(e);
                      });
                      window.location.href = "/admin/product";
                    }
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                >
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popUp && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white py-4 px-4 w-96 rounded-2xl shadow-lg z-50">
            <h2 className="text-xl font-bold mb-4 text-center tracking-wider">
              {editedProduct.id ? "EDIT" : "TAMBAH"} PRODUK
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editedProduct.id) {
                  api
                    .put(`/product/update/${editedProduct.id}`, editedProduct)
                    .then(async (res) => {
                      alert(res.msg);
                      window.location.href = "/admin/product";
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                } else {
                  api
                    .post("/product/add", editedProduct)
                    .then(async (res) => {
                      alert(res.msg);
                      window.location.href = "/admin/product";
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }
                setPopUp(!popUp);
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-black font-bold mb-2"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-500"
                  value={editedProduct.name}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      name: e.target.value,
                    })
                  }
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-black font-bold mb-2"
                >
                  Deskripsi
                </label>
                <input
                  type="text"
                  id="description"
                  className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-500"
                  value={editedProduct.description}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-black font-bold mb-2"
                >
                  Harga
                </label>
                <input
                  type="number"
                  id="price"
                  className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-500"
                  value={editedProduct.price}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="stock"
                  className="block text-black font-bold mb-2"
                >
                  Stok
                </label>
                <input
                  type="number"
                  id="stock"
                  className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-500"
                  value={editedProduct.stock}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      stock: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-black font-bold mb-2"
                >
                  Gambar
                </label>
                <input
                  type="text"
                  id="image"
                  className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-500"
                  value={editedProduct.image}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      image: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setPopUp(!popUp)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 py-2 rounded mr-2"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
