import "./EditProduct.scss";

import { useState } from "react";

import { FaImage } from "react-icons/fa";
import { EditProductProps } from "../../interfaces/EditProductProps";

const EditProduct = ({onCancel, onSave, product}: EditProductProps) => {
    const [updatedName, setUpdatedName] = useState<string>(product.name);
    const [updatedDescription, setUpdatedDescription] = useState<string>(product.description);
    const [updatedPrice, setUpdatedPrice] = useState<number>(product.price);
    const [updatedStock, setUpdatedStock] = useState<number>(product.stock);
    const [updatedImage, setUpdatedImage] = useState<File | null | string>(product.image);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setUpdatedImage(event.target.files[0]);
      }
    };
  
    const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onSave({
        id: product.id,
        name: updatedName,
        description: updatedDescription,
        price: updatedPrice,
        stock: updatedStock,
        image: updatedImage
      });
    };

  return (
    <form className="edit-form" encType="multipart/form-data">
     <input
        type="text"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
        placeholder="Nome"
      />
      <input
        type="text"
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
        placeholder="Descrição"
      />
      <input
        type="number"
        value={updatedPrice}
        onChange={(e) => setUpdatedPrice(parseFloat(e.target.value))}
        placeholder="Preço"
      />
      <input
        type="number"
        value={updatedStock}
        onChange={(e) => setUpdatedStock(parseInt(e.target.value, 10))}
        placeholder="Quantidade"
      />
      <div className="custom-file-input">
      <input type="file" id="file" className="file-input" name="image" onChange={handleFileChange}/>
        <label htmlFor="file" className="file-label">
          <FaImage />
        </label>
      </div>
      <div className="btn">
        <button type="submit" className="save" onClick={handleSave}>Salvar</button>
        <button type='submit' className="cancel" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default EditProduct;
