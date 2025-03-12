import { useEffect, useState } from "react";
import api from "../services/api";
import Card from "./Card";

const Cards = () => {
  const [products, setProducts] = useState({});

  const getProducts = async () => {
    const response = await api.get("/Products");
    return response;
  };

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      if (allProducts) setProducts(allProducts);
    };

    getAllProducts();
  }, []);

  return (
    <div className="flex flex-row flex-nowrap max-w-full px-10 justify-evenly">
      <Card
        productImage={"/src/assets/Hero-Image.png"}
        title={"Camisa Preta"}
        price={"199"}
        className={""}
        category={"Vestuario"}
        classNameImage={""}
        id={"1"}
        inStock={true}
      />
      <Card
        productImage={"/src/assets/Hero-Image.png"}
        title={"Camisa Preta"}
        price={"199"}
        className={""}
        category={"Vestuario"}
        classNameImage={""}
        id={"1"}
        inStock={true}
      />
      <Card
        productImage={"/src/assets/Hero-Image.png"}
        title={"Camisa Preta"}
        price={"199"}
        className={""}
        category={"Vestuario"}
        classNameImage={""}
        id={"1"}
        inStock={true}
      />
      <Card
        productImage={"/src/assets/Hero-Image.png"}
        title={"Camisa Preta"}
        price={"199"}
        className={""}
        category={"Vestuario"}
        classNameImage={""}
        id={"1"}
        inStock={true}
      />
    </div>
  );
};

export default Cards;
