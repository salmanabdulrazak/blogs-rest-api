import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

export const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  categoryId: ObjectId,
  publisherId: ObjectId,
});

BlogSchema.virtual('category', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'categoryId',
});

BlogSchema.virtual('isCompleted', {
  ref: 'User',
  localField: '_id',
  foreignField: 'publisherId',
});
