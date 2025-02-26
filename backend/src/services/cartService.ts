import { populate } from "dotenv";
import { cartModel, ICartItem } from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
import productModel from "../models/productModle";

interface CreateCartForUser {
  userId: string;
}
const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
  populateProduct?: boolean;
}

export const getActiveCartForUser = async ({
  userId,
  populateProduct,
}: GetActiveCartForUser) => {
  let cart;
  if (populateProduct) {
    cart = await cartModel
      .findOne({ userId, status: "active" })
      .populate("items.product");
  } else {
    cart = await cartModel.findOne({ userId, status: "active" });
  }

  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

interface ClearCart {
  userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId });

  cart.items = [];
  cart.totalAmount = 0;

  await cart.save();

  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

interface AddItemToCart {
  userId: string;
  productId: any;
  quantity: number;
}
export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  // Does the item already exist in the cart?
  const existsInCart = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existsInCart) {
    return { data: "Item already exists in cart", statusCode: 400 };
  }

  // Fetch the product
  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found", statusCode: 404 };
  }

  if (product.stock < quantity) {
    return { data: "Product out of stock", statusCode: 400 };
  }

  cart.items.push({ product: productId, unitPrice: product.price, quantity });

  // Update the total amount
  cart.totalAmount += product.price * quantity;

  await cart.save();

  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

interface UpdateItemInCart {
  userId: string;
  productId: any;
  quantity: number;
}
export const updateItemInCart = async ({
  productId,
  quantity,
  userId,
}: UpdateItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  // Does the item already exist in the cart?
  const existsInCart = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!existsInCart) {
    return { data: "Item doesn't exists in cart", statusCode: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Product out of stock", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  let total = calculateCartTotalItems({ cartItems: otherCartItems });

  existsInCart.quantity = quantity;
  total += existsInCart.unitPrice * existsInCart.quantity;

  cart.totalAmount = total;

  await cart.save();

  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

interface DeleteItemInCart {
  userId: string;
  productId: any;
}

export const deleteItemInCart = async ({
  productId,
  userId,
}: DeleteItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  // Does the item already exist in the cart?
  const existsInCart = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!existsInCart) {
    return { data: "Item doesn't exists in cart", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  const total = calculateCartTotalItems({ cartItems: otherCartItems });

  cart.items = otherCartItems;
  cart.totalAmount = total;

  await cart.save();

  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

const calculateCartTotalItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  const total = cartItems.reduce((sum, product) => {
    sum += product.unitPrice * product.quantity;
    return sum;
  }, 0);

  return total;
};

interface CheckoutCart {
  userId: string;
  address: string;
}

export const checkoutCart = async ({ userId, address }: CheckoutCart) => {
  if (!address) {
    return { data: "Please add the address", statusCode: 400 };
  }

  const cart = await getActiveCartForUser({ userId });

  const orderItems: IOrderItem[] = [];

  // loop through the items in the cart and check if the product is still in stock
  for (const item of cart.items) {
    const product = await productModel.findById(item.product);

    if (!product) {
      return { data: "Product not found", statusCode: 404 };
    }

    if (product.stock < item.quantity) {
      return { data: "Product out of stock", statusCode: 400 };
    }

    const orderItem: IOrderItem = {
      productTitle: product.title,
      productImage: product.image,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    };

    orderItems.push(orderItem);
  }
  const order = await orderModel.create({
    orderItems,
    total: cart.totalAmount,
    address,
    userId,
  });

  await order.save();

  // update the cart status to be completed
  cart.status = "completed";
  await cart.save();

  return { data: order, statusCode: 200 };
};
