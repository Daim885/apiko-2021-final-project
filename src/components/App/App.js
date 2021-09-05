import React from "react";

import { routesConfig } from "../../config/routes/routesConfig";
import { RoutesGenerator } from "../../config/routes/RoutesGen";

const App = () => <RoutesGenerator config={routesConfig} />;

export default App;
