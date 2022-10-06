import type { NextPage } from "next";
import { RefObject, useRef } from "react";
import styled from "styled-components";
import StageLightingWaveAnimation from "../../../components/canvas/LightWaveAnimation";
import { useClientWidthHeight } from "../../../hooks/useClientWidthHeight"

const Main = styled.main`
  width: 100vw;
  height: 100vh;
`;

const StageWave: NextPage = () => {
  const mainRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);

  const clientRect = useClientWidthHeight(mainRef);
  const canvasWidth = clientRect.width;
  const canvasHeight = clientRect.height;

  return (
    <Main>
      <StageLightingWaveAnimation 
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />
    </Main>
  );
};

export default StageWave;