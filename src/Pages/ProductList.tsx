import { useEffect, useState } from "react";
import api from "../services/api";
import BreadCrumbs from "../components/BreadCrumbs";
import Card from "../components/Card";

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
    category: string;
  };

  const [products, setProducts] = useState<productsProps[]>([]);

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

  return (
    <div className="flex flex-col">
      <BreadCrumbs currentPage="Products" />
      <div className="flex flex-row max-w-screen">
        <div className="flex flex-col h-135 border-1 w-62 border-bl-100 mx-30">
          <h1>Categories</h1>
        </div>
        <div className="flex flex-col w-full">
          <h1>Applied Filters: </h1>
          <div className="flex flex-row justify-between w-full">
            <div className="flex gap-3">
              <h1>Filter1</h1>
              <h1>Filter2</h1>
            </div>
            <div>
              <input type="text" placeholder="Search Products" />
            </div>
          </div>
          <div>Showing Products</div>

          <div className="flex flex-row justify-start gap-2 flex-wrap">
          {products.map((product) =>  { 
            return(
              <Card product={product}
              />)
            })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
