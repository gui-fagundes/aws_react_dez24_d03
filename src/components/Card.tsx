import { Link } from "react-router-dom";

type CardProps = {
  productImage: string;
  title: string;
  price: string;
  category: string;
  className: string;
  classNameImage?: string;
  id: string;
  inStock:boolean
};

const Card = ({
  productImage,
  title,
  price,
  className,
  category,
  classNameImage,
  id,
  inStock
}: CardProps) => {
  return (
    <div
      className={`flex flex-col gap-2 items-center w-66 h-109 font-inter min-w-xs ml-3 md:ml-0 ${className}`}
    >
      <div className="flex w-62 h-78 bg-w-100 items-center justify-center mt-3">
        <img
          className={`object-center w-25 h-30 ${classNameImage}`}
          src={productImage}
          alt={title}
        />
      </div>
      <div className="w-full px-3">

      <Link to={`/products/${id}`}>
        <p className="font-inter font-medium text-bl-900 text-p1 text-start hover:underline cursor-pointer">
          {title}
        </p>
      </Link>
      </div>

      <div className="flex gap-3 justify-start w-full align-baseline px-3 text-p1 h-7 text-center">
        <div className="rounded-4xl bg-w-900 border-bl-100 px-2 py-2 font-inter text-l1 w-22 self-center border-1">
          {inStock ? 'IN STOCK' : 'NO STOCK'}
        </div>
        <p className="text-slate-500 text-base dark:text-white text-center self-center">
          ${parseFloat(price).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Card;
