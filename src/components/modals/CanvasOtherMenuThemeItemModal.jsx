import React from 'react';
import { CanvasMenuItemButton } from '..';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from '../../features/appSlice';

function CanvasOtherMenuThemeItemModal() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useDispatch();

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleLightClick = () => {
    dispatch(setDarkMode(false));
  };

  const handleDarkClick = () => {
    dispatch(setDarkMode(true));
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800">
      <CanvasMenuItemButton
        onClick={() => handleLightClick()}
        leftLable="ライト"
        rightLable={<i className="fa-solid fa-sun"></i>}
      />

      <CanvasMenuItemButton
        onClick={() => handleDarkClick()}
        leftLable="ダーク"
        rightLable={<i className="fa-solid fa-moon"></i>}
      />
    </div>
  );
}

export default CanvasOtherMenuThemeItemModal;
