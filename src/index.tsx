/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Routes, Route } from "@solidjs/router";

import "./index.css";
import App from "./App";
import NewInvoiceForm from "./NewInvoiceForm";
import Dashboard from "./Dashboard";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <Router>
      <Routes>
        <Route path="/" component={App} />
        <Route path="/new_invoice" component={NewInvoiceForm} />
        <Route path="/dashboard" component={Dashboard} />
      </Routes>
    </Router>
  ),
  root!
);
