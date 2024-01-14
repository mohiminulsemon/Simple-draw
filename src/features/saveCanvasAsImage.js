import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

export const saveCanvasAsImage = async (format, canvasData) => {
console.log(canvasData)
  try {
    const canvasImage = await html2canvas(document.body);

    if (format === 'png') {
      saveAs(canvasImage.toDataURL('image/png'), 'canvas_image.png');
    } else if (format === 'jpg') {
      saveAs(canvasImage.toDataURL('image/jpeg'), 'canvas_image.jpg');
    } else if (format === 'svg') {
      // ... handle SVG format
    } else if (format === 'pdf') {
      // ... handle PDF format
    } else if (format === 'html') {
      // ... handle HTML format
    }
  } catch (error) {
    console.error('Error saving canvas as image:', error);
  }
};
