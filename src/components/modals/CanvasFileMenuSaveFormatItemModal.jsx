import React from 'react';
import { CanvasMenuItemButton } from '..';
import { saveCanvasAsImage } from '../../features/saveCanvasAsImage';
import { useDispatch, useSelector } from 'react-redux';

function CanvasFileMenuSaveFormatItemModal() {
  const dispatch = useDispatch();
  const canvasData = useSelector((state) => state.persist.canvasReducer.selectedCanvas);
  // console.log(canvasData)

  // Function to handle save button click
  const handleSaveClick = (format) => {
    // Dispatch an action or call a function to save the canvas in the selected format
    // console.log('Save format:', format);
    saveCanvasAsImage(format, canvasData);
  };
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800">
      <CanvasMenuItemButton onClick={() => handleSaveClick('png')} leftLable=".PNG" />
      <CanvasMenuItemButton onClick={() => handleSaveClick('jpg')} leftLable=".JPG" />
      <CanvasMenuItemButton onClick={() => handleSaveClick('svg')} leftLable=".SVG" />
      <CanvasMenuItemButton onClick={() => handleSaveClick('pdf')} leftLable=".PDF" />
      <CanvasMenuItemButton onClick={() => handleSaveClick('html')} leftLable=".HTML" />
    </div>
  );
}

export default CanvasFileMenuSaveFormatItemModal;
