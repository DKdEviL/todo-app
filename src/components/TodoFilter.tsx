import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import * as React from "react";
import { FilterValue, TODO_STATUS } from "../utils/model";

type OwnProps = {
    value: FilterValue;
    filters: TODO_STATUS[];
    onFilterChange: any;
}

export const TodoFilter: React.FC<OwnProps> = ({ value, filters, onFilterChange }) => {

  return (
    <>
      <FormControl sx={{ m: 2, ml: 0, minWidth: 200 }} size="small">
        <InputLabel>Status Filter</InputLabel>
        <Select
          labelId="status-filter"
          value={value}
          label="Status Filter"
          onChange={onFilterChange}
        >
          <MenuItem value={undefined}>
            <em>All</em>
          </MenuItem>
          {
            filters.map((status, index) => {
                return <MenuItem key={index} value={status}>{status}</MenuItem>;
            })
          }
        </Select>
      </FormControl>
    </>
  );
};
