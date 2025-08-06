import items from "../../assets/timelineItems";
import { Canvas } from "../../components/canvas/canvas";
import { Timeline } from "../../components/timeline/timeline";
import { TimelineProvider } from "../../components/timeline/timeline.context";
import { components } from "./home.styles";

export function Home() {
  return (
    <components.root>
      <components.header.root>
        <components.header.title>
          Good luck with your assignment! {"\u2728"}
        </components.header.title>
        <components.header.subtitle>
          {items.length} timeline items to render. @antoniopataro
        </components.header.subtitle>
      </components.header.root>
      <Canvas>
        <TimelineProvider items={items}>
          <Timeline />
        </TimelineProvider>
      </Canvas>
    </components.root>
  );
}
