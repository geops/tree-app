import TreeClient from "@geops/tree-lib";
import { useEffect } from "react";

import useStore from "@/store";

function TreeClientProvider({ children }: { children: React.ReactNode }) {
  const setTreeClient = useStore((state) => state.setTreeClient);
  const treeClient = useStore((state) => state.treeClient);
  useEffect(() => {
    const client = new TreeClient();
    const loadCallback = (instance: TreeClient) => {
      setTreeClient(instance);
    };
    client.on("load", loadCallback);
    return () => {
      client.off("load", loadCallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTreeClient]);

  return treeClient && children;
}

export default TreeClientProvider;
