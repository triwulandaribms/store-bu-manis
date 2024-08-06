import { pool } from "../config/db.js";

export const addCashierProduct = async (req, res) => {
  const { id_product, total_product, price } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO cashier_product (id_product, total_product, price, sub_total) VALUES ($1, $2, $3, $4) RETURNING *",
      [id_product, total_product, price, total_product * price]
    );
    res.status(200).json({ msg: "Success", data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllProductCashier = async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id, c.total_product, c.id_product, c.price, c.sub_total, p.name
      FROM cashier_product c
      JOIN products p ON c.id_product = p.id`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteProductCashier = async (req, res) => {
  try {
    await pool.query("DELETE FROM cashier_product WHERE id = $1", [
      req.params.id,
    ]);
    res.status(200).json({ msg: "Success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteAllProductCashier = async (req, res) => {
  try {
    await pool.query("DELETE FROM cashier_product");
    res.status(200).json({ msg: "Success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
