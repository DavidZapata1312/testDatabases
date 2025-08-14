CREATE DATABASE pd_david_zapata_lovelace;

USE pd_david_zapata_lovelace;

CREATE TABLE clients(
identification INT PRIMARY KEY NOT NULL,
client_name varchar(150),
address varchar(150),
phone varchar(150),
email varchar(150) UNIQUE NOT NULL
);

CREATE TABLE bills(
bill_id VARCHAR(50) PRIMARY KEY, 
billing_period DATE,
invoiced_amount INT,
amount_paid INT,
identification INT,
FOREIGN KEY (identification) REFERENCES clients(identification)
);

CREATE TABLE transactions(
transaction_id VARCHAR(50) PRIMARY KEY,
transaction_date DATETIME,
transaction_amount INT,
transaction_status ENUM('PENDIENTE','FALLIDA','COMPLETADA'),
payment_platform ENUM('NEQUI','DAVIPLATA'),
payment_type ENUM('PAGO DE FACTURA', 'OTRO'),
bill_id VARCHAR(50),
FOREIGN KEY (bill_id) REFERENCES bills(bill_id)
);

ALTER TABLE transactions DROP COLUMN transaction_status;
ALTER TABLE transactions ADD COLUMN transaction_status ENUM('Pendiente','Fallida','Completada');

ALTER TABLE transactions DROP COLUMN payment_platform;
ALTER TABLE transactions ADD COLUMN payment_platform ENUM('Nequi','Daviplata');

ALTER TABLE transactions DROP COLUMN payment_type;
ALTER TABLE transactions ADD COLUMN payment_type ENUM('Pago de Factura');

SELECT 
	c.client_name,
	c.email,
	SUM(b.amount_paid) AS TotalPagado
FROM clients c
INNER JOIN bills b ON c. identification  = b. identification 
GROUP BY c. identification , c.client_name, c.email
ORDER BY TotalPagado DESC;

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

select * from clients;

SELECT 
    c.client_name,
    b.bill_number,
    t.amount_paid,
    t.transaction_date,
    t.payment_platform
FROM transactions t
JOIN clients c ON t.client_id = c.client_id
JOIN bills b ON t.bill_id = b.bill_id
WHERE t.payment_platform = 'Nequi'
ORDER BY t.transaction_date DESC;
