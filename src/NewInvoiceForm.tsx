import type { Component } from "solid-js";
import { For, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Button } from "@suid/material";
import { Box, Stack, TextField, Fab } from "@suid/material";
import Footer from "./Footer";

const lineItem = {
  id: 1,
  workDescription: "",
  hourlyRate: 0,
  numHours: 0,
};

const [lineItems, setLineitems] = createStore([]);
const [issueDate, setIssueDate] = createSignal();

const NewInvoiceForm: Component = () => {
  return (
    <>
      <Box>
        <h2>New Invoice</h2>
        <Stack
          spacing={2}
          sx={{
            maxWidth: "70%",
            mb: 2,
          }}
        >
          <Stack direction="row" spacing={2}>
            <TextField sx={{ flex: 5 }} id="companyName" label="Company Name" />
            <TextField
              sx={{ flex: 3 }}
              type="text"
              label="Issue Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={(_, value) => setIssueDate(value)}
              value={issueDate()}
            />
            <TextField sx={{ flex: 3 }} id="invoiceNumber" label="Invoice #" />
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
        <Stack spacing={2}>
          <For each={lineItems}>
            {(item, index) => (
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                maxWidth="70%"
              >
                <Fab size="small" color="secondary">
                  {index() + 1}
                </Fab>
                <TextField
                  sx={{
                    flex: 2,
                  }}
                  id={`description-${index()}`}
                  label="Description of work..."
                  onChange={(_, value) => {
                    setLineitems(
                      (lineItem) => lineItem.id === item.id,
                      "workDescription",
                      value
                    );
                  }}
                  value={item.workDescription}
                />
                <TextField
                  sx={{
                    flex: 1,
                  }}
                  id={`numhours-${index()}`}
                  label="# Hours"
                  onChange={(_, value) => {
                    setLineitems(
                      (lineItem) => lineItem.id === item.id,
                      "numHours",
                      value
                    );
                  }}
                />
                <TextField
                  sx={{
                    flex: 1,
                    textAlign: "right",
                  }}
                  id={`rate-${index()}`}
                  label="Hourly Rate"
                  onChange={(_, value) => {
                    setLineitems(
                      (lineItem) => lineItem.id === item.id,
                      "hourlyRate",
                      value
                    );
                  }}
                  value={item.hourlyRate}
                />
                <TextField
                  sx={{
                    flex: 1,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  id={`total-${index()}`}
                  label="Total"
                  value={`$ ${(
                    parseFloat(item.hourlyRate) * parseFloat(item.numHours)
                  ).toFixed(2)}`}
                />
              </Stack>
            )}
          </For>
        </Stack>
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
      <Footer />
    </>
  );
};

export default NewInvoiceForm;
