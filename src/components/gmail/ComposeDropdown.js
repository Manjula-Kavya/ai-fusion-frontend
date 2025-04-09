import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";

function BasicSelect({ selectedAge, setSelectedAge }) {
  const handleChange = (event) => {
    setSelectedAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginBottom: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Tone</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedAge}
          label="Select Tone.."
          onChange={handleChange}
        >
          <MenuItem value={"Formal"}>Formal</MenuItem>
          <MenuItem value={"Urgent"}>Urgent</MenuItem>
          <MenuItem value={"Friendly"}>Friendly</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

BasicSelect.propTypes = {
  selectedAge: PropTypes.string.isRequired,
  setSelectedAge: PropTypes.func.isRequired,
};

export default BasicSelect;
