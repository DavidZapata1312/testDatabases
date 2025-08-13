const db = require('../config/db.js');

// list all clients
async function getAllClients(req, res) {
  try {
    const clients = await db.query('SELECT * FROM clients');
    res.json(clients);
  } catch (error) {
    console.error('Error obteniendo pacientes:', error);
    res.status(500).json({ message: 'Error en la base de datos' });
  }
}

async function getClients(req, res) {
  try {
    const clients = await db.query('SELECT * FROM clients WHERE identification = ?', [req.params.id]);
    res.json(clients);
  } catch (error) {
    console.error('Error obteniendo pacientes:', error);
    res.status(500).json({ message: 'Error en la base de datos' });
  }
}


async function createClients(req, res) {
  try {
    const { identification, client_name, address, phone, email } = req.body;

    if (!identification || !client_name || !address || !phone || !email) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const result = await db.query(
      'INSERT INTO clients (identification, client_name, address, phone, email) VALUES (?, ?, ?, ? , ?)',
      [identification, client_name, address, phone, email]
    );

    res.status(201).json({ message: 'Client create', client_id: result.insertId });
  } catch (error) {
    console.error('Error creando paciente:', error);
    res.status(500).json({ message: 'Error en la base de datos', details: error.message });
  }
}


async function updateClients(req, res) {
  try {
    const { client_id } = req.params;
    const { client_name, client_email} = req.body;

    if (!client_name && !client_email ) {
      return res.status(400).json({ message: 'actualice one date' });
    }

    let query = 'UPDATE clients SET ';
    const params = [];

    if (client_name) {
      query += 'client_name = ?, ';
      params.push(client_name);
    }
    if (client_email) {
      query += 'client_email = ?, ';
      params.push(client_email);
    }

    query = query.slice(0, -2); // quitar la última coma y espacio
    query += ' WHERE identification = ?';
    params.push(client_id);

    const result = await db.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'client dont exist' });
    }

    res.json({ message: 'client update' });
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'Error in database', details: error.message });
  }
}


async function deleteClients(req, res) {
  try {
    const { id } = req.params;

    const result = await db.query('DELETE FROM clients WHERE identification = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client dont exist' });
    }

    res.json({ message: 'client delete' });
  } catch (error) {
    console.error('Error in cliente delete :', error);
    res.status(500).json({ message: 'Error in database', details: error.message });
  }
}

module.exports = {
  getAllClients,
  getClients,
  createClients,
  updateClients,
  deleteClients,
};