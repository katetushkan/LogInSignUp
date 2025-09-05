import { BrowserRouter as Router, Route, Routes } from "react-router";

import { Paths } from "./paths.ts";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { Typography } from "../components/Typography/Typography.tsx";

import { AuthenticationPage } from "../pages/Authentication/AuthenticationPage.tsx";
import { WelcomePage } from "../pages/Welcome/WelcomePage.tsx";

export const BaseRouter = () => (
  <Router>
    <Routes>
      <Route path={Paths.ACCESS_SCREEN} element={<AuthenticationPage/>}/>
      <Route path={Paths.FALLBACK_SCREEN}
             element={<Typography align='center' variant='sectionLabel'>Sorry, It's a trap: 404!</Typography>}/>

      <Route
        path={Paths.WELCOME_SCREEN}
        element={
          <ProtectedRoute>
            <WelcomePage/>
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);
