import React, { useState } from 'react';
import { Container, Button, Stack} from "@mui/material";
import { TextFileld } from './component/TextField';
import { ResultPage } from './page';

function App() {
  const [goalage, setGoalage] = useState<number>();
  const [age, setAge] = useState<number>();
  const [goalageErr, setGoalageErr] = useState<string>();
  const [ageErr, setAgeErr] = useState<string>();
  const [openFlg, setOpenflg] = useState<boolean>(false);
  const disabledFlg = goalage && age && goalageErr == undefined && ageErr == undefined ? false : true;

  // TextField 変化時
  function handleChangeValue (data: string, type: number) {
    const castData = zenkakuToHankakuNumber(data);
    const result = Number(castData);
    const errMsg = "数値を入力してください";

    if(isNaN(result)) {
      handleValueError(errMsg, type);
    } else {
      handleValidValue(result, type);
    }
  }

  // エラーメッセージ設定
  function handleValueError(msg: string, type: number) {
    if (type === 1) {
      setGoalageErr(msg);
    } else if (type === 2) {
      setAgeErr(msg);
    }
  }

  // 値設定
  function handleValidValue(data: number, type: number) {
    if (type === 1) {
      setGoalage(data);
      setGoalageErr(undefined);
    } else if (type === 2) {
      setAge(data);
      setAgeErr(undefined);
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

  function hanbleClickBtn(flg: boolean) {
    setOpenflg(flg);
    if(!flg) {
      setAge(undefined);
      setGoalage(undefined);
    }
  }

  return (
    <Container maxWidth="xs" style={{height: '100vh'}}>
      {!openFlg &&
        <Stack
          spacing={6}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{height: "100%"}}>
            <TextFileld label='目標とする寿命' type={1} onChange={handleChangeValue} helperText={goalageErr} />
            <TextFileld label='現在の年齢'    type={2} onChange={handleChangeValue} helperText={ageErr}/>
            <Button variant="contained" fullWidth size="large" disabled={disabledFlg} onClick={() => hanbleClickBtn(true)}>START</Button>
        </Stack>
      }

      {openFlg && goalage && age &&
        <ResultPage
          goalage={goalage}
          age={age}
          hanbleClickBtn={hanbleClickBtn}
        />
      }
    </Container>
  );
}

export default App;
