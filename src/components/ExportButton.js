import React from 'react';
import { useTranslation } from 'react-i18next';
import { saveAs } from 'file-saver';
import { Document, ImageRun, Packer, Paragraph } from 'docx';
import { toPng } from 'html-to-image';
import Button from './Button';

import styles from './ExportButton.module.css';

const exportDocX = async () => {
  const imageBlob = await toPng(document.getElementById('recommendationPane'))
    .then((dataUrl) => {
      Uint8Array.from(atob(dataUrl), (c) => c.charCodeAt(0));
    })
    .catch((error) => {
      console.error('oops, something went wrong!', error);
    });
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph('Hello World'),
          new Paragraph({
            children: [
              new ImageRun({
                data: imageBlob,
                transformation: {
                  width: 100,
                  height: 100,
                },
              }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, 'tree-app.docx');
  });
};

function ExportButton() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Button className={styles.togglebutton} onClick={exportDocX}>
        {t('DOCX exportieren')}
      </Button>
    </div>
  );
}

export default ExportButton;
