import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductsByUrl,
  isLoadingSelector,
  productsSelector,
} from "../../store";

import {
  amountGetProducts,
  fetchProductUrl,
} from "../../config/constants/constants";
import { regOffset } from "../../config/constants/regExpPatterns/RegExpPatterns";

import SearchBar from "../../components/SearchBar/SearchBar";
import ListProduct from "../../components/ListProducts/ListProducts";
import Preloader from "../../components/Preloader/Preloader";

import "./HomePage.css";

const HomePage = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const amountProducts = useSelector(productsSelector).length;

  useEffect(() => {
    if (location.pathname === "/")
      dispatch(fetchProductsByUrl(fetchProductUrl));
    else dispatch(fetchProductsByUrl(`${location.pathname}${location.search}`));
  }, [location]);

  const handlerLoadMore = () => {
    let url;
    if (location.pathname === "/") url = fetchProductUrl;
    else url = `${location.pathname}${location.search}`;
    const strOffset = url.match(regOffset)?.[0];
    const newOffset =
      +strOffset?.slice(strOffset?.lastIndexOf("=") + 1) + amountGetProducts;
    const newUrl = url.replace(regOffset, `offset=${newOffset}`);

    history.push(newUrl);
  };

  if (isLoading) return <Preloader />;

  return (
    <>
      <SearchBar />
      <div className="content">
        <ListProduct />
        {!(amountProducts < amountGetProducts) && !!amountProducts && (
          <button onClick={handlerLoadMore} className="button-load-more">
            <span className="button-load-more__name">load More</span>
          </button>
        )}
      </div>
    </>
  );
};

export default HomePage;
