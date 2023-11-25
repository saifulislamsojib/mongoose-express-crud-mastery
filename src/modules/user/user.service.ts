import { AnyKeys, AnyObject } from 'mongoose';
import IUser, { Order, UpdateUser } from './user.interface';
import User from './user.model';

export const createUserToDb = (user: IUser) => new User(user).save();

export const getAllUsersFromDb = () => {
  const project = {
    _id: 0,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  };
  return User.find({}, project);
};

export const getUserByUserIdFromDb = (userId: number) => User.getSingleUser(userId);

export const getAllOrdersFromDb = (userId: number) => {
  const project = { orders: 1, _id: 0 };
  return User.findOne({ userId }, project);
};

export const getAllOrdersTotalPriceFromDb = (userId: number) => {
  const project = {
    _id: 0,
    totalPrice: 1,
  };
  return User.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: '$orders.price' },
      },
    },
    {
      $project: project,
    },
  ]);
};

export const deleteUserFromDb = (userId: number) => User.deleteOne({ userId });

export const createOrderToDb = (userId: number, order: Order) => {
  const createDoc = { $push: { orders: order } };
  const options = {
    new: true,
    upsert: true,

    projection: {
      password: 0,
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    },
  };
  return User.findOneAndUpdate({ userId }, createDoc, options);
};

export const updateUserToDb = (userId: number, update: UpdateUser) => {
  const {
    userId: updateUserId,
    username,
    fullName,
    age,
    email,
    isActive,
    hobbies,
    address,
  } = update;
  const updateDoc: AnyKeys<IUser> & AnyObject = {
    userId: updateUserId,
    username,
    age,
    email,
    isActive,
    hobbies,
  };
  if (fullName?.firstName) {
    updateDoc['fullName.firstName'] = fullName.firstName;
  }
  if (fullName?.lastName) {
    updateDoc['fullName.lastName'] = fullName.lastName;
  }
  if (address?.city) {
    updateDoc['address.city'] = address.city;
  }
  if (address?.country) {
    updateDoc['address.country'] = address.country;
  }
  if (address?.street) {
    updateDoc['address.street'] = address.street;
  }
  return User.findOneAndUpdate(
    { userId },
    { $set: updateDoc },
    {
      new: true,
      projection: {
        password: 0,
        _id: 0,
        orders: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
  );
};
