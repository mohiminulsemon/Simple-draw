import React from 'react';
import { CanvasMenuItemButton } from '..';

function CanvasFileMenuSaveOtherItemModal() {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800">
      <CanvasMenuItemButton leftLable="グループテンプレートとして保存" />

      <CanvasMenuItemButton leftLable="レイアウトテンプレートとして保存" />
    </div>
  );
}

export default CanvasFileMenuSaveOtherItemModal;
