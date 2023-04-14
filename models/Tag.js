const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  // Add other tag-specific fields as needed
});
  
  const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;