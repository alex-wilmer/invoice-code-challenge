import type { Component } from "solid-js";
import { A } from "@solidjs/router";
import { Button } from "@suid/material";

const App: Component = () => {
  return (
    <div>
      <h2>So you want to make an invoice, eh?</h2>
      <A href="/new_invoice">
        <Button variant="contained">Get Started</Button>
      </A>
    </div>
  );
};

export default App;
