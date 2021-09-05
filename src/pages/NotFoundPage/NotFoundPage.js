import React from "react";

import { ReactComponent as Icon404 } from "../../icons/icon_404.svg";

import "./NotFoundPage.css";

const NotFoundPage = () => (
  <div className="box-404">
    <Icon404 />
    <span className="text-404">404</span>
  </div>
);

export default NotFoundPage;
