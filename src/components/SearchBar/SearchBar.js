import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { categoriesSelector } from "../../store";

import {
  amountGetProducts,
  fetchProductUrl,
  regSortBy,
} from "../../config/constants";

import { ReactComponent as SearchIcon } from "../../icons/icon_search.svg";
import { ReactComponent as NavBarIcon } from "../../icons/icon_navbar.svg";
import { ReactComponent as FlugIcon } from "../../icons/icon_sorting.svg";
import { ReactComponent as DownArrowIcon } from "../../icons/icon_down_arrow.svg";
import { ReactComponent as CloseIcon } from "../../icons/icon_close.svg";

import "./SearchBar.css";

const SearchBar = () => {
  const history = useHistory();
  const location = useLocation();
  const categories = useSelector(categoriesSelector);
  const { idCategory: idCategoryFromUrl } = useParams();
  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false);
  const [search, setSearch] = useState("");
  const [idCategory, setIdCategory] = useState(0);
  const [valueSorting, setValueSorting] = useState("default");

  const onSubmit = (e) => {
    e.preventDefault();
    if (search.length === 0) history.push("/");
    if (search.length >= 3)
      history.push(
        `/products/search?keywords=${search}&offset=0&limit=${amountGetProducts}`
      );
    setSearch("");
  };

  const actionOnFocus = () => {
    setIsFocusSearchInput(true);
  };

  const actionOnBlur = () => {
    setIsFocusSearchInput(false);
  };

  const setSelectCategory = (id) => {
    setIdCategory(id);
    if (id !== 0)
      history.push(
        `/categories/${id}/products?offset=0&limit=${amountGetProducts}`
      );
    else history.push("/");
  };

  const setSelectValueSorting = (value) => {
    setValueSorting(value);
    if (value === "default") {
      if (location.pathname !== "/")
        history.push(
          `${location.pathname}${location.search}`.replace(regSortBy, "")
        );
    } else {
      if (location.pathname === "/")
        history.push(`${fetchProductUrl}&sortBy=${value}`);
      else {
        if (location.search.includes("&sortBy=")) {
          history.push(
            `${location.pathname}${location.search}`.replace(
              regSortBy,
              `&sortBy=${value}`
            )
          );
        } else
          history.push(
            `${location.pathname}${location.search}&sortBy=${value}`
          );
      }
    }
  };

  useEffect(() => {
    if (location.pathname.startsWith("/categories/"))
      setIdCategory(idCategoryFromUrl);
    if (location.search.includes("&sortBy="))
      setValueSorting(location.search.match(/=\w{6,7}/)[0].replace("=", ""));
  }, [location, idCategoryFromUrl]);

  return (
    <div className="searchbar">
      <div className="search-by-name">
        <form onSubmit={onSubmit}>
          <SearchIcon className="search-icon" />
          <input
            className="search__input"
            type="text"
            placeholder="Search products by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={actionOnFocus}
            onBlur={actionOnBlur}
            minLength={3}
          />
        </form>
      </div>
      {!isFocusSearchInput &&
        search.length <= 0 &&
        !(history.location.pathname === "/products/search") && (
          <>
            <div className="choose-category">
              <NavBarIcon className="choose-category-icon" />
              {idCategory === 0 ? (
                <DownArrowIcon className="choose-category-icon__arrow" />
              ) : (
                <CloseIcon
                  className="choose-category-icon__close"
                  onClick={() => setSelectCategory(0)}
                />
              )}
              <select
                value={idCategory}
                onChange={(e) => setSelectCategory(e.target.value)}
                className="choose-category__select"
              >
                <option hidden value={0} className="choose-category__option">
                  Choose Category
                </option>
                {categories?.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    className="choose-category__option"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sorting">
              <FlugIcon className="sorting-icon" />
              {valueSorting === "default" ? (
                <DownArrowIcon className="choose-category-icon__arrow" />
              ) : (
                <CloseIcon
                  className="choose-category-icon__close"
                  onClick={() => setSelectValueSorting("default")}
                />
              )}
              <select
                value={valueSorting}
                className="sorting__select"
                onChange={(e) => setSelectValueSorting(e.target.value)}
              >
                <option hidden value="default">
                  Sorting
                </option>
                <option value="popular">Popular</option>
                <option value="latest">Latest</option>
              </select>
            </div>
          </>
        )}
    </div>
  );
};

export default SearchBar;
