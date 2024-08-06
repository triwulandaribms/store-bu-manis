import { pool } from "../config/db.js";

export const getCodeVoucher = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM voucher_codes WHERE id_customer = $1
    `,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteCodeVoucher = async (req, res) => {
  try {
    await pool.query("DELETE FROM voucher_codes WHERE id = $1", [
      req.params.id,
    ]);
    res.send("Kode voucher berhasil dihapus.");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
