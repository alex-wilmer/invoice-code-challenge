import type { Component } from "solid-js";
import { A } from "@solidjs/router";
import { Button } from "@suid/material";

const App: Component = () => {
  return (
    <div>
      <header>
        <p>So you cant to make an invoice, eh?</p>
        <A href="/new_invoice">
          <Button variant="contained">Get Started</Button>
        </A>
      </header>
    </div>
  );
};

export default App;
