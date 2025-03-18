import { useEffect, useState } from "react";
import api from "../services/api";
import BreadCrumbs from "../components/BreadCrumbs";
import Card from "../components/Card";

const ProductList = () => {
  type productsProps = {
    id: string;
    title: string;
    imagesUrl: string[];
    price: number;
    inStock: boolean;
    colors: string[];
    sizes: string[];
    tag: string;
    category: string;
  };

  const [products, setProducts] = useState<productsProps[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [checkedValue, setCheckedValue] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
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

  return (
    <div className="flex flex-col">
      <BreadCrumbs currentPage="Products" />
      <div className="flex flex-row max-w-screen">
        <div className="flex flex-col h-135 border-1 w-62 border-bl-100 mx-30 gap-3">
          <h1>Categories</h1>
          {["Tops", "Bottoms", "Coats", "Socks", "all"].map((category) => (
            <label key={category} className="flex gap-3" htmlFor={category}>
              <input
                className="hidden peer"
                type="radio"
                onChange={handleChecked}
                name="categories"
                id={category}
              />
              <div className="border-1 border-bl-100 h-6 w-6 rounded-lg peer-checked:bg-bl-800 text-w-900 p-1"></div>
              <span className="font-inter">{category.replace(/_/g, " ")}</span>
            </label>
          ))}
        </div>
        <div className="flex flex-col w-full">
          <h1>Applied Filters: </h1>
          <div className="flex flex-row justify-between w-full">
            <div className="flex gap-3">
              <h1 className="font-inter text-p1 border-1 border-bl-100 rounded-xl max-w-24 text-center px-2">{`${checkedValue === "all" ? "None" : checkedValue}`}</h1>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search Products"
                onChange={handleInput}
              />
            </div>
          </div>
          <div>Showing Products</div>

          <div className="flex flex-row justify-start gap-2 flex-wrap">
            {products
              .filter(
                (product) =>
                  product.title
                    .toLowerCase()
                    .includes(inputValue.trim().toLowerCase()) &&
                  product.category.includes(
                    checkedValue === "all" ? "" : checkedValue
                  )
              )
              .map((product) => {
                return <Card product={product} key={product.id} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
