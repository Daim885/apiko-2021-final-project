import PageWrapperLayout from "../../layouts/PageWrapperLayout/PageWrapperLayout";
import SettingsWrapperLayout from "../../layouts/SettingsWrapperLayout/SettingsWrapperLayout";

import HomePage from "../../pages/HomePage/HomePage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import LoginPage from "../../pages/LogInPage/LogInPage";
import EditAccountPage from "../../pages/EditAccountPage/EditAccountPage";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import CartPage from "../../pages/CartPage/CartPage";
import OrderHistoryPage from "../../pages/OrderHistoryPage/OrderHistoryPage";

export const routesConfig = [
  {
    layout: SettingsWrapperLayout,
    routes: [
      ["/settings", EditAccountPage],
      ["/orders", OrderHistoryPage],
      ["/favorites", FavoritesPage],
      ["/cart", CartPage],
    ],
  },
  {
    layout: PageWrapperLayout,
    routes: [
      ["/", HomePage, true],
      ["/products", HomePage],
      ["/categories/:idCategory", HomePage],
      ["/register", RegisterPage],
      ["/login", LoginPage],
      ["*", NotFoundPage],
    ],
  },
];
