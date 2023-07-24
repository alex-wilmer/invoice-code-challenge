import type { Component, Setter, Accessor } from "solid-js";
import { TextField } from "@suid/material";

const Datepicker: Component<{
  label: string;
  onChange: (_: any, value: any) => void;
  value: Date | undefined;
}> = ({ label, onChange, value }) => (
  <TextField
    sx={{ flex: 3 }}
    type="text"
    label={label}
    // hack to make the Datepicker UX better
    onFocus={(e) => (e.target.type = "date")}
    onBlur={(e) => (e.target.type = "text")}
    onChange={onChange}
    value={value}
  />
);

export default Datepicker;
