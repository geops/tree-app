import Location from "./location";

import type { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = () => {
  return { props: {} }; // static HTML will be generated at build
};

export default function Index() {
  return <Location />;
}
