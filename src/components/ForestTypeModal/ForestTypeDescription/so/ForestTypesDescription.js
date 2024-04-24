import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import Button from '../../../Button';

const containerStyle = { margin: '-1.5rem', position: 'relative' };
const buttonStyle = { position: 'absolute', top: 10, right: 10, zIndex: 999 };

function ForestTypeDescription({ code }) {
  const name = code.replace('*', 'stern');
  const containerRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const { t } = useTranslation();

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  return (
    <div style={containerStyle} ref={containerRef}>
      <Button
        active
        style={buttonStyle}
        href={`https://so-data.tree-app.ch/forest-types/${name}.pdf`}
        target="so-data"
      >
        {t('export.export')}
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
