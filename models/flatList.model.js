var mongoose = require('mongoose');

var flatListSchema = new mongoose.Schema({
	name: String,
	imageUrl: String,
	foodDescription: String
});

var FlatListData = mongoose.model('FlatListData', flatListSchema, 'FlatListData');

module.exports = FlatListData;
