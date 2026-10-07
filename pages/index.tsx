import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.resolvedUrl.includes("?")
    ? context.resolvedUrl.slice(context.resolvedUrl.indexOf("?"))
    : "";

  return {
    redirect: {
      destination: `/projection${query}`,
      permanent: false,
    },
  };
};

export default function Index() {
  return null;
}
