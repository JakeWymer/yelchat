const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
	businessId: String,
	message: String,
});

mongoose.model('messages', messageSchema);
