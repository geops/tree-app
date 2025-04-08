import React, { ReactNode } from "react";

function renderChildrenWithProps(
  children: ReactNode,
  props: Record<string, unknown>,
): React.ReactNode {
  return React.Children.map(children, (child: ReactNode) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    if (child.type === React.Fragment) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return renderChildrenWithProps(child.props.children as ReactNode, props);
    }
    return React.cloneElement(child as React.ReactElement, {
      ...props,
    });
  });
}

export default renderChildrenWithProps;
