import React, { useState } from 'react';
import { Container, Button, Stack} from "@mui/material";
import { TextFileld } from './component/TextField';
import { ResultPage } from './page';

function App() {
  const [goalage, setGoalage] = useState<number>();
  const [age, setAge] = useState<number>();
  const [openFlg, setOpenflg] = useState<boolean>(false);
  const disabledFlg = goalage && age  ? false : true;

  // ボタンクリック時
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
            <TextFileld label='目標とする寿命'  onChange={setGoalage} />
            <TextFileld label='現在の年齢'     onChange={setAge} />
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
