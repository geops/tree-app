import PropTypes from 'prop-types';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import Button from '../../../Button';

const containerStyle = { marginTop: '1.5rem', position: 'relative' };
const buttonStyle = { position: 'absolute', zIndex: 999, right: 10, top: -30 };
let rerenderTimout = null;

function ForestTypeDescription({ code }) {
  const name = code.replace('*', 'stern');
  const containerRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const { t } = useTranslation();
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  useEffect(() => {
    // Force rerender PDF on resize, important for mobile devices
    const debouncedRerender = () => {
      clearTimeout(rerenderTimout);
      rerenderTimout = setTimeout(forceUpdate, 50);
    };
    const resizeObserver = new ResizeObserver(debouncedRerender);
    resizeObserver.observe(document.body);
    return () => {
      clearTimeout(rerenderTimout);
      resizeObserver.disconnect();
    };
  }, [])

  return (
    <div style={containerStyle} ref={containerRef}>
      <Button
        active
        style={buttonStyle}
        href={`https://so-data.tree-app.ch/forest-types/${name}.pdf`}
        target="so-data"
      >
        {t('export.exportForestTypeDescription')}
      </Button>
      <Document
        file={`https://so-data.tree-app.ch/forest-types/${name}.pdf`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={containerRef.current?.clientWidth}
          />
        ))}
      </Document>
    </div>
  );
}

ForestTypeDescription.propTypes = {
  code: PropTypes.string.isRequired,
};

export default ForestTypeDescription;
