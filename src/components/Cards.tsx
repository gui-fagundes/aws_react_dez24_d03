import { useEffect, useState } from "react";
import api from "../services/api";
import Card from "./Card";

const Cards = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await api.get("/products?_limit=4");
    return response.data;
  };

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      if (allProducts) setProducts(allProducts);      
    };

    getAllProducts();
  }, []);

  return (
    <div className="flex flex-row flex-wrap gap-3 max-w-full px-10 justify-evenly">
      {products.map((product) => <Card product={product} key={product.id!} />)}
    </div>
  );
};

export default Cards;
