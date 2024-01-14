import React from 'react';
import { CanvasMenuItemButton, SimpleBorder } from '..';

function CanvasViewMenuModal() {
  return (
    <div
      className="w-[200px] h-auto bg-zinc-100 dark:bg-zinc-800
     text-zinc-700 dark:text-zinc-300 "
    >
      <CanvasMenuItemButton leftLable="拡大" rightLable="Ctrl + +" />

      <CanvasMenuItemButton leftLable="縮小" rightLable="Ctrl + -" />
    </div>
  );
}

export default CanvasViewMenuModal;
