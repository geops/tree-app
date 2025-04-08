import useStore from "@/store";

const ForestTypeLink = ({
  children,
  code,
  onClick,
}: {
  children?: React.ReactNode;
  code: string;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>, code: string) => void;
}) => {
  const setForestTypeModal = useStore((state) => state.setForestTypeModal);
  const setForestTypeDescription = useStore(
    (state) => state.setForestTypeDescription,
  );
  return (
    <button
      className="mb-1.5 cursor-pointer border-none bg-transparent p-0 text-left text-primary-500 underline hover:text-primary-100"
      key={code}
      onClick={(evt) => {
        setForestTypeModal("d");
        setForestTypeDescription(code);
        onClick?.(evt, code);
      }}
      type="button"
    >
      {children ?? code}
    </button>
  );
};

export default ForestTypeLink;
