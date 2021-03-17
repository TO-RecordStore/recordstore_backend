const express = require('express');
const router = express.Router();
const {getRecords, addRecord, updateRecord, deleteRecord} = require('../controllers/recordsController');

router.route('/')
	.get(getRecords)
	.post(addRecord);

router.route('/:id')
	.put(updateRecord)
	.delete(deleteRecord);


module.exports = router