import productModel from "../models/productModle";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Dell Laptop",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.HVJO47zHrDiXjKUyD5mLXAHaHa%26pid%3DApi&f=1&ipt=ad2f3f9b854ff238fa691b176218227a8bb3da9c1cd7f5db37e2c82ac806517e&ipo=images",
        price: 700,
        stock: 100,
      },
      {
        title: "Lenovo Laptop",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.QPr-7VIYnNIGsWgVi8nz6QHaHa%26pid%3DApi&f=1&ipt=6f8bc609cf4c04623824a5f55c49be8866de644aba9a2da5dde1dc5294a55112&ipo=images",
        price: 899,
        stock: 10,
      },
      {
        title: "HP Laptop",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.47JSJdIG_QES4vVE4xSKCQHaHa%26pid%3DApi&f=1&ipt=5e4556acd3974b2fa921c96e94ac2b97a4767ae507099d349f75b53b518e1fea&ipo=images",
        price: 1,
        stock: 630,
      },
      /*   { title: "Product 4", image: "image4.jpg", price: 30, stock: 205 },
    { title: "Product 5", image: "image5.jpg", price: 24, stock: 1 },
    { title: "Product 6", image: "image6.jpg", price: 67, stock: 45 }, */
    ];

    const existingProdducts = await getAllProducts();

    if (existingProdducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (error) {
    console.error("cannot see database", error);
  }
};
