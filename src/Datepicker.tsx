import type { Component, Setter, Accessor } from "solid-js";
import { TextField } from "@suid/material";

const Datepicker: Component<{
  label: string;
  setter: Setter<unknown>;
  value: Accessor<unknown>;
}> = ({ label, setter, value }) => (
  <TextField
    sx={{ flex: 3 }}
    type="text"
    label={label}
    // hack to make the Datepicker UX better
    onFocus={(e) => (e.target.type = "date")}
    onBlur={(e) => (e.target.type = "text")}
    onChange={(_, value) => setter(value)}
    value={value()}
  />
);

export default Datepicker;
