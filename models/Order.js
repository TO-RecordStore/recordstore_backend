const mongoose = require('mongoose')
const {Schema, model} = mongoose

const OrderSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
    records: [{
		record: {type: Schema.Types.ObjectId, ref: "Record"},
		quantity: Number
	}]
}, {
	versionKey: false,
	timestamps: true,
	toJSON: {
		virtuals: true
	}
})

OrderSchema.virtual('totalPrice').get(function() {
    const totalPrice = this.records.reduce((acc, curr) => acc + curr.price, 0)
    return totalPrice
})


const Order = model('Order', OrderSchema)

module.exports = Order