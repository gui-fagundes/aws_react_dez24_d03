import { useCallback, useEffect, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import Cards from "../components/Cards";
import api from "../services/api";
import { useAppDispatch } from "../store";
import { CartItem } from "../store/cart/types/CartItem";
import { CartSlice } from "../store/cart/cartSlice";

const ProductDetail = () => {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const current = location.pathname;

  const [product, setProducts] = useState({
    id: "",
    title: "",
    description: "",
    imagesUrl: [],
    price: 0,
    inStock: false,
    colors: [],
    sizes: [],
    tag: "",
    category: "",
  });

  useEffect(() => {
    api.get(current).then((response) => {
      setProducts(response.data);
    });
  }, []);

  const getCartItemInfo = useCallback(() => {
    const cartItem: CartItem = {
      id: Math.random().toString(25).substring(2),
      productId: product.id,
      title: product.title,
      imagesUrl: product.imagesUrl,
      quantity: quantity,
      price: product.price,
      color: color,
      size: size,
      category: product.category,
      inStock: product.inStock,
    };

    return cartItem;
  }, [quantity, color, size]);

  const handleSize = (size: string) => {
    setSelectedSize(size);
    setSize(size);
  };
  const handleColor = (color: string) => {
    setSelectedColor(color);
    setColor(color);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <BreadCrumbs currentPage={product.title} />

      <div className="w-273 max-w-screen flex flex-row justify-center h-136 mt-10">
        <div className="bg-bl-100 justify-center items-center max-w-[50%]">
          <img src={product.imagesUrl[0]} alt="" />
        </div>
        <div className="flex flex-col w-136 max-w-[50%] items-end">
          <div className="flex flex-col items-start justify-evenly gap-3 text-start max-w-109 mr-20 py-4">
            <h1 className="text-h3 font-inter font-bold text-bl-900">
              {product.title}
            </h1>
            <div className="flex flex-row gap-3">
              <div>Stars</div>
              <div>{product.inStock ? "In Stock" : "NO STOCK"}</div>
            </div>
            <div>{`$${product.price}`}</div>
            <h1 className="font-inter font-medium text-l1 text-bl-500">
              Avaiable Colors
            </h1>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <div
                  className={`rounded-full h-8 w-8 border-1 border-bl-900 cursor-pointer ${
                    selectedColor === color ? "bg-bl-300" : ""
                  }`}
                  key={color}
                  onClick={() => handleColor(color)}
                >
                  {color}
                </div>
              ))}
            </div>
            <h1 className="font-inter font-medium text-l1 text-bl-500">
              Select Size
            </h1>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <div
                  className={`rounded-sm h-10 w-10 border-1 border-bl-100 text-center content-center cursor-pointer ${
                    selectedSize === size ? "bg-bl-300" : ""
                  }`}
                  key={size}
                  onClick={() => handleSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
            <h1 className="font-inter font-medium text-l1 text-bl-500">
              Quantity
            </h1>
            <div className="flex justify-between w-41 h-11 border-1 border-bl-100 items-center rounded-md">
              <div
                className="cursor-pointer w-8 h-11 content-center text-center"
                onClick={() =>
                  quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)
                }
              >
                -
              </div>
              <div>{quantity}</div>
              <div
                className="cursor-pointer w-8 h-11 content-center text-center"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </div>
            </div>

            <div
              className="rounded-md bg-bl-900 text-w-900 w-62 h-11 cursor-pointer text-center content-center"
              onClick={() => {
                const cartItem = getCartItemInfo();
                dispatch(CartSlice.actions.addItemToCart(cartItem));
              }}
            >
              Add to Cart
            </div>
            <h1 className="font-inter font-medium text-bl-500 text-l1">
              — Free shipping on orders $100 +
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-row h-81 mx-20 justify-center items-center gap-5">
        <div>...Details</div>
        <div>
          <h1>Detail</h1>
          <p>{product.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-10 items-center px-25">
        <h1 className="font-inter text-p1 font-medium text-bl-800 rounded-md bg-w-200">
          You might also like
        </h1>
        <h2 className="font-inter text-l1 font-medium text-bl-300">
          SIMILAR PRODUCTS
        </h2>
        <Cards />
      </div>
    </div>
  );
};

export default ProductDetail;
