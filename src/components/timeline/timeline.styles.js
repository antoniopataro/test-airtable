import { styled } from "styled-components";

export const components = {
  button: styled.button`
    background: white;
    border-radius: 4px;
    border: 1px solid #ddd;
    cursor: pointer;
    font-size: 16px;
    padding: 4px 12px;
    &:hover {
      background: #f0f0f0;
    }
  `,
  container: styled.div`
    border-radius: 8px;
    overflow-x: auto;
    position: relative;
    width: 100%;
  `,
  controls: styled.div`
    background: white;
    border-radius: 8px;
    bottom: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 8px;
    padding: 8px;
    position: fixed;
    right: 24px;
    z-index: 1;
  `,
  timeline: {
    dates: {
      container: styled.div`
        display: flex;
        height: fit-content;
      `,
      label: styled.div`
        border-bottom: 1px dashed #ddd;
        color: #666;
        display: flex;
        flex-shrink: 0;
        font-size: 0.875rem;
        justify-content: center;
        overflow: hidden;
        padding: 12px 0;
        text-align: center;
        text-overflow: ellipsis;
      `,
    },
    divisions: {
      division: styled.div`
        border-left: 1px dashed rgba(0, 0, 0, 0.1);
        bottom: 0;
        flex-shrink: 0;
        height: 100%;
      `,
      container: styled.div`
        display: flex;
        height: 100%;
        pointer-events: none;
        position: absolute;
        width: 100%;
      `,
    },
    label: styled.div`
      border-bottom: 1px dashed #ddd;
      color: #666;
      display: flex;
      font-size: 0.875rem;
      justify-content: center;
      padding: 12px 0;
      white-space: nowrap;
    `,
    lanes: {
      lane: styled.div`
        border-radius: 4px;
        height: 36px;
        margin: 2px 4px;
        position: relative;
        width: 100%;
      `,
      container: styled.div`
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 2px 0;
        width: 100%;
      `,
    },
    wrapper: styled.div`
      background-position: 0 0;
      background-repeat: repeat;
      background-size: ${(props) => props.$gridSize};
      display: flex;
      flex-direction: column;
      height: 100%;
      min-width: 100%;
      position: relative;
      transition: all 0.3s ease;
    `,
  },
};
