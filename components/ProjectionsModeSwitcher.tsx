import useStore from "@/store";

import ManualIcon from "./icons/ManualIcon";
import MapIcon from "./icons/MapIcon";
import ButtonGroup from "./ui/ButtonGroup";

function ProjectionsModeSwitcher({ className = "" }: { className?: string }) {
  const projectionMode = useStore((state) => state.projectionMode);
  const setProjectionMode = useStore((state) => state.setProjectionMode);

  return (
    <ButtonGroup
      className={className}
      items={[
        {
          active: projectionMode === "m",
          className: "px-4",
          label: <MapIcon className="h-6 w-8" />,
          onClick: () => setProjectionMode("m"),
        },
        {
          active: projectionMode === "f",
          className: "px-4",
          label: <ManualIcon className="h-6 w-8" />,
          onClick: () => setProjectionMode("f"),
        },
      ]}
    />
  );
}

export default ProjectionsModeSwitcher;
