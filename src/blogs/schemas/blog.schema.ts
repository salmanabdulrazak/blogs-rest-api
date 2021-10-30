import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

export const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  categoryId: ObjectId,
  publisherId: ObjectId,
});

BlogSchema.set('toObject', { virtuals: true });
BlogSchema.set('toJSON', { virtuals: true });

BlogSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true,
});

BlogSchema.virtual('publisher', {
  ref: 'User',
  localField: 'publisherId',
  foreignField: '_id',
  justOne: true,
});
