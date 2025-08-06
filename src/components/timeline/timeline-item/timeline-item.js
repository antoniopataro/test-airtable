import { useCallback, useRef, useState } from "react";

import { DAY_IN_MILLISECONDS } from "../../../constants/date.constants";
import { formatDate, getDaysBetween } from "../../../utils/date.utils";
import { useTimeline } from "../timeline.context";
import { components } from "./timeline-item.styles";

export function TimelineItem({
  item,
  minTimelineDate,
  onUpdateItem,
  totalDays,
}) {
  const { columnWidth } = useTimeline();

  const endDate = new Date(item.end);
  const startDate = new Date(item.start);

  const dateRef = useRef(null);
  const itemRef = useRef(null);

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [originalDateText, setOriginalDateText] = useState("");

  const days = getDaysBetween(startDate, endDate);

  const left = getDaysBetween(minTimelineDate, startDate) * columnWidth;
  const width = days * columnWidth;

  const calculateDatesFromPosition = useCallback(
    (clientX) => {
      if (!itemRef.current) {
        return null;
      }

      const timelineRect =
        itemRef.current.parentElement.getBoundingClientRect();

      const position = clientX - timelineRect.left - dragOffset;
      const positionPercentage = (position / timelineRect.width) * 100;

      const dayOffset = Math.round(
        (positionPercentage / (100 / totalDays)) * DAY_IN_MILLISECONDS
      );

      const duration = endDate - startDate;

      const newStartDate = new Date(minTimelineDate.getTime() + dayOffset);
      const newEndDate = new Date(newStartDate.getTime() + duration);

      return {
        end: newEndDate,
        start: newStartDate,
      };
    },
    [dragOffset, endDate, minTimelineDate, startDate, totalDays]
  );

  const handleDragStart = useCallback((e) => {
    if (dateRef.current) {
      setOriginalDateText(dateRef.current.textContent);
    }

    setIsDragging(true);

    const rect = itemRef.current.getBoundingClientRect();

    setDragOffset(e.clientX - rect.left);

    if (itemRef.current) {
      const clone = itemRef.current.cloneNode(true);

      clone.style.left = "-1000px";
      clone.style.opacity = "0.9";
      clone.style.position = "absolute";
      clone.style.top = "-1000px";
      clone.style.width = "250px";

      document.body.appendChild(clone);

      try {
        e.dataTransfer.setDragImage(clone, 50, 35);
      } finally {
        setTimeout(() => {
          document.body.removeChild(clone);
        }, 0);
      }
    }
  }, []);

  const handleDragEnd = useCallback(
    (e) => {
      if (!isDragging) {
        return;
      }

      setIsDragging(false);

      if (dateRef.current && originalDateText) {
        dateRef.current.textContent = originalDateText;
      }

      const newDates = calculateDatesFromPosition(e.clientX);

      if (newDates) {
        onUpdateItem?.({
          ...item,
          end: newDates.end,
          start: newDates.start,
        });
      }
    },
    [
      calculateDatesFromPosition,
      isDragging,
      item.id,
      onUpdateItem,
      originalDateText,
    ]
  );

  const handleDrag = useCallback(
    (e) => {
      if (!e.clientX || !isDragging) {
        return;
      }

      const newDates = calculateDatesFromPosition(e.clientX);
    },
    [isDragging, calculateDatesFromPosition]
  );

  return (
    <components.root
      draggable="true"
      left={`${left}px`}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      ref={itemRef}
      style={{
        background: isDragging ? "#e3f2fd" : "#ffffff",
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: isDragging ? 10 : "auto",
      }}
      width={`calc(${width}px - 8px)`}
    >
      <components.content>
        <components.name>{item.name}</components.name>
        <components.dates ref={dateRef}>
          {formatDate(item.start)} - {formatDate(item.end)}
        </components.dates>
      </components.content>
    </components.root>
  );
}
