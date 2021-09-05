import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProductsByUrl, isLoadingSelector } from "../../store";

import { fetchProductUrl } from "../../config/constants";

import SearchBar from "../../components/SearchBar/SearchBar";
import ListProduct from "../../components/ListProducts/ListProducts";
import Preloader from "../../components/Preloader/Preloader";
import Pagination from "../../components/Pagination/Pagination";

import "./HomePage.css";

const HomePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    if (location.pathname === "/")
      dispatch(fetchProductsByUrl(fetchProductUrl));
    else dispatch(fetchProductsByUrl(`${location.pathname}${location.search}`));
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) return <Preloader />;

  return (
    <>
      <SearchBar />
      <div className="content">
        <ListProduct />
        <Pagination />
      </div>
    </>
  );
};

export default HomePage;
