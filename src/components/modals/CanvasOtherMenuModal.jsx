import { React, useState } from 'react';
import { CanvasMenuItemButton, CanvasOtherMenuThemeItemModal, SimpleBorder } from '..';
import { canvasHeaderOtherMenu } from '../../utils/constants';

function CanvasOtherMenuModal() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [selectedItem, setSelectedItem] = useState();
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleItemHover = (item) => {
    setSelectedItem(item);
  };

  const handleItemClick = (item) => {
    setSelectedItem(canvasHeaderOtherMenu.unselect);
    console.log('item clicked', item);
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div
      className="w-[200px] h-auto bg-zinc-100 dark:bg-zinc-800
     text-zinc-700 dark:text-zinc-300 "
    >
      {/* language */}
      <CanvasMenuItemButton
        leftLable="言語"
        rightLable={<i className="fa-solid fa-chevron-right"></i>}
      />

      {/* theme mode */}
      <div onMouseEnter={() => handleItemHover(canvasHeaderOtherMenu.theme)} className="relative">
        <CanvasMenuItemButton
          leftLable="テーマ"
          rightLable={<i className="fa-solid fa-chevron-right"></i>}
        />

        {selectedItem == canvasHeaderOtherMenu.theme && (
          <div className="w-[120px] absolute top-0 -right-[122px] animate-fade-in">
            <CanvasOtherMenuThemeItemModal />
          </div>
        )}
      </div>

      {/* add members */}
      <CanvasMenuItemButton leftLable="メンバー追加" />
    </div>
  );
}

export default CanvasOtherMenuModal;
