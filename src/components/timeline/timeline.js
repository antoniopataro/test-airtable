import { useRef } from "react";

import { formatDate } from "../../utils/date.utils";
import { TimelineItem } from "./timeline-item/timeline-item";
import { useTimeline } from "./timeline.context";
import { useTimelineDates } from "./timeline.hooks";
import { components } from "./timeline.styles";

export function Timeline() {
  const { columnWidth, items, lanes, updateItem, zoomIn, zoomOut } =
    useTimeline();

  const { dates, minYearDate, totalDays } = useTimelineDates(items);

  const horizontalScrollableParentRef = useRef(null);

  return (
    <components.container>
      <components.controls.container>
        <components.controls.button onClick={zoomIn}>
          +
        </components.controls.button>
        <components.controls.divisor />
        <components.controls.button onClick={zoomOut}>
          -
        </components.controls.button>
      </components.controls.container>
      <components.timeline.wrapper>
        <components.timeline.divisions.container>
          {dates.map((_, index) => (
            <components.timeline.divisions.division
              key={index}
              style={{ width: `${columnWidth}px` }}
            />
          ))}
        </components.timeline.divisions.container>
        <components.timeline.dates.container>
          {dates.map((date, index) => (
            <components.timeline.dates.label
              key={index}
              style={{ width: `${columnWidth}px` }}
              title={date}
            >
              {formatDate(date)}
            </components.timeline.dates.label>
          ))}
        </components.timeline.dates.container>
        <components.timeline.lanes.container
          ref={horizontalScrollableParentRef}
        >
          {lanes.map((lane, index) => (
            <components.timeline.lanes.lane key={index}>
              {lane.map((item) => (
                <TimelineItem
                  horizontalScrollableParentRef={horizontalScrollableParentRef}
                  item={item}
                  key={item.id}
                  minTimelineDate={minYearDate}
                  onUpdateItem={updateItem}
                  totalDays={totalDays}
                />
              ))}
            </components.timeline.lanes.lane>
          ))}
        </components.timeline.lanes.container>
      </components.timeline.wrapper>
    </components.container>
  );
}
