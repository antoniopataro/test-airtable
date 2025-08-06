
import { styled } from "styled-components";

export const components = {
  header: {
    root: styled.div`
      display: flex;
      flex-direction: column;
    `,
    title: styled.h2`
      font-size: 1.5rem;
      font-weight: 600;
    `,
    subtitle: styled.h3`
      font-size: 1rem;
      font-weight: 400;
    `,
  },
  root: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100%;
    min-height: 100dvh;
    padding: 24px;
    width: 100%;
  `,
};
