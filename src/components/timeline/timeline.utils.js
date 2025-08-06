import { DAY_IN_MILLISECONDS } from "../../constants/date.constants";

export function assignLanes(items) {
  const sortedItems = items.sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

  const lanes = [];

  function assignItemToLane(item) {
    for (const lane of lanes) {
      if (new Date(lane[lane.length - 1].end) < new Date(item.start)) {
        lane.push(item);

        return;
      }
    }

    lanes.push([item]);
  }

  for (const item of sortedItems) {
    assignItemToLane(item);
  }

  return lanes;
}

export function getDatesBetween(startDate, endDate) {
  const days = (endDate - startDate) / DAY_IN_MILLISECONDS;

  const dates = [];
  for (let i = 0; i <= days; i++) {
    const date = new Date(startDate.getTime() + i * DAY_IN_MILLISECONDS);
    dates.push(date);
  }

  return dates;
}

export function getDateRange(items) {
  if (!items.length) {
    return {
      end: new Date(),
      start: new Date(),
    };
  }

  const dates = items.flatMap((item) => [
    new Date(item.start),
    new Date(item.end),
  ]);

  return {
    end: new Date(Math.max(...dates)),
    start: new Date(Math.min(...dates)),
  };
}
