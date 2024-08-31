import "./ProductCard.scss";

import { ProductsCardProps } from "../../intefaces/ProductCardProps";

import { formatCurrency } from "../../utils/FormatPrice";

import { useState } from "react";
import axios from "axios";

import { FaAngleDown, FaMinus, FaPlus, FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import EditProduct from "../EditProduct/EditProduct";

import { Product } from "../../intefaces/Product";

import Snackbar from "../SnackBar/SnackBar";

const ProductsCard = ({ product, onChange, onEdit, onDelete }: ProductsCardProps) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [padding, setPadding] = useState<string | null>(null);

  const updateStock = async (productId: number, quantity: number) => {
    try {
      const response = await axios.patch(
        `http://localhost:7777/api/products/stock/${productId}`,
        { stock: quantity }
      );
      Snackbar({
        message: 'Estoque atualizado com sucesso!',
        variant: 'success',
        autoHideDuration: 3500,
      });
      onChange(response.data);
    } catch (error: any) {
      Snackbar({
        message: error.response.data,
        variant: 'error',
        autoHideDuration: 3500,
      });
    }
  };

  const handleDelete = async (productId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:7777/api/products/${productId}`
      );
      Snackbar({
        message: 'Produto deletado com sucesso!',
        variant: 'success',
        autoHideDuration: 3500,
      });
      onDelete(product);
    } catch (error: any) {
      Snackbar({
        message: error.response.data,
        variant: 'error',
        autoHideDuration: 3500,
      });
    }
  };

  const handleShowDescription = () => {
    setShowDescription(!showDescription);
  };

  const editProduct = () => {
    setIsEditing(true);
    setPadding("edit");
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setPadding("");
  };

  const handleEditSave = (updatedProduct: Product) => {
    setIsEditing(false);
    setPadding("");
    onEdit(updatedProduct);
  };

  const imageUrl = product.image
    ? `http://localhost:7777${product.image}`
    : "https://via.placeholder.com/180";

  return (
    <>
      <div className={`card ${padding}`}>
        {isEditing ? (
          <EditProduct
            onCancel={handleEditCancel}
            onSave={handleEditSave}
            product={product}
          />
        ) : (
          <>
            <div className="card-actions">
              <p onClick={() => editProduct()} className="edit">
                <FaRegEdit />
              </p>
              <p className="title">{product.name}</p>
              <p onClick={() => handleDelete(product.id)} className="delete">
                <FaRegTrashCan />
              </p>
            </div>
            <img src={imageUrl} alt={product.name} />
            <p>Preço</p>
            <span>{formatCurrency(product.price)}</span>
            <p>Estoque</p>
            <div className="stock">
              <button onClick={() => updateStock(product.id, -1)}>
                <FaMinus color="red" />
              </button>
              <p>{product.stock}</p>
              <button onClick={() => updateStock(product.id, 1)}>
                <FaPlus color="green" />
              </button>
            </div>
            {typeof product.description === "string" ? (
              <>
                <button
                  className="description-btn"
                  onClick={() => handleShowDescription()}
                >
                  <p>Descrição</p>
                  <p>
                    <FaAngleDown color="white" />
                  </p>
                </button>
                <div
                  className={`description-container ${
                    showDescription ? "visible" : ""
                  }`}
                >
                  {showDescription && (
                    <span className="description">{product.description}</span>
                  )}
                </div>
              </>
            ) : (
              <p>Não tem descrição</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProductsCard;
