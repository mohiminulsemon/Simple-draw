import React from 'react';

function ProjectSkeleton() {
  return (
    <div
      className="w-full h-[300px] 
    bg-zinc-50 dark:bg-zinc-800 rounded-md p-2"
    >
      <div className="animate-pulse">
        <div
          className="w-full h-[220px] rounded-sm 
                bg-zinc-200 dark:bg-zinc-600"
        ></div>
        <div className="mt-3 h-[20px] w-[70%] bg-zinc-200 dark:bg-zinc-600 rounded-md"></div>
        <div className="mt-3 h-[15px] w-[50%] bg-zinc-200 dark:bg-zinc-600 rounded-md"></div>
      </div>
    </div>
  );
}

export default ProjectSkeleton;
