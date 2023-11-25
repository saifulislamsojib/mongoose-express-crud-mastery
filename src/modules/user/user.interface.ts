export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type Address = {
  street: string;
  city: string;
  country: string;
};

export type FullName = {
  firstName: string;
  lastName: string;
};

interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
  orders?: Order[];
}

export interface UserCreated extends IUser {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export type UpdateUser = Partial<
  Omit<IUser, '_id' | 'orders' | 'password' | 'fullName' | 'address'>
> & {
  fullName?: Partial<FullName>;
  address?: Partial<Address>;
};

export default IUser;
