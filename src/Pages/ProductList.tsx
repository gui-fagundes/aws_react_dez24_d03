import { useEffect, useState } from "react";
import api from "../services/api";
import Card from "../components/Card";
import BreadCrumbsSmall from "../components/BreadCrumbsSmall";

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
  const [priceValue, setPriceValue] = useState(2000)
  const [page, setPage] = useState(1);
  const [maxProducts, setMaxProducts] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (checkedValue === "all") {
          const response = await api.get(`/products?price_lt=${priceValue}&_page=${page}&_per_page=9`);
          setProducts(response.data.data);
          const size = await api.get(`/products?price_lt=${priceValue}`)
          setMaxProducts(size.data.length)
        } else {
          const response = await api.get(
            `/products?category=${checkedValue}&price_lt=${priceValue}&_page=${page}&_per_page=9`
          );
          setProducts(response.data.data);
          const size = await api.get(`/products?category=${checkedValue}&price_lt=${priceValue}`)
          setMaxProducts(size.data.length)
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [page, checkedValue, inputValue, priceValue]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.checked ? e.target.id : "");
  };

  const getProductCount = () => {
    return <>
    {`Showing ${1 + ((page-1)*9)} to ${((page-1)*9) + products.length} of ${maxProducts} Products`}
    </>
  }

  return (
    <div className="flex flex-col">
      <BreadCrumbsSmall currentPage="Products" />
      <div className="flex flex-col md:flex-row max-w-screen">
        <div className="flex flex-row flex-wrap md:flex-col md:h-135 md:border-1 max-w-screen md:w-62 border-bl-100 rounded-md mx-30 my-10 gap-3 py-5 px-3">
          <h1 className="hidden md:flex">Categories</h1>
          {["Tops", "Bottoms", "Coats", "Socks", "all"].map((category) => (
            <label
              key={category}
              className="flex gap-3 md:border-b-1 border-bl-100 py-3 text-bl-600 text-p1 font-inter"
              htmlFor={category}
            >
              <input
                className="hidden peer"
                type="radio"
                onChange={handleChecked}
                name="categories"
                id={category}
              />
              <div className="border-4 border-bl-100 h-6 w-6 rounded-sm peer-checked:bg-bl-600 text-w-900 p-1"></div>
              <span className="font-inter">{category.replace(/_/g, " ")}</span>
            </label>
          ))}

          <div>
       <label
            htmlFor="priceRange"
            className="block mb-2 text-sm font-inter font-medium text-p1 text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            id="priceRange"
            type="range"
            min={100}
            max={1500}
            step={10}
            value={priceValue}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
            onChange={(e) => setPriceValue(parseInt(e.target.value))}
          />
          <div>{`R$ ${priceValue}`}</div>      
          </div>
         
        </div>
        <div className="flex flex-col w-full py-5 md:py-15 md:pr-10 gap-3 px-20 md:pl-0">
          <h1 className="text-p1 font-inter font-medium text-bl-900">
            Applied Filters:
          </h1>
          <div className="flex flex-row justify-between w-full">
            <div className="flex gap-3">
              <h1 className="font-inter text-l1 border-1 border-bl-100 rounded-4xl max-w-28 max-h-9 text-center px-4 flex justify-around items-center gap-2">
                {`${checkedValue === "all" ? "None" : checkedValue}`} <b>X</b>
              </h1>
              <h1
                className={`font-inter text-l1 border-1 border-bl-100 rounded-4xl max-w-28 max-h-9 text-center px-4 justify-around items-center gap-2 ${
                  inputValue ? "flex" : "hidden"
                }`}
              >
                {`${inputValue ? inputValue : ""}`} <b>X</b>
              </h1>
              <h1
                className={`font-inter text-l1 border-1 border-bl-100 rounded-4xl max-w-28 max-h-9 text-center px-4 justify-around items-center gap-2 ${
                  priceValue ? "flex" : "hidden"
                }`}
              >
                {`${priceValue ? `R$ ${priceValue}` : ""}`} <b>X</b>
              </h1>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search Products"
                className="border-1 border-bl-100 rounded-md text-bl-300 outline-none px-4 py-2 font-inter text-p1"
                onChange={handleInput}
              />
            </div>
          </div>
          <div>
            <h1 className="font-inter font-medium text-l1 text-bl-500">
              {getProductCount()}
            </h1>
          </div>

          <div className="flex flex-row justify-start gap-2 flex-wrap">
            {products.map((product) => {
              return <Card product={product} key={product.id} />;
            })}
          </div>
          <div className="flex flex-row flex-nowrap w-38 h-11 border-1 border-w-200 rounded-md self-center justify-between text-center">
            <div
              className="text-center content-center cursor-pointer w-10 h-10"
              onClick={() => {
                setPage(page == 1 ? 1 : page - 1);
              }}
            >
              {" "}
              {`<`}{" "}
            </div>
            <div className="h-full text-center content-center">{page}</div>
            <div
              className="text-center content-center cursor-pointer w-10 h-10"
              onClick={() => {
                setPage(page + 1);
              }}
            >{`>`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
