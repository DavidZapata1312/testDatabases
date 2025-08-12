const express = require('express');
const router = express.Router();
const advanceController = require('../controllers/advanceconsultes');

router.get('/', advanceController.getClientTransactions);


router.get('/lets', advanceController.getLet);



module.exports = router;