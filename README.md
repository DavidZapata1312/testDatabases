# testDatabases

## Simple project for managing transactions, clients and failures with a backend in Node.js + MySQL and a basic frontend in HTML/JS. It allows you to create, list, update and delete clients, as well as manage to consult various things from the backend

Technologies used
Backend: Node.js, Express, MySQL (with mysql2/promise)

Frontend: HTML, CSS, JavaScript,Multer(file upload)

Middleware: cors, dotenv

Installation
Clone this repository:

Bash
Copy
Edit
git clone <url>
cd testDatabases
Install Dependencies:

Bash
Copy
Edit
npm installation
Configuring the .env file on the reason with your variables:

env
Copy
Edit
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=crudmedical

Create the database and tables in MySQL using the db.sql script (or your custom script).

Upload the data using charge.js

Use
Backend
Run the server with:

Bash
Copy
Edit
node.js index
Server will run in http://localhost:3000.

Frontend
Open in live server
Advanced routes:
router.get('/', advanceController.getClientTransactions);


router.get('/lets', advanceController.getLet);

Charge Database:

router.post('/upload-csv', upload.single('file'), uploadCSV);

Clients views: 

router.get('/', ClientsController.getAllClients);


router.get('/:id', ClientsController.getClients);


router.post('/', ClientsController.createClients);


router.put('/:id', ClientsController.updateClients);


router.delete('/:id', ClientsController.deleteClients);
