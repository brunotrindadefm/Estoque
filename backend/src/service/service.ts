import Product from "../models/product";
import path from "path";
import fs from "fs";

const getProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    console.error("Erro interno no servidor", error);
    throw error;
  }
};

const createProduct = async (data: {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
}) => {
  try {
    if (!data.name || !data.price || !data.stock) {
      throw new Error("Dados inválidos");
    }

    return await Product.create(data);
  } catch (error) {
    console.error("Erro interno no servidor", error);
    throw error;
  }
};

const updatedProduct = async (id: number, updatedProduct: Product) => {
  try {
    const product = await Product.findByPk(id);

    if (!product) throw new Error("Produto não encontrado.");

    // Atualiza o produto com os novos dados
    await product.update(updatedProduct);
    // Retorna o produto atualizado
    return product;
  } catch (error) {
    console.error("Erro interno no servidor", error);
    throw console.error;
  }
};

const updatedStock = async (id: number, quantity: number) => {
  try {
    const product = await Product.findByPk(id);

    if (  !product) throw new Error("Produto não existe");

    product.stock += quantity;
    await product.save();

    return product;
  } catch (error) {
    console.error("Erro interno no servidor", error);
    throw error;
  }
};

const deleteProduct = async (id: number) => {
  try {
    const product = await Product.findByPk(id);

    if (!product) throw new Error("Produto não existe");

    if (product.image) {
      // dirname é o arquivo service, os dois ../ são para voltar duas pastas e irem no uploads com o
      // nome da imagem, se existir, é apagada pelo 'unlink'
      const imagePath = path.join(__dirname, "../../", product.image);
      if (fs.existsSync(imagePath)) {
        await fs.promises.unlink(imagePath);
      }
    }

    await product.destroy();
  } catch (error) {
    console.error("Erro interno no servidor", error);
    throw error;
  }
};

export default {
  getProducts,
  createProduct,
  updatedStock,
  deleteProduct,
  updatedProduct,
};
