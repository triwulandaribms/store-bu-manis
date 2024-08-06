import { pool } from "../config/db.js";

export const addSalesCustomer = async (req, res) => {
  const {
    id_customer,
    sales,
    sub_total,
    discount,
    total_sale,
    type_of_payment,
    address,
  } = req.body;
  try {
    for (const sale of sales) {
      const { id, id_product, total_product } = sale;
      await pool.query(
        "INSERT INTO sales (id_customer, id_product, total_product, sub_total, discount, total_sale, type_of_payment, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [
          id_customer,
          id_product,
          total_product,
          sub_total,
          discount,
          total_sale,
          type_of_payment,
          address,
        ]
      );
      const totalQuantityResult = await pool.query(
        "SELECT SUM(total_product) AS total FROM sales WHERE id_customer = $1",
        [id_customer]
      );

      const totalQuantity = totalQuantityResult.rows[0].total;

      if (totalQuantity >= 1000) {
        await pool.query(
          "INSERT INTO voucher_codes (id_customer, code, discount) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
          [id_customer, "DISKON30", 30]
        );
      }
      await pool.query("DELETE FROM carts WHERE id = $1", [id]);
      await pool.query(
        "UPDATE products SET stock = (stock - $1) WHERE id = $2",
        [total_product, id_product]
      );
    }
    res.status(200).json({ msg: "Pesanan telah berhasil dibuat" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const getSalesReport = async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT s.sale_date, c.customer_code, s.sub_total, s.discount, s.total_sale, s.type_of_payment
      FROM sales s
      JOIN customers c ON s.id_customer = c.id`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBestProduct = async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.id, p.name, p.price, p.image, SUM(s.total_product) as total_sales
      FROM products p JOIN sales s ON p.id = s.id_product
      GROUP BY p.id, p.name ORDER BY total_sales DESC LIMIT 3;`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBestCustomer = async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id, c.name, SUM(s.total_product) as total_sales
      FROM customers c JOIN sales s ON c.id = s.id_customer WHERE c.id != 1
      GROUP BY c.id, c.name ORDER BY total_sales DESC LIMIT 3;`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSaleByIdCustomer = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT s.id, s.total_product, s.type_of_payment, p.name, p.image, p.price
      FROM sales s
      JOIN customers c ON s.id_customer = c.id
      JOIN products p ON s.id_product = p.id WHERE s.id_customer = $1
    `,
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
