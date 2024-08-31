import { Request, Response } from "express";
import productServices from "../service/service";

import { capitalizeDescription, formatName } from "../utils/FormatName";
import Product from "../models/product";

import { promises as fs } from 'fs';
import path from "path";

const getProductsController = async (req: Request, res: Response) => {
  try {
    const products = await productServices.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json("Erro interno no servidor.");
  }
};

const createProductController = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock } = req.body;
    const image = req.file?.filename ? `/uploads/${req.file.filename}` : null;

    if (!name || !price || !stock) return res.status(400).send("Preencha todos os campos.");
    if (price < 0.01) return res.status(400).send("Preço inválido");
    if (stock < 0.01) return res.status(400).send("Número em estoque inválido");

    const correctedName = formatName(name);
    const correctedDescription = capitalizeDescription(description);

    const newProduct = {
      name: correctedName,
      description: correctedDescription,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      image
    };

    await productServices.createProduct(newProduct);
    res.status(201).send("Produto adicionado com sucesso!");
  } catch (error) {
    res.status(500).json("Erro interno no servidor.");
  }
};

const updatedProductController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedProduct = req.body;

    if (!id || !updatedProduct) {
      return res.status(400).send('Dados inválidos');
    }
    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.stock) return res.status(400).send("Preencha todos os campos.");
    if (updatedProduct.price < 0.01) return res.status(400).send("Preço inválido");
    if (updatedProduct.stock < 0.01) return res.status(400).send("Número em estoque inválido");

    updatedProduct.name = formatName(updatedProduct.name);
    updatedProduct.description = capitalizeDescription(updatedProduct.description);

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send("Produto não encontrado.");
    }

    // Imagem antiga
    const oldImage = product.image ? path.join(__dirname, '../../', product.image) : null;

    // Verificando se veio uma nova imagem
    const newImage = req.file?.filename ? `/uploads/${req.file.filename}` : null;
    console.log(newImage);

    if (newImage) {
      // Apagar a imagem antiga, se existir
      if (oldImage) {
        await fs.unlink(oldImage);
      }
      // Atualizar o caminho da nova imagem
      updatedProduct.image = newImage;
    } else {
      // Manter a imagem antiga, se não houver nova imagem
      updatedProduct.image = product.image;
    }

    const result = await productServices.updatedProduct(id, updatedProduct);
    res.status(200).json(result);

  } catch (error) {
    res.status(500).json("Erro interno no servidor.");
  }
};

const updatedStockController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { stock } = req.body;

    const product = await Product.findByPk(id);

    if (!product) return res.status(404).send("Produto não encontrado.");
    if (product.stock + stock < 0) return res.status(400).send("Estoque insuficiente para a operação.");

    const updatedProduct = await productServices.updatedStock(id, stock);
    res.status(200).json(updatedProduct);

  } catch (error) {
    res.status(500).json("Erro interno no servidor.");
  }
};

const deleteProductController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).send("Produto não encontrado.");

    await productServices.deleteProduct(id);
    res.status(200).send('Produto deletado com sucesso!');

  } catch (error) {
    res.status(500).json("Erro interno no servidor.");
  }
};

export default {
  getProductsController,
  createProductController,
  updatedStockController,
  deleteProductController,
  updatedProductController
};
