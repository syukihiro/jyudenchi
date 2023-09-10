import React from 'react';
import { TextField } from '@mui/material';

interface Props {
  label: string;
  type: number;
  helperText?: string;
  onChange: (data: string, type: number) => void;
}

export function TextFileld({ label, type, helperText, onChange }:Props) {
  return (
    <>
      <TextField
        inputProps={{ inputMode: 'numeric' }}
        id="outlined-basic"
        label={label}
        focused={true}
        color={helperText ? "error" : "primary"}
        error={helperText ? true : false }
        helperText={helperText}
        margin="normal"
        fullWidth
        variant="outlined"
        onChange={(e) => onChange && onChange(e.target.value, type)}
      />
    </>
  );
}