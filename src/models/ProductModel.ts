import mongoose from 'mongoose';
import { TAGS } from '../utils/constants';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    onSale: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    image: {
      type: String,
      required: [true, 'Photo is required'],
    },
    tags: {
      type: [String],
      required: [true, 'Tag is required'],
      validate: {
        validator: (tags: string[]) => {
          return tags.every((tag) => TAGS.includes(tag));
        },
      },
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', ProductSchema);