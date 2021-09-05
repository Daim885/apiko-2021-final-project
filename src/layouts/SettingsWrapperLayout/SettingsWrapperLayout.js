import React from "react";
import { useLocation } from "react-router-dom";

import ClientHeader from "../../components/Headers/ClientHeader";
import Footer from "../../components/Footer/Footer";

import "./SettingsWrapperLayout.css";

const SettingsWrapperLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="setingsl-layout">
      <ClientHeader />
      <main
        className="profile-wrapper"
        style={location.pathname === "/cart" ? { width: 984 } : { width: 904 }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default SettingsWrapperLayout;
