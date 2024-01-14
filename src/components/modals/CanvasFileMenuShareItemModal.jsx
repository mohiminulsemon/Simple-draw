import React from 'react';
import { CanvasMenuItemButton } from '..';

function CanvasFileMenuShareItemModal() {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800">
      <CanvasMenuItemButton leftLable="リンクで共有" />

      <CanvasMenuItemButton leftLable="SNSで共有" />
    </div>
  );
}

export default CanvasFileMenuShareItemModal;
