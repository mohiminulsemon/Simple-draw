import React, { useState } from 'react';
import simpleDrawIcon from '../../assets/icon.svg';
import { CanvasLogoModal } from '..';
import ClickAwayListener from 'react-click-away-listener';
import { useSelector, useDispatch } from 'react-redux';
import { canvasLayout, canvasSidebarItem } from '../../utils/constants';
import { updateSelectedSidebarItem } from '../../features/canvasSlice';

function CanvasSidebar() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [isLogoHover, setIsLogoHover] = useState(false);
  const [isOpenLogoModal, setIsOpenLogoModal] = useState(false);

  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.persist.canvasReducer.sidebarDetail.open);
  const selectedSidebarItem = useSelector(
    (state) => state.persist.canvasReducer.selectedSidebarItem
  );

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleLogoHover = (value) => {
    if (isOpenLogoModal) {
      setIsLogoHover(true);
    } else {
      setIsLogoHover(value);
    }
  };

  const handleLogoModalClose = () => {
    setIsOpenLogoModal(false);
    setIsLogoHover(false);
  };

  const handleSidebarItemSelect = (item) => {
    dispatch(updateSelectedSidebarItem(item));
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div
      style={{ width: canvasLayout.sidebarWidth + 'px' }}
      className="h-full bg-inherit fixed z-10
         border-cyan-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-100"
    >
      {/* logo */}
      <div
        onMouseEnter={(e) => handleLogoHover(true)}
        onMouseLeave={(e) => handleLogoHover(false)}
        className="w-full h-[50px] cursor-pointer relative prevent-select"
      >
        <div
          onClick={(e) => setIsOpenLogoModal(!isOpenLogoModal)}
          className={
            (!isLogoHover ? 'animate-fade-out-left ' : 'animate-fade-in-left') +
            ' w-full h-full absolute flex justify-center items-center text-xl'
          }
        >
          <i className="fa-solid fa-bars-staggered"></i>
        </div>

        <div
          className={
            (isLogoHover ? 'animate-fade-out-left ' : 'animate-fade-in-left') +
            ' w-full h-full absolute flex justify-center items-center'
          }
        >
          <img className="w-[32px] h-[32px]" src={simpleDrawIcon} alt="Logo" />
        </div>

        {/* modal */}
        {isOpenLogoModal && (
          <ClickAwayListener onClickAway={(e) => handleLogoModalClose(false)}>
            <div className="fixed top-[50px] left-[12px] z-10">
              <CanvasLogoModal />
            </div>
          </ClickAwayListener>
        )}
      </div>

      {/* sidebar item */}
      <div className="w-full dark:text-zinc-400 prevent-select ">
        {/* template */}
        <div
          onClick={(e) => handleSidebarItemSelect(canvasSidebarItem.template)}
          className={
            (isSidebarOpen &&
              selectedSidebarItem == canvasSidebarItem.template &&
              'dark:bg-zinc-800 bg-zinc-200 ') +
            ' ease-in-out duration-200 ' +
            ' w-full h-[60px] cursor-pointer flex flex-col items-center justify-center hover:text-indigo-500 hover:dark:text-white'
          }
        >
          <i className="fa-solid fa-cubes text-[24px]"></i>
          <div className="text-[8px] text-wrap">テンプレート</div>
        </div>

        {/* shape */}
        <div
          onClick={(e) => handleSidebarItemSelect(canvasSidebarItem.shape)}
          className={
            (isSidebarOpen &&
              selectedSidebarItem == canvasSidebarItem.shape &&
              'dark:bg-zinc-800 bg-zinc-200 ') +
            ' ease-in-out duration-200 ' +
            ' w-full h-[60px] cursor-pointer flex flex-col items-center justify-center hover:text-indigo-500 hover:dark:text-white'
          }
        >
          <i className="fa-solid fa-shapes text-[24px] mt-1"></i>
          <div className="text-[8px] text-wrap">シェイプ</div>
        </div>

        {/* media */}
        <div
          onClick={(e) => handleSidebarItemSelect(canvasSidebarItem.media)}
          className={
            (isSidebarOpen &&
              selectedSidebarItem == canvasSidebarItem.media &&
              'dark:bg-zinc-800 bg-zinc-200 ') +
            ' ease-in-out duration-200 ' +
            ' w-full h-[60px] cursor-pointer flex flex-col items-center justify-center hover:text-indigo-500 hover:dark:text-white'
          }
        >
          <i className="fa-solid fa-photo-film text-[24px] mt-1"></i>
          <div className="text-[8px] text-wrap">メディア</div>
        </div>

        {/* text */}
        <div
          onClick={(e) => handleSidebarItemSelect(canvasSidebarItem.text)}
          className={
            (isSidebarOpen &&
              selectedSidebarItem == canvasSidebarItem.text &&
              'dark:bg-zinc-800 bg-zinc-200 ') +
            ' ease-in-out duration-200 ' +
            ' w-full h-[60px] cursor-pointer flex flex-col items-center justify-center hover:text-indigo-500 hover:dark:text-white'
          }
        >
          <i className="fa-solid fa-t text-[24px] mt-1"></i>
          <div className="text-[8px] text-wrap">テキスト</div>
        </div>

        {/* table */}
        <div
          onClick={(e) => handleSidebarItemSelect(canvasSidebarItem.table)}
          className={
            (isSidebarOpen &&
              selectedSidebarItem == canvasSidebarItem.table &&
              'dark:bg-zinc-800 bg-zinc-200 ') +
            ' ease-in-out duration-200 ' +
            ' w-full h-[60px] cursor-pointer flex flex-col items-center justify-center hover:text-indigo-500 hover:dark:text-white'
          }
        >
          <i className="fa-solid fa-table-cells text-[24px] mt-2"></i>
          <div className="text-[8px] text-wrap">表</div>
        </div>

        {/* layout */}
        <div
          onClick={(e) => handleSidebarItemSelect(canvasSidebarItem.layout)}
          className={
            (isSidebarOpen &&
              selectedSidebarItem == canvasSidebarItem.layout &&
              'dark:bg-zinc-800 bg-zinc-200 ') +
            ' ease-in-out duration-200 ' +
            ' w-full h-[60px] cursor-pointer flex flex-col items-center justify-center hover:text-indigo-500 hover:dark:text-white'
          }
        >
          <i className="fa-solid fa-pager text-[24px] mt-1"></i>
          <div className="text-[8px] text-wrap">レイアウト</div>
        </div>

        {/* project */}
        <div
          onClick={(e) => handleSidebarItemSelect(canvasSidebarItem.project)}
          className={
            (isSidebarOpen &&
              selectedSidebarItem == canvasSidebarItem.project &&
              'dark:bg-zinc-800 bg-zinc-200 ') +
            ' ease-in-out duration-200 ' +
            ' w-full h-[60px] cursor-pointer flex flex-col items-center justify-center hover:text-indigo-500 hover:dark:text-white'
          }
        >
          <i className="fa-solid fa-diagram-project text-[24px] mt-1"></i>
          <div className="text-[8px] text-wrap">プロジェクト</div>
        </div>

        {/* mapping */}
        <div
          onClick={(e) => handleSidebarItemSelect(canvasSidebarItem.mapping)}
          className={
            (isSidebarOpen &&
              selectedSidebarItem == canvasSidebarItem.mapping &&
              'dark:bg-zinc-800 bg-zinc-200 ') +
            ' ease-in-out duration-200 ' +
            ' w-full h-[60px] cursor-pointer flex flex-col items-center justify-center hover:text-indigo-500 hover:dark:text-white'
          }
        >
          <i className="fa-solid fa-wave-square text-[24px] mt-1"></i>
          <div className="text-[8px] text-wrap">マッピング</div>
        </div>

        {/* other */}
        <div
          onClick={(e) => handleSidebarItemSelect(canvasSidebarItem.other)}
          className={
            (isSidebarOpen &&
              selectedSidebarItem == canvasSidebarItem.other &&
              'dark:bg-zinc-800 bg-zinc-200 ') +
            ' ease-in-out duration-200 ' +
            ' w-full h-[60px] cursor-pointer flex flex-col items-center justify-center hover:text-indigo-500 hover:dark:text-white'
          }
        >
          <i className="fa-solid fa-ellipsis text-[24px]"></i>
          <div className="text-[8px] text-wrap -mt-1">もっと見る</div>
        </div>
      </div>
    </div>
  );
}

export default CanvasSidebar;
