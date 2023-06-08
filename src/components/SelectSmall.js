import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { FormHelperText } from '@mui/material';

export default function SelectSmall({ items, state, setState, name, required }) {
  // const [age, setAge] =useState('');

  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <FormControl
      sx={{ minWidth: '48%', mb: '12px', '& .MuiFormHelperText-root': { color: 'red', margin: '4px 0 0 0' } }}
      size="small"
    >
      <InputLabel id="demo-select-small"> {name} </InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={state}
        label={name}
        onChange={handleChange}
        // helperText={!stateAlertFirstName && required && 'First Name Required'}
        // helperText="asd"
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
        {items.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      {required && !state && <FormHelperText> {name} Required </FormHelperText>}
    </FormControl>
  );
}
