import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { assignLanes } from "./timeline.utils";

const TimelineContext = createContext();

const DEFAULT_COLUMN_WIDTH = 96;
const MAX_SCALE = 2;
const MIN_SCALE = 0.75;
const ZOOM_FACTOR = 1.2;

export function TimelineProvider({ children, items: initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [scale, setScale] = useState(1);

  const columnWidth = useMemo(() => {
    return DEFAULT_COLUMN_WIDTH * scale;
  }, [scale]);

  const lanes = useMemo(() => {
    return assignLanes(items);
  }, [items]);

  const updateItem = useCallback((item) => {
    setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
  }, []);

  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev * ZOOM_FACTOR, MAX_SCALE));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev / ZOOM_FACTOR, MIN_SCALE));
  }, []);

  return (
    <TimelineContext.Provider
      value={{
        columnWidth,
        items,
        lanes,
        updateItem,
        zoomIn,
        zoomOut,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
}

export const useTimeline = () => useContext(TimelineContext);
