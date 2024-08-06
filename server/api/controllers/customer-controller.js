import argon2 from "argon2";
import { pool } from "../config/db.js";

export const addAccountCustomer = async (req, res) => {
  const { customer_code, name, password, role } = req.body;
  try {
    const hashPassword = await argon2.hash(password);
    const result = await pool.query(
      "INSERT INTO customers (customer_code, name, password) VALUES ($1, $2, $3) RETURNING *",
      [customer_code, name, hashPassword]
    );
    res.status(201).json({
      msg: "Pendaftaran akun telah berhasil",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getAllCustomer = async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateAccountCustomer = async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query("UPDATE customers SET name = $1 WHERE id = $2", [
      name,
      req.params.id,
    ]);
    res.status(200).json({
      msg: "Data berhasil diubah.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const deleteAccountCustomer = async (req, res) => {
  try {
    await pool.query("DELETE FROM customers WHERE id = $1", [req.params.id]);
    res.status(200).json({ msg: "Data berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
