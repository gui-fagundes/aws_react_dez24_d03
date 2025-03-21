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
  const [priceValue, setPriceValue] = useState(1300);
  const [page, setPage] = useState(1);
  const [maxProducts, setMaxProducts] = useState(0);
  const [maxPage, setMaxPage] = useState(Math.ceil(maxProducts / 9));
  const [maxPrice, setMaxPrice] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (checkedValue === "all") {
          const response = await api.get(
            `/products?price_lt=${priceValue}&_page=${page}&_per_page=9`
          );
          setProducts(response.data.data);
          const size = await api.get(`/products?price_lt=${priceValue}`);
          setMaxProducts(size.data.length);
          const price = await api.get('/products?_sort=-price&_limit=1');
          setMaxPrice(price.data[0].price)
        } else {
          const response = await api.get(
            `/products?category=${checkedValue}&price_lt=${priceValue}&_page=${page}&_per_page=9`
          );
          setProducts(response.data.data);
          const size = await api.get(
            `/products?category=${checkedValue}&price_lt=${priceValue}`
          );
          setMaxProducts(size.data.length);
          const price = await api.get('/products?_sort=-price&_limit=1');
          setMaxPrice(price.data[0].price)
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
    return (
      <>
        {`Showing ${1 + (page - 1) * 9} to ${
          (page - 1) * 9 + products.length
        } of ${maxProducts} Products`}
      </>
    );
  };

  useEffect(()=> {
    setMaxPage(Math.ceil(maxProducts / 9))
  },[maxProducts])

  return (
    <div className="flex flex-col max-w-screen">
      <BreadCrumbsSmall currentPage="Search" />
      <div className="flex flex-col md:flex-row max-w-full">
        <div className="flex flex-row flex-wrap md:flex-col md:h-135 md:border-1 max-w-screen md:w-62 border-bl-100 rounded-md mx-30 my-10 gap-3 py-5 px-3">
          <h1 className="hidden md:flex font-inter text-p1 text-bl-900 font-medium">Categories</h1>
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
              <div className="border-2 border-bl-100 h-5 w-5 rounded-sm peer-checked:bg-bl-400 text-w-900 self-center"></div>
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
              min={10}
              max={(maxPrice + 1)}
              step={1}
              value={priceValue}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
              onChange={(e) => setPriceValue(parseInt(e.target.value))}
            />
            <div>{`$ ${priceValue}`}</div>
          </div>
        </div>
        <div className="flex flex-col w-full py-5 md:py-15 md:pr-10 gap-3 px-20 md:pl-0">
          <h1 className="text-p1 font-inter font-medium text-bl-900">
            Applied Filters:
          </h1>
          <div className="flex flex-row justify-between w-full flex-wrap gap-3">
            <div className="flex gap-3">
              <h1 className="font-inter text-l1 border-1 border-bl-100 rounded-4xl max-w-28 max-h-9 text-center px-2 flex justify-between items-center gap-2">
                {`${checkedValue === "all" ? "None" : checkedValue}`}  <img src="/src/icons/X.svg" alt=""/>
              </h1>
              <h1
                className={`font-inter text-l1 border-1 border-bl-100 rounded-4xl max-w-28 max-h-9 text-center px-2 justify-between items-center gap-2 ${
                  inputValue ? "flex" : "hidden"
                }`}
               onClick={() => setInputValue('')} >
                {`${inputValue ? inputValue : ""}`}  <img src="/src/icons/X.svg" alt=""/>
              </h1>
              <h1
                className={`font-inter text-l1 border-1 border-bl-100 rounded-4xl max-w-28 max-h-9 text-center px-2 justify-between items-center gap-2 ${
                  priceValue ? "flex" : "hidden"
                }`}
              >
                {`${priceValue ? `$ ${priceValue}` : ""}`} <img src="/src/icons/X.svg" alt=""/>
              </h1>
            </div>
            <div className="flex flex-col relative">
              <img src="/src/icons/Search.png" alt="" className="absolute w-6 h-6 top-2 left-1" />
              <input
                type="text"
                placeholder="Search Products"
                className="border-1 border-bl-100 rounded-md text-bl-300 outline-none px-7 py-2 font-inter text-p1 text-center max-w-66"
                onChange={handleInput}
                value={inputValue}
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
              className="text-center cursor-pointer w-10 h-10 flex justify-center items-center"
              onClick={() => {
                if (page == 1) return;
                setPage(page - 1);
                window.scrollTo(0, 0);
              }}
            >
              <img src="/src/icons/Chevron Left.png" alt="previous page" className="h-6 w-6" />
            </div>
            <div className=" text-center flex items-center justify-center bg-w-100 w-10 my-1 rounded-sm">{page}</div>
            <div
              className="text-center cursor-pointer w-10 h-10 flex justify-center items-center"
              onClick={() => {
                if (page == maxPage) return;
                setPage(page + 1);
                window.scrollTo(0, 0);
              }}
            ><img src="/src/icons/Chevron Right.png" alt="next page" className="w-6 h-6" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
