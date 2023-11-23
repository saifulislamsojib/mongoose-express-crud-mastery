import IUser from './user.interface';
import User from './user.model';

export const createUser = (user: Omit<IUser, '_id'>) => new User(user).save();

export const getUserByEmail = (email: string) => User.findOne({ email });

export const getUserById = (id: string) => User.findOne({ id });
