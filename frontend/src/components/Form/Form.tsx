import "./Form.scss";

import { useState } from "react";
import axios from "axios";

import { FaImage } from "react-icons/fa";

import { FormProps } from "../../intefaces/FormProps";

import Snackbar from "../SnackBar/SnackBar";

const Form = ({ handleNewProduct }: FormProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number | undefined>(undefined);
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

      const formData = new FormData();
      if (stock && price) {
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("stock", stock.toString());
      }

      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await axios.post(
          "http://localhost:7777/api/products",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        handleNewProduct({ ...response.data, image });
        setName("");
        setDescription("");
        setPrice(undefined);
        setStock(undefined);
        setImage(null);
        Snackbar({
          message: 'Produto criado com sucesso!',
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

  return (
    <>
      <div className="form-container">
        <h1>Cadastre seus produtos</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preço"
            value={price !== undefined ? price : ""}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="Estoque"
            value={stock !== undefined ? stock : ""}
            onChange={(e) => setStock(parseInt(e.target.value))}
          />
          <div className="custom-file-input">
            <input
              type="file"
              id="file"
              className="file-input"
              onChange={handleFileChange}
            />
            <label htmlFor="file" className="file-label">
              <FaImage />
            </label>
          </div>
          <button type="submit">Adicionar</button>
        </form>
      </div>
    </>
  );
};

export default Form;
