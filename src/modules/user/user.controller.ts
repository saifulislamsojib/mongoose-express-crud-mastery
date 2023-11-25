import getMongooseErrors from '@/utils/getMongooseErrors';
import validate from '@/utils/validate';
import { hash } from 'bcrypt';
import { RequestHandler } from 'express';
import { UserCreated } from './user.interface';
import {
  createOrderToDb,
  createUserToDb,
  deleteUserFromDb,
  getAllOrdersFromDb,
  getAllOrdersTotalPriceFromDb,
  getAllUsersFromDb,
  getUserByUserIdFromDb,
  updateUserToDb,
} from './user.service';
import {
  UserCreateValidationSchema,
  UserUpdateValidationSchema,
  orderValidationSchema,
} from './user.validation';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const data = validate(req, res, UserCreateValidationSchema);
    if (!data) return next();
    data.password = await hash(data.password, 12);
    const user = await createUserToDb(data);
    const newUser: Partial<UserCreated> = JSON.parse(JSON.stringify(user));
    delete newUser.password;
    delete newUser._id;
    delete newUser.orders;
    delete newUser.createdAt;
    delete newUser.updatedAt;
    delete newUser.__v;
    return res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: newUser,
    });
  } catch (error) {
    const errors = getMongooseErrors(error, 'account');

    if (errors) {
      const key = Object.keys(errors)[0];
      return res.status(400).json({
        success: false,
        message: errors[key] || 'Mongoose validation failed',
        error: {
          code: 400,
          description: errors[key] || 'Mongoose validation failed',
        },
        errors,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Something went wrong',
      },
    });
  }
};

export const getAllUser: RequestHandler = async (req, res) => {
  try {
    const users = await getAllUsersFromDb();
    return res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Something went wrong',
      },
    });
  }
};

export const getSingleUser: RequestHandler = async (req, res) => {
  try {
    const user = await getUserByUserIdFromDb(+req.params.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Something went wrong',
      },
    });
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const data = validate(req, res, UserUpdateValidationSchema);
    if (!data) return next();
    const user = await updateUserToDb(+req.params.userId, data);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Something went wrong',
      },
    });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const user = await getUserByUserIdFromDb(+req.params.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    await deleteUserFromDb(user.userId);
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Something went wrong',
      },
    });
  }
};

export const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const data = validate(req, res, orderValidationSchema);
    if (!data) return next();
    const user = await createOrderToDb(+req.params.userId, data);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Something went wrong',
      },
    });
  }
};

export const getAllOrders: RequestHandler = async (req, res) => {
  try {
    const user = await getAllOrdersFromDb(+req.params.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Something went wrong',
      },
    });
  }
};

export const getAllOrdersTotalPrice: RequestHandler = async (req, res) => {
  try {
    const user = await getUserByUserIdFromDb(+req.params.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const data = await getAllOrdersTotalPriceFromDb(+req.params.userId);
    return res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: data?.[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: 'Something went wrong',
      },
    });
  }
};
