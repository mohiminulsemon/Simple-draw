import React from 'react';
import { Outlet } from 'react-router-dom';
import { CanvasHeader, CanvasSidebar, CanvasSidebarDetail, CreateProjectModal } from '..';
import { useSelector } from 'react-redux';
import { canvasLayout } from '../../utils/constants';

function CanvasLayout() {
  const isSidebarOpen = useSelector((state) => state.persist.canvasReducer.sidebarDetail.open);
  const sidebarDetailWidth = useSelector(
    (state) => state.persist.canvasReducer.sidebarDetail.width
  );
  const isSidebarResizing = useSelector(
    (state) => state.persist.canvasReducer.sidebarDetail.resizing
  );
  const isCreateProjectModalOpen = useSelector(
    (state) => state.projectReducer.isCreateProjectModalOpen
  );

  return (
    <div
      className="w-screen h-screen overflow-hidden 
          bg-cyan-50 dark:bg-zinc-700"
    >
      <div
        style={{
          width: isSidebarOpen
            ? 'calc(100vw - ' + (sidebarDetailWidth + 65) + 'px)'
            : 'calc(100vw - 65px)',
          left: isSidebarOpen ? sidebarDetailWidth + 65 + 'px' : '65px'
        }}
        className={(isSidebarResizing ? '' : 'ease-in-out duration-300') + ' absolute top-0 '}
      >
        {/* content */}
        <div
          style={{ top: canvasLayout.headerHeight }}
          className="px-[16px] w-full h-[calc(100vh-36px)] overflow-hidden absolute "
        >
          <Outlet />
        </div>

        {/* header */}
        <div className="absolute top-0 left-0">
          <CanvasHeader />
        </div>
      </div>

      {/* sidebar */}
      <CanvasSidebarDetail />
      <CanvasSidebar />

      {/* full screen modal */}

      {/* create project modal */}
      {isCreateProjectModalOpen && <CreateProjectModal />}
    </div>
  );
}

export default CanvasLayout;
