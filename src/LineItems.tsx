import type { Component } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import { For } from "solid-js";
import { Stack, TextField, Fab } from "@suid/material";

interface LineItem {
  id: number;
  workDescription: string;
  hourlyRate: number | string;
  numHours: number | string;
}

const LineItems: Component<{
  lineItems: LineItem[];
  setLineItems: SetStoreFunction<LineItem[]>;
}> = ({ lineItems, setLineItems }) => (
  <Stack spacing={2}>
    <For each={lineItems}>
      {(item: LineItem, index) => (
        <Stack direction="row" spacing={2} alignItems="center" maxWidth="70%">
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
              setLineItems(
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
              setLineItems(
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
              setLineItems(
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
              parseFloat(item.hourlyRate as string) *
              parseFloat(item.numHours as string)
            ).toFixed(2)}`}
          />
        </Stack>
      )}
    </For>
  </Stack>
);

export default LineItems;
