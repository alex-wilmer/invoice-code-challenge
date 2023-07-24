import type { Component } from "solid-js";
import { createSignal, For } from "solid-js";
import { A } from "@solidjs/router";
import { Button, Box, Alert } from "@suid/material";
import { Puff } from "solid-spinner";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@suid/material";
import { format, formatDistance, isPast } from "date-fns";

const [invoices, setInvoices] = createSignal([]);
const [loading, setLoading] = createSignal(true);

async function getInvoices() {
  const data = await fetch("/api/invoices").then((r) => r.json());
  setInvoices(data.invoices);
  setLoading(false);
}

const Dashboard: Component = () => {
  getInvoices();

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
        {loading() && (
          <Box>
            Loading your invoices... <Puff color="blue" />;
          </Box>
        )}
        {!loading() && (
          <Box px={5}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice Number</TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Issue Date</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <For each={invoices()}>
                    {(item) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {item.invoiceNumber}
                        </TableCell>
                        <TableCell>{item.companyName}</TableCell>
                        <TableCell>
                          {format(new Date(item.issueDate), "MM/dd/yyyy")}
                        </TableCell>
                        <TableCell>
                          {formatDistance(new Date(), new Date(item.dueDate), {
                            addSuffix: true,
                          })}
                        </TableCell>
                        <TableCell>{item.total}</TableCell>
                        <TableCell>
                          {item.paid ? (
                            <Box color="green">PAID</Box>
                          ) : (
                            <Box color="red">UNPAID</Box>
                          )}
                        </TableCell>
                        <TableCell>
                          {!item.paid && !isPast(new Date(item.dueDate)) && (
                            <Alert severity="error">Past due!</Alert>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </For>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </div>
    </>
  );
};

export default Dashboard;
