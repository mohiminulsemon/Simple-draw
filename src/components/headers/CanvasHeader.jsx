import React, { useState } from 'react';
import {
  CanvasEditMenuModal,
  CanvasFileMenuModal,
  CanvasMenuButton,
  CanvasOtherMenuModal,
  CanvasViewMenuModal
} from '..';
import { canvasHeaderMenu, canvasLayout } from '../../utils/constants';
import ClickAwayListener from 'react-click-away-listener';
import { useSelector, useDispatch } from 'react-redux';
import { openCanvasHeaderMenu } from '../../features/canvasSlice';

function CanvasHeader() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.persist.canvasReducer.isHeaderMenuOpen);

  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(canvasHeaderMenu.unselect);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleMenuHover = (menu) => {
    setSelectedMenu(menu);
  };

  const handleMenuClick = (menu) => {
    dispatch(openCanvasHeaderMenu(!isMenuOpen));
    const isOpen = !isMenuOpen;
    setSelectedMenu(isOpen ? menu : canvasHeaderMenu.unselect);
  };

  const handleCloseMenu = () => {
    dispatch(openCanvasHeaderMenu(false));
    setSelectedMenu(canvasHeaderMenu.unselect);
  };

  // ------------------------------------------------------------------------------
  // renders
  // ------------------------------------------------------------------------------
  return (
    <div
      style={{ height: canvasLayout.headerHeight + 'px' }}
      className="w-full flex justify-between items-center px-4 text-zinc-700 dark:text-zinc-300 prevent-select"
    >
      {/* header left */}
      <div className="flex space-x-1 text-sm">
        {/* file menu */}
        <div className="relative">
          {/* button */}
          <CanvasMenuButton
            label="ファイル"
            onClick={() => handleMenuClick(canvasHeaderMenu.file)}
            onMouseEnter={() => handleMenuHover(canvasHeaderMenu.file)}
            seleted={isMenuOpen && selectedMenu == canvasHeaderMenu.file}
          />

          {/* menu modal */}
          {isMenuOpen && selectedMenu == canvasHeaderMenu.file && (
            <ClickAwayListener onClickAway={handleCloseMenu}>
              <div className="absolute top-[32px] left-0">
                <CanvasFileMenuModal />
              </div>
            </ClickAwayListener>
          )}
        </div>

        {/* edit menu */}
        <div className="relative">
          {/* button */}
          <CanvasMenuButton
            label="編集"
            onClick={() => handleMenuClick(canvasHeaderMenu.edit)}
            onMouseEnter={() => handleMenuHover(canvasHeaderMenu.edit)}
            seleted={isMenuOpen && selectedMenu == canvasHeaderMenu.edit}
          />

          {/* menu modal */}
          {isMenuOpen && selectedMenu == canvasHeaderMenu.edit && (
            <ClickAwayListener onClickAway={handleCloseMenu}>
              <div className="absolute top-[32px] left-0">
                <CanvasEditMenuModal />
              </div>
            </ClickAwayListener>
          )}
        </div>

        {/* view menu */}
        <div className="relative">
          {/* button */}
          <CanvasMenuButton
            label="表示"
            onClick={() => handleMenuClick(canvasHeaderMenu.view)}
            onMouseEnter={() => handleMenuHover(canvasHeaderMenu.view)}
            seleted={isMenuOpen && selectedMenu == canvasHeaderMenu.view}
          />

          {/* menu modal */}
          {isMenuOpen && selectedMenu == canvasHeaderMenu.view && (
            <ClickAwayListener onClickAway={handleCloseMenu}>
              <div className="absolute top-[32px] left-0">
                <CanvasViewMenuModal />
              </div>
            </ClickAwayListener>
          )}
        </div>

        {/* other menu */}
        <div className="relative">
          {/* button */}
          <CanvasMenuButton
            label="その他"
            onClick={() => handleMenuClick(canvasHeaderMenu.other)}
            onMouseEnter={() => handleMenuHover(canvasHeaderMenu.other)}
            seleted={isMenuOpen && selectedMenu == canvasHeaderMenu.other}
          />

          {/* menu modal */}
          {isMenuOpen && selectedMenu == canvasHeaderMenu.other && (
            <ClickAwayListener onClickAway={handleCloseMenu}>
              <div className="absolute top-[32px] left-0">
                <CanvasOtherMenuModal />
              </div>
            </ClickAwayListener>
          )}
        </div>
      </div>

      {/* header right 
      <div className="flex items-center space-x-2">
         theme switch button 
        <ThemeModeButton />

         share button 
        <CanvasShareButton />
      </div>
       */}
    </div>
  );
}

export default CanvasHeader;
