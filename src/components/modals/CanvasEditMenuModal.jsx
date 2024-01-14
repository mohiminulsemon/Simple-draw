import React from 'react';
import { CanvasMenuItemButton, SimpleBorder } from '..';

function CanvasEditMenuModal() {
  return (
    <div
      className="w-[200px] h-auto bg-zinc-100 dark:bg-zinc-800
     text-zinc-700 dark:text-zinc-300"
    >
      <CanvasMenuItemButton leftLable="元に戻す/やり直し" />

      <CanvasMenuItemButton leftLable="やり直す" rightLable="Shift+Ctrl + Z" />

      <CanvasMenuItemButton leftLable="元に戻す" rightLable="Ctrl + Z" />

      {/* border */}
      <div className="my-1">
        <SimpleBorder />
      </div>

      <CanvasMenuItemButton leftLable="切り取り" rightLable="Ctrl + X" />

      <CanvasMenuItemButton leftLable="コピー" rightLable="Ctrl + C" />

      <CanvasMenuItemButton leftLable="ペースト" rightLable="Ctrl + V" />

      <CanvasMenuItemButton leftLable="消去" rightLable="Delete" />
    </div>
  );
}

export default CanvasEditMenuModal;
