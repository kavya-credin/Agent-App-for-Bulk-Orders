interface Price {
    safalAppPrice: number;
  }

  interface Product {
    _id: string;
    name: string;
    MRP: number;
    description: string;
    image: string[];
    price: Price;
    __v: number;
    quantity: number;
  }
export default Product;

