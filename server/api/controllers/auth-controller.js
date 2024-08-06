import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

// Controller untuk daftar akun (register)
export const registerAccount = async (req, res) => {
  const { customer_code, name, password } = req.body;
  try {
    const hashPassword = await argon2.hash(password);

    const result = await pool.query(
      "INSERT INTO customers (customer_code, name, password) VALUES ($1, $2, $3) RETURNING *",
      [customer_code, name, hashPassword]
    );

    res
      .status(201)
      .json({ msg: "Registrasi akun telah berhasil", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Controller untuk login customer
export const loginAccountCustomer = async (req, res) => {
  const { customer_code, password } = req.body;
  console.log(req.body);
  try {
    // Mencari data user berdasarkan username atau email
    const result = await pool.query(
      "SELECT * FROM customers WHERE customer_code = $1",
      [customer_code]
    );

    if (result.rows[0]) {
      //   return res.status(200).json({ msg: "User ditemukan !!!" });
      const isPasswordValid = await argon2.verify(
        result.rows[0].password,
        password
      );

      if (isPasswordValid) {
        const token = jwt.sign(result.rows[0], process.env.SECRET_KEY);
        // Set cookie
        res.cookie("token", token, {
          httpOnly: true,
        });
        res.status(200).json({
          token,
          data: result.rows[0],
          msg: "Berhasil login !!!",
        });
      } else {
        return res.status(401).json({ msg: "Password salah !!!" });
      }
    } else {
      return res.status(404).json({ msg: "Customer tidak ditemukan !!!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Conrtoller untuk login admin
export const loginAccountAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Mencari data user berdasarkan username atau email
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows[0]) {
      // console.log("user ada");
      const isPasswordValid = await argon2.verify(
        result.rows[0].password,
        password
      );

      if (isPasswordValid) {
        const token = jwt.sign(result.rows[0], process.env.SECRET_KEY);
        // Set cookie
        res.cookie("token", token, {
          httpOnly: true,
        });
        res.status(200).json({
          token,
          data: result.rows[0],
          msg: "Login berhasil !!!",
        });
      } else {
        return res.status(401).json({ msg: "Password salah !!!" });
      }
    } else {
      return res.status(404).json({ msg: "User tidak ditemukan !!!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller untuk mendapatkan user yang sedang login
export const getCurrentUser = async (req, res) => {
  try {
    return res.json({
      status: "Berhasil",
      msg: `${req.user.username} sedang login`,
      data: req.user,
    });
  } catch (error) {
    res.status(500).json({ error: "Belum ada user atau customer yang login" });
  }
};

// Controller untuk logout account
export const logoutAccount = async (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.clearCookie("token");
  res.status(200).json({ msg: "Logout berhasil" });
};

export const addAccountUser = async (req, res) => {
  const { name, username, password, role } = req.body;
  try {
    const hashPassword = await argon2.hash(password);
    const result = await pool.query(
      "INSERT INTO users (name, username, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, username, hashPassword, role]
    );
    res.status(201).json({
      msg: "Pendaftaran akun melalui telah berhasil",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getAllUser = async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateAccountUser = async (req, res) => {
  const { name, username, role } = req.body;
  try {
    await pool.query(
      "UPDATE users SET name = $1, username = $2, role= $3 WHERE id = $4",
      [name, username, role, req.params.id]
    );
    res.status(200).json({
      msg: "Data berhasil diubah.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const deleteAccountUser = async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [req.params.id]);
    res.status(200).json({ msg: "User berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
