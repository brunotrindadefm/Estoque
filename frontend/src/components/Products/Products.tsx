import "./Products.scss";

import axios from "axios";
import { useState, useEffect } from "react";
import { Product } from "../../intefaces/Product";

import ProductCard from "../ProductCard/ProductsCard";
import { ProductsProps } from "../../intefaces/ProductsProps";

import Snackbar from "../SnackBar/SnackBar";

const Products = ({ newProduct }: ProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:7777/api/products");
      setProducts(response.data);
    } catch (error: any) {
      Snackbar({
        message: error.response.data,
        variant: 'error',
        autoHideDuration: 3500,
      });
    }
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    try {
      const formData = new FormData();
      if (updatedProduct.stock && updatedProduct.price) {
      formData.append("name", updatedProduct.name);
      formData.append("description", updatedProduct.description);
      formData.append("price", updatedProduct.price.toString());
      formData.append("stock", updatedProduct.stock.toString());
      }

      if (updatedProduct.image) {
        formData.append("image", updatedProduct.image);
      }
      const response = await axios.patch(
        `http://localhost:7777/api/products/${updatedProduct.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      // prevProducts refere-se ao estado anterior dos produtos
      // products utiliza o prevProducts para ver se o id do updated user existe nos products,
      // se existir, ele é alterado pelo updated user, se não, continua do jeito que estava
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? response.data : product
        )
      );
      await getProducts();
      Snackbar({
        message: 'Produto editado com sucesso!',
        variant: 'success',
        autoHideDuration: 3500,
      });
    } catch (error: any) {
      Snackbar({
        message: error.response.data,
        variant: 'error',
        autoHideDuration: 3500,
      });
    }
  };

  const handleProductUpdate = async (updatedProduct: Product) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = async (deletedProduct: Product) => {
    const updatedProducts = products.filter(
      (product) => product.id !== deletedProduct.id
    ); 
    setProducts(updatedProducts);
  };

  useEffect(() => {
    getProducts();
  }, [newProduct]);

  return (
    <>
      <div className="products-container">
        {products &&
          products.map((product) => (
            <ProductCard
              onEdit={handleEditProduct}
              key={product.id}
              onChange={(updatedProduct) => handleProductUpdate(updatedProduct)}
              onDelete={(deletedProduct) => handleDeleteProduct(deletedProduct)}
              product={product}
            />
          ))}
      </div>
    </>
  );
};

export default Products;
