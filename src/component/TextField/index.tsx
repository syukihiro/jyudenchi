import React, { useState } from 'react';
import { TextField } from '@mui/material';

interface Props {
  label: string;
  onChange: (data: number) => void;
}

export function TextFileld({ label, onChange }:Props) {
  const [errMsg, setErrMsg] = useState<string>();

  // TextField 変化時
  function handleChangeValue (data: string) {
    const castData = zenkakuToHankakuNumber(data);
    const result = Number(castData);
    const errMsg = "数値を入力してください";

    if(isNaN(result)) {
      setErrMsg(errMsg);
    } else {
      onChange(result);
      setErrMsg(undefined);
    }
  }

  // 半角変換
  function zenkakuToHankakuNumber(data: string) {
    const zenkakuNumberMap: Record<string, string> = {
      '０': '0',
      '１': '1',
      '２': '2',
      '３': '3',
      '４': '4',
      '５': '5',
      '６': '6',
      '７': '7',
      '８': '8',
      '９': '9'
    };
    return data.replace(/[０-９]/g, str => zenkakuNumberMap[str] || str);
  }

  return (
    <>
      <TextField
        inputProps={{ inputMode: 'numeric' }}
        id="outlined-basic"
        label={label}
        focused={true}
        color={errMsg ? "error" : "primary"}
        error={errMsg ? true : false }
        helperText={errMsg}
        margin="normal"
        fullWidth
        variant="outlined"
        onChange={(e) => handleChangeValue(e.target.value)}
      />
    </>
  );
}