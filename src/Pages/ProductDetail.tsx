import BreadCrumbs from "../components/BreadCrumbs";
import Cards from "../components/Cards";

const ProductDetail = () => {
  const product = {
    title: "Camiseta Preta",
    price: 199,
    description: "A melhor camisa preta das camisas pretas",
    imagesUrl: ["/src/assets/black-shirt.png"],
    sizes: ["S", "M", "X"],
    colors: ["black", "yellow"],
    inStock: true,
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <BreadCrumbs currentPage={product.title} />

      <div className="w-273 max-w-screen flex flex-row justify-center h-136">
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
                <div className="rounded-full h-8 w-8 border-1 border-bl-900 cursor-pointer">
                  {color}
                </div>
              ))}
            </div>
            <h1 className="font-inter font-medium text-l1 text-bl-500">
              Select Size
            </h1>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <div className="rounded-sm h-10 w-10 border-1 border-bl-100 text-center content-center cursor-pointer">
                  {size}
                </div>
              ))}
            </div>
            <h1 className="font-inter font-medium text-l1 text-bl-500">Quantity</h1>
            <div className="flex justify-between w-41 h-11 border-1 border-bl-100 items-center rounded-md">
              <div className="cursor-pointer w-8 h-11 content-center text-center">-</div>
              <div>1</div>
              <div className="cursor-pointer w-8 h-11 content-center text-center">+</div>
            </div>

            <div className="rounded-md bg-bl-900 text-w-900 w-62 h-11 cursor-pointer text-center content-center">
              Add to Cart
            </div>
            <h1 className="font-inter font-medium text-bl-500 text-l1">— Free shipping on orders $100 +</h1>
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
            <h1 className="font-inter text-p1 font-medium text-bl-800 rounded-md bg-w-200">You might also like</h1>
            <h2 className="font-inter text-l1 font-medium text-bl-300">SIMILAR PRODUCTS</h2>
            <Cards />
      </div>

    </div>
  );
};

export default ProductDetail;
