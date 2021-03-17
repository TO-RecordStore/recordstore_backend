const Record = require('../models/Record')
const { errorHandler } = require('../utilities/errorHandler')


exports.getRecords = async(req,res,next) => {
    try {
        const records = await Record.find()
        res.json(records)
    } catch (err) {
        errorHandler('Cannot get records', next)
    }
}

exports.addRecord = async(req,res,next) => {
    try {
        const newRecord = await Record.create(req.body)
        res.json(newRecord)
    } catch (err) {
        errorHandler('Invalid record data entry', next, 400)
    }
}

exports.updateRecord = async(req,res,next) => {
    const {id} = req.params
    try {
        const updatedRecord = await Record.findByIdAndUpdate(id, req.body, {new: true})
		console.log('!!!the update record log!!!', id, req.body, updatedRecord);
        res.json(updatedRecord)
    } catch (err) {
        errorHandler('Cannot update record', next, 400)
    }
}

exports.deleteRecord = async(req,res,next) => {
	const {id} = req.params;
    try {
        const deletedRecord = await Record.findByIdAndDelete(id)
		// if (!recordDeleted) throw new Error()
        res.json(deletedRecord)
    } catch (err) {
        errorHandler(`Cannot find the record with id ${id}`, next, 400)
    }
}