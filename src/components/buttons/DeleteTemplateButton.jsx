import React from 'react';

function DeleteTemplateButton() {
  return (
    <div
      className="w-[200px] h-[40px] rounded-md hover:scale-105 cursor-pointer ease-linear duration-100
bg-gradient-to-br dark:from-red-300 dark:via-rose-500 via-60%  dark:to-amber-300 
from-red-200 via-rose-400 to-amber-200"
    >
      <div className="w-full h-full flex items-center px-3">
        {/* icon */}
        <div className="text-lg w-[20%]">
          <i className="fa-solid fa-trash"></i>
        </div>

        {/* text */}
        <div className="w-[80%]">テンプレート削除</div>
      </div>
    </div>
  );
}

export default DeleteTemplateButton;
