import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { ReactElement, useEffect, useRef, useState } from "react";

interface AccordionItem {
  content: ReactElement | ReactElement[];
  isOpen?: boolean;
  key: number | string;
  title: ReactElement;
}
interface AccordionProps {
  items: AccordionItem[];
  scrollInoView?: boolean;
}

let scrollTimeout: NodeJS.Timeout;

function useAccordionItems(items: AccordionItem[]) {
  const [disclosures, setDisclosures] = useState<AccordionItem[]>(
    items.map((item) => ({ ...item, isOpen: false })),
  );
  const [openKey, setOpenKey] = useState<null | number | string>(null);

  useEffect(() => {
    setDisclosures(
      items.map((item) => {
        return { ...item, isOpen: item.key === openKey };
      }),
    );
  }, [items, openKey]);

  return { disclosures, openKey, setOpenKey };
}

const useScrollRefs = (
  openKey: null | number | string,
  scrollInoView: boolean,
) => {
  const contentRefs = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => {
    clearTimeout(scrollTimeout);
    if (openKey && contentRefs.current[openKey]) {
      scrollTimeout = setTimeout(() => {
        contentRefs.current[openKey]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  }, [openKey]);
  return scrollInoView ? contentRefs : { current: {} };
};

function Accordion({ items, scrollInoView = false }: AccordionProps) {
  const { disclosures, openKey, setOpenKey } = useAccordionItems(items);
  const contentRefs = useScrollRefs(openKey, scrollInoView);

  return (
    <div className="w-full rounded border-2">
      {disclosures.map(({ content, isOpen, key, title }) => {
        return (
          <div
            className="border-t-2 px-5 opacity-85 first:border-t-0"
            key={key}
          >
            <button
              aria-expanded={isOpen}
              className={`group grid h-12 w-full grid-cols-[20px,_auto] items-center gap-5 font-bold ${isOpen ? "opacity-100" : "opacity-40"} text-start transition-opacity hover:opacity-100`}
              onClick={() => setOpenKey(isOpen ? null : key)}
              ref={(el) => void (contentRefs.current[key] = el)}
            >
              <ChevronRightIcon
                className={`${isOpen ? "rotate-90 transform" : ""} h-5 w-5`}
              />
              {title}
            </button>
            {isOpen && <div className="mt-2 pb-5">{content}</div>}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
