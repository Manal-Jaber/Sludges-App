import * as htmlToImage from 'html-to-image';
import { toJpeg, toPng } from 'html-to-image';
export const exportDiagram = () => {
  htmlToImage
    .toPng(document.getElementById('circle-wrapper')!, {
      quality: 0.95,
    })
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'circle.jpeg';
      link.href = dataUrl;
      link.click();
    });
};
