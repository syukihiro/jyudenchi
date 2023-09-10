import React, { useMemo } from 'react';
import { styled, keyframes } from '@mui/material';

interface Props {
  batterylevel: number;
}

//バッテリーのカラー定義
const batteryColors = {
  red:  "#CB1B45",
  yellow: "#F7D94C",
  green: "#1B813E",
}

// バッテリーの残量アニメーション
const moveBatteryAnimation = keyframes`
  0% {
    width: 0%;
    background-color: "#fff";
  }
  1% {
    width: 1%;
  }
  25% {
    width: 25%;
  }
  40% {
    width: 40%;
  }
  100% {
    width: 100%;
  }
`;

const fadeAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

// バッテリーのstyle
const BatteryBox = styled('div')({
  width: "100px",
  height: "40px",
  border: "2px solid #FFF",
  boxShadow: "0 0 0 2px #000",
  borderRadius: "3px",
  position: "relative",
  ':after': {
    content: '""',
    width: "5px",
    height: "8px",
    borderRadius: "0 2px 2px 0",
    background: "#000",
    position: "absolute",
    top: "50%",
    right: "-8px",
    transform: "translateY(-50%)",
  },
});

const BatteryEnergy = styled('p')(() => ({
  height: "100%",
  borderRadius: "3px",
  margin: "0",
  animation: `${moveBatteryAnimation} 3s ease-out`,
}));

const BatteryText = styled('span')({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  webkitTransform: "translate(-50%, -50%)",
  msTransform: "translate(-50%, -50%)",
  opacity: 1,
  animation: `${fadeAnimation} 6s ease-out`,
});

export function Battery({batterylevel}:Props) {
  const energyColor : string = useMemo(() => {
    if(batterylevel <= 25) {
      return batteryColors.red;
    } else if(batterylevel <= 40) {
      return batteryColors.yellow;
    } else {
      return batteryColors.green;
    }
  },[batterylevel])

  return(
    <BatteryBox>
      <BatteryEnergy sx={{width: `${batterylevel}%`, maxWidth: `${batterylevel}%`, backgroundColor: `${energyColor}`}}/>
      <BatteryText>{batterylevel}%</BatteryText>
    </BatteryBox>
  )
}