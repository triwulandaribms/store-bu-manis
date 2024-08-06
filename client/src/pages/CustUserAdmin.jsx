/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AdminContext } from "./Admin";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { api } from "../utils";
// import { useNavigate } from "react-router-dom";

export default function CustUserAdmin() {
  const {
    popUp,
    setPopUp,
    popUp2,
    setPopUp2,
    editedUser,
    setEditedUser,
    user,
    customer,
    editedCustomer,
    setEditedCustomer,
  } = useContext(AdminContext);

  useEffect(() => {
    const randomCode = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
    // setCustomerCode(`CS${randomCode}`);
    setEditedCustomer({
      ...editedCustomer,
      customer_code: `CS${randomCode}`,
    });
  }, []);

  return (
    <div className="p-5 min-h-64 bg-warm-gray text-teal">
      {localStorage.getItem("role") == "Super Admin" ? (
        <div>
          {/* ADMIN DAN SUPER ADMIN */}
          <div className="flex justify-between">
            <h2 className="text-2xl font-extrabold tracking-wide mb-4">
              Daftar Admin
            </h2>
            <div>
              <button
                onClick={() => {
                  setEditedUser({});
                  setPopUp(!popUp);
                }}
                className="flex justify-between gap-2 items-center bg-teal hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
              >
                <MdOutlineAddBox /> Tambah Admin
              </button>
            </div>
          </div>
          {/* Table for CRUD Data */}
          <table className="w-full border-collapse border-2 border-teal">
            <thead>
              <tr>
                <th className="border-2 border-teal">No</th>
                <th className="border-2 border-teal ">Nama</th>
                <th className="border-2 border-teal ">Username</th>
                <th className="border-2 border-teal ">Password</th>
                <th className="border-2 border-teal ">Role</th>
                <th className="border-2 border-teal ">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* Data rows */}
              {user?.map((u, index) => (
                <tr key={u.id}>
                  <td className="border-2 border-teal px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border-2 border-teal px-4 py-2 text-center">
                    {u.name ? u.name : "-"}
                  </td>
                  <td className="border-2 border-teal px-4 py-2 text-center">
                    {u.username}
                  </td>
                  <td className="border-2 border-teal px-4 py-2 text-center">
                    ******
                  </td>
                  <td className="border-2 border-teal px-4 py-2 text-center">
                    {u.role}
                  </td>
                  <td className="border border-teal px-4 py-2 flex justify-evenly">
                    <button
                      onClick={() => {
                        setEditedUser(u);
                        setPopUp(!popUp);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      <HiOutlinePencilAlt />
                    </button>
                    <button
                      disabled={u.id == 1}
                      onClick={() => {
                        if (u.id == 1) {
                          alert("Tidak dapat menghapus data pemilik toko");
                        } else {
                          if (
                            confirm(
                              `Apakah anda yakin ingin menghapus data atas nama ${u.name}`
                            )
                          ) {
                            api
                              .delete(`/auth/delete-user/${u.id}`)
                              .then(async (res) => {
                                alert(res.msg);
                              })
                              .catch((e) => {
                                console.log(e);
                              });
                            window.location.href = "/admin/customer-user";
                          }
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
        </div>
      ) : (
        <div>
          {/* CUSTOMER */}
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4">Daftar Konsumen</h2>
            <div>
              <button
                onClick={() => {
                  const randomCode = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
                  // setCustomerCode(`CS${randomCode}`);
                  setEditedCustomer({
                    ...editedCustomer,
                    customer_code: `CS${randomCode}`,
                  });
                  setPopUp2(!popUp2);
                }}
                className="flex justify-between gap-2 items-center bg-teal hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
              >
                <MdOutlineAddBox /> Tambah Konsumen
              </button>
            </div>
          </div>
          {/* Table for CRUD Data */}
          <table className="w-full border-collapse border-2 border-teal">
            <thead>
              <tr>
                <th className="border-2 border-teal">No</th>
                <th className="border-2 border-teal ">Kode Konsumen</th>
                <th className="border-2 border-teal ">Nama</th>
                <th className="border-2 border-teal ">Password</th>
                <th className="border-2 border-teal ">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* Data rows */}
              {customer?.map((c, index) => (
                <tr key={c.id}>
                  <td className="border-2 border-teal px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border-2 border-teal px-4 py-2 text-center">
                    {c.customer_code ? c.customer_code : "-"}
                  </td>
                  <td className="border-2 border-teal px-4 py-2 text-center">
                    {c.name}
                  </td>
                  <td className="border-2 border-teal px-4 py-2 text-center">
                    ******
                  </td>
                  <td className="border border-teal px-4 py-2 flex justify-evenly">
                    <button
                      disabled={c.id == 1}
                      onClick={() => {
                        setEditedCustomer(c);
                        setPopUp2(!popUp2);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      <HiOutlinePencilAlt />
                    </button>
                    <button
                      disabled={c.id == 1}
                      onClick={() => {
                        if (
                          confirm(
                            `Apakah anda yakin ingin menghapus data atas nama ${c.name}`
                          )
                        ) {
                          api
                            .delete(`/customer/delete-customer/${c.id}`)
                            .then(async (res) => {
                              alert(res.msg);
                            })
                            .catch((e) => {
                              console.log(e);
                            });
                          window.location.href = "/admin/customer-user";
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
        </div>
      )}

      {popUp2 && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white py-4 px-4 w-96 rounded-2xl shadow-lg z-50">
            <h2 className="text-xl font-bold mb-4 text-center tracking-wider">
              {editedCustomer.id ? "EDIT" : "TAMBAH"} KONSUMEN
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editedCustomer.id) {
                  api
                    .put(
                      `/customer/update-customer/${editedCustomer.id}`,
                      editedCustomer
                    )
                    .then(async (res) => {
                      alert(res.msg);
                      window.location.href = "/admin/customer-user";
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                } else {
                  api
                    .post("/customer/add-account-customer", editedCustomer)
                    .then(async (res) => {
                      alert(res.msg);
                      window.location.href = "/admin/customer-user";
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }
                setPopUp2(!popUp2);
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="customer_code"
                  className="block text-black font-bold mb-2"
                >
                  Kode Konsumen
                </label>
                <input
                  type="text"
                  disabled
                  id="customer_code"
                  className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-500"
                  value={editedCustomer.customer_code}
                />
              </div>
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
                  value={editedCustomer.name}
                  onChange={(e) =>
                    setEditedCustomer({
                      ...editedCustomer,
                      name: e.target.value,
                    })
                  }
                  autoFocus
                />
              </div>
              <div className="mb-4">
                {editedCustomer.id ? (
                  ""
                ) : (
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-black font-bold mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-500"
                      value={editedCustomer.password}
                      onChange={(e) =>
                        setEditedCustomer({
                          ...editedCustomer,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setPopUp2(!popUp2)}
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
      {popUp && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white py-4 px-4 w-96 rounded-2xl shadow-lg z-50">
            <h2 className="text-xl font-bold mb-4 text-center tracking-wider">
              {editedUser.id ? "EDIT" : "TAMBAH"} ADMIN
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editedUser.id) {
                  api
                    .put(`/auth/update-user/${editedUser.id}`, editedUser)
                    .then(async (res) => {
                      alert(res.msg);
                      window.location.href = "/admin/customer-user";
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                } else {
                  api
                    .post("/auth/add-account-user", editedUser)
                    .then(async (res) => {
                      alert(res.msg);
                      window.location.href = "/admin/customer-user";
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }
                setPopUp(!popUp);
              }}
            >
              <div className="mb-4">
                <label htmlFor="first_name" className="block  font-bold mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-500"
                  value={editedUser.name}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      name: e.target.value,
                    })
                  }
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-500"
                  value={editedUser.username}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4 flex gap-4 items-center">
                {editedUser.id ? (
                  ""
                ) : (
                  <div>
                    <label htmlFor="password" className="block font-bold mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-500"
                      value={editedUser.password}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <label htmlFor="role" className="block font-bold mb-2">
                    Role
                  </label>
                  <select
                    id="role"
                    className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-500"
                    value={editedUser.role}
                    onChange={(e) => {
                      e.preventDefault();
                      setEditedUser({
                        ...editedUser,
                        role: e.target.value,
                      });
                      console.log(editedUser);
                    }}
                  >
                    <option value={"Super Admin"}>Super Admin</option>
                    <option value={"Admin"}>Admin</option>
                  </select>
                </div>
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
