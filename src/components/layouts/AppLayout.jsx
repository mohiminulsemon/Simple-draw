import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader, AppSidebar, CreateProjectModal, TemplateDetailModal } from '..';
import { useSelector } from 'react-redux';

function AppLayout() {
  const isSidebarOpen = useSelector((state) => state.persist.appReducer.isSidebarOpen);
  const isTemplateDetailModalOpen = useSelector(
    (state) => state.templateReducer.isTemplateDetailModalOpen
  );
  const isCreateProjectModalOpen = useSelector(
    (state) => state.projectReducer.isCreateProjectModalOpen
  );
  return (
    <div
      className="w-screen h-screen overflow-hidden
    bg-cyan-50 dark:bg-zinc-700"
    >
      {/* header */}
      <AppHeader />

      <div className="relative">
        {/* sidebar */}
        <div className="absolute z-20">
          <AppSidebar />
        </div>

        {/* content */}
        <div
          className={
            (isSidebarOpen
              ? 'left-[260px] w-[calc(100vw-260px)]'
              : 'left-[38px] w-[calc(100vw-38px)]') +
            ' absolute top-0 h-[calc(100vh-45px)] z-10 overflow-auto ease-in-out duration-75'
          }
        >
          <div className="w-full h-auto min-h-full bg-white dark:bg-zinc-600 rounded-s-md ">
            <Outlet />
          </div>
        </div>
      </div>

      {/* full screen modal */}
      {/* template detail modal */}
      {isTemplateDetailModalOpen && <TemplateDetailModal />}

      {/* create project modal */}
      {isCreateProjectModalOpen && <CreateProjectModal />}
    </div>
  );
}

export default AppLayout;
