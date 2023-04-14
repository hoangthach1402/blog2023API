const mongoose = require('mongoose')
const Schema = mongoose.Schema; 
// const Category = require('./Category')
if (mongoose.models['Post']) {
  delete mongoose.models['Post'];
}
const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdDate: { type: Date, default: Date.now },
  // Add other post-specific fields as needed
});

mongoose.model('Post', postSchema);
module.exports = mongoose.model('Post');
  // const Post = mongoose.model('Post', postSchema);

// module.exports = mongoose.model('Post', postSchema);;