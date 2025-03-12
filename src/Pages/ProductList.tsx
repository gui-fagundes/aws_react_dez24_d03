import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import api from "../services/api";

const ProductList = () => {
  type productsProps = {
    id: string;
    title: string;
    imagesUrl: string[];
    price: string;
    inStock: boolean;
    colors: string[];
    sizes: string[];
    tag: string;
    category:string;
  };

  const [products, setProducts] = useState<productsProps[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [checkedValue, setCheckedValue] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/Products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.checked ? e.target.id : "");
  };

  <div className="p-8 flex flex-wrap justify-start gap-y-10 gap-x-5 md:mb-5">
    {products.length > 0 ? (
      products
        .filter(
          (product: productsProps) =>
            product.title
              .toLowerCase()
              .includes(inputValue.trim().toLowerCase()) &&
            product.category.includes(
              checkedValue === "all" ? "" : checkedValue
            )
        )
        .map((product: productsProps) => {
          const price = parseFloat(product.price);

          return (
            <Card
              key={product.id}
              id={product.id}
              className="w-45"
              productImage={product.imagesUrl[0]}
              title={product.title}
              price={price.toFixed(2)}
              category={product.category}
            />
          );
        })
    ) : (
      <p>Loading products...</p>
    )}
  </div>;
};

export default ProductList;
