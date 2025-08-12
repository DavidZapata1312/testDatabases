const db = require('../config/db.js');

async function getClientTransactions(req, res) {
  console.log('transactionDesc iniciado');
  try {
    const transactionDesc = await db.query(`
    SELECT 
        c.client_name,
        c.email,
        SUM(b.amount_paid) AS TotalPagado
    FROM clients c
    INNER JOIN bills b ON c. identification  = b. identification 
    GROUP BY c. identification , c.client_name, c.email
    ORDER BY TotalPagado DESC
    `);
    console.log('Datos obtenidos:', transactionDesc.length);
    res.json(transactionDesc);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ message: 'Database error' });
  }
}


async function getLet(req,res) {
      console.log('transactionDesc iniciado');
  try {
    const lets = await db.query(`
    SELECT 
        c.client_name AS client_name,
        b.bill_id,
        b.billing_period,
        b.invoiced_amount,
        COALESCE(SUM(t.transaction_amount), 0) AS paid_amount,
        (b.invoiced_amount - COALESCE(SUM(t.transaction_amount), 0)) AS outstanding_balance,
        t.transaction_id
    FROM 
        bills b
        INNER JOIN clients c ON b.identification = c.identification
        LEFT JOIN transactions t ON b.bill_id = t.bill_id
    GROUP BY 
        c.client_name, 
        b.bill_id, 
        b.billing_period, 
        b.invoiced_amount, 
        t.transaction_id
    HAVING 
        outstanding_balance > 0
    ORDER BY 
        outstanding_balance DESC
    LIMIT 0, 1000;   
    `);
    console.log('Datos obtenidos:', lets.length);
    res.json(lets);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ message: 'Database error' });
  }
}

module.exports = { getClientTransactions,getLet};