const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const db = require('../config/db'); 

async function uploadCSV(req, res) {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const filePath = path.join(process.cwd(), req.file.path);
  const rows = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => rows.push(row))
    .on('end', async () => {
      try {
        for (const r of rows) {
          // Insertar client if have client neccesary data
          if (r.NombredelCliente && r.NúmerodeIdentificación && r.Dirección && r.Teléfono && r.CorreoElectrónico) {
            await db.query(
              'INSERT INTO clients (identification, client_name, address, phone, email) VALUES (?, ?, ?, ?, ?)',
              [r.NúmerodeIdentificación,r.NombredelCliente,r.Dirección,r.Teléfono, r.CorreoElectrónico]
            );
          }

      


          // Insert bills if have all data
          if (r.NúmerodeFactura && r.PeriododeFacturación && r.MontoFacturado && r.MontoPagado && r.NúmerodeIdentificación) {
            await db.query(
              'INSERT INTO bills (bill_id, billing_period, invoiced_amount, amount_paid, identification) VALUES (?, ?, ?, ?, ?)',
              [r.NúmerodeFactura, r.PeriododeFacturación, r.MontoFacturado, r.MontoPagado, r.NúmerodeIdentificación]
            );
          }


          // Insert transaction data
          if (r.IDdelaTransacción && r.FechayHoradelaTransacción && r.MontodelaTransacción && r.EstadodelaTransacción && r.PlataformaUtilizada && r.TipodeTransacción && r.NúmerodeFactura) {
            await db.query(

              'INSERT INTO transactions (transaction_id,transaction_date,transaction_amount,transaction_status,payment_platform,payment_type,bill_id) VALUES (?,?,?,?,?,?,?)',
              [r.IDdelaTransacción,r.FechayHoradelaTransacción,r.MontodelaTransacción,r.EstadodelaTransacción,r.PlataformaUtilizada,r.TipodeTransacción,r.NúmerodeFactura]
            );
          }

        }
        fs.unlinkSync(filePath);
        res.json({ message: 'Datos cargados', total: rows.length });
      } catch (err) {
        console.error('Error insertando datos:', err.message);
        res.status(500).json({ message: 'Error al insertar datos', error: err.message });
      }
    })
    .on('error', (err) => {
      console.error('Error leyendo CSV:', err.message);
      res.status(500).json({ message: 'Error leyendo archivo', error: err.message });
    });
}

module.exports = { uploadCSV };