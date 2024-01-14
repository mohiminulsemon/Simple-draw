import React from 'react';

function TemplateSkeleton() {
  return (
    <div
      className="w-[150px] h-[200px] 
        bg-zinc-50 dark:bg-zinc-800 rounded-md p-2"
    >
      <div className="animate-pulse">
        <div className=" flex space-x-4">
          <div className="w-[100px] h-[120px] rounded-xl bg-zinc-200 dark:bg-zinc-600"></div>
          <div className="space-y-3">
            <div className="h-[20px] w-[20px] bg-zinc-200 dark:bg-zinc-600 rounded-md"></div>
            <div className="h-[72%] w-[20px] bg-zinc-200 dark:bg-zinc-600 rounded-md"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="col-span-1 h-2 rounded-lg bg-zinc-200 dark:bg-zinc-600"></div>
          <div className="col-span-2 h-2 rounded-lg bg-zinc-200 dark:bg-zinc-600 "></div>
          <div className="col-span-2 h-2 rounded-lg bg-zinc-200 dark:bg-zinc-600 "></div>
          <div className="col-span-1 h-2 rounded-lg bg-zinc-200 dark:bg-zinc-600 "></div>
          <div className="col-span-3 h-2 rounded-lg bg-zinc-200 dark:bg-zinc-600 "></div>
        </div>
      </div>
    </div>
  );
}

export default TemplateSkeleton;
