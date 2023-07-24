import type { Component } from "solid-js";
import { Box, Stack, Button } from "@suid/material";
import { createSignal } from "solid-js";
import ReviewInvoiceModal from "./ReviewInvoiceModal";
import type { Invoice } from "./NewInvoiceForm";

const [open, setOpen] = createSignal(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const Footer: Component<{ total: () => number; state: Invoice }> = ({
  total,
  state,
}) => (
  <>
    <ReviewInvoiceModal
      open={open}
      handleClose={handleClose}
      state={state}
      total={total}
    />
    <Box
      onClick={handleOpen}
      sx={{
        display: "flex",
        px: 5,
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        height: 65,
        left: 0,
        backgroundColor: "#1976d2",
        width: "100%",
        color: "white",
        fontSize: "20px",
      }}
    >
      <Button
        variant="outlined"
        color="error"
        sx={{
          position: "fixed",
          right: 40,
          bottom: 80,
          fontSize: 20,
        }}
      >
        Review Invoice
      </Button>
      <Stack direction="row" alignItems="center" sx={{ width: "100vw" }}>
        <Box sx={{ flex: 1 }}>GALAXY INVOICES</Box>
        <Box sx={{ ml: "auto", mr: 10, fontSize: "30px" }}>
          <b>
            Total: ${" "}
            {Number(new Intl.NumberFormat().format(total())).toFixed(2)}
          </b>
        </Box>
      </Stack>
    </Box>
  </>
);

export default Footer;
