import type { Component } from "solid-js";
import { Box, Stack } from "@suid/material";

const Footer: Component = () => (
  <Box
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
    <Stack direction="row">
      <Box>GALAXY INVOICES</Box>
    </Stack>
  </Box>
);

export default Footer;
