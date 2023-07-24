import type { Component } from "solid-js";
import { A } from "@solidjs/router";
import { Button } from "@suid/material";

const Dashboard: Component = () => {
  return (
    <>
      <A href="/new_invoice">
        <Button
          sx={{
            position: "fixed",
            top: 40,
            right: 40,
          }}
          variant="contained"
        >
          New Invoice
        </Button>
      </A>
      <div>
        <h2>Your Invoices</h2>
      </div>
    </>
  );
};

export default Dashboard;
