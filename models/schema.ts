import { Schema, model,Document } from "mongoose"
import {mongoClient} from "."

export interface IBlogPost {
  author: string
  title: string
  body: string
}

export interface IBlogPostDocument extends IBlogPost, Document {
  id: string
  created: Date
}

const BlogPostSchema = new Schema({
  id: Schema.Types.ObjectId,
  author: String,
  title: String,
  body: String,
  created: {
    type: Date,
    default: Date.now
  }
});

BlogPostSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

export const BlogPost = model<IBlogPostDocument>('BlogPost', BlogPostSchema);
mongoClient.model('BlogPost', BlogPostSchema);