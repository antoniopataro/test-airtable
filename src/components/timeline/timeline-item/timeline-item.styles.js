import { styled } from "styled-components";

export const components = {
  content: styled.div`
    align-items: center;
    display: flex;
    height: 100%;
    gap: 16px;
    padding-left: 16px;
    position: relative;
    width: 100%;
  `,
  dates: styled.span`
    color: #808080;
    font-size: 0.875rem;
    font-weight: 300;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  name: styled.span`
    color: #404040;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.025em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  root: styled.div`
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    height: 36px;
    left: ${(props) => props.left};
    overflow: hidden;
    padding: 4px;
    position: absolute;
    /* transition: all 0.15s ease; */
    width: ${(props) => props.width};
    &::before {
      background: #bbdefb;
      border-radius: 4px;
      bottom: 0;
      content: "";
      height: 24px;
      left: 4px;
      margin: auto 0;
      position: absolute;
      top: 0;
      width: 4px;
    }
    &:hover {
      background: #bbdefb;
      z-index: 1;
    }
  `,
};
