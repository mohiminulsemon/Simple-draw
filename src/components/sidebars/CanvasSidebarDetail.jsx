import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import {
  openSidebarDetail,
  setSidebarIsResizing,
  updateSidbarDetailWidth
} from '../../features/canvasSlice';
import { canvasLayout, canvasSidebarItem } from '../../utils/constants';
import {
  CanvasLayoutModal,
  CanvasMappingModal,
  CanvasMediaModal,
  CanvasOtherModal,
  CanvasProjectModal,
  CanvasShapeModal,
  CanvasTableModal,
  CanvasTemplateModal,
  CanvasTextModal
} from '..';

function CanvasSidebarDetail() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const left = 60;
  const minWidth = 300;

  const [isResizeAreaHover, setIsResizeAreaHover] = useState(false);

  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.persist.appReducer.isDarkMode);
  const sidebarWidth = useSelector((state) => state.persist.canvasReducer.sidebarDetail.width);
  const isSidebarOpen = useSelector((state) => state.persist.canvasReducer.sidebarDetail.open);
  const isSidebarResizing = useSelector(
    (state) => state.persist.canvasReducer.sidebarDetail.resizing
  );
  const selectedSidebarItem = useSelector(
    (state) => state.persist.canvasReducer.selectedSidebarItem
  );
  const mouse = useSelector((state) => state.persist.appReducer.mouse);
  const screen = useSelector((state) => state.persist.appReducer.screen);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleResize = (event) => {
    event.preventDefault();
    const newWidth = mouse.x - left;
    if (newWidth > minWidth && newWidth < screen.x / 2) {
      dispatch(updateSidbarDetailWidth(newWidth));
    }
  };

  const handleBeforeResize = () => {
    dispatch(setSidebarIsResizing(true));
  };

  const handleAfterResize = () => {
    dispatch(setSidebarIsResizing(false));
  };

  const handleOpen = () => {
    dispatch(openSidebarDetail(!isSidebarOpen));
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div
      style={{
        width: sidebarWidth + 'px',
        left: left + 'px',
        marginLeft: isSidebarOpen ? '0px' : '-' + (sidebarWidth - 1) + 'px'
      }}
      className={
        (isSidebarResizing ? '' : 'ease-in-out duration-300 ') +
        ' absolute top-0 h-full bg-zinc-200 dark:bg-zinc-800 '
      }
    >
      {/* resize boder */}
      {isSidebarOpen && (
        <div
          className={
            (isResizeAreaHover || isSidebarResizing ? 'animate-fade-in ' : 'animate-fade-out ') +
            (isSidebarResizing ? 'bg-green-400 ' : 'bg-indigo-400 ') +
            ' w-[3px] h-full absolute right-0'
          }
        ></div>
      )}

      {/* resize area */}
      {isSidebarOpen && (
        <Draggable
          onStart={handleBeforeResize}
          onStop={handleAfterResize}
          onDrag={handleResize}
          bounds="parent"
          position={{ x: sidebarWidth - 5, y: 0 }}
        >
          <div
            style={{ width: canvasLayout.sidebarDetailDragWidth + 'px' }}
            onMouseEnter={(e) => setIsResizeAreaHover(true)}
            onMouseLeave={(e) => setIsResizeAreaHover(false)}
            className="h-full cursor-ew-resize"
          ></div>
        </Draggable>
      )}

      {/* toggle button */}
      <div
        onClick={(e) => handleOpen()}
        className="w-[20px] h-[60px] absolute -right-[20px] top-[40%] 
       cursor-pointer bg-inherit hover:bg-indigo-400  text-zinc-700 dark:text-zinc-400 hover:text-white"
      >
        <div className="w-full h-full relative">
          <svg viewBox="0 0 20 60">
            <path
              fill={isDarkMode ? '#3f3f46' : '#ecfeff'}
              d="M 0 0 Z L 20 0 L 20 60 L 0 60 Q 0 54 8 53 Q 15 53 17 46 L 17 14 Q 15 7 8 7 Q 0 6 0 0"
            ></path>
          </svg>

          <div className="text-[10px] absolute top-[23px] left-1">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </div>

      {/* sidebar item modals */}
      <div className="absolute top-0 left-0 w-full h-full pe-1">
        {selectedSidebarItem == canvasSidebarItem.template && <CanvasTemplateModal />}
        {selectedSidebarItem == canvasSidebarItem.shape && <CanvasShapeModal />}
        {selectedSidebarItem == canvasSidebarItem.media && <CanvasMediaModal />}
        {selectedSidebarItem == canvasSidebarItem.text && <CanvasTextModal />}
        {selectedSidebarItem == canvasSidebarItem.table && <CanvasTableModal />}
        {selectedSidebarItem == canvasSidebarItem.layout && <CanvasLayoutModal />}
        {selectedSidebarItem == canvasSidebarItem.project && <CanvasProjectModal />}
        {selectedSidebarItem == canvasSidebarItem.mapping && <CanvasMappingModal />}
        {selectedSidebarItem == canvasSidebarItem.other && <CanvasOtherModal />}
      </div>
    </div>
  );
}

export default CanvasSidebarDetail;
