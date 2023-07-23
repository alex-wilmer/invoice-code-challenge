import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Button } from "@suid/material";
import { Box, Stack, TextField, Fab } from "@suid/material";
import Datepicker from "./Datepicker";
import LineItems from "./LineItems";
import Footer from "./Footer";

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

const [state, setState] = createStore({});
const [lineItems, setLineitems] = createStore<LineItem[]>([]);
const [issueDate, setIssueDate] = createSignal();
const [dueDate, setDueDate] = createSignal();

const total = () =>
  lineItems.reduce((acc, x) => {
    return x.hourlyRate * x.numHours + acc;
  }, 0);

const NewInvoiceForm: Component = () => {
  return (
    <>
      <Box>
        <h2>New Invoice</h2>
        <TextField
          sx={{ flex: 3, mb: 2 }}
          id="invoiceNumber"
          label="Invoice #"
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
              value={issueDate}
              setter={setIssueDate}
            />
            <Datepicker label="Due Date" value={dueDate} setter={setDueDate} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              sx={{ flex: 5 }}
              id="fullname"
              label="First & Last Name"
            />
            <TextField
              sx={{ flex: 3 }}
              id="your_email"
              type="email"
              label="Your Email Address"
            />
            <TextField
              sx={{ flex: 3 }}
              id="recipient_email"
              type="email"
              label="Recipient Email Address"
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
      <Footer total={total} />
    </>
  );
};

export default NewInvoiceForm;
