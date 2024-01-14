import React, { useRef, useEffect, useState, useReducer } from 'react';
import { Canvas, CanvasContentHeader, CanvasV2 } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { canvasLayout } from '../utils/constants';
import { setCanvasContentHeight, setCanvasContentWidth } from '../features/canvasSlice';

function CanvasPage() {
  const contentRef = useRef(null);

  const dispatch = useDispatch();
  const sidebarDetailWidth = useSelector(
    (state) => state.persist.canvasReducer.sidebarDetail.width
  );
  const isSidebarOpen = useSelector((state) => state.persist.canvasReducer.sidebarDetail.open);
  const canvas = useSelector((state) => state.persist.canvasReducer.canvas);

  const canvasContentWidth = useSelector((state) => state.persist.canvasReducer.canvasContentWidth);
  const canvasContentHeight = useSelector(
    (state) => state.persist.canvasReducer.canvasContentHeight
  );

  const handleContentResize = () => {
    if (isSidebarOpen) {
      dispatch(
        setCanvasContentWidth(
          window.innerWidth -
            canvasLayout.sidebarWidth -
            canvasLayout.sidebarDetailDragWidth -
            sidebarDetailWidth -
            12
        )
      );
    } else {
      dispatch(
        setCanvasContentWidth(
          window.innerWidth - canvasLayout.sidebarWidth - canvasLayout.sidebarDetailDragWidth - 12
        )
      );
    }

    dispatch(
      setCanvasContentHeight(
        window.innerHeight - canvasLayout.headerHeight - canvasLayout.canvasHeaderHeight
      )
    );
  };

  useEffect(() => {
    handleContentResize();
    window.addEventListener('resize', handleContentResize);

    return () => {
      window.removeEventListener('resize', handleContentResize);
    };
  }, [sidebarDetailWidth, isSidebarOpen]);

  return (
    <div className=" w-full h-full rounded-sm">
      {/* header */}
      <div className="w-full">
        <CanvasContentHeader />
      </div>

      {/* content h-[calc(100vh-61px)]*/}
      {canvas.length > 0 && (
        <div className="dark:bg-zinc-900 bg-zinc-300 w-full h-auto " ref={contentRef}>
          {/* <Canvas height={contentHeight} width={contentWidth} /> */}
          <CanvasV2 width={canvasContentWidth} height={canvasContentHeight} />
        </div>
      )}
    </div>
  );
}

export default CanvasPage;
