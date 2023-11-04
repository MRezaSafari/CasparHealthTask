import * as React from "react";
import { createRoot } from "react-dom/client";

import AppRoot from "./app";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary";
import { HelmetProvider } from "react-helmet-async";

let rootElement: unknown = null;

if (!rootElement) {
  rootElement = document.getElementById("root") as HTMLElement;
  const root = createRoot(rootElement as HTMLDivElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <BrowserRouter>
            <AppRoot />
          </BrowserRouter>
        </HelmetProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
