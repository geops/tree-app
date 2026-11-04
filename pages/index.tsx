import useIsMobile from "@/utils/hooks/useIsMobile";

import Projection from "./projection";

export default function Index() {
  const isMobile = useIsMobile();

  return isMobile ? null : <Projection />;
}
