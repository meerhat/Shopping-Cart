import React from "react";
import { CartState } from "../context/Context";
import SingleProduct from "./SingleProduct";
import "./HomePageStyles.css";
import Filter from "./Filter";

const Home = () => {
  const {
    state: { products },
    productState: {sort, byStock, byFastDelivery, byRating, bySearch},
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if(sort) {
      sortedProducts = sortedProducts.sort((a, b) => 
        sort === 'lowToHigh' ? a.price-b.price : b.price-a.price
      );
    }
    if(!byStock){
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }
    if(byFastDelivery){
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }
    if(byRating){
      sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating);
    }
    if(bySearch){
      sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(bySearch));
    }
    return sortedProducts;
  };


  return (
    <div className="home">
      <Filter />
      <div className="productContainer">
        {transformProducts().map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
