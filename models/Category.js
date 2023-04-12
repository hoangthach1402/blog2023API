const mongoose = require('mongoose')

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdDate: { type: Date, default: Date.now },
  // Add other category-specific fields as needed
});

  
  const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;