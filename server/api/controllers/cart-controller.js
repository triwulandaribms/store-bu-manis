import { pool } from "../config/db.js";

// Controller untuk mendapatkan data keranjang berdasarkan id customer
export const getCartByIdCustomer = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT c.id, c.id_product, c.total_product, p.image, p.name, p.price 
      FROM carts c 
      JOIN products p ON c.id_product = p.id WHERE c.id_customer = $1
    `,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Controller untuk menambahkan barang kedalam keranjang
export const addCart = async (req, res) => {
  const { id_customer, id_product, total_product } = req.body;
  try {
    // Query mendapatkan keranjang produk dan ukuran yang sama
    const findCart = await pool.query(
      "SELECT * FROM carts WHERE id_customer = $1 AND id_product = $2",
      [id_customer, id_product]
    );

    const findStock = await pool.query("SELECT * FROM products WHERE id = $1", [
      id_product,
    ]);

    // Pengecekan keranjang terhadap user, prooduk dan ukuran yang sama
    if (findCart.rows[0]) {
      if (findStock.rows[0].stok < total_product) {
        res.send("Stok tidak mencukupi");
      } else {
        await pool.query(
          "UPDATE carts SET total_product = total_product + $1 WHERE id = $2",
          [total_product, findCart.rows[0].id]
        );
        res.status(200).json({
          msg: "Berhasil ditambahkan ke keranjang",
        });
      }
    } else {
      if (findStock.rows[0].stock < total_product) {
        res.send("Stok tidak mencukupi");
      } else {
        await pool.query(
          "INSERT INTO carts (id_customer, id_product, total_product) VALUES ($1, $2, $3) RETURNING *",
          [id_customer, id_product, total_product]
        );
        res.status(200).json({
          msg: "Berhasil ditambahkan ke keranjang",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Controller untuk mengubah data keranjang berdasarkan id
export const updateCart = async (req, res) => {
  try {
    const findCart = await pool.query(" SELECT * FROM carts WHERE id = $1", [
      req.params.id,
    ]);

    const findStock = await pool.query("SELECT * FROM products WHERE id = $1", [
      req.body.id_product,
    ]);

    if (req.body.total_product > findStock.rows[0].stock) {
      res.status(404).json({ status: 404, msg: "Stok tidak mencukupi" });
    } else {
      await pool.query("UPDATE carts SET total_product = $1 WHERE id = $2", [
        req.body.total_product,
        req.params.id,
      ]);
      res.status(200).json({
        msg: "Keranjang berhasil di ubah",
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    await pool.query("DELETE FROM carts WHERE id = $1", [req.params.id]);
    res.status(200).json({ msg: "Keranjang berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
