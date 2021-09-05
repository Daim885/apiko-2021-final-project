import React from "react";
import { useSelector } from "react-redux";

import { tokenSelector } from "../../store";

import GuestHeader from "../../components/Headers/GuestHeader";
import ClientHeader from "../../components/Headers/ClientHeader";

import Footer from "../../components/Footer/Footer";

import "./PageWrapperLayout.css";

const PageWrapperLayout = ({ children }) => {
  const isToken = !!useSelector(tokenSelector);
  return (
    <div className="default-layout">
      {isToken ? <ClientHeader /> : <GuestHeader />}
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};

export default PageWrapperLayout;
