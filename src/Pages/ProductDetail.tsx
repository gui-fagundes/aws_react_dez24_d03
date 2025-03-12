import BreadCrumbs from "../components/BreadCrumbs";
import Card from "../components/Card";

const ProductDetail = () => {
  return (
    <div className="flex flex-col">
      <BreadCrumbs currentPage="Detalhes" />
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

export default ProductDetail;
