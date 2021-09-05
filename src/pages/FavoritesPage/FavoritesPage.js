import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchFavouriteProductUrl } from "../../config/constants";
import { fetchProductsByUrl } from "../../store";

import Pagination from "../../components/Pagination/Pagination";
import ListProduct from "../../components/ListProducts/ListProducts";
import SettingsNavigations from "../../components/SettingsNavigations/SettingsNavigations";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/favorites" && !location.search)
      dispatch(fetchProductsByUrl(fetchFavouriteProductUrl));
    else dispatch(fetchProductsByUrl(`${location.pathname}${location.search}`));
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <SettingsNavigations />
      <div>
        <ListProduct />
        <Pagination />
      </div>
    </>
  );
};

export default FavoritesPage;
