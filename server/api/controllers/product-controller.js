import { pool } from "../config/db.js";

// Controller untk mendapatkan semua data produk
export const getAllProduct = async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM products WHERE id = $1
    `,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO products (name,  description, price, stock, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.stock,
        req.body.image,
      ]
    );
    res.json({
      product: result.rows[0],
      msg: "Produk berhasil ditambahkan.",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    await pool.query(
      "UPDATE products SET name = $1, description = $2, price = $3, stock = $4, image = $5 WHERE id = $6",
      [
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.stock,
        req.body.image,
        req.params.id,
      ]
    );
    res.status(200).json({
      msg: "Produk berhasil diubah.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [req.params.id]);
    res.status(200).json({
      msg: "Produk berhasil dihapus.",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
