import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProductsByUrl, productsSelector } from "../../store";
import { fetchOrderHistoryUrl } from "../../config/constants";
import { dateFormatting } from "../../config/utils/dateFormatting";

import SettingsNavigations from "../../components/SettingsNavigations/SettingsNavigations";
import Pagination from "../../components/Pagination/Pagination";

import "./OrderHistoryPage.css";

const OrderHistoryPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const orders = useSelector(productsSelector);

  useEffect(() => {
    if (location.pathname === "/orders" && !location.search)
      dispatch(fetchProductsByUrl(fetchOrderHistoryUrl));
    else dispatch(fetchProductsByUrl(`${location.pathname}${location.search}`));
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <SettingsNavigations />
      {!orders.length ? (
        <span>Currently you have no orders</span>
      ) : (
        <>
          {orders.map((order) => (
            <div key={order.id} className="order-item-block">
              <div className="order-item-description">
                <div className="order-item-description__text">
                  <span>Order ID: </span>
                  <span>Date:</span>
                </div>
                <div className="order-item-description__value">
                  {order.id}
                  <span></span>
                  <span>{dateFormatting(order.createdAt)}</span>
                </div>
              </div>
              <div>
                <span className="order-item-price__text">Price</span>
                <span className="order-item-price__value">
                  $ {order.totalPrice}
                </span>
              </div>
            </div>
          ))}
        </>
      )}

      <Pagination />
    </>
  );
};

export default OrderHistoryPage;
