import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { Button } from "@suid/material";
import { Box, Stack, TextField, Fab } from "@suid/material";
import Datepicker from "./Datepicker";
import LineItems from "./LineItems";
import Footer from "./Footer";
import { A } from "@solidjs/router";
interface LineItem {
  id: number;
  workDescription: string;
  hourlyRate: number;
  numHours: number;
}

const lineItem = {
  id: 1,
  workDescription: "",
  hourlyRate: 0,
  numHours: 0,
};

export interface Invoice {
  invoiceNumber: string;
  companyName: string;
  fullname: string;
  issueDate: Date | undefined;
  dueDate: Date | undefined;
  yourEmail: string;
  targetEmail: string;
}

const [state, setState] = createStore<Invoice>({
  invoiceNumber: "",
  companyName: "",
  fullname: "",
  issueDate: undefined,
  dueDate: undefined,
  yourEmail: "",
  targetEmail: "",
});
const [lineItems, setLineitems] = createStore<LineItem[]>([]);

const total = () =>
  lineItems.reduce((acc, x) => {
    return x.hourlyRate * x.numHours + acc;
  }, 0);

const NewInvoiceForm: Component = () => {
  return (
    <>
      <A href="/dashboard">
        <Button
          sx={{
            position: "fixed",
            top: 40,
            right: 40,
          }}
          variant="contained"
        >
          Back to Dashboard
        </Button>
      </A>
      <Box>
        <h2>New Invoice</h2>
        <TextField
          sx={{ flex: 3, mb: 2 }}
          id="invoiceNumber"
          label="Invoice #"
          value={state.invoiceNumber}
          onChange={(_, value) =>
            setState(produce((state) => (state.invoiceNumber = value)))
          }
        />
        <Stack
          spacing={2}
          sx={{
            maxWidth: "70%",
            mb: 2,
          }}
        >
          <Stack direction="row" spacing={2}>
            <TextField sx={{ flex: 5 }} id="companyName" label="Company Name" />
            <Datepicker
              label="Issue Date"
              value={state.issueDate}
              onChange={(_, value) =>
                setState(produce((state) => (state.issueDate = value)))
              }
            />
            <Datepicker
              label="Due Date"
              value={state.dueDate}
              onChange={(_, value) =>
                setState(produce((state) => (state.dueDate = value)))
              }
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              sx={{ flex: 5 }}
              id="fullname"
              label="First & Last Name"
              value={state.fullname}
              onChange={(_, value) =>
                setState(produce((state) => (state.fullname = value)))
              }
            />
            <TextField
              sx={{ flex: 3 }}
              id="your_email"
              type="email"
              label="Your Email Address"
              value={state.yourEmail}
              onChange={(_, value) =>
                setState(produce((state) => (state.yourEmail = value)))
              }
            />
            <TextField
              sx={{ flex: 3 }}
              id="recipient_email"
              type="email"
              label="Recipient Email Address"
              value={state.targetEmail}
              onChange={(_, value) =>
                setState(produce((state) => (state.targetEmail = value)))
              }
            />
          </Stack>
        </Stack>
        <LineItems lineItems={lineItems} setLineItems={setLineitems} />
        <Button
          variant="contained"
          sx={{
            width: 200,
            mt: 2,
          }}
          onClick={() =>
            setLineitems((s) => [...s, { ...lineItem, id: ++lineItem.id }])
          }
        >
          Add Line Item
        </Button>
      </Box>
      <Footer total={total} state={state} />
    </>
  );
};

export default NewInvoiceForm;
