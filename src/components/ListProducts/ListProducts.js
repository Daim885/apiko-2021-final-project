import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { productsSelector } from "../../store";

import ListItem from "../ListItem/ListItem";

import "./ListProducts.css";

const ListProduct = () => {
  const [typeMessage, setTypeMessage] = useState("");
  const products = useSelector(productsSelector);
  const location = useLocation();

  useEffect(() => {
    if (products?.error === "INVALID_CATEGORY") setTypeMessage("byCategory");
    if (products.length === 0) {
      if (location.pathname === "/products/search") setTypeMessage("byName");
      else if (location.pathname.startsWith("/categories/"))
        setTypeMessage("byCategory");
      else setTypeMessage("");
    }
  }, [products]);

  return (
    <>
      {!typeMessage && products?.status !== 400 && (
        <div className="list-products__container">
          {products.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
        </div>
      )}
      {typeMessage === "byName" && (
        <div className="message-error-product-list">
          <span className="message-error__title">No Results Found</span>
          <span className="message-error__description">
            We did not find any article that matches this search Make sure that
            the search text is entered correctly Try using other search criteria
          </span>
        </div>
      )}
      {typeMessage === "byCategory" && (
        <div className="message-error-product-list">
          <span className="message-error__title">
            No items in this category yet
          </span>
        </div>
      )}
    </>
  );
};

export default ListProduct;
