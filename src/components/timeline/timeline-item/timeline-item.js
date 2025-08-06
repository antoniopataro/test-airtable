import { useCallback, useRef, useState } from "react";

import { DAY_IN_MILLISECONDS } from "../../../constants/date.constants";
import { formatDate, getDaysBetween } from "../../../utils/date.utils";
import { useTimeline } from "../timeline.context";
import { components } from "./timeline-item.styles";

export function TimelineItem({
  horizontalScrollableParentRef,
  item: initialItem,
  minTimelineDate,
  onUpdateItem,
  totalDays,
}) {
  const { columnWidth } = useTimeline();

  const [item, setItem] = useState(initialItem);

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dateRef = useRef(null);
  const itemRef = useRef(null);

  const endDate = new Date(item.end);
  const startDate = new Date(item.start);

  const days = getDaysBetween(startDate, endDate);
  const size = days === 0 ? 1 : days;

  const left = getDaysBetween(minTimelineDate, startDate) * columnWidth;
  const width = size * columnWidth;

  const calculateDatesFromPosition = (clientX) => {
    if (!itemRef.current) {
      return null;
    }

    const timelineRect = itemRef.current.parentElement.getBoundingClientRect();

    const position = clientX - timelineRect.left - dragOffset;

    let dayOffset = Math.round(position / columnWidth);
    dayOffset = Math.max(0, Math.min(dayOffset, totalDays - days));

    const newStartDate = new Date(
      minTimelineDate.getTime() + dayOffset * DAY_IN_MILLISECONDS
    );

    const newEndDate = new Date(newStartDate.getTime() + (endDate - startDate));

    return {
      start: newStartDate,
      end: newEndDate,
    };
  };

  const handleDrag = useCallback(
    (e) => {
      if (!e.clientX || !isDragging) {
        return;
      }

      const scrollWithDrag = () => {
        if (horizontalScrollableParentRef.current) {
          const horizontalScrollableParentRect =
            horizontalScrollableParentRef.current.getBoundingClientRect();

          const scrollStep = columnWidth;

          if (e.clientX > horizontalScrollableParentRect.right) {
            horizontalScrollableParentRef.current.scrollLeft += scrollStep;
          } else if (e.clientX < horizontalScrollableParentRect.left) {
            horizontalScrollableParentRef.current.scrollLeft -= scrollStep;
          }
        }
      };

      const updateItemDatesWithDrag = () => {
        const dates = calculateDatesFromPosition(e.clientX);

        if (dates) {
          setItem((prev) => ({
            ...prev,
            end: dates.end,
            start: dates.start,
          }));
        }
      };

      scrollWithDrag();
      updateItemDatesWithDrag();
    },
    [
      calculateDatesFromPosition,
      columnWidth,
      horizontalScrollableParentRef,
      isDragging,
      item,
    ]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) {
      return;
    }

    setIsDragging(false);

    onUpdateItem(item);
  }, [isDragging, item, onUpdateItem]);

  const handleDragStart = useCallback((e) => {
    setIsDragging(true);

    const rect = itemRef.current.getBoundingClientRect();
    setDragOffset(e.clientX - rect.left);
  }, []);

  const handleRename = useCallback(
    (e) => {
      setItem({
        ...item,
        name: e.target.value,
      });
      onUpdateItem({
        ...item,
        name: e.target.value,
      });
    },
    [item, onUpdateItem]
  );

  return (
    <components.root
      draggable="true"
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      ref={itemRef}
      style={{
        background: isDragging ? "#e3f2fd" : "#ffffff",
        cursor: isDragging ? "grabbing" : "grab",
        left: `${left}px`,
        zIndex: isDragging ? 10 : "auto",
        width: `calc(${width}px - 8px)`,
      }}
      title={`${item.name} @${formatDate(item.start)} - ${formatDate(
        item.end
      )}`}
    >
      <components.content>
        <components.name
          onChange={handleRename}
          placeholder="Enter name..."
          value={item.name}
        />
        <components.dates ref={dateRef}>
          @{formatDate(item.start)} - {formatDate(item.end)}
        </components.dates>
      </components.content>
    </components.root>
  );
}
