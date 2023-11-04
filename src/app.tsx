import React from "react";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { Helmet } from "react-helmet-async";
import GlobalStyle from "./globalStyles";

const AppRoot = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Caspar Health Interview Task</title>
      </Helmet>
      <main>
        <GlobalStyle />
        <div className="container">
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default AppRoot;
