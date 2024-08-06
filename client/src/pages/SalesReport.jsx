import { useContext, useEffect, useState } from "react";
import { AdminContext } from "./Admin";
import * as XLSX from "xlsx";

export default function SalesReport() {
  const { salesReport } = useContext(AdminContext);
  // const [subTotal, setSubtotal] = useState(0);
  // const [dikson, setDiskon] = useState(0);
  // const [totalSale, setTotalSale] = useState(0);

  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  const calculateSubTotal = () =>
    salesReport.reduce((acc, curr) => acc + parseInt(curr.sub_total), 0);

  const calculateTotalSale = () =>
    salesReport.reduce((acc, curr) => acc + parseInt(curr.total_sale), 0);

  const calculateDiscount = () =>
    salesReport.reduce((acc, curr) => acc + parseInt(curr.discount), 0);

  const generateExcel = () => {
    // Definisikan header untuk laporan penjualan
    const header = [
      [
        "Tanggal",
        "Kode Konsumen",
        "Sub Total",
        "Diskon",
        "Total Penjualan",
        "Jenis Pembayaran",
      ],
    ];

    // Siapkan data untuk laporan penjualan
    const body = salesReport.map((s) => [
      formatDate(s.sale_date),
      s.customer_code,
      s.sub_total,
      s.discount,
      s.total_sale,
      s.type_of_payment,
    ]);

    // Gabungkan header dan body
    const data = [
      ...header,
      ...body,
      ["Created " + new Date().toLocaleString()],
    ];

    // Buat worksheet dari data yang sudah digabungkan
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    const wscols = [
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 10 },
      { wch: 15 },
      { wch: 20 },
    ];
    worksheet["!cols"] = wscols;

    // Format cell untuk header dan data
    const headerCellStyle = {
      font: { bold: true },
      alignment: { horizontal: "center", vertical: "center" },
    };
    const centerCellStyle = {
      alignment: { horizontal: "center", vertical: "center" },
    };
    const currencyCellStyle = {
      numFmt: '"Rp"#,##0.00',
      alignment: { horizontal: "center", vertical: "center" },
    };

    // Terapkan gaya ke header
    for (let col = 0; col < header[0].length; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      worksheet[cellAddress].s = headerCellStyle;
    }

    // Terapkan gaya ke body
    for (let row = 1; row <= body.length; row++) {
      for (let col = 0; col < body[0].length; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        if (col == 3) {
          // Kolom harga
          worksheet[cellAddress].s = currencyCellStyle;
        } else {
          worksheet[cellAddress].s = centerCellStyle;
        }
      }
    }

    // Buat workbook dan tambahkan worksheet ke dalamnya
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");

    // Simpan file Excel
    XLSX.writeFile(workbook, "laporan-penjualan.xlsx");
  };

  // const generateExcel = () => {
  //   // Buat worksheet dari data penjualan
  //   const worksheet = XLSX.utils.json_to_sheet(salesReport);

  //   // Tambahkan header yang lebih rapi
  //   XLSX.utils.sheet_add_aoa(
  //     worksheet,
  //     [
  // [
  //   "Tanggal",
  //   "Kode Konsumen",
  //   "Sub Total",
  //   "Diskon",
  //   "Total Penjualan",
  //   "Jenis Pembayaran",
  // ],
  //     ],
  //     { origin: "A1" }
  //   );

  //   // Buat workbook dan tambahkan worksheet ke workbook
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Penjualan");

  //   // Atur lebar kolom untuk memastikan tata letak yang rapi
  // const wscols = [
  //   { wch: 30 },
  //   { wch: 20 },
  //   { wch: 20 },
  //   { wch: 20 },
  //   { wch: 20 },
  //   { wch: 20 },
  // ];
  // worksheet["!cols"] = wscols;

  //   // Tambahkan timestamp di akhir file
  //   XLSX.utils.sheet_add_aoa(
  //     worksheet,
  //     [["Created " + new Date().toLocaleString()]],
  //     { origin: -1 }
  //   );

  //   // Simpan file Excel
  //   XLSX.writeFile(workbook, "laporan-penjualan.xlsx");
  // };

  return (
    <div id="laporan-penjualan" className="py-5 px-5 bg-warm-gray text-teal">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold tracking-wider">Laporan Penjualan</p>
        <p className="text-2xl font-bold tracking-wider">Kripik Bu Manis</p>
        <p className="text-2xl font-bold tracking-wider">Per {currentDate}</p>
      </div>
      <div>
        {
          <table className="w-full border-collapse border border-gray-300 my-5">
            <thead>
              <tr className="bg-gray-300 font-bold tracking-wider">
                <th className="border border-gray-300 px-4 py-2 text-center">
                  No
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Tanggal
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Kode Konsumen
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Tipe Pembayaran
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Sub Total
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Diskon
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Total Penjualan
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Data rows */}
              {salesReport?.map((s, index) => (
                <tr key={s.id}>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    {formatDate(s.sale_date)}
                  </td>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    {s.customer_code}
                  </td>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    {s.type_of_payment}
                  </td>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    Rp{parseInt(s.sub_total).toLocaleString("id-ID")}
                  </td>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    Rp{parseInt(s.discount).toLocaleString("id-ID")}
                  </td>
                  <td className="border-[1px] border-teal px-4 py-2 text-center">
                    Rp{parseInt(s.total_sale).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-300 font-bold tracking-wider">
                <td
                  colSpan={4}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  TOTAL
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  Rp{parseInt(calculateSubTotal()).toLocaleString("id-ID")}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  Rp{parseInt(calculateDiscount()).toLocaleString("id-ID")}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  Rp{parseInt(calculateTotalSale()).toLocaleString("id-ID")}
                </td>
              </tr>
            </tfoot>
          </table>
        }
        <button
          onClick={generateExcel}
          className="py-2 px-10 rounded-md font-bold tracking-wide bg-teal text-white"
        >
          Download Excel
        </button>
      </div>
    </div>
  );
}
