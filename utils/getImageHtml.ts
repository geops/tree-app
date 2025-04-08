/**
 * @param {string} imagePath A valid path to an image
 * @returns {Promise} A promise, resolving in an <img>
 */
function getImageHtml(imagePath: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = imagePath;
  });
}

export default getImageHtml;
