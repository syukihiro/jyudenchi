import React, { useMemo } from 'react';
import {Button, InputLabel, Stack} from "@mui/material";
import { Battery } from '../component/Battery';

interface Props {
  goalage: number;
  age: number;
  eattime?: number;
  hanbleClickBtn: (flg: boolean) => void;
}

export function ResultPage({goalage, age, eattime, hanbleClickBtn}:Props) {

  //残り日数
  const remainingDays = useMemo(() => {
    let result = 0;
    if (goalage >= age) {
      result = (goalage - age)*365;
      if(eattime) {
        const eatDays = (result * eattime)/24;
        if(result > eatDays) {
          result = result - eatDays;
        } else {
          result = 0;
        }
      }
    }
    return result;
  },[goalage, age, eattime]);

  //残り週
  const weeks = remainingDays > 7 ? Math.round(remainingDays/7) : 0;

  //割合計算結果
  const batterylevel = useMemo(() => {
    let result = 0;
    if (goalage >= age && weeks) {
      result = Math.round((((weeks/52.143) / goalage))*100);
    }
    return result;
  }, [goalage, age, weeks]);

  return (
    <Stack
      spacing={6}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{height: "100%"}}>
      <Battery batterylevel={batterylevel} />
      <InputLabel>{`残り自由な週: ${weeks}週間`}</InputLabel>
      <Button variant="contained" fullWidth size="large" onClick={() => hanbleClickBtn(false)}>RESTART</Button>
    </Stack>
  );
}