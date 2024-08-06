/* eslint-disable no-unused-vars */
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../utils.js";
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useOutletContext();

  const [isCustomerLogin, setIsCustomerLogin] = useState(true);
  const toggleLoginType = () => {
    setIsCustomerLogin(!isCustomerLogin);
  };

  const [loginCustomer, setLoginCustomer] = useState({
    customer_code: "",
    password: "",
  });

  const [loginAdmin, setLoginAdmin] = useState({
    username: "",
    password: "",
  });

  function handleChangeCustomer(e) {
    setLoginCustomer({
      ...loginCustomer,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeAdmin(e) {
    setLoginAdmin({
      ...loginAdmin,
      [e.target.name]: e.target.value,
    });
  }

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (isCustomerLogin) {
      api.post("/auth/login-customer", loginCustomer).then((res) => {
        console.log(res.token);
        if (!res.token) {
          alert(res.msg);
        } else {
          alert(res.msg);
          console.log(res);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("customer_code", res.data.customer_code);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("token", res.token);
          window.location.href = "/";
        }
      });
    } else {
      api.post("/auth/login-admin", loginAdmin).then((res) => {
        console.log(res.token);
        if (!res.token) {
          alert(res.msg);
        } else {
          alert(res.msg);
          console.log(res);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("token", res.token);
          window.location.href = "/admin";
        }
      });
    }
  }

  return (
    <div className="py-12 flex items-center justify-center bg-warm-gray font-poppins">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl mb-6 text-teal font-bold">
          {isCustomerLogin ? "Customer Login" : "Admin Login"}
        </h2>
        <div className="my-4 text-center grid grid-cols-2">
          <span
            className={`py-2 cursor-pointer ${
              isCustomerLogin
                ? "bg-teal font-semibold text-white"
                : "text-teal font-bold"
            }`}
            onClick={() => setIsCustomerLogin(true)}
          >
            Customer
          </span>
          <span
            className={` py-2 cursor-pointer ${
              !isCustomerLogin
                ? "bg-teal font-semibold text-white"
                : "text-teal font-bold"
            }`}
            onClick={() => setIsCustomerLogin(false)}
          >
            Admin
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          {isCustomerLogin ? (
            <>
              <div className="mb-4">
                <label className="block text-teal font-bold">
                  Customer Code
                </label>
                <input
                  type="text"
                  id="customer_code"
                  name="customer_code"
                  value={loginCustomer.customer_code}
                  onChange={handleChangeCustomer}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-teal font-bold">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginCustomer.password}
                  onChange={handleChangeCustomer}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-teal font-bold">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={loginAdmin.username}
                  onChange={handleChangeAdmin}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-teal font-bold">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginAdmin.password}
                  onChange={handleChangeAdmin}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="w-full py-3 font-bold text-xl bg-teal text-white rounded hover:bg-white hover:border hover:border-teal hover:text-teal"
          >
            Login
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <h1 className="text-teal">
            Belum punya akun?{" "}
            <Link to={"/register"} className="font-bold underline">
              Register
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
