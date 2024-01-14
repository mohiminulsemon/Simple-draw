import React from 'react';

function ProjectCard({ projectData }) {
  return (
    <div className="w-full h-full relative">
      {/* thumbnail image */}
      <div className="flex justify-center h-full items-center">
        <img className="h-[290px]" src={projectData?.thumbnail} alt="Img" />
      </div>

      {/* project details */}
      <div
        className="w-full h-full absolute top-0 left-0
                bg-gradient-to-b from-transparent via-75% via-transparent 
                to-cyan-100 dark:to-zinc-900 rounded-md"
      >
        <div className="w-full h-full flex flex-col-reverse p-2">
          <div className="text-xs font-medium">作成日：{projectData?.creationTime} </div>
          <div className="text-md font-medium">名前：{projectData?.name}</div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
