/* eslint-disable no-underscore-dangle */
import { Document, HeadingLevel, Media, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from 'lib/src';

function generate(result, t, i18n) {
  window.mapboxMap.once('render', () => {
    window.mapboxMap.getCanvas().toBlob(async (mbBlob) => {
      const doc = new Document();

      doc.addSection({
        children: [
          new Paragraph({
            text: t('help.recommendationPositiveHeader'),
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            text: [...result[0], ...result[1], ...result[2], ...result[3]]
              .map((code) => {
                const treeInfo = info('treeType', code);
                return treeInfo[i18n.language];
              })
              .join(', '),
          }),
        ],
      });

      const {
        clientHeight: height,
        clientWidth: width,
      } = window.mapboxMap.getContainer();

      const baseBlop = await new Promise((resolve) =>
        document
          .getElementsByClassName('ol-layer')[0]
          .firstChild.toBlob((b) => resolve(b)),
      );
      const markBlop = await new Promise((resolve) =>
        document
          .getElementsByClassName('ol-layer')[1]
          .firstChild.toBlob((b) => resolve(b)),
      );

      const position = {
        floating: {
          horizontalPosition: {
            offset: 100,
          },
          verticalPosition: {
            offset: 100,
          },
        },
      };

      const mapboxImage = Media.addImage(doc, mbBlob, width, height, position);
      const baseImage = Media.addImage(doc, baseBlop, width, height, position);
      const markImage = Media.addImage(doc, markBlop, width, height, position);

      doc.addSection({
        children: [
          new Paragraph(baseImage),
          new Paragraph(mapboxImage),
          new Paragraph(markImage),
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'example.docx');
      });
    }, 'image/png');
  });
  window.mapboxMap._render();
}

function RecommendationDoc({ result }) {
  const { i18n, t } = useTranslation();
  return <Button icon="file word" onClick={() => generate(result, t, i18n)} />;
}

RecommendationDoc.propTypes = {
  result: PropTypes.arrayOf.isRequired,
};

export default RecommendationDoc;
