import validateEmail from '@/utils/validateEmail';
import { model, Schema } from 'mongoose';
import IUser from './user.interface';

const UserModel = new Schema<IUser>(
  {
    userId: {
      type: Number,
      unique: true,
      trim: true,
      required: [true, 'User ID is required'],
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Username is required'],
      minlength: [1, 'Username should be at least 1 character long'],
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password is required'],
      minlength: [6, 'Password should be at least 6 characters long'],
    },
    fullName: {
      firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required'],
        minlength: [1, 'First name should be at least 1 character long'],
      },
      lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required'],
        minlength: [1, 'Last name should be at least 1 character long'],
      },
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Email is required'],
      validate: {
        validator: validateEmail,
        message: 'Invalid email format',
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    hobbies: {
      type: [String],
      validate: {
        validator: (hobbies: string[]) => hobbies.length > 0,
        message: 'At least 1 hobby is required',
      },
      default: [],
    },
    address: {
      street: {
        type: String,
        trim: true,
        required: [true, 'Street is required'],
        minlength: [1, 'Street should be at least 1 character long'],
      },
      city: {
        type: String,
        trim: true,
        required: [true, 'City is required'],
        minlength: [1, 'City should be at least 1 character long'],
      },
      country: {
        type: String,
        trim: true,
        required: [true, 'Country is required'],
        minlength: [1, 'Country should be at least 1 character long'],
      },
    },
    orders: [
      {
        productName: {
          type: String,
          trim: true,
          required: [true, 'Product name is required'],
          minlength: [1, 'Product name should be at least 1 character long'],
        },
        price: {
          type: Number,
          trim: true,
          required: [true, 'Price is required'],
        },
        quantity: {
          type: Number,
          trim: true,
          required: [true, 'Quantity is required'],
        },
      },
    ],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

const User = model<IUser>('User', UserModel);

export default User;
