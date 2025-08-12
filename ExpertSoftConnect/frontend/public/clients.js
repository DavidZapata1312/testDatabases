const API_URL = 'http://localhost:3000/clients';
const msg = document.getElementById('msg');
const table = document.getElementById('clientsTable');
const tbody = table.querySelector('tbody');
const form = document.getElementById('createclientForm');
const formDelete = document.getElementById('DeleteClient');
const formEdit = document.getElementById('editClient')
// Oget all clients
async function getAll() {
  msg.textContent = 'Charge...';
  table.style.display = 'none';
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error in clients charge');
    const clients = await res.json();

    if (clients.length === 0) {
      msg.textContent = 'No clients yet.';
      tbody.innerHTML = '';
      return;
    }

    tbody.innerHTML = clients.map(p => `
      <tr>
        <td>${p.identification}</td>
        <td>${p.client_name}</td>
        <td>${p.address}</td>
        <td>${p.phone}</td>
        <td>${p.mail}</td>
      </tr>
    `).join('');

    msg.textContent = '';
    table.style.display = '';
  } catch (error) {
    msg.textContent = 'Error in clients charge.';
    console.error(error);
  }
}

// Crear nuevo paciente
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const clientData = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error in client creation');
    }

    alert('Client succesfuly create');
    form.reset();
    getAll();
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

formDelete.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const formData = new FormData(formDelete);
    const clientData = Object.fromEntries(formData.entries());
    try {
    const res = await fetch(API_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData),
    });
        if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error in client delete');
    }

    alert('Client succesfuly delete');
    form.reset();
    getAll();
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

formEdit.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(formEdit);
  const clientData = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error in client edition');
    }

    alert('Client succesfuly edit');
    form.reset();
    getAll();
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

