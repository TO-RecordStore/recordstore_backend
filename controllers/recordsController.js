const Record = require("../models/Record");
const { errorHandler } = require("../utilities/errorHandler");

exports.getRecords = async (req, res, next) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    next(errorHandler('Cannot get records'))
  }
};

exports.addRecord = async (req, res, next) => {
  try {
    const newRecord = await Record.create(req.body);
    res.json(newRecord);
  } catch (err) {
    next(errorHandler("Invalid record data entry", 400));
  }
};

exports.updateRecord = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedRecord = await Record.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("!!!the update record log!!!", id, req.body, updatedRecord);
    res.json(updatedRecord);
  } catch (err) {
    next(errorHandler("Cannot update record", 400));
  }
};

exports.deleteRecord = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecord = await Record.findByIdAndDelete(id);
    // if (!recordDeleted) throw new Error()
    res.json(deletedRecord);
  } catch (err) {
    next(errorHandler(`Cannot find the record with id ${id}`, 400));
  }
};
