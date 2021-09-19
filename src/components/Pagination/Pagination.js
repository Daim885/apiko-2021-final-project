import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import {
  amountGetProducts,
  fetchProductUrl,
  fetchFavouriteProductUrl,
  regOffset,
} from "../../config/constants";
import { productsSelector } from "../../store";

import "./Pagination.css";

const Pagination = () => {
  const amountProducts = useSelector(productsSelector).length;
  const history = useHistory();
  const handlerLoadMore = () => {
    const pathname = history.location.pathname;
    const search = history.location.search;
    let url;
    if (pathname === "/") url = fetchProductUrl;
    else if (pathname === "/favorites" && !search)
      url = fetchFavouriteProductUrl;
    else url = `${pathname}${search}`;
    const strOffset = url?.match(regOffset)?.[0];
    const newOffset =
      +strOffset?.slice(strOffset?.lastIndexOf("=") + 1) + amountGetProducts;
    const newUrl = url?.replace(regOffset, `offset=${newOffset}`);

    history.push(newUrl);
  };

  return (
    <>
      {!(amountProducts < amountGetProducts) && !!amountProducts && (
        <button onClick={handlerLoadMore} className="button-load-more">
          <span className="button-load-more__name">Load More</span>
        </button>
      )}
    </>
  );
};

export default Pagination;
