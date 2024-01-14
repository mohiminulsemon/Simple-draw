import React from 'react';
import { useDispatch } from 'react-redux';
import { openCreateProjectModal } from '../../features/projectSlice';

function CreateProjectButton() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useDispatch();

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleClick = () => {
    dispatch(openCreateProjectModal());
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div
      onClick={() => handleClick()}
      className="w-[300px] rounded-md h-[60px] hover:scale-105 cursor-pointer ease-linear duration-100
    bg-gradient-to-br dark:from-cyan-300 dark:via-sky-500 via-60%  dark:to-amber-300 
    from-cyan-200 via-sky-400 to-amber-200"
    >
      <div className="w-full h-full flex justify-between items-center px-3">
        <div className="flex flex-col text-zinc-600 dark:text-zinc-50">
          <span className="text-md">新しいプロジェクトを作成</span>
          <span className="text-xs">最初から始める</span>
        </div>
        <div className="w-[22px] h-[22px] bg-white rounded-full flex justify-center items-center text-zinc-400 text-sm">
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectButton;
