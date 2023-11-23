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
  orders: Order[];
}

export default IUser;
