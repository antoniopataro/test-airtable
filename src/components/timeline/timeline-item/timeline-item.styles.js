import { styled } from "styled-components";

export const components = {
  content: styled.div`
    align-items: center;
    display: flex;
    height: 100%;
    gap: 12px;
    justify-content: space-between;
    padding: 0 12px 0 24px;
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
  name: styled.input`
    background-color: transparent;
    border: none;
    color: #404040;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.025em;
    outline: none;
    overflow: hidden;
    text-decoration: underline;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  root: styled.div`
    background: #ffffff;
    border-radius: 24px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    height: 36px;
    padding: 4px;
    position: absolute;
    &::before {
      aspect-ratio: 1;
      content: "";
      background: #bbdefb;
      border-radius: 4px;
      bottom: 0;
      content: "";
      height: 8px;
      left: 12px;
      margin: auto 0;
      position: absolute;
      top: 0;
      width: 8px;
    }
    &:hover {
      background: #bbdefb;
      z-index: 1;
    }
  `,
};
