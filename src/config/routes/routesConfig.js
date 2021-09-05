import PageWrapperLayout from "../../layouts/PageWrapperLayout/PageWrapperLayout";

import HomePage from "../../pages/HomePage/HomePage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import LoginPage from "../../pages/LogInPage/LogInPage";
import EditAccountPage from "../../pages/EditAccountPage/EditAccountPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

// NOT FINISHED

export const routesConfig = [
  {
    layout: PageWrapperLayout,
    routes: [
      ["/", HomePage, true],
      ["/products", HomePage],
      ["/categories/:idCategory", HomePage],
      ["/register", RegisterPage],
      ["/login", LoginPage],
      ["/edit_account", EditAccountPage],
      ["*", NotFoundPage],
    ],
  },
];
