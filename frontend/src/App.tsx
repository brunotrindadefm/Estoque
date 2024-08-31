import { useState } from "react";
import Form from "./components/Form/Form";
import Products from "./components/Products/Products";
import "./index.css";
import { Product } from "./intefaces/Product";

function App() {

  const [newProduct, setNewProduct] = useState<Product | undefined>(undefined);

  const handleNewProduct = (product: Product | undefined) => {
    if (product) {
      setNewProduct(product);
    }
  };

  return (
    <div className="app">
      <Form handleNewProduct={handleNewProduct} />
      <Products newProduct={newProduct} />
    </div>
  );
}

export default App;
