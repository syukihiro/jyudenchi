import React, { useMemo } from 'react';
import {Button, InputLabel, Stack} from "@mui/material";
import { Battery } from '../component/Battery';

interface Props {
  goalage: number;
  age: number;
  hanbleClickBtn: (flg: boolean) => void;
}

export function ResultPage({goalage, age, hanbleClickBtn}:Props) {

  //割合計算結果
  const batterylevel = useMemo(() => {
    let result = 0;
    if (goalage >= age) {
      result = Math.round((1-(age / goalage))*100);
    }
    return result;
  }, [goalage, age]);

  //残り日数
  const remainingDays = useMemo(() => {
    let result = 0;
    if (goalage >= age) {
     result = (goalage - age)*365;
    }
    return result;
  },[goalage, age]);

  //残り週
  const weeks = remainingDays > 7 ? Math.round(remainingDays/7) : 0;

  return (
    <Stack
      spacing={6}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{height: "100%"}}>
      <Battery batterylevel={batterylevel} />
      <InputLabel>{`残り: ${weeks}週間`}</InputLabel>
      <Button variant="contained" fullWidth size="large" onClick={() => hanbleClickBtn(false)}>RESTART</Button>
    </Stack>
  );
}