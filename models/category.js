const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    colorCode: String
});

const category = mongoose.model('category', categorySchema);

module.exports = category;

// {_id: asdasdasd, name: "Animal", colorCode: "#000000"}
// {_id: 345dfsf23rsdf, name: "Fruit", colorCode: "#000000"}
