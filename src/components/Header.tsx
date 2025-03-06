const Header = () => {
  return (
    <div className="h-32 flex flex-col items-center">
      <div className="min-h-10 min-w-screen bg-black text-white text-center pt-2">
        <h1>Get 25% OFF on your first order. Buy Now </h1>
      </div>
      <div className="min-w-screen min-h-20 bg-white flex flex-row justify-around items-center">
        <div className="flex flex-row gap-30">
            <button className="flex flex-row items-center cursor-pointer">
            <img src="/src/assets/react.svg" alt="" />
            <h1>Nome Ecommerce</h1>
            </button>
            <div className="flex flex-row items-center gap-5">
                <button>Home</button>
                <button>Shop</button>
                <button>About</button>
            </div>
        </div>

        <div className="flex flex-row gap-5">
            <img src="/src/assets/react.svg" alt="" />
            <img src="/src/assets/react.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
