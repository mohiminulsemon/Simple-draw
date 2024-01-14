import React, { useState } from 'react';
import {
  CanvasMenuItemButton,
  SimpleBorder,
  CanvasFileMenuShareItemModal,
  CanvasFileMenuSaveFormatItemModal,
  CanvasFileMenuSaveOtherItemModal
} from '..';
import { canvasHeaderFileMenu } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { openCreateProjectModal } from '../../features/projectSlice';
import { openCanvasHeaderMenu } from '../../features/canvasSlice';

function CanvasFileMenuModal() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(canvasHeaderFileMenu.unselect);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleItemHover = (item) => {
    setSelectedItem(item);
  };

  const handleItemClick = (item) => {
    setSelectedItem(canvasHeaderFileMenu.unselect);
    // console.log('item clicked', item);
  };

  const handleNewClick = () => {
    setSelectedItem(canvasHeaderFileMenu.unselect);
    dispatch(openCanvasHeaderMenu(false));
    dispatch(openCreateProjectModal());
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div
      className="w-[250px] h-auto bg-zinc-100 dark:bg-zinc-800
     text-zinc-700 dark:text-zinc-300 "
    >
      {/* create new  */}
      <CanvasMenuItemButton
        onClick={() => handleNewClick()}
        leftLable="新規..."
        rightLable="Alt+Ctrl + N"
      />

      {/* open project */}
      <CanvasMenuItemButton
        onClick={() => handleItemClick(canvasHeaderFileMenu.open)}
        leftLable="開く..."
        rightLable="Alt + O"
      />

      {/* border */}
      <div className="my-1">
        <SimpleBorder />
      </div>

      {/* clear canvas */}
      <CanvasMenuItemButton
        onClick={() => handleItemClick(canvasHeaderFileMenu.clearCanvas)}
        leftLable="クリアキャンバス"
      />

      {/* resize canvas */}
      <CanvasMenuItemButton
        onClick={() => handleItemClick(canvasHeaderFileMenu.clearCanvas)}
        leftLable="リサイズキャンバス"
      />

      {/* border */}
      <div className="my-1">
        <SimpleBorder />
      </div>

      {/* share */}
      <div onMouseEnter={() => handleItemHover(canvasHeaderFileMenu.share)} className="relative">
        <CanvasMenuItemButton
          leftLable="共有する"
          rightLable={<i className="fa-solid fa-chevron-right"></i>}
        />
        {selectedItem == canvasHeaderFileMenu.share && (
          <div className="w-[180px] absolute top-0 -right-[182px] animate-fade-in">
            <CanvasFileMenuShareItemModal />
          </div>
        )}
      </div>

      {/* border */}
      <div className="my-1">
        <SimpleBorder />
      </div>

      {/* save */}
      <CanvasMenuItemButton
        onClick={() => handleItemClick(canvasHeaderFileMenu.save)}
        leftLable="保存"
        rightLable="Ctrl + S"
      />

      {/* save as template */}
      <CanvasMenuItemButton
        onClick={() => handleItemClick(canvasHeaderFileMenu.saveAsTemplate)}
        leftLable="テンプレートとして保存"
      />

      {/* save as format */}
      <div
        onMouseEnter={() => handleItemHover(canvasHeaderFileMenu.saveAsFormat)}
        className="relative"
      >
        <CanvasMenuItemButton
          leftLable="別名で保存"
          rightLable={<i className="fa-solid fa-chevron-right"></i>}
        />

        {selectedItem == canvasHeaderFileMenu.saveAsFormat && (
          <div className="w-[100px] absolute top-0 -right-[102px] animate-fade-in">
            <CanvasFileMenuSaveFormatItemModal />
          </div>
        )}
      </div>

      {/* save other */}
      <div
        onMouseEnter={() => handleItemHover(canvasHeaderFileMenu.saveOther)}
        className="relative"
      >
        <CanvasMenuItemButton
          leftLable="保存その他"
          rightLable={<i className="fa-solid fa-chevron-right"></i>}
        />

        {selectedItem == canvasHeaderFileMenu.saveOther && (
          <div className="w-[270px] absolute top-0 -right-[272px] animate-fade-in">
            <CanvasFileMenuSaveOtherItemModal />
          </div>
        )}
      </div>

      {/* print */}
      <CanvasMenuItemButton
        onClick={() => handleItemClick(canvasHeaderFileMenu.print)}
        leftLable="印刷..."
      />
    </div>
  );
}

export default CanvasFileMenuModal;
