import { Stack, Box, Button, Modal, Typography } from "@suid/material";
import useTheme from "@suid/material/styles/useTheme";

export default function ReviewInvoiceModal({
  open,
  handleClose,
  state,
  total,
}) {
  const theme = useTheme();

  async function submitInvoice() {
    const response = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify({ ...state, total: total().toFixed(2) }),
      headers: {
        accept: "application/json",
      },
    });

    console.log(response);
  }

  return (
    <Modal
      open={open()}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: theme.palette.background.paper,
          border: "2px solid #000",
          boxShadow: "24px",
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Would you like to submit Invoice # {state.invoiceNumber} to{" "}
          {state.targetEmail} for a total of ${total().toFixed(2)} due on{" "}
          {state.dueDate}?
        </Typography>
        <Stack direction="row" spacing={3} mt={3}>
          <Button onClick={submitInvoice} variant="contained">
            Submit Invoice
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
